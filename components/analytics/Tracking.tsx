"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { getConsent, subscribeConsent, type ConsentStatus } from "@/lib/consent";
import { trackEvent, trackingIds } from "@/lib/tracking";

const metaPixel = (id: string) =>
  `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`;

const tiktokPixel = (id: string) =>
  `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var s=document.createElement('script');s.type='text/javascript';s.async=!0;s.src=r+'?sdkid='+e+'&lib='+t;var f=document.getElementsByTagName('script')[0];f.parentNode.insertBefore(s,f)};ttq.load('${id}');ttq.page()}(window,document,'ttq');`;

/** Meta and TikTok only count the first page load by themselves, so report later in-app navigations. */
function RouteViews() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
    window.ttq?.page();
  }, [pathname]);
  return null;
}

/**
 * Loads GTM, GA4, Meta Pixel and TikTok Pixel only after the visitor accepts measurement.
 * IDs come from NEXT_PUBLIC_* variables; an empty ID switches that tool off. With GTM set, GA4 is
 * not loaded directly, to avoid counting twice (configure GA4 inside GTM).
 */
export function Tracking() {
  const consent = useSyncExternalStore<ConsentStatus | "unknown">(subscribeConsent, getConsent, () => "unknown");

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const name = (event.target as Element | null)?.closest?.("[data-track]")?.getAttribute("data-track");
      if (name) trackEvent(name);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (consent === "declined" && trackingIds.ga4) window[`ga-disable-${trackingIds.ga4}`] = true;
  }, [consent]);

  if (consent !== "granted") return null;

  return (
    <>
      {trackingIds.gtm ? (
        <>
          <Script id="ec-gtm-init" strategy="afterInteractive">
            {"window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});"}
          </Script>
          <Script id="ec-gtm" src={`https://www.googletagmanager.com/gtm.js?id=${trackingIds.gtm}`} strategy="afterInteractive" />
        </>
      ) : null}
      {!trackingIds.gtm && trackingIds.ga4 ? (
        <>
          <Script id="ec-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${trackingIds.ga4}`} strategy="afterInteractive" />
          <Script id="ec-ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${trackingIds.ga4}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {trackingIds.metaPixel ? <Script id="ec-meta-pixel" strategy="afterInteractive">{metaPixel(trackingIds.metaPixel)}</Script> : null}
      {trackingIds.tiktok ? <Script id="ec-tiktok-pixel" strategy="afterInteractive">{tiktokPixel(trackingIds.tiktok)}</Script> : null}
      <RouteViews />
    </>
  );
}

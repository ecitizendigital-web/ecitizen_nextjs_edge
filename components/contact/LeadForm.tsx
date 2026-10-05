"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { auditFocusOptions, goalOptions, NO_PACKAGE, packageOptions } from "@/data/audit";
import { phoneHref, site, whatsappUrl } from "@/data/site";
import { buildWhatsAppMessage, validateLead, type LeadErrors, type LeadInput } from "@/lib/lead";
import { trackEvent } from "@/lib/tracking";
import { SelectField, TextAreaField, TextField } from "./Field";
import styles from "./LeadForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";
type Props = { initialPick?: string; initialGoal?: string; pickFromUrl?: boolean };

const FIELD_ORDER: (keyof LeadInput)[] = ["name", "phone", "business", "businessType", "website", "auditFocus", "goal", "pick", "message"];

function failureMessage(status: number, code?: string): string {
  if (status === 429) return "Several requests were sent in a short time. Please wait a few minutes, or send your details on WhatsApp.";
  if (code === "too_fast") return "That was very quick, so it was paused. Check your details and send again.";
  if (code === "not_configured") return "Sending from this page is not switched on yet.";
  return "Something went wrong on our side.";
}

export function LeadForm({ initialPick = NO_PACKAGE, initialGoal = "Not sure yet", pickFromUrl = false }: Props) {
  const [values, setValues] = useState<LeadInput>({
    name: "",
    phone: "",
    business: "",
    businessType: "",
    website: "",
    auditFocus: auditFocusOptions[0],
    goal: initialGoal,
    pick: initialPick,
    message: "",
  });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const startedAt = useRef<number | null>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const failureBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successHeading.current?.focus();
    if (status === "error") failureBox.current?.focus();
  }, [status]);

  const change = (key: keyof LeadInput) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const focusFirstError = (found: LeadErrors) => {
    const key = FIELD_ORDER.find((field) => found[field]);
    if (key) (formRef.current?.elements.namedItem(key) as HTMLElement | null)?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const result = validateLead({ ...values });
    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError(result.errors);
      return;
    }

    setErrors({});
    setFailure("");
    setStatus("submitting");
    trackEvent("free_audit_submit_attempt");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          ec_hp: honeypot.current?.value ?? "",
          elapsedMs: startedAt.current ? Date.now() - startedAt.current : null,
          page: `${window.location.pathname}${window.location.search}`,
        }),
      });
      const body = (await response.json().catch(() => null)) as { ok?: boolean; code?: string; errors?: LeadErrors } | null;

      if (response.ok && body?.ok) {
        setStatus("success");
        trackEvent("free_audit_requested", { metaStandard: "Lead" });
        return;
      }
      if (response.status === 422 && body?.errors) {
        setErrors(body.errors);
        setStatus("idle");
        focusFirstError(body.errors);
        return;
      }
      setFailure(failureMessage(response.status, body?.code));
      setStatus("error");
    } catch {
      setFailure("We could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setValues((current) => ({ ...current, name: "", phone: "", business: "", businessType: "", website: "", message: "" }));
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h3 ref={successHeading} tabIndex={-1} className={styles.resultTitle}>Request received.</h3>
        <p>
          Thank you{values.name ? `, ${values.name.split(" ")[0]}` : ""}. We will review the details you sent and contact you about what we found and the practical next steps.
        </p>
        <div className={styles.resultActions}>
          <Button href={whatsappUrl()} track="whatsapp_click">
            <WhatsAppIcon size={18} />
            Prefer to talk now? WhatsApp us
          </Button>
          <Button variant="ghost" onClick={reset}>Send another request</Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={styles.form} aria-busy={status === "submitting"} id="free-audit-form">
      <p className={styles.required}>Name, phone and business name are required.</p>

      {status === "error" ? (
        <div ref={failureBox} tabIndex={-1} role="alert" className={styles.failure}>
          <h3 className={styles.resultTitle}>We could not send your request online.</h3>
          <p>{failure} Your details are still in the form, so nothing is lost. Try again, or send the same details on WhatsApp.</p>
          <div className={styles.resultActions}>
            <Button href={whatsappUrl(buildWhatsAppMessage(values))} variant="primary" track="whatsapp_click">
              <WhatsAppIcon size={18} />
              Send on WhatsApp
            </Button>
            <Button href={phoneHref} track="phone_click">Call {site.contact.phone.display}</Button>
          </div>
        </div>
      ) : null}

      <div className={styles.row}>
        <TextField id="name" label="Your name" required autoComplete="name" value={values.name} onChange={change("name")} error={errors.name} maxLength={90} />
        <TextField id="phone" label="Phone or WhatsApp" required type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" value={values.phone} onChange={change("phone")} error={errors.phone} maxLength={30} />
      </div>
      <div className={styles.row}>
        <TextField id="business" label="Business name" required autoComplete="organization" value={values.business} onChange={change("business")} error={errors.business} maxLength={110} />
        <TextField id="businessType" label="Business type" placeholder="Clinic, restaurant, shop, service…" value={values.businessType} onChange={change("businessType")} error={errors.businessType} maxLength={90} />
      </div>
      <TextField id="website" label="Website or Facebook page" type="text" inputMode="url" autoCapitalize="none" spellCheck={false} placeholder="https://" hint="If you have one. We will review it as part of the audit." value={values.website} onChange={change("website")} error={errors.website} maxLength={310} />
      <div className={styles.row}>
        <SelectField id="auditFocus" label="What should we review?" options={auditFocusOptions} value={values.auditFocus} onChange={change("auditFocus")} error={errors.auditFocus} />
        <SelectField id="goal" label="Main goal" options={goalOptions} value={values.goal} onChange={change("goal")} error={errors.goal} />
      </div>
      <SelectField
        id="pick"
        label="Package you are considering"
        options={packageOptions}
        value={values.pick}
        onChange={change("pick")}
        error={errors.pick}
        hint={pickFromUrl ? "Selected from the packages page. You can change it." : "Optional. The audit can help you decide."}
      />
      <TextAreaField id="message" label="Anything we should know?" placeholder="What is working, what is not, what you want next." value={values.message} onChange={change("message")} error={errors.message} maxLength={1600} />

      <div className={styles.hp} aria-hidden="true">
        <label>
          Leave this field empty
          <input ref={honeypot} type="text" name="ec_hp" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className={styles.submit}>
        <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"} track="free_audit_submit_click">
          {status === "submitting" ? "Sending…" : "Request my free audit"}
        </Button>
        <p className={styles.note}>
          We use these details only to reply to your request. <Link href="/lead-data">How lead data is handled</Link>
        </p>
      </div>
    </form>
  );
}

import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { CtaBand } from "@/components/ui/CtaBand";
import { finalCta } from "@/data/home";
import { whatsappUrl } from "@/data/site";

export function FinalCta() {
  return (
    <CtaBand
      title={finalCta.heading}
      body={finalCta.body}
      actions={
        <>
          <MagneticButton href="/contact#free-audit" track="free_audit_click">
            Request a free audit
          </MagneticButton>
          <Button href={whatsappUrl()} size="lg" track="whatsapp_click">
            <WhatsAppIcon size={18} />
            Discuss my growth
          </Button>
        </>
      }
      note={
        <>
          Questions first? <Link href="/faq" style={{ color: "var(--accent-bright)", textDecoration: "underline" }}>Read the FAQ</Link>.
        </>
      }
    />
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { goalOptions, NO_PACKAGE, packageOptions } from "@/data/audit";
import { LeadForm } from "./LeadForm";

const match = (options: readonly string[], value: string | null) => options.find((option) => option.toLowerCase() === value?.toLowerCase());

/**
 * Reads ?pick=PACKAGE (from the packages page) and ?goal=GOAL (from a service) so the form arrives pre-filled.
 * Lives in its own small client component so the rest of /contact stays statically generated.
 */
export function LeadFormWithPick() {
  const params = useSearchParams();
  const pick = match(packageOptions, params.get("pick"));
  const goal = match(goalOptions, params.get("goal"));
  return <LeadForm initialPick={pick ?? NO_PACKAGE} initialGoal={goal} pickFromUrl={Boolean(pick && pick !== NO_PACKAGE)} />;
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Step 1 after the component has mounted
    router.push("/onboarding/step1");
  }, [router]);

  return null; // Render nothing while redirecting
}

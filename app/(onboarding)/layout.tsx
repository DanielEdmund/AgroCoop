import { PageTransition } from "@/components/animations";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-coop-sand">
      <PageTransition className="min-h-screen">{children}</PageTransition>
    </div>
  );
}

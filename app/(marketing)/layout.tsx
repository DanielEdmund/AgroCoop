import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { PageTransition } from "@/components/animations";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-coop-sand">
      <MarketingHeader />
      <PageTransition className="flex-1">
        <main className="flex-1">{children}</main>
      </PageTransition>
      <MarketingFooter />
    </div>
  );
}

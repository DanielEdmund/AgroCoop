import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageTransition } from "@/components/animations";
import { AuthGate } from "@/components/auth/AuthGate";

export const metadata = {
  title: { default: "Dashboard | AgroCoop", template: "%s | AgroCoop" },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="flex min-h-screen bg-coop-sand">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar />
          <PageTransition className="flex-1">
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-12">
              {children}
            </main>
          </PageTransition>
        </div>

        <BottomNav />
      </div>
    </AuthGate>
  );
}

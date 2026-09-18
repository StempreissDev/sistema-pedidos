import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </AuthGuard>
  );
}

import AdminSidebar from "@/components/admin/AdminSidebar";
import { verifyTokenForPages } from "@/utils/verifyToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is the admin dashboard",
};

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout = async ({ children }: AdminDashboardLayoutProps) => {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwtToken")?.value;
  const userFromToken = token ? verifyTokenForPages(token) : null;

  if (!token || userFromToken?.isAdmin === false) redirect("/not-found");
  return (
    <div className="overflow-height flex items-start justify-between overflow-hidden">
      <div className="overflow-height w-15 lg:w-1/5 bg-purple-600 text-white !p-1 lg:!p-5">
        <AdminSidebar />
      </div>
      <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default AdminDashboardLayout;

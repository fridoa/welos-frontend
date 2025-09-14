import DashboardAdminLayout from "@/components/layouts/DashboardAdminLayout";
import React, { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
}

const AdminLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <DashboardAdminLayout
      title="Admin Dashboard"
      description="Selamat datang di halaman admin. Kelola konten dan pengaturan situs Anda di sini."
    >
      {children}
    </DashboardAdminLayout>
  );
};

export default AdminLayout;

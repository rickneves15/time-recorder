import { DashboardLayout } from "@/components/DashboardLayout";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <DashboardLayout title="Dashboard | Home">
      <h1 className=" text-3xl font-extrabold text-gray-900">
        Bem Vindo {user?.name}
      </h1>
    </DashboardLayout>
  );
}

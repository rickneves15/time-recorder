import { DashboardLayout } from "@/components/DashboardLayout";
import ListEmployees from "@/components/ListEmployees";

export default function Point() {
  return (
    <DashboardLayout title="Dashboard | Funcionários">
      <ListEmployees />
    </DashboardLayout>
  );
}

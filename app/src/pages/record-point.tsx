import { BookmarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { DashboardLayout } from "@/components/DashboardLayout";
import { recordPointCreateRequest } from "@/services/recordPoint";

export default function RecordPoint() {
  async function handleRecordPoint() {
    try {
      const response = await recordPointCreateRequest();
      toast.success("Ponto Registrado com uscesso!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <DashboardLayout title="Dashboard | Registrar Ponto">
      <div className="flex ">
        <button
          onClick={handleRecordPoint}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <BookmarkIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Registrar
        </button>
      </div>
    </DashboardLayout>
  );
}

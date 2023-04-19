import { useState } from "react";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { recordPointsRequest } from "@/services/recordPoint";

export default function ListRecordPoints() {
  const { register, handleSubmit } = useForm();
  const [recordPoints, setRecordPoints] = useState<RecordPoint[] | null>(null);

  async function handleRecordPoints(data: any) {
    try {
      const response = await recordPointsRequest(data);
      setRecordPoints(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col m-auto items-start max-w-2xl">
      <div className="w-full overflow-hidden bg-white sm:rounded-lg shadow">
        <div className="w-full text-sm p-4">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleRecordPoints)}
          >
            <div className="flex flex-col gap-3 rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="startDate">Data Inicial</label>
                <input
                  {...register("startDate")}
                  id="startDate"
                  name="startDate"
                  type="date"
                  autoComplete="startDate"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Data Inicial"
                />
              </div>

              <div>
                <label htmlFor="endDate">Data Final</label>
                <input
                  {...register("endDate")}
                  id="endDate"
                  name="endDate"
                  type="date"
                  autoComplete="endDate"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Data Final"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="flex items-center text-xl p-4 gap-2">
            Lista de Registros de Pontos dos Funcionários
          </h2>
          {recordPoints && (
            <table className="table-auto w-full text-sm divide-y divide-gray-200">
              <thead>
                <tr className="border-t">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Nome</th>
                  <th className="text-left p-4">Cargo</th>
                  <th className="text-left p-4">Gestor</th>
                  <th className="text-left p-4">Idade</th>
                  <th className="text-left p-4">Data do Registro do Ponto</th>
                </tr>
              </thead>
              <tbody>
                {recordPoints.map((recordPoint, index) => (
                  <tr
                    className="border-t cursor-pointer hover:bg-gray-50"
                    key={index}
                  >
                    <td className="p-4">{recordPoint.id}</td>
                    <td className="p-4">{recordPoint.name}</td>
                    <td className="p-4">{recordPoint.role}</td>
                    <td className="p-4">{recordPoint.manager}</td>
                    <td className="p-4">{recordPoint.age}</td>
                    <td className="p-4">
                      {recordPoint.register_point_date_time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

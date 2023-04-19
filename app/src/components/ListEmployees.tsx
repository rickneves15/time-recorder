import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Router from "next/router";

import { userDeleteRequest, usersRequest } from "@/services/users";

export default function ListEmployees() {
  const [users, setUsers] = useState<UsersResponse[] | []>([]);

  const handleDelete = async (id: number) => {
    await userDeleteRequest(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const showUser = async (id: number) => {
    Router.push(`users/${id}`);
  };

  useEffect(() => {
    usersRequest().then((response: UsersResponse[]) => {
      setUsers(response);
    });
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white sm:rounded-lg shadow">
      <div className="flex items-center ">
        <h2 className="flex items-center text-xl p-4 gap-2">
          Lista de Funcionários
          <button
            onClick={() => Router.push("/users")}
            className="flex items-center p-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 ring-1 ring-inset ring-gray-300 rounded"
          >
            <PlusIcon className="h-4 w-4 mr-2" /> Adicionar
          </button>
        </h2>
      </div>
      <table className="table-auto w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr className="border-t">
            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Nome</th>
            <th className="text-left p-4">CPF</th>
            <th className="text-left p-4">Data Nasc.</th>
            <th className="text-left p-4">Cargo</th>
            <th className="text-left p-4">CEP</th>
            <th className="text-left p-4">Gestor</th>
            <th className="text-center p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              className="border-t cursor-pointer hover:bg-gray-50"
              key={index}
            >
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">
                {user.identification_number.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/,
                  "$1.$2.$3-$4"
                )}
              </td>
              <td className="p-4">{user.birthday}</td>
              <td className="p-4">{user.role.name}</td>
              <td className="p-4">
                {user.address?.cep &&
                  user.address?.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}
              </td>
              <td className="p-4">{user.manager?.name}</td>
              <td className="p-4">
                <div className="flex flex-col items-center justify-end gap-2">
                  <button
                    onClick={() => showUser(user.id)}
                    className="w-full items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 ring-1 ring-inset ring-gray-300 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="w-full items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 ring-1 ring-inset ring-gray-300 rounded"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

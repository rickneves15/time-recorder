import { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { ArrowUturnLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { DashboardLayout } from "@/components/DashboardLayout";
import { userEditRequest, userRequest } from "@/services/users";

import { AuthContext } from "@/contexts/AuthContext";
import { getAddressRequest } from "@/services/address";

export default function Users() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, setValue, reset } = useForm();

  const [userId, setUSerId] = useState<number | any>(id);
  const [address, setAddress] = useState<AddressResponse | null>(null);

  async function handleEditUser(data: any) {
    try {
      let { manager_id, name, birthday, role_id, address } = data;
      const { cep, street, number, complement, neighborhood, city, state } =
        address;
      const partData = birthday.split("/");
      birthday = `${partData[2]}-${partData[1]}-${partData[0]}`;

      const user = {
        manager_id,
        name,
        birthday,
        role_id,
        address: {
          cep,
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
        },
      };

      const response = await userEditRequest(userId, user);
      toast.success("Funcionário Editado com Sucesso!", {
        autoClose: 3000,
        theme: "colored",
        onClose: () => Router.push("/employee"),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetAddress(cep: string) {
    try {
      const data = await getAddressRequest(cep);
      setAddress(data);
      setValue("address", data);
    } catch ({ response }: any) {
      console.log(response);
    }
  }

  useEffect(() => {
    userRequest(userId).then((response: UsersResponse) => {
      const {
        manager_id,
        name,
        email,
        identification_number,
        birthday,
        role_id,
        address,
      } = response;

      reset({
        manager_id,
        name,
        email,
        identification_number: identification_number.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        ),
        birthday,
        role_id,
        address,
      });
    });
  }, []);

  return (
    <DashboardLayout title="Dashboard | Editar Funcionário">
      <button
        onClick={() => Router.push("/employee")}
        className=" items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 ring-1 ring-inset ring-gray-300 rounded"
      >
        <ArrowUturnLeftIcon className="h-3 w-3" />
      </button>
      <div className="w-full overflow-hidden bg-white p-4 sm:rounded-lg shadow divide-y divide-gray-200">
        <div className="flex items-center mb-2">
          <h2 className="text-xl ">Editar Funcionário</h2>
        </div>
        <div className="w-full text-sm mt-2">
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleEditUser)}
          >
            <div className="flex flex-col gap-3 rounded-md shadow-sm -space-y-px">
              <input
                {...register("manager_id")}
                type="hidden"
                name="manager_id"
                defaultValue={user?.id}
              />

              <div>
                <label htmlFor="name">Nome</label>
                <input
                  {...register("name")}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nome"
                />
              </div>

              <div>
                <label htmlFor="email">Email address</label>
                <input
                  {...register("email")}
                  disabled
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="identification_number">CPF</label>
                <input
                  {...register("identification_number")}
                  disabled
                  id="identification_number"
                  name="identification_number"
                  type="text"
                  autoComplete="identification_number"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="CPF"
                />
              </div>

              <div>
                <label htmlFor="birthday">Data Nasc.</label>
                <InputMask mask="99/99/9999" {...register("birthday")}>
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      id="birthday"
                      name="birthday"
                      type="text"
                      autoComplete="birthday"
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Data Nasc."
                    />
                  )}
                </InputMask>
              </div>

              <div>
                <label htmlFor="role_id">Cargo</label>
                <select
                  {...register("role_id")}
                  id="role_id"
                  name="role_id"
                  autoComplete="role_id"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Cargo"
                  defaultValue="2"
                >
                  <option value="1">Administrador</option>
                  <option value="2" selected>
                    Funcionário
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="address.cep">CEP</label>
                <input
                  {...register("address.cep")}
                  onChange={(e) => handleGetAddress(e.target.value)}
                  id="address.cep"
                  name="address.cep"
                  type="text"
                  autoComplete="address.cep"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="CEP"
                />
              </div>

              <div>
                <label htmlFor="address.street">Endereço</label>
                <input
                  {...register("address.street")}
                  defaultValue={address?.street}
                  id="address.street"
                  name="address.street"
                  type="text"
                  autoComplete="address.street"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Endereço"
                />
              </div>

              <div>
                <label htmlFor="address.neighborhood">Bairro</label>
                <input
                  {...register("address.neighborhood")}
                  defaultValue={address?.neighborhood}
                  id="address.neighborhood"
                  name="address.neighborhood"
                  type="text"
                  autoComplete="address.neighborhood"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Bairro"
                />
              </div>

              <div>
                <label htmlFor="address.number">Número</label>
                <input
                  {...register("address.number")}
                  id="address.number"
                  name="address.number"
                  type="text"
                  autoComplete="address.number"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Número"
                />
              </div>

              <div>
                <label htmlFor="address.complement">Complemento</label>
                <input
                  {...register("address.complement")}
                  id="address.complement"
                  name="address.complement"
                  type="text"
                  autoComplete="address.complement"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Complemento"
                />
              </div>

              <div>
                <label htmlFor="address.city">Cidade</label>
                <input
                  {...register("address.city")}
                  defaultValue={address?.city}
                  id="address.city"
                  name="address.city"
                  type="text"
                  autoComplete="address.city"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Cidade"
                />
              </div>

              <div>
                <label htmlFor="address.state">Estado</label>
                <input
                  {...register("address.state")}
                  defaultValue={address?.state}
                  id="address.state"
                  name="address.state"
                  type="text"
                  autoComplete="address.state"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Estado"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusIcon
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
      </div>
    </DashboardLayout>
  );
}

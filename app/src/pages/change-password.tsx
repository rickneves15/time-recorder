import { useForm } from "react-hook-form";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { DashboardLayout } from "@/components/DashboardLayout";
import { changePasswordRequest } from "@/services/users";

export default function ChangePassword() {
  const { register, handleSubmit, reset } = useForm();

  async function handleChangePassword(data: any) {
    try {
      const response = await changePasswordRequest(data);
      toast.success("Senha Alterada com Sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        theme: "colored",
        onClose: () => reset(),
      });
    } catch ({ response }: any) {
      const { message } = response.data;
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        theme: "colored",
      });
    }
  }

  return (
    <DashboardLayout title="Dashboard | Trocar Senha">
      <div className="flex flex-col m-auto items-start max-w-2xl">
        <div className="w-full overflow-hidden bg-white sm:rounded-lg shadow">
          <div className="w-full text-sm p-4">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(handleChangePassword)}
            >
              <div className="flex flex-col gap-3 rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="current_password">Senha Atual</label>
                  <input
                    {...register("current_password")}
                    id="current_password"
                    name="current_password"
                    type="password"
                    autoComplete="current_password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Senha Atual"
                  />
                </div>

                <div>
                  <label htmlFor="password">Senha</label>
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Senha"
                  />
                </div>

                <div>
                  <label htmlFor="password_confirmation">
                    Confirmação de Senha
                  </label>
                  <input
                    {...register("password_confirmation")}
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="password_confirmation"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirmação de Senha"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <BookmarkIcon
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
      </div>
    </DashboardLayout>
  );
}

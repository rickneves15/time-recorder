import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect } from "react";

type Route = {
  link: string;
  title: string;
};

const ROUTES_ADMIN: Route[] = [
  { link: "/employee", title: "Funcionários" },
  { link: "list-record-point", title: "Lista Registo Ponto" },
];

const ROUTES_EMPLOYEE: Route[] = [
  { link: "/record-point", title: "Registar Ponto" },
  { link: "/change-password", title: "Trocar Senha" },
];

export const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);

  const routes = user?.manager_id ? ROUTES_EMPLOYEE : ROUTES_ADMIN;

  async function handleSignOut(data: any) {
    await signOut();
  }

  return (
    <nav className="top-full w-full max-w-full rounded-lg bg-white py-5 px-6 shadow static block">
      <ul className="flex">
        {routes.map((route, index) => (
          <li key={index}>
            <Link
              href={route.link}
              className="flex py-2 px-4 text-base font-medium rounded-md text-black hover:bg-indigo-700 hover:text-white"
            >
              {route.title}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={handleSignOut}
            className="flex py-2 px-4 text-base font-medium rounded-md text-black hover:bg-indigo-700 hover:text-white"
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
};

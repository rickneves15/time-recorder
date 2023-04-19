import Head from "next/head";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";

type MainLayoutType = {
  children: ReactNode;
  title: string;
};

export const DashboardLayout = ({ children, title }: MainLayoutType) => {
  return (
    <div className="min-w-screen min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />

      <div className="flex-1 m-5">{children}</div>
    </div>
  );
};

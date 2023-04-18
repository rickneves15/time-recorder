import { AuthContext } from "@/contexts/AuthContext";
import { getAPIClient } from "@/services/axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext } from "react";

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);

  async function handleSignOut(data: any) {
    await signOut();
  }
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>logout</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["nextauth.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await apiClient.get("/users");

  return {
    props: {},
  };
};

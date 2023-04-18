import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    await signIn({
      email: "ricknevesbc@hotmail.com",
      password: "123456789",
    });
  }

  return (
    <>
      <h1>Login</h1>
      <button onClick={handleSignIn}>login</button>
    </>
  );
}

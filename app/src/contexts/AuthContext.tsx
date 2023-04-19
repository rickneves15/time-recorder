"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

import {
  signInRequest,
  signOutRequest,
  profileRequest,
} from "../services/auth";
import { api } from "../services/api";

type User = {
  id: number;
  name: string;
  email: string;
  identification_number: string;
  birthday: string;
  created_at: string;
  updated_at: string;
  role_id: number;
  manager_id: null | number;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      profileRequest().then((response: any) => {
        setUser(response.user);
      });
    }

    Router.push("/");
  }, []);

  async function signIn({ email, password }: SignInData) {
    const {
      access_token: token,
      expires_in: maxAge,
      user,
    } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "nextauth.token", token, {
      maxAge,
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/dashboard");
  }

  async function signOut() {
    await signOutRequest();

    destroyCookie(undefined, "nextauth.token");

    delete api.defaults.headers["Authorization"];

    setUser(null);

    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

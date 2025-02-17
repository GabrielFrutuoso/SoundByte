"use client"

import React from "react";
import { Button } from "../ui/button";
import { BsGoogle } from "react-icons/bs";
import { signIn } from "next-auth/react";

export const LoginButton = () => {

  return (
    <Button
      onClick={() => {
        signIn("google", { callbackUrl: "/registerProvider" });
      }}
      variant={"outline"}
      type="button"
      className="w-full flex items-center justify-center gap-2"
    >
      <BsGoogle />
      <span>Login with Google</span>
    </Button>
  );
};

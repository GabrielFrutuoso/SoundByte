"use client";

import { LoginButton } from "@/components/LoginButton";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import Link from "next/link";

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  signIn("credentials", {
    callbackUrl: "/",
    email: formData.get("email"),
    password: formData.get("password"),
  });
};

export default function Login() {
  return (
    <div className="flex min-h-screen gap-3">
      <div className="w-full md:w-4/12 h-full flex flex-col justify-center items-center">
        <form className="flex flex-col space-y-4 w-80" onSubmit={onSubmit}>
          <Link href={"/"}>
            <h1 className="text-4xl font-bold">
              Sound<span className="text-lime-500">Byte</span>
            </h1>
          </Link>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input type="email" id="email" name="email" className="input" />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              className="input"
            />
          </div>
          <span className="text-right">
            Ainda não tem uma conta? &nbsp;
            <Link className="underline" href="/register">
              Registre-se
            </Link>
          </span>

          <Button type="submit">Login</Button>
          <div className="flex items-center">
            <Separator className="my-4 flex-1" />
            <span>ou</span>
            <Separator className="my-4 flex-1" />
          </div>

          <LoginButton />
        </form>
      </div>
      <div className="relative w-0 md:w-8/12 h-full bg-black">
        <h1 className="hidden md:flex flex-col z-10 absolute right-5 top-1/4 text-balance text-7xl text-right font-semibold leading-none tracking-tighter w-80">
          <span className="text-5xl">All songs in</span>
          <LineShadowText
            className="italic text-right text-lime-500"
            shadowColor={"#84cc16"}
          >
            one place
          </LineShadowText>
        </h1>

        <RetroGrid className="h-screen" />
      </div>
    </div>
  );
}

"use client";

import { LoginButton } from "@/components/LoginButton";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/apiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await apiClient.post("api/user/register", {
        email: formData.get("email"),
        password: formData.get("password"),
        username: formData.get("username"),
      });

      if (res.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error in POST /api/user/register:", error);
      toast({
        title: "Error",
        description: "Failed to register user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen gap-3">
      <div className="w-full md:w-4/12 h-full flex flex-col justify-center items-center">
        <form onSubmit={onSubmit} className="flex flex-col space-y-4 w-80">
          <Link href={"/"}>
            <h1 className="text-4xl font-bold">
              Sound<span className="text-lime-500">Byte</span>
            </h1>
          </Link>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="username" className="text-sm">
              Nome de usuário
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              className="input"
            />
          </div>
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
            já tem uma conta? &nbsp;
            <Link className="underline" href="/login">
              faça login
            </Link>
          </span>
          <Button type="submit">Registrar</Button>
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

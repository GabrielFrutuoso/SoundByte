"use client";

import { LoginButton } from "@/components/LoginButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-3">
      <Card className="z-20 w-80 md:w-96">
        <CardHeader className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold z-20">SoundByte</h1>
          <h2 className="w-full text-center text-2xl font-bold">Registrar</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col space-y-4">
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
              Não tem uma conta? &nbsp;
              <Link className="underline" href="/login">
                Crie aqui
              </Link>
            </span>

            <Button type="submit">Registrar</Button>
          </form>

          <Separator className="my-4" />

          <LoginButton />
        </CardContent>
      </Card>
      <RetroGrid className="dark" />
    </div>
  );
}

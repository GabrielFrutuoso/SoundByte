import { LoginButton } from "@/components/LoginButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  openGraph: {
    title: "SoundByte - Login"
  }
};

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-3">
      <Card className="z-20 w-80 md:w-96">
        <CardHeader className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold z-20">SoundByte</h1>
          <h2 className="w-full text-center text-2xl font-bold">Login</h2>
        </CardHeader>
        <CardContent>
          <form action="" className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input type="email" id="email" className="input" />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <Input type="password" id="password" className="input" />
            </div>
            <span className="text-right">
              Já tem uma conta? &nbsp;
              <Link className="underline" href="/register">
                Faça login
              </Link>
            </span>

            <Button type="submit">Login</Button>
          </form>

          <Separator className="my-4" />

          <LoginButton />
        </CardContent>
      </Card>
      <RetroGrid className="dark" />
    </div>
  );
}

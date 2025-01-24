import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { BsGoogle } from "react-icons/bs";

export const metadata: Metadata = {
    title: "SoundByte - Login",
    description: "Login page",
    }

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-3">
      <Card className="z-20 w-96">
        <CardHeader className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold z-20">SoundByte</h1>
          <h2 className="w-full text-center text-2xl font-bold">Login</h2>
        </CardHeader>
        <CardContent>
          <form action="" className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <Input type="email" id="email" className="input" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <Input type="password" id="password" className="input" />
            </div>

            <Button type="submit">Login</Button>
          </form>

          <Separator className="my-4" />

          <Button variant={"outline"} type="submit" className="w-full">
            <BsGoogle className="mr-1" />
            Login
          </Button>
        </CardContent>
      </Card>
      <RetroGrid className="dark" />
    </div>
  );
}

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/userStore";
import React from "react";
import { redirect } from "next/navigation";

export default function Settings() {
  const { user } = useUserStore();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="h-full flex flex-col p-12">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Separator className="my-6" orientation="horizontal" />

      <div className="flex items-center justify-start gap-4">
        <Avatar className="w-40 h-40">
          <AvatarImage
            alt="Avatar"
            src={user?.avatar || ""}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-start gap-2">
          <h3 className="text-4xl font-bold">{user?.username}</h3>
          <p className="text-lg">{user?.email}</p>
          <Button variant="outline"><Pencil /> Editar perfil</Button>
        </div>
      </div>

    </div>
  );
}

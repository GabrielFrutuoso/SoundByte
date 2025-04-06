"use client";

import React, { useState } from "react";
import { FormField } from "../FormField";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEditProfile } from "@/hooks/requests/user/useEditProfile";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { DialogFooter } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

export const EditProfileForm = () => {
  const { user } = useUserStore();
  const { mutate: editProfile } = useEditProfile();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    editProfile({ userId: user?.id as string, username: username as string });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full bg-slate-200">
      <FormField>
        <Label htmlFor="username">username</Label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          type="text"
          id="username"
        />
      </FormField>
        <Button className="w-full" type="submit">
          <Pencil /> Salvar
        </Button>

    </form>
  );
};

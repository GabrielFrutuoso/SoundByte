"use client";


import { useFindUserByEmail } from "@/hooks/requests/useFindUserByEmail";

import { useSession } from "next-auth/react";
import React from "react";

export default function RegisterProviderPage() {
  const { data: session } = useSession();

  const { data, isLoading, error } = useFindUserByEmail(session?.user?.email || '');

  console.log(data, isLoading, error);
  
  return (
    <div>
      helo
    </div>
  );
}

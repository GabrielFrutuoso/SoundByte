"use client";

import { useFindUserByEmail } from "@/hooks/requests/user/useFindUserByEmail";
import { useRegisterUser } from "@/hooks/requests/user/useRegisterUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RegisterProviderPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: user, isLoading } = useFindUserByEmail(
    session?.user?.email || ""
  );
  const { mutate: register, isPending: isRegistering } = useRegisterUser({
    onSuccess: () => router.push("/"),
  });

  useEffect(() => {
    if (!isLoading && !user && session?.user) {
      register({
        email: session.user.email!,
        username: session.user.name!,
        avatar: session.user.image!,
        provider: "google",
      });
    } else if (!isLoading && user) {
      router.push("/");
    }
  }, [isLoading, user, session, register, router]);

  if (isLoading || isRegistering) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Setting up your account</h1>
          <p>Please wait while we get everything ready...</p>
        </div>
      </div>
    );
  }

  return null;
}

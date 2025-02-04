"use client";

import useFindUserByEmail from "@/hooks/useFindUserByEmail";
import { apiClient } from "@/lib/apiClient";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";

export default function RegisterProviderPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { userExists, loading } = useFindUserByEmail(
    session?.user?.email as string
  );

  const register = async () => {
    if (!session?.user?.email) {
      console.error("No session email found");
      return;
    }

    if (userExists && !loading) {
      router.push("/");
      return;
    }

    try {
      const res = await apiClient.post("api/user/register", {
        email: session.user.email,
        username: session.user.name || "",
        provider: "google",
      });

      if (res.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error in POST /user/register:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      register();
    }
  }, [session, userExists, loading]);

  return (
    <div>
      Registering provider: {userExists ? "User exists" : "User does not exist"}{" "}
      {loading ? "Loading..." : "Not loading"}
    </div>
  );
}

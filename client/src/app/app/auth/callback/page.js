"use client";

import { Heading, Spinner } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Callback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionToken = searchParams.get("sessionToken");

  useEffect(() => {
    localStorage.setItem("x-session-token", sessionToken);
    router.push("/dashboard");
  }, []);

  return (
    <div className="flex items-center flex-col gap-4 justify-center w-full h-screen bg-white">
      <Spinner />
      <Heading>Please wait. Authenticating you and redirecting....</Heading>
    </div>
  );
};

export default Callback;

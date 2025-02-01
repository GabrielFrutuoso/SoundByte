import React from "react";

export const FormField = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2 w-full">{children}</div>;
};

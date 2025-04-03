import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");
  return (
    <main className="max-w-7xl w-full mx-auto">
      <div className="flex h-screen items-center max-w-md w-full mx-auto">
        <Card className="w-full p-3">
          <div className="flex justify-center">
            <h1>myCampusHome</h1>
          </div>
          <div>{children}</div>
        </Card>
      </div>
    </main>
  );
};

export default layout;

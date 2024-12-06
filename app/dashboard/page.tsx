import React from "react";
import { requireUser } from "../utils/hooks";

const page = async () => {
  const session = await requireUser();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <h1>Dashboard</h1>
      
    </div>
  );
};

export default page;

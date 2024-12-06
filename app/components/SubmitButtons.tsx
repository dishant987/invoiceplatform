"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/Spinner";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text?: string;
}

export function SubmitButton({ text = "Submit" }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Spinner className=" text-white " /> Loading...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

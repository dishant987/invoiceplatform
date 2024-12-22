"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/Spinner";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text?: string;
  className?: string;
}

export function SubmitButton({
  text = "Submit",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className={`flex justify-center items-center ${className}`}
        >
          <Spinner className=" text-white " />{" "}
          <span className="mt-[2.3px]">Loading...</span>
        </Button>
      ) : (
        <Button className={`w-full ${className}`} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

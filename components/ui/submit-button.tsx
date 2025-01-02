import React from "react";
import { Button, ButtonProps } from "./button";
import { Loader2 } from 'lucide-react';
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
//   isPending = false,
  ...props
}) => {
    const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || ""}
    </Button>
  );
};

export default SubmitButton;


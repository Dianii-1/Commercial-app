"use client";
import { Button, ButtonProps } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LinkButtonProps extends ButtonProps {
  href: string;
  children: ReactNode;
}

export const LinkButton = ({ children, href, ...props }: LinkButtonProps) => {
  const route = useRouter();
  return (
    <Button {...props} onClick={() => route.push(href)}>
      {children}
    </Button>
  );
};

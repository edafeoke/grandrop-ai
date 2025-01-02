import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import ChatbotNav from "@/components/ui/chatbot-nav";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const Layout = async ({ children, params }: Props) => {
  const { id } = await params;
  return (
    <>
      {children}
    </>
  );
};

export default Layout;

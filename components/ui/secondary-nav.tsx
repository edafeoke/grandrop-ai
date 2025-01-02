"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  links: {
    label: string;
    href: string;
  }[];
};

const SecondaryNav = (props: Props) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="border-b">
      <div className="container px-4">
        <div className="flex h-14 items-center space-x-4">
          {props.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-4 text-sm font-medium ${
                pathname === link.href
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SecondaryNav;

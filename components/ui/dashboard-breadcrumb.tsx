"use client";

import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
} from "./breadcrumb";
import { usePathname } from "next/navigation";
import { capitalize } from "remeda";

const DashboardBreadCrumb = () => {
  const pathname = usePathname().split("/").slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathname.map((path: string, index: number) => {
          const link = '/' + pathname.slice(0, index + 1).join('/');
          const isLast = index === pathname.length - 1;
          return (
            <Fragment key={index.toString()}>
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <span>{capitalize(path)}</span>
                ) : (
                  <BreadcrumbLink href={link}>{capitalize(path)}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadCrumb;


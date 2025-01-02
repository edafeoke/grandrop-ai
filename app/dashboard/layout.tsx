import { getChatbotsByUserID } from "@/actions/chatbot";
import { auth } from "@/auth";
import { AppSidebar } from "@/components/ui/app-sidebar";
import DashboardBreadCrumb from "@/components/ui/dashboard-breadcrumb";
import { LoginForm } from "@/components/ui/login-form";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { ReactNode, use } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};
export default function Page({ children }: DashboardLayoutProps) {
  const session = use(auth());
  const chatbots = use(getChatbotsByUserID(session?.user?.id || session?.user?.email || ""));

  // if (!session) {
  //   return (
  //     <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
  //       <LoginForm />
  //     </div>
  //   );
  // }

  return (
    <SidebarProvider>
      <AppSidebar chatbots={chatbots} session={session} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between pr-4 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardBreadCrumb />
          </div>
          <ThemeSwitch />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

import { redirect } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
  redirect("/dashboard/chatbots");
  return <div className="flex flex-1 flex-col gap-4 p-4 pt-0"></div>;
};

export default Page;

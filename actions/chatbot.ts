"use server";

import { auth } from "@/auth";
import { prisma } from "@/db";
import { devLog } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getCollection, getVectorStore } from "./indexing";

export const createChatbot = async (prevState: any, formData: FormData) => {
  devLog("Creating new chatbot");
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      throw "Not authenticated!";
    }
    const title: string = formData.get("title") as string;
    const description: string = formData.get("description") as string;
    const userID = user.id || user.email;

    devLog("Creating new chatbot", title, description, userID);
    if (!title || !description || !userID) {
      return {
        message: "Missing required fields",
        success: false,
      };
    }

    const res = await prisma.chatBot.create({
      data: {
        title,
        description,
        userID,
      },
    });

    devLog("Function: createChatbot\nResult:\n", JSON.stringify(res, null, 2));
    revalidatePath("/dashboard");
    return {
      message: "Chatbot created successfully",
      success: true,
    };
  } catch (e: any) {
    return {
      message: e.message,
      success: false,
    };
  }
};

export const getChatbots = async () => {
  const res = await prisma.chatBot.findMany();
  devLog("Function: getChatbots\nResult:\n", JSON.stringify(res, null, 2));
  return res;
};

export const getChatbotsByUserID = async (userID: string) => {
  const res = await prisma.chatBot.findMany({
    where: {
      userID: userID,
    },
  });
  devLog(
    "Function: getChatbotsByUserID\nResult:\n",
    JSON.stringify(res, null, 2)
  );
  return res;
};

export const deleteChatbot = async (chatbotID: string) => {
    const collection = await getCollection(`vector_store_${chatbotID}`);
    
  const res = await prisma.chatBot.delete({
    where: {
      id: chatbotID,
    },
  });

  await collection.dropIndexes();
  await collection.drop();
  devLog("Function: deleteChatbot\nResult:\n", JSON.stringify(res, null, 2));
  revalidatePath("/dashboard");
  return {
    message: "Chatbot deleted successfully",
    success: true,
  };
}
    

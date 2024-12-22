"use server";

import "cheerio";
import { SelectorType } from "cheerio";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

export async function loadDocumentsFromUrl(
  url: string,
  selector?: SelectorType
) {
  const cheerioLoader = new CheerioWebBaseLoader(url, {
    selector,
  });
  try {
    const docs = await cheerioLoader.load();
    console.assert(docs.length === 1);
    console.log(`Total characters: ${docs[0].pageContent.length}`);
    return docs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loadDocumentsFromPDF(uri: string) {
  try {
    const loader = new PDFLoader(uri);
    const docs = await loader.load();
    return docs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function splitDocuments(docs: Document<Record<string, any>>[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const allSplits = await splitter.splitDocuments(docs);
  console.log(`Split blog post into ${allSplits.length} sub-documents.`);
  return allSplits;
}

export async function addDocumentsToVectorStore(
  docs: Document<Record<string, any>>[]
) {
  const embeddingsModel = new OpenAIEmbeddings();
  const vectorStore = new MemoryVectorStore(embeddingsModel);
  await vectorStore.addDocuments(docs);
  return vectorStore;
}

"use server";

import "cheerio";
import { SelectorType } from "cheerio";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { FileUploadAction } from "@/types";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-ada-002",
});

export const getCollection = async (collectionName: string) => {
  const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");

  const db = await client.db(process.env.MONGODB_ATLAS_DB_NAME);
  let collection = await db.collection(collectionName);
  return collection;
};

export const getVectorStore = async (collectionName: string) => {
  const vectorStore = new Chroma(embeddings, {
    collectionName,
    url: "http://localhost:8000", // Optional, will default to this value
    collectionMetadata: {
      "hnsw:space": "cosine",
    }, // Optional, can be used to specify the distance method of the embedding space https://docs.trychroma.com/usage-guide#changing-the-distance-function
  });

  return vectorStore;
};
// export const getVectorStore = async (collectionName: string) => {
//   let collection = await getCollection(collectionName);

//   if (collection) {
//     return new MongoDBAtlasVectorSearch(embeddings, {
//       collection: collection,
//       indexName: "vector_index", // The name of the Atlas search index. Defaults to "default"
//       textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
//       embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
//     });
//   } else {
//     const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");

//     const db = await client.db(process.env.MONGODB_ATLAS_DB_NAME);
//     let collection = await db.collection(collectionName);
//     collection = await client
//       .db(process.env.MONGODB_ATLAS_DB_NAME)
//       .createCollection(collectionName);

//     const vectorSearchIdx = {
//       name: "vector_index",
//       type: "vectorSearch",
//       definition: {
//         fields: [
//           {
//             type: "vector",
//             numDimensions: 1536,
//             path: "embedding",
//             similarity: "euclidean",
//           },
//         ],
//       },
//     };

//     await collection.createSearchIndex(vectorSearchIdx);

//     return new MongoDBAtlasVectorSearch(embeddings, {
//       collection: collection,
//       indexName: "vector_index", // The name of the Atlas search index. Defaults to "default"
//       textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
//       embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
//     });
//   }
// };

export async function fileUpload(
  prevStatte: FileUploadAction,
  formData: FormData
) {
  try {
    const files = Array.from(formData.values()) as unknown as File[];
    const documents = await loadDocumentsFromPDF(files as File[]);

    return {
      success: true,
      message: "File uploaded successfully",
      data: JSON.stringify(documents),
      status: 200,
    };
  } catch (e: any) {
    throw {
      success: false,
      message: e.message || "Something went wrong",
      data: "",
      status: 500,
    };
  }
}
export async function loadDocumentsFromPDF(files: File[]) {
  const documents = files.map(async (file) => {
    const loader = new PDFLoader(file);
    const docs = await loader.load();
    return docs;
  });
  const docsArray = await Promise.all(documents);
  console.log(docsArray);
  const splittedDocuments = await splitDocuments(docsArray.flat());
  return JSON.stringify(splittedDocuments);
}

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

// export async function loadDocumentsFromPDF(uris: string[]) {
//   try {
//     const docs = uris.map(async (uri) => {
//       const loader = new PDFLoader(uri);
//       const doc = await loader.load();
//       return doc;
//     });
//     const docsArray = await Promise.all(docs);
//     return docsArray;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

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
  docs: Document<Record<string, any>>[],
  chatBotID?: string
) {
  const collectionName = `vector_store_${chatBotID}`;
  try {
    const vectorStore = await getVectorStore(collectionName);
    await vectorStore.addDocuments(docs);
    return { message: "Documents added successfully." };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

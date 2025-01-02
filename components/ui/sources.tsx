"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, {
  SetStateAction,
  Dispatch,
  useActionState,
  useEffect,
} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast, Toaster } from "sonner";
import FileList from "@/components/ui/file-list";
import FileUpload from "@/components/ui/file-upload";
import {
  addDocumentsToVectorStore,
  fileUpload,
  loadDocumentsFromPDF,
} from "@/actions/indexing";
import { Document } from "@langchain/core/documents";

type Props = {
  chatBotID: string;
};

const Sources = (props: Props) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [totalCharacters, setTotalCharacters] = React.useState(0);
  const [documents, setDocuments] = React.useState<Document[]>([]);

  useEffect(() => {
    const getDocs = async () => {
      const docsString = await loadDocumentsFromPDF(files);
      const docs = JSON.parse(docsString);
      setTotalCharacters(
        docs.reduce(
          (acc: number, doc: Document) => acc + doc.pageContent.length,
          0
        )
      );
      setDocuments(docs);
      return docs;
    };
    toast.promise(getDocs(), {
      loading: "Uploading files",
      success: (data) => {
        console.log(data);
        return "Files uploaded successfully";
      },
      error: (e) => {
        console.log(e);
        return "Something went wrong";
      },
    });
  }, [files]);

  const handleFilesSelected = (files: File[]) => {
    setFiles(files);
  };

  const handleTrainBot = async () => {
    toast.promise(addDocumentsToVectorStore(documents, props.chatBotID), {
      loading: "Training chatbot",
      success: "Chatbot trained successfully",
      error: "Something went wrong",
    });
  };

  return (
    <div className="flex flex-1 gap-4 p-4">
      <Tabs defaultValue="file" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file">Files</TabsTrigger>
          <TabsTrigger disabled value="website">Websites</TabsTrigger>
        </TabsList>
        <TabsContent value="file">
          <div className="p-4">
            <FileUpload onFilesSelected={handleFilesSelected} />
            {files.length > 0 && (
              <>
                <p className="text-sm text-muted-foreground">Selected files:</p>
                <FileList files={files} setFiles={setFiles} />
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="website">
          <Card>
            <CardHeader>
              <CardTitle>Website</CardTitle>
              <CardDescription>
                Change your website here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current website</Label>
                <Input id="current" type="website" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New website</Label>
                <Input id="new" type="website" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save website</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="px-4 h-full">
        <Card>
          <CardHeader>
            <CardTitle>Sources</CardTitle>
            <CardDescription>Total detected characters</CardDescription>
          </CardHeader>
          <CardContent>
            {totalCharacters} / 400,000 limit
            <Button className="mt-4" onClick={handleTrainBot} type="submit">
              Train Chatbot
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sources;

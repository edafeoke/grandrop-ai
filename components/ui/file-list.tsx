import { FileSpreadsheet, FileText } from "lucide-react";
import React from "react";
import { FilePreview } from "./file-preview";

type Props = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const FileList = ({ files, setFiles }: Props) => {
  return (
    <ul className="p-2 rounded-md flex flex-col gap-2 mt-2 list-inside text-sm text-muted-foreground max-h-[8rem] bg-gray-100 overflow-y-auto">
      {files.map((file, index) => (
        <li key={index} className="flex flex-row items-center gap-2">
            <FileText size={12}/>
          {file.name}
          <button className="ml-2 text-red-500" onClick={() => setFiles(files.filter((_, i) => i !== index))}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;

"use client";

import { useState, useCallback } from "react";
import { Cloud, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocumentUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
    }
  }, []);

  const onClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFile(file);
      }
    };
    input.click();
  }, []);

  return (
    <div
      className={cn(
        "relative w-full max-w-md px-8 py-4 rounded-lg border-2 border-dashed ",
        "transition-colors duration-200 ease-in-out cursor-pointer border-primario",
        "hover:bg-purple-50/5",
        isDragging ? "border-purple-500 bg-purple-50/10" : "border-gray-600"
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        {file ? (
          <Upload className="w-12 h-12 text-purple-500" />
        ) : (
          <Cloud className="w-12 h-12 text-purple-500" />
        )}
        <div className="space-y-2">
          <p className="text-purple-500">
            Sube una foto clara de la parte delantera de tu documento.
          </p>
          <p className="text-sm text-gray-400">
            Arrastre o haga click aquí para subir los archivos
          </p>
        </div>
        {file && (
          <p className="text-sm text-purple-500">
            Archivo seleccionado: {file.name}
          </p>
        )}
      </div>
    </div>
  );
}

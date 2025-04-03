"use client";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Authentication problem: ${error.message}`);
    }
    throw new Error("Authentication problem: Unknown error occurred");
  }
};

const ImageUpload = ({ onFileChange }: any) => {
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error);
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image upload successfull");
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <Button
        className="text-primary"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          if (IKUploadRef.current) {
            IKUploadRef.current?.click();
          }
        }}
      >
        <Upload /> Upload Image
      </Button>
      <p>Upload your profile photo</p>
      {file && <p className="">{file.filePath}</p>}
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={200}
          height={200}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;

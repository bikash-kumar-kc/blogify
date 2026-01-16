import { Button, Heading, Text, Box } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "../utilities/utilFun";

const FileUploader = ({ name, fieldChange, mediaUrl }) => {
  const [fileinput, setFileInput] = useState();
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (files) => {
      const file = files[0];
      if (!file) return;
      setFileInput(file);
      setFileUrl(convertFileToUrl(file));
      fieldChange(files);
    },

    [fileinput]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    maxFiles: 1,
    onDrop,
  });

  return (
    <>
      <Box
        {...getRootProps()}
        width={"100%"}
        className="rounded-2xl"
        transition={"0.5s"}
        _focus={{
          boxShadow: "0 0  10px #22c55e",
          borderColor: "#22c55e",
          outline: "none",
        }}
        bg="#171717"
        textAlign="center"
        cursor="pointer"
        display={"flex"}
        flexDir={"column"}
        gap={"0.5rem"}
      >
        <input {...getInputProps()} name={name} className="cursor-pointer" />

        {fileUrl ? (
          <>
            <Box
              as="div"
              p={1}
              width="100%"
              className="flex  flex-1 justify-center w-full"
            >
              <img
                src={fileUrl}
                className="rounded-t-2xl"
                width="100%"
                alt="image"
              />
            </Box>
            {/* < Text as="p"> Click or drag photo to replace</Text> */}
          </>
        ) : (
          <Box
            as="div"
            p={6}
            className="flex flex-col flex-1 gap-4 justify-center items-center "
          >
            <img
              // src="/public/icons/file-upload.svg"
              src="/icons/file-upload.svg"
              alt="fileupload"
              width={96}
              height={77}
            />
            <Box as="div" display={"flex"} flexDir={"column"} gap={1}>
              <Heading fontSize={"1rem"} color={"#a1a1aa"}>
                Drag photo here
              </Heading>
              <Text as="p" fontSize={"10px"} color={"#52525b"}>
                SVG,PNG,JPG
              </Text>
            </Box>
            <Button color={"#a1a1aa"} bg={"#3f3f46"}>
              Select from computer
            </Button>
          </Box>
        )}

        {fileUrl ? (
          <Text fontSize={"1rem"} color={"#a1a1aa"}>
            Drop your image…
          </Text>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default FileUploader;

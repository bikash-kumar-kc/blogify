import { useRef, useState } from "react";
import {
  Box,
  IconButton,
  Input,
  VStack,
  Image,
} from "@chakra-ui/react";
import { Camera, X } from "lucide-react";
import { convertFileToUrl } from "../utilities/utilFun";

export const ProfileImageUpload = ({ currentImage, onImageChange,imageError }) => {
  const inputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dummyImageUrl, setDummyImageUr] = useState(currentImage);

  const handleFileSelect = (fileInfo) => {
    const url = convertFileToUrl(fileInfo);
    setDummyImageUr(url);
    onImageChange(fileInfo)
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <VStack gap={4} minW={{ base: "full", md: "140px" }}>
      <Box
        position="relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
        borderRadius="full"
        p={1}
        bg={isDragOver ? "brand.500" : "transparent"}
        transition="all 0.2s"
        _hover={{ transform: "scale(1.02)" }}
      >
        <Box w="120px" h="120px"  bg="gray.700" borderRadius="full" overflow="hidden">
          <Image src={dummyImageUrl} name="Profile" w="100%" h="100%" objectFit="cover" />
        </Box>
        <IconButton
          aria-label="Upload photo"
          size="sm"
          position="absolute"
          bottom={1}
          right={1}
          borderRadius="full"
          bg="brand.500"
          color="white"
          _hover={{ bg: "brand.600" }}
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          <Camera size={18} />
        </IconButton>
      </Box>
      <p className="text-red-500">{imageError}</p>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        display="none"
      />
    </VStack>
  );
};

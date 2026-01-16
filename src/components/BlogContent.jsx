import { motion } from "framer-motion";
import { Clock, Eye } from "lucide-react";
import {
  Box,
  Heading,
  Text,
  HStack,
  Image,
  Flex,
  Blockquote,
} from "@chakra-ui/react";
import DOMPurify from "dompurify";

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionFlex = motion.create(Flex);

const BlogContent = ({ post }) => {
  return (
    <MotionBox
      as="article"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      py="8"
    >
      {/* Cover Image */}
      <MotionBox
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        position="relative"
        aspectRatio="16/9"
        width="full"
        overflow="hidden"
        borderRadius="2xl"
        mb="10"
      >
        <Image
          src={post.coverImage || "/images/image1.jpg"}
          alt={post.title}
          loading="lazy"
          width="full"
          height="full"
          objectFit="cover"
        />
        <Box
          position="absolute"
          inset="0"
          bgGradient="to-t"
          gradientFrom="bg.default/80"
          gradientVia="transparent"
          gradientTo="transparent"
        />
      </MotionBox>

      {/* Title */}
      <MotionHeading
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        color={"white"}
        transition={{ duration: 0.5, delay: 0.3 }}
        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
        fontWeight="bold"
        letterSpacing="tight"
        mb="6"
        lineHeight={{ base: "1.3", md: "1.25", lg: "1.2" }}
      >
        {post.title}
      </MotionHeading>

      {/* Meta Info */}
      <MotionFlex
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        wrap="wrap"
        align="center"
        gap="6"
        color="fg.muted"
        mb="6"
      >
        <HStack gap="2">
          <Clock size={16} />
          <Text fontSize="sm">{post.readingTime} min read</Text>
        </HStack>
        <HStack gap="2">
          <Eye size={16} />
          <Text fontSize="sm">{post.views.toLocaleString()} views</Text>
        </HStack>
      </MotionFlex>

      {/* Excerpt */}
      <MotionText
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        fontSize="xl"
        color="fg.muted"
        lineHeight="relaxed"
        mb="8"
        fontFamily="serif"
        fontStyle="italic"
      >
        <Blockquote.Root colorPalette={"blue"}>
          <Blockquote.Content>{post?.excerpt}</Blockquote.Content>
        </Blockquote.Root>
      </MotionText>

      {/* Tags */}
      <MotionFlex
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        wrap="wrap"
        gap="2"
        mb="10"
      >
        {post.tags.map((tag, index) => (
          <MotionBox
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
            px="3"
            py="1.5"
            bg="blue.500"
            color="white"
            fontSize="sm"
            fontWeight="medium"
            borderRadius="full"
            _hover={{
              bg: "bg.subtle",
              borderColor: "blue.500",
              color: "blue.500",
            }}
            cursor="pointer"
          >
            #{tag}
          </MotionBox>
        ))}
      </MotionFlex>

      {/* Divider */}
      <Box w="full" h="1px" bg="white" opacity={0.6} mb={10} />

      {/* Content */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        fontSize="lg"
        lineHeight="relaxed"
        color="white"
        css={{
          "& h2": {
            fontSize: "2xl",
            fontWeight: "bold",
            marginTop: "8",
            marginBottom: "4",
          },
          "& h3": {
            fontSize: "xl",
            fontWeight: "semibold",
            marginTop: "6",
            marginBottom: "3",
          },
          "& p": {
            marginBottom: "4",
          },
          "& a": {
            color: "var(--chakra-colors-blue-500)",
            textDecoration: "underline",
          },
          "& ul, & ol": {
            marginLeft: "6",
            marginBottom: "4",
          },
          "& code": {
            backgroundColor: "var(--chakra-colors-bg-muted)",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.875rem",
          },
          "& pre": {
            backgroundColor: "var(--chakra-colors-bg-muted)",
            padding: "4",
            borderRadius: "lg",
            overflow: "auto",
            marginBottom: "4",
          },
          "& blockquote": {
            borderLeft: "4px solid",
            borderColor: "var(--chakra-colors-border-default)",
            paddingLeft: "4",
            fontStyle: "italic",
            marginBottom: "4",
          },
          "& img": {
            borderRadius: "lg",
            marginBottom: "4",
          },
        }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.content) }}
      />
    </MotionBox>
  );
};

export default BlogContent;

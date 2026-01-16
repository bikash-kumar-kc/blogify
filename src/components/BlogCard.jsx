import { Box, Flex, Avatar, Text, Image, Button } from "@chakra-ui/react";
import { Bookmark, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  getCapitalizedInitials,
  multiFormatDateString,
} from "../utilities/utilFun";
import { Link } from "react-router";
import { PostQuery } from "../lib/tanstack_query/post";
import Loader from "./Loader";

const MotionBox = motion(Box);
const MotionIcon = motion(ArrowRight);
const MotionButton = motion.create("button");

const BlogCard = ({
  author,
  title,
  excerpt,
  slug,
  coverImage,
  createdAt,
  index,
  _id,
  savedCollection,
  user,
  isPublished,
  explore,
  setSavedPostIds,
}) => {
  const { mutateAsync: toogleBookMark } = PostQuery.useTogglePostBookmark();

  const { mutateAsync: publishedToDraft } = PostQuery.usePublishedToDraft();
  const { mutateAsync: draftToPublished , isPending:draftingAPost} = PostQuery.useDraftToPublished();

  const handleToggleBookMark = async () => {
    const saveToggle = await toogleBookMark({ postId: _id });
    if (!saveToggle) {
      console.log("problem in saving/unsaving post:: ");
      return;
    }

    if (saveToggle.data.bookmarked) {
      setSavedPostIds((prevs) => {
        const newSet = new Set();
        newSet.add(_id);
        return newSet;
      });
    } else {
      setSavedPostIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(_id);
        return newSet;
      });
    }
    return;
  };

  const handleShiftingPost = async () => {
    try {
      if (isPublished) {
        await publishedToDraft({ postId: _id });
      } else {
        await draftToPublished({ postId: _id });
      }
    } catch (error) {}
  };

  const buttonStyles = {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.5rem 0.75rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#94a3b8",
  };

  const activeButtonStyles = {
    ...buttonStyles,
    background: "rgba(var(--chakra-colors-blue-500), 0.2)",
  };
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      bg="#171717"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="#262626"
      _hover={{ borderColor: "#404040", transform: "translateY(-2px)" }}
      transitionProperty="all"
      transitionDuration="0.3s"
    >
      {/* Cover Image */}
      {coverImage && (
        <Image
          src={coverImage}
          alt={title}
          w="100%"
          h="200px"
          objectFit="cover"
          overflow={"hidden"}
          transition={"1s"}
          _hover={{
            transform: "scale(1.1)",
          }}
        />
      )}

      <Box p={5}>
        {/* Author Info */}
        <Flex align="center" gap={3} mb={4}>
          <Avatar.Root size="sm">
          
              <Avatar.Image src={author?.avatar} alt={author?.userName} />
          
            <Avatar.Fallback>
              {getCapitalizedInitials(author?.name)}
            </Avatar.Fallback>
          </Avatar.Root>
          <Box>
            <Text fontSize="md" fontWeight="bold" color="#f5f5f5">
              @{author?.userName}
            </Text>
            <Text fontSize="xs" color="#737373">
              {multiFormatDateString(createdAt)}
            </Text>
          </Box>
        </Flex>

        {/* Content */}
        <Text fontSize="xl" fontWeight="bold" color="#f5f5f5" mb={2}>
          {title} ?
        </Text>
        <Text
          fontSize="sm"
          color="#a3a3a3"
          transition={"0.5s"}
          _hover={{
            color: "#e5e5e5",
          }}
          lineClamp={2}
          mb={4}
        >
          {excerpt}
        </Text>

        {/* Actions */}
        <Flex justify="space-between" align="center">
          <Link to={`/blog-post/${slug}`}>
            <Button
              variant="ghost"
              size="sm"
              color="#a3a3a3"
              _hover={{ color: "#f5f5f5", bg: "#16a34a" }}
            >
              Read More
              <MotionIcon
                size={16}
                style={{ marginLeft: 8 }}
                whileHover={{ scaleX: 1.1 }}
                transition={{ duration: 0.25 }}
              />
            </Button>
          </Link>
          {/* Save Button */}

          {user && (
            <Button
              variant="ghost"
              size="sm"
              color="#a3a3a3"
              _hover={{
                color: "#f5f5f5",
                bg: !isPublished ? "#16a34a" : "#be123c",
              }}
              border={"1px solid gray"}
              onClick={handleShiftingPost}
            >
              {draftingAPost ? (
                <Box>
                  <Loader />
                </Box>
              ) : isPublished ? (
                "Draft"
              ) : (
                "Published"
              )}
            </Button>
          )}

          {!user && (
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleBookMark}
              style={
                savedCollection?.has(_id) ? activeButtonStyles : buttonStyles
              }
            >
              {!explore && (
                <Bookmark
                  size={20}
                  fill={savedCollection?.has(_id) ? "currentColor" : "none"}
                  color={savedCollection?.has(_id) ? "#3182ce" : "currentColor"}
                  style={{ transition: "all 0.2s" }}
                />
              )}
            </MotionButton>
          )}
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default BlogCard;

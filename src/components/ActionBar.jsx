import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bookmark, MessageCircle, Share2 } from "lucide-react";
import { Box, HStack, Text } from "@chakra-ui/react";

const MotionBox = motion.create(Box);
const MotionButton = motion.create("button");

const ActionBar = ({
  initialLikes,
  isLiked,
  isReacting,
  initialComments,
  onCommentClick,
  handleReaction,
  saved,
  handleSave,
}) => {
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
      transition={{ duration: 0.5, delay: 0.8 }}
      position="sticky"
      bottom={{
        base: "5rem",
        md: "6",
      }}
      zIndex="40"
      display="flex"
      justifyContent="center"
      mt="12"
    >
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        borderRadius="full"
        px="2"
        py="2"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        border="1px solid"
        borderColor="whiteAlpha.200"
      >
        <HStack gap="1">
          {/* Like Button */}
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReaction}
            style={isLiked ? activeButtonStyles : buttonStyles}
            disabled={isReacting}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isLiked ? "liked" : "not-liked"}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Heart
                  size={30}
                  fill={isLiked ? "#e11d48" : "none"}
                  color={isLiked ? "none" : "currentColor"}
                  style={{ transition: "all 0.2s", border: "none" }}
                />
              </motion.div>
            </AnimatePresence>
            <Text fontSize="sm" fontWeight="medium">
              {initialLikes}
            </Text>
          </MotionButton>

          {/* Comment Button */}
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCommentClick}
            style={buttonStyles}
          >
            <MessageCircle size={20} />
            <Text fontSize="sm" fontWeight="medium">
              {initialComments}
            </Text>
          </MotionButton>

          {/* Save Button */}
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            style={saved ? activeButtonStyles : buttonStyles}
          >
            <Bookmark
              size={20}
              fill={saved ? "currentColor" : "none"}
              color={saved ? "#3182ce" : "currentColor"}
              style={{ transition: "all 0.2s" }}
            />
          </MotionButton>

          {/* Share Button */}
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            // onClick={handleShare}
            style={buttonStyles}
          >
            <Share2 size={20} />
          </MotionButton>
        </HStack>
      </Box>
    </MotionBox>
  );
};

export default ActionBar;

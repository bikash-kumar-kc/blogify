import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { getCapitalizedInitials } from "../utilities/utilFun";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";
import { useAuthContext } from "../context/AuthContext";

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

const CommentsModal = ({
  isOpen,
  onClose,
  comments,
  isLoggedIn = true,
  onSubmitComment,
  nextPage,
  fetchingNextPage,
}) => {
  const [newComment, setNewComment] = useState("");
  const { ref, inView } = useInView();
 const {user}=useAuthContext()

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && onSubmitComment) {
      onSubmitComment(newComment.trim());
      setNewComment("");
    }
  };

  useEffect(() => {
    if (inView) {
      fetchingNextPage();
    }
  }, [inView]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            position="fixed"
            inset="0"
            bg="blackAlpha.600"
            backdropFilter="blur(4px)"
            zIndex="50"
          />

          {/* Modal */}
          <MotionBox
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            position="fixed"
            right="0"
            top="0"
            height="full"
            width="full"
            maxW="md"
            bg="#09090b"
            borderColor="border.default"
            zIndex="50"
            display="flex"
            flexDirection="column"
            color="white"
          >
            {/* Header */}
            <Flex
              align="center"
              justify="space-between"
              p="6"
              borderBottom="1px solid grey"
            >
              <Heading size="lg">Comments ({comments?.length})</Heading>
              <MotionButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                variant="ghost"
                size="sm"
                p="2"
                borderRadius="full"
              >
                <X size={20} />
              </MotionButton>
            </Flex>

            {/* Comments List */}
            <Box flex="1" overflowY="auto" p="6">
              <VStack gap="6" align="stretch">
                {comments.length === 0 ? (
                  <Box textAlign="center" py="12" color="fg.muted">
                    <Text>No comments yet</Text>
                    <Text fontSize="sm" mt="1">
                      Be the first to share your thoughts!
                    </Text>
                  </Box>
                ) : (
                  comments.map((comment, index) => (
                    <MotionBox
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Flex gap="3">
                        <Avatar.Root>
                          <Avatar.Fallback>
                            {getCapitalizedInitials(comment?.author?.name)}
                          </Avatar.Fallback>
                          <Avatar.Image
                            src={
                              comment?.author?.avatar || "/images/image1.jpg"
                            }
                          />
                        </Avatar.Root>
                        <Box flex="1" minW="0">
                          <Flex align="center" gap="2" mb="1" flexWrap="wrap">
                            <Text fontWeight="medium" fontSize="sm">
                              {comment?.author?.name}
                            </Text>
                            <Text fontSize="xs" color="fg.muted">
                              @{comment?.author?.userName}
                            </Text>
                            <Text fontSize="xs" color="fg.muted">
                              · {getRelativeTime(comment?.createdAt)}
                            </Text>
                          </Flex>
                          <Text
                            fontSize="sm"
                            color="gray.500"
                            lineHeight="relaxed"
                          >
                            {comment?.comment}
                          </Text>
                        </Box>
                      </Flex>
                    </MotionBox>
                  ))
                )}
              </VStack>
              <MotionBox >
                {nextPage && (
                  <>
                    <div ref={ref} className="flex justify-center items-center min-h-screen">
                      <Loader />
                    </div>
                  </>
                )}
              </MotionBox>
            </Box>

            {/* Comment Input */}
            {isLoggedIn ? (
              <Box
                as="form"
                onSubmit={handleSubmit}
                p="6"
                borderTop="1px solid gray"
              >
                <Flex gap="3">
                  <Avatar.Root>
                    <Avatar.Fallback name={user?.userName} />
                    <Avatar.Image src={user?.userAvatar} />
                  </Avatar.Root>
                  <Flex flex="1" gap="2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      flex="1"
                      border="none"
                      borderRadius="full"
                      px="4"
                      py="2"
                      fontSize="sm"
                      _placeholder={{ color: "fg.muted" }}
                      _focus={{
                        outline: "none",
                        ring: "2px",
                        ringColor: "blue.500",
                      }}
                    />
                    <MotionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={!newComment.trim()}
                      p="2"
                      borderRadius="full"
                      bg="blue.500"
                      color="white"
                      _disabled={{
                        opacity: 0.5,
                        cursor: "not-allowed",
                      }}
                      _hover={{
                        bg: "blue.600",
                      }}
                    >
                      <Send size={20} />
                    </MotionButton>
                  </Flex>
                </Flex>
              </Box>
            ) : (
              <Box
                p="6"
                borderTop="1px solid"
                borderColor="border.default"
                textAlign="center"
              >
                <Text color="fg.muted" fontSize="sm">
                  <Text
                    as="span"
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Sign in
                  </Text>{" "}
                  to leave a comment
                </Text>
              </Box>
            )}
          </MotionBox>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommentsModal;

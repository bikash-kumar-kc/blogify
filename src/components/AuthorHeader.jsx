import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, Box, Flex, HStack, Text, Button } from "@chakra-ui/react";
import { multiFormatDateString } from "../utilities/utilFun";
import { PostQuery } from "../lib/tanstack_query/post";

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);
const MotionDiv = motion.create("div");

const AuthorHeader = ({
  author,
  publishedAt,
  isCurrentUser = true,
  onEdit,
  onDelete,
  isDeleting,
  status,
    postId,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [stateStatus,setStateStatus]=useState(status)

  // SHIFTED POSTS...
  const{mutateAsync:publishedToDraft}=PostQuery.usePublishedToDraft();
const {mutateAsync:draftToPublished}=PostQuery.useDraftToPublished();

 const handleShiftingPost = async () => {

  try {
    if (stateStatus==="published") {
      
       await publishedToDraft({ postId: postId });
      setStateStatus("draft")
    } else {
     
      await draftToPublished({ postId: postId });
      setStateStatus("published")
    }
  } catch (error) {
    console.error('❌ ERROR:', error);
    console.error('   Error response:', error.response?.data);
  }
  

};


  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      py="6"
      borderBottom="1px solid"
      borderColor="border.default"
    >
      <Flex justify="space-between" align="center">
        <HStack gap="4">
          <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Avatar.Root
              size="lg"
              cursor="pointer"
              ring="2px"
              ringColor="transparent"
              _hover={{ ringColor: "blue.500" }}
              transition="all 0.2s"
            >
              <Avatar.Fallback name={author.name} />
              <Avatar.Image src="/images/image1.jpg" />
            </Avatar.Root>
          </MotionDiv>

          <Flex direction="column">
            <HStack gap="2" align="center">
              <Text
                fontWeight="semibold"
                color="white"
                cursor="pointer"
                _hover={{ color: "blue.500" }}
                transition="colors 0.2s"
              >
                {author.name || "Bikash Kumar KC"}
              </Text>

              {!isCurrentUser && (
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => setIsFollowing(!isFollowing)}
                  size="xs"
                  variant={isFollowing ? "outline" : "solid"}
                  color={isFollowing ? "blue.500" : "white"}
                  px="3"
                  py="1"
                  fontSize="xs"
                  fontWeight="medium"
                  borderRadius="full"
                  _hover={{
                    bg: isFollowing ? "red.500/10" : "blue.600",
                    borderColor: isFollowing ? "red.500" : "blue.600",
                    color: isFollowing ? "red.500" : "white",
                  }}
                  transition="all 0.2s"
                >
                  {isFollowing
                    ? isHovering
                      ? "Unfollow"
                      : "Following"
                    : "Follow"}
                </MotionButton>
              )}
            </HStack>

            <Text fontSize="sm" color="fg.muted" mt="0.2rem">
              @{author.userName} · {multiFormatDateString(publishedAt)}
            </Text>
          </Flex>
        </HStack>

        {isCurrentUser && (
          <HStack gap="2">
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              size="sm"
              colorPalette="gray"
              px="4"
              py="2"
              fontSize="sm"
              fontWeight="medium"
              _hover={{ bg: "bg.subtle", color: "black" }}
              transition="all 0.2s"
            >
              Edit
            </MotionButton>

            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              variant="ghost"
              size="sm"
              colorPalette="red"
              px="4"
              py="2"
              fontSize="sm"
              fontWeight="medium"
              _hover={{
                bg: "red.500/10",
                color: "red.500",
              }}
              transition="all 0.2s"
              disabled={isDeleting}
            >
              Delete
            </MotionButton>

            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="ghost"
              size="sm"
              colorPalette={stateStatus==="draft" ? "green":"red"}
              px="4"
              py="2"
              fontSize="sm"
              fontWeight="medium"
              _hover={{
                bg: "red.500/10",
                color: stateStatus==="draft" ? "green.500":"red.500",
              }}
              transition="all 0.2s"
              onClick={handleShiftingPost}
              
            >
              {stateStatus==="draft"?"Published":"Draft"}
            </MotionButton>
          </HStack>
        )}
      </Flex>
    </MotionBox>
  );
};

export default AuthorHeader;

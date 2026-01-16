import { Box, Container, Flex, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Loader, ProfileCard } from "../../components";
import { CircleUserRound } from "lucide-react";
import { useParams } from "react-router";
import { AuthQuery } from "../../lib/tanstack_query/auth";

const MotionBox = motion(Box);
const UserProfile = () => {
  const {authorId}= useParams();
  const {data:postAuthorInfo,isLoading:gettingPostAuthor}= AuthQuery.useGetUser({id:authorId});
  if(gettingPostAuthor){
    return (
      <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <Loader/>
      </Box>
    )
  }
  return (
    <Box
      ml={{ base: 0, lg: "280px" }}
      mr={{ base: 0, lg: "300px" }}
      pt={{ base: "70px", lg: 0 }}
      pb={{ base: "80px", lg: 0 }}
      minH="100vh"
    >
      <Box maxW="700px" mx="auto" p={6}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Flex align="center" gap={2} mb={8}>
            <Icon as={CircleUserRound} boxSize={6} color="#a3a3a3" />
            <Text fontSize="2xl" fontWeight="bold" color="#f5f5f5">
              Profile
            </Text>
          </Flex>
        </MotionBox>
        <Box
          position="fixed"
          inset="0"
          bgGradient="radial"
          gradientFrom="rgba(99, 102, 241, 0.05)"
          gradientTo="transparent"
          pointerEvents="none"
        />

        <Container maxW="container.sm" position="relative">
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ProfileCard user={postAuthorInfo} />
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
};

export default UserProfile;

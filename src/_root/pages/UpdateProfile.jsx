import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Text,
  Button,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
// import { toaster } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { Save, ArrowLeft, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import {
  AccountTierSection,
  Loader,
  ProfileInfoSection,
  SocialLinksSection,
} from "../../components";
import { AuthQuery } from "../../lib/tanstack_query/auth";
import { useAuthContext } from "../../context/AuthContext";

const MotionBox = motion.create(Box);

const UpdateProfile = () => {
  const { authorId } = useParams();

  const { data: postAuthorInfo, isLoading: gettingPostAuthor } =
    AuthQuery.useGetUser({ id: authorId });
  const { checkUserAuth } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(
    postAuthorInfo?.avatar || null
  );
  const [imageFile, setImageFile] = useState(postAuthorInfo?.avatar || null);
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState("");

  const [formData, setFormData] = useState({
    userName: postAuthorInfo.userName ?? "",
    name: postAuthorInfo.name ?? "",
    bio: postAuthorInfo.bio ?? "",
    socialLinks: {
      instagram: postAuthorInfo.socialLinks.instagram ?? "",
      github: postAuthorInfo.socialLinks.github ?? "",
      twitter: postAuthorInfo.socialLinks.twitter ?? "",
      linkedin: postAuthorInfo.socialLinks.linkedin ?? "",
    },
    tier: "free",
  });

  const { mutateAsync: updateUser, isPending: updatingUser } =
    AuthQuery.useUpdateUser();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.userName)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (formData.bio.length > 200) {
      newErrors.bio = "Bio must be less than 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const handleProfileInfoChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSocialLinkChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [field]: value },
    }));
  };

  const handleTierChange = (tier) => {
    setFormData((prev) => ({ ...prev, tier }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("its error");
      return;
    } else if (!imageFile) {
      setImageError("image is required");
    } else {
      const userInfo = {
        ...formData,
        avatar: imageFile,
      };
      const upatedUser = await updateUser({
        updatedField: userInfo,
        userId: authorId,
      });
      if (!upatedUser) {
        return;
      }
      setImageError("");
      await checkUserAuth();
      setFormData({
        userName: "",
        name: "",
        bio: "",
        socialLinks: {
          instagram: "",
          github: "",
          twitter: "",
          linkedin: "",
        },
        tier: "free",
      });
      navigate(`/user-profile/${authorId}`);
    }
  };

  if (gettingPostAuthor) {
    return (
      <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <Loader />
      </Box>
    );
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
        <Flex align="center" gap={2} mb={8}>
          <Icon as={Edit} boxSize={6} color="#a3a3a3" />
          <Text fontSize="2xl" fontWeight="bold" color="#f5f5f5">
            Update Profile
          </Text>
        </Flex>
        <Container maxW="2xl">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HStack mb={8}>
              <Button
                variant="ghost"
                color="gray.400"
                _hover={{ color: "gray.200", bg: "gray.800" }}
                size="sm"
              >
                <ArrowLeft size={18} />
              </Button>
            </HStack>

            <VStack align="start" gap={2} mb={8}>
              <Text color="gray.500" fontSize="md">
                Manage your personal information and preferences
              </Text>
            </VStack>
          </MotionBox>

          <VStack gap={6} align="stretch">
            <ProfileInfoSection
              profileImage={profileImage}
              profileInfo={{
                userName: formData.userName,
                name: formData.name,
                bio: formData.bio,
              }}
              errors={errors}
              onImageChange={handleImageChange}
              onChange={handleProfileInfoChange}
              imageError={imageError}
            />

            <SocialLinksSection
              socialLinks={formData.socialLinks}
              errors={errors.socialLinks || {}}
              onChange={handleSocialLinkChange}
            />

            <AccountTierSection
              tier={formData.tier}
              onChange={handleTierChange}
            />

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <HStack justify="flex-end" pt={4} pb={8}>
                <Button
                  variant="outline"
                  size="lg"
                  borderColor="gray.600"
                  color="gray.300"
                  _hover={{ bg: "gray.800", borderColor: "gray.500" }}
                >
                  Cancel
                </Button>
                <Button
                  size="lg"
                  bg="brand.500"
                  color="white"
                  loading={isLoading}
                  loadingText="Saving..."
                  onClick={handleSubmit}
                  _hover={{ bg: "brand.600" }}
                  _active={{ bg: "brand.700" }}
                  disabled={updatingUser}
                >
                  {updatingUser ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <>
                      <Save size={18} />
                      Update Profile
                    </>
                  )}
                </Button>
              </HStack>
            </MotionBox>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default UpdateProfile;

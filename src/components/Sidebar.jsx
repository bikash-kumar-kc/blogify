import {
  Box,
  VStack,
  Avatar,
  Text,
  Flex,
  Button,
  Loader,
} from "@chakra-ui/react";
import { LogOut, Library } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { navItems } from "../constants";

import { INITIAL_USER, useAuthContext } from "../context/AuthContext";
import { getCapitalizedInitials } from "../utilities/utilFun";
import { AuthQuery } from "../lib/tanstack_query/auth";

const Sidebar = () => {
  const {
    setUser,
    user,
    setIsAuthenticate,
    loading: authLoading,
  } = useAuthContext();
  const navigate = useNavigate();
  const { mutateAsync: logout, isPending: loggingOut } =
    AuthQuery.useUserLoggingOut();
  const handleUserLogout = async (e) => {
    e.preventDefault();
    await logout();
    setIsAuthenticate(false);
    setUser(INITIAL_USER);
    navigate("/landingPage");
  };

  if (authLoading) return <Loader />;

  return (
    <Box
      as="aside"
      w="280px"
      h="100vh"
      bg="#171717"
      borderRight="1px solid"
      borderColor="#262626"
      position="fixed"
      left={0}
      top={0}
      display={{ base: "none", md: "none", lg: "flex" }}
      flexDirection="column"
      p={6}
      zIndex={10}
    >
      {/* Logo */}

      <Link to="/">
        <Box
          mb={"4rem"}
          color={"white"}
          _hover={{
            opacity: "0.9",
          }}
          mt="1rem"
          ml="2rem"
          display={"flex"}
          gap={"0.5rem"}
        >
          <Box>
            <Library size={30} />
          </Box>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            bgGradient="linear(to-r, #a3a3a3, #f5f5f5)"
            // bgClip="text"
            color={"white"}
          >
            Blogify
          </Text>
        </Box>
      </Link>

      {/* User Profile */}
      <Flex align="center" gap={3} mb={1} p={3} borderRadius="xl">
        <Avatar.Root size="md">
          <Avatar.Image src={`${user?.userAvatar}`} alt="Sarah Chen" />
          <Avatar.Fallback>
            {getCapitalizedInitials(user?.userName)}
          </Avatar.Fallback>
        </Avatar.Root>
        <Box>
          <Text fontWeight="semibold" fontSize="sm" color="#f5f5f5">
            {user?.name || "Bikash Kumar KC"}
          </Text>
          <Text fontSize="xs" color="#737373">
            @{user?.userName}
          </Text>
        </Box>
      </Flex>

      {/* Navigation */}
      <VStack mt="1rem" gap={2} align="stretch" flex={1}>
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              to={
                item?.path === "/user-profile/"
                  ? `${item?.path + user?.id}`
                  : item?.path
              }
              key={item?.label}
            >
              {({ isActive }) => (
                <Box
                  as="div"
                  display={"flex"}
                  align="center"
                  gap={3}
                  p={3}
                  borderRadius="lg"
                  cursor="pointer"
                  bg={isActive ? "#262626" : "transparent"}
                  color={isActive ? "#f5f5f5" : "#a3a3a3"}
                  _hover={{ bg: "#262626", color: "#f5f5f5" }}
                  transition="all 0.2s"
                >
                  <IconComponent
                    size={24}
                    color="#ffffff"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <Text fontSize="sm" fontWeight="medium">
                    {item.label}
                  </Text>
                </Box>
              )}
            </NavLink>
          );
        })}
      </VStack>

      <Box borderTop="1px solid" borderColor="#262626" pt={4} mt={4}>
        <Flex gap={4}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
        </Flex>
      </Box>

      {/* Logout */}
      <Button
        display="flex"
        justifyContent={"flex-start"}
        gap={3}
        p={3}
        borderRadius="lg"
        cursor="pointer"
        color="#737373"
        _hover={{ bg: "#262626", color: "#f5f5f5" }}
        transition="all 0.2s"
        disabled={loggingOut}
        onClick={handleUserLogout}
      >
        <LogOut size={20} />
        <Text fontSize="sm" fontWeight="medium">
          Logout
        </Text>
      </Button>
    </Box>
  );
};

export default Sidebar;

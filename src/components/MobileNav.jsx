import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  VStack,
  CloseButton,
  Drawer,
  Portal,
  chakra,
} from "@chakra-ui/react";
import { Bell, Dot, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Library } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { INITIAL_USER, useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

import {
  getCapitalizedInitials,
  multiFormatDateString,
} from "../utilities/utilFun";
import { PostQuery } from "../lib/tanstack_query/post";
import { useInView } from "react-intersection-observer";
import { AuthQuery } from "../lib/tanstack_query/auth";

const MotionBox = motion(chakra.div);

const MobileNav = () => {
  const { setUser, setIsAuthenticate, user, socket } = useAuthContext();
  const navigate = useNavigate();
  const [notifis, setNotifis] = useState();
  const [visible, setVisible] = useState(false);
  const interval = useRef(null);

  const { mutateAsync: logout, isPending: loggingOut } =
    AuthQuery.useUserLoggingOut();

  const handleUserLogout = async (e) => {
    e.preventDefault();
    await logout();
    socket.disconnect();
    setIsAuthenticate(false);
    setUser(INITIAL_USER);
    navigate("/landingPage");
  };

  const { ref, inView } = useInView();
  const {
    data: notifications,
    hasNextPage,
    fetchNextPage,
  } = PostQuery.useGetAllNotifications(10);

  const allNotifications =
    notifications?.pages?.flatMap((page) => page?.data.notifications) || [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (allNotifications && allNotifications.length > 0) {
      setNotifis(allNotifications);
    }
  }, [allNotifications?.length]);

  useEffect(() => {
    if (socket) {
      socket.current.on("notification:new", (value) => {
        setNotifis((prevs) => [
          {
            userId: {
              userName: value.username,
            },
            createdAt: value.createdAt,
            type: value.type,
            message: value.comment || value.message,
            title: value.title,
            reaction: value.reaction,
          },
          ...prevs,
        ]);
        setVisible(true);

        if (interval.current) {
          clearInterval(interval.current);
        }

        interval.current = setInterval(() => {
          setVisible(false);
        }, 3000);
      });
    }
  }, [socket]);

  return (
    <>
      {/* Top Header */}
      <Box
        display={{ base: "block", md: "block", lg: "none" }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="#171717"
        borderBottom="1px solid #262626"
        zIndex={50}
        px={4}
        py={3}
      >
        <Flex justify="space-between" align="center">
          <Box ml={"1rem"}>
            <Library size={40} color="white" />
          </Box>

          <Flex gap={3}>
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
            </Button>
            <Drawer.Root placement="bottom">
              <Drawer.Trigger asChild>
                <Button
                  _hover={{ bg: "#262626", color: "#f5f5f5" }}
                  p={2}
                  position="relative"
                >
                  <Bell size={20} color="#a3a3a3" />
                  {visible ? (
                    <sup className="text-red-700 absolute -top-1 -right-1 bg-red-700 text-white rounded-full w-2 h-2 flex items-center justify-center text-xs font-bold"></sup>
                  ) : (
                    ""
                  )}
                </Button>
              </Drawer.Trigger>

              {notifis && notifis.length > 0 ? (
                <Portal>
                  <Drawer.Backdrop bg="blackAlpha.700" />
                  <Drawer.Positioner>
                    <Drawer.Content
                      bg="#171717"
                      borderTopRadius="2xl"
                      maxH="60vh"
                    >
                      <Drawer.CloseTrigger asChild>
                        <CloseButton position="absolute" top="3" right="3" />
                      </Drawer.CloseTrigger>

                      <Drawer.Header px={6} pt={6}>
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          color="#f5f5f5"
                        >
                          Notifications
                        </Text>
                      </Drawer.Header>

                      <Drawer.Body px={6} pb={6}>
                        {notifis && notifis.length > 0 ? (
                          <VStack spacing={3} align="stretch">
                            {notifis.map((n) => (
                              <MotionBox
                                key={n?.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                bg="#262626"
                                transition={"0.2s"}
                                _hover={{
                                  bg: "#404040",
                                }}
                                p={4}
                                borderRadius="xl"
                              >
                                <Text fontSize="sm" color="#f5f5f5">
                                  <b>@{n?.userId?.userName}</b>
                                  {n?.type === "reaction"
                                    ? " " +
                                        n.reaction +
                                        " on your " +
                                        n?.title || ""
                                    : ""}
                                  {n?.type === "comment"
                                    ? " commented " +
                                        '" ' +
                                        n.message +
                                        ' "' +
                                        " on your " +
                                        `"` +
                                        n?.title +
                                        `"` || ""
                                    : ""}

                                  {n?.type === "follow" ? " followed you." : ""}
                                </Text>
                                <Text fontSize="xs" color="#737373" mt={1}>
                                  {multiFormatDateString(n?.createdAt)}
                                </Text>
                              </MotionBox>
                            ))}
                          </VStack>
                        ) : (
                          <Text color="#a3a3a3" textAlign="center" py={8}>
                            No notifications yet
                          </Text>
                        )}
                      </Drawer.Body>
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Portal>
              ) : (
                ""
              )}
            </Drawer.Root>

            <Link to={`/user-profile/${user.id}`}>
              <Avatar.Root>
                <Avatar.Image src={user?.userAvatar} />
                <Avatar.Fallback>
                  {getCapitalizedInitials(user?.userName)}
                </Avatar.Fallback>
              </Avatar.Root>
            </Link>
            {hasNextPage && (
              <Box
                as="div"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                ref={ref}
                mt="5rem"
              >
                <Loader />
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default MobileNav;

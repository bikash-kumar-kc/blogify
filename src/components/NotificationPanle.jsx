import { Box, VStack, Text, Avatar, Flex } from "@chakra-ui/react";
import { Bell } from "lucide-react";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { PostQuery } from "../lib/tanstack_query/post";
import {
  getCapitalizedInitials,
  multiFormatDateString,
} from "../utilities/utilFun";
import { useAuthContext } from "../context/AuthContext";

const NotificationPanel = () => {
  const { ref, inView } = useInView();
  const {socket}=useAuthContext()
  const {
    data: notifications,
    hasNextPage,
    fetchNextPage,
  } = PostQuery.useGetAllNotifications(10);
    const [notifis, setNotifis] = useState([]);


  // ✅ Flatten all pages into single array
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
        
       setNotifis(prevs=>[{
        userId:{
          userName:value.username
        },
        createdAt:value.createdAt,
        type:value.type,
        message:value.comment || value.message,
        title:value.title,
        reaction:value.reaction,

       },...prevs]);
      
      });
    }
  }, [socket]);

  return (
    <Box
      as="aside"
      w="300px"
      h="100vh"
      bg="#171717"
      borderLeft="1px solid"
      borderColor="#262626"
      position="fixed"
      right={0}
      top={0}
      display={{ base: "none", md:"none", lg: "block" }}
      p={6}
      overflowY="auto"
    >
      {/* Header */}
      <Flex align="center" gap={2} mb={6}>
        <Bell size={20} color="#a3a3a3" />
        <Text fontSize="lg" fontWeight="semibold" color="#f5f5f5">
          Notifications
        </Text>
      </Flex>

      {/* Notification List */}
     {
      notifis && notifis.every((each)=>each!=undefined) ?<VStack gap={4} align="stretch" overflowY={"auto"}>
        {notifis?.map((notif) => (
          <Box
            key={notif?._id}
            p={4}
            bg="#262626"
            borderRadius="xl"
            _hover={{ bg: "#404040" }}
            transition="all 0.2s"
            cursor="pointer"
          >
            <Flex gap={3}>
              <Avatar.Root size="sm">
                <Avatar.Image src={notif?.userId?.avatar} alt={notif?.user} />
                <Avatar.Fallback>
                  {getCapitalizedInitials(notif?.userId?.userName)}
                </Avatar.Fallback>
              </Avatar.Root>
              <Box flex={1}>
                <Text fontSize="sm" color="#f5f5f5">
                 
                    @{notif?.userId?.userName+" "}
                 
                  {notif?.type === "reaction"
                    ? (notif?.reaction || notif?.message) + ""
                    : notif?.type + ""}
                  <Text as="span" fontWeight="semibold">
                    {notif?.type === "reaction"
                      ? " " + " on your " + `"`+ notif?.title+`"` || ""
                      : ""}
                    {notif?.type === "comment"
                      ? '"' +
                          notif?.message +
                          '"' +
                          " on your " +`"`+
                          notif?.title+`"` || ""
                      : ""}

                    {notif?.type === "follow" ? notif?.message + "you" : ""}
                  </Text>
                </Text>
                <Text fontSize="xs" color="#737373" mt={1}>
                  {multiFormatDateString(notif?.createdAt)}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </VStack>:(
        <Text as="p" textAlign={"center"} color={"gray"}>No comments</Text>
      )
     }

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
    </Box>
  );
};

export default React.memo(NotificationPanel);

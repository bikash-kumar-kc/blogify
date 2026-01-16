import { Link, useLocation } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";
import { navItemsBottom } from "../constants";


const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <Box
      as="nav"
      display={{ base: "block",md:"block", lg: "none" }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={50}
      bg="rgba(23, 23, 23, 0.95)"
      backdropFilter="blur(12px)"
      borderTop="1px solid"
      borderColor="#262626"
      px={2}
      py={2}
      pb="calc(0.5rem + env(safe-area-inset-bottom))"
    >
      <Flex align="center" justify="space-around">
        {navItemsBottom.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          if (item.primary) {
            return (
              <Link key={item.path} to={item.path}>
                <Flex
                  align="center"
                  justify="center"
                  mt="-24px"
                >
                  <Flex
                    w="56px"
                    h="56px"
                    borderRadius="full"
                    bg="#f5f5f5"
                    boxShadow="lg"
                    align="center"
                    justify="center"
                    transition="transform 0.2s"
                    _active={{ transform: "scale(0.95)" }}
                  >
                    <Icon size={24} color="#171717" />
                  </Flex>
                </Flex>
              </Link>
            );
          }

          return (
            <Link key={item.path} to={item.path}>
              <Flex
                direction="column"
                align="center"
                gap={1}
                py={2}
                px={3}
                color={isActive ? "#f5f5f5" : "#737373"}
                transition="all 0.2s"
                _hover={{ color: "#f5f5f5" }}
              >
                <Icon size={20} />
                <Text fontSize="10px" fontWeight="medium">
                  {item.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

export default MobileBottomNav;
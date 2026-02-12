import { Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import {
  Loader,
  MobileBottomNav,
  MobileNav,
  NotificationPanel,
  Sidebar,
} from "../components";
import { Box } from "@chakra-ui/react";
import "../index.css";


const Layout = () => {
  const { isAuthenticate, loading } = useAuthContext();

  if (loading || !isAuthenticate)
    return (
      <div>
        {/* <Snowfall/> */}
        <Outlet />
      </div>
    );
  return (
    <Box bg="#0a0a0a" minH="100vh">
      {/* <Snowfall/> */}
      <Box width={"25%"}>
        {/* Sidebar - Desktop */}
        <Sidebar />

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Mobile Bottom Nav */}
        <MobileBottomNav />
      </Box>

      {/* Outlet */}
      <Box width={"50"}>
        <Outlet />
      </Box>
      <Box width={"25%"}>
        {/* Notification Panel - Desktop */}
        <NotificationPanel />
      </Box>
    </Box>
  );
};

export default Layout;

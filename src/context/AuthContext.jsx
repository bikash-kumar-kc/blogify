import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { AuthServices } from "../lib/backend_api/auth";
import socketioConnectionToServer from "../lib/socket.io/connectToSocket_io";

export const INITIAL_USER = {
  id: "",
  userName: "",
  userEmail: "",
  userAvatarId: "",
  userAvatar: "",
  userBio: "",
  socialLinks: {
    instagram: "",
    github: "",
    twitter: "",
    linkedin: "",
  },
  tier: "",
  userAuthId: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticate: false,
  setUser: () => {},
  setIsAuthenticate: () => {},
  checkUserAuth: async () => {},
  socket: null,
  isSocketConnected: false,
  setIsSocketConnected: () => {},
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [loading, setLoading] = useState(false);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const navigate = useNavigate();
  const socket = useRef(null);

  const checkUserAuth = async () => {
    setLoading(true);
    try {
      const user = await AuthServices.getCurrentUser();
      if (!user) return;
      console.log(user);

      setUser({
        id: user?._id,
        name: user?.name,
        userName: user?.userName,
        userBio: user?.bio,
        userAvatar: user?.avatar,
        socialLinks: {
          instagram: user?.socialLinks?.instagram ?? "",
          github: user?.socialLinks?.github ?? "",
          twitter: user?.socialLinks?.twitter ?? "",
          linkedin: user?.socialLinks?.linkedin ?? "",
        },
        tier: user?.tier ?? "",
        userAuthId: user?.userAuthId,
      });
      if (!socket.current && !isSocketConnected) {
        socket.current = socketioConnectionToServer();
        socket.current.on("connect", () => {
          console.log("successfully connected !!");
          setIsSocketConnected(true); // Trigger re-render
          socket.current.emit("user:identify", {
            userId: user?._id,
            username: user?.userName,
          });

          socket.current.emit("user:subscribe", user?._id);
        });
      }

      setIsAuthenticate(true);
      return;
    } catch (error) {
      console.log("problem in getting user:: " + error.message);
      return;
    } finally {
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    // const accessToken = Cookies.get("accessToken");
    // const refreshToken = Cookies.get("refreshToken");

    // if (!accessToken && !refreshToken) {
    //   console.log("the problem is from here");
    //   navigate("/landingPage");
    //   return;
    // } else if (!accessToken && refreshToken) {
    //   console.log("refresh sectio here...");
    //   const isGenerated = (async () => {
    //     return await AuthServices.generateAccessTokenFromRefreshToken();
    //   })();

    //   if (isGenerated) {
    //     checkUserAuth();
    //     return;
    //   }
    // } else {
    //   // check whether
    //   checkUserAuth();
    // }

    checkUserAuth();
    
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const value = {
    isAuthenticate,
    loading,
    user,
    setIsAuthenticate,
    setUser,
    checkUserAuth,
    socket: socket.current,
    isSocketConnected,
    setIsSocketConnected,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);

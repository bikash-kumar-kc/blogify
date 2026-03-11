import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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
  loading: false,
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
  const socket = useRef(null);

  const checkUserAuth = useCallback( async () => {
    setLoading(true);
    try {
      const user = await AuthServices.getCurrentUser();
      if (!user){
        setIsAuthenticate(false);
        return;
      };

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
          setIsSocketConnected(true); 
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
      setIsAuthenticate(false);
      console.log("problem in getting user:: " + error.message);
      return;
    } finally {
      setLoading(false);
    }
  },[])

  useEffect(() => {
    checkUserAuth();
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [checkUserAuth]);

  const value = {
    isAuthenticate,
    loading,
    user,
    setIsAuthenticate,
    setUser,
    checkUserAuth,
    socket: socket,
    isSocketConnected,
    setIsSocketConnected,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);

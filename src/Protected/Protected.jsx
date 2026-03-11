import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { Loader } from "@chakra-ui/react";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const { isAuthenticate, isLoading } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;

    if (authentication && !isAuthenticate) {
      navigate("/landingPage", { replace: true });
      return;
    }

    if (!authentication && isAuthenticate) {
      navigate("/", { replace: true });
      return;
    }
  }, [isAuthenticate, isLoading, authentication, navigate]);

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  if (authentication && !isAuthenticate) return null;
  if (!authentication && isAuthenticate) return null;
  return <>{children}</>;
};

export default Protected;

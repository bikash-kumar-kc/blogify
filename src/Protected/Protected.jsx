import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { Loader } from "@chakra-ui/react";

const Protected = ({ children, authentication = true }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticate,isLoading } = useAuthContext();

  useEffect(() => {
    setLoading(true);

    if (authentication && !isAuthenticate) {
      navigate("/landingPage");
    }

    if (!authentication && isAuthenticate) {
      navigate("/");
    }

    setLoading(false);
  });

  if (loading || isLoading) <><Loader/></>;
  return <>{children}</>;
};

export default Protected;

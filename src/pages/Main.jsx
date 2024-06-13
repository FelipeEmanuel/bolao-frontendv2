import React, { useEffect } from "react";
import { logout } from "../api";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container } from "@chakra-ui/react";
import LateralMenu from "../components/LateralMenu";

function Main() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Container p={0} maxWidth="100%" centerContent>
        <Box
          display="flex"
          flexDirection="row"
          marginTop="40px"
          p={4}
          w="95%"
        >
          <LateralMenu />
          <Box bg="white" width="80%">
            Oi
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Main;

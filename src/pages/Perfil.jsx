import { Box, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LateralMenu from "../components/LateralMenu";
import { get } from "../api";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchUser = () => {
    get("api/users/me")
      .then((response) => {
        setUserData(response?.data);
        setIsFetching(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(userData);

  return (
    <Container p={0} maxWidth="100%" centerContent>
      <Box display="flex" flexDirection="row" marginTop="40px" p={4} w="95%">
        <LateralMenu />
        <Box bg="white" width="80%">
          Perfil
        </Box>
      </Box>
    </Container>
  );
}

export default Perfil;

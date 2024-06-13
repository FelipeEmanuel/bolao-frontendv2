import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api";
import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { PiSoccerBallFill } from "react-icons/pi";
import { PiRankingFill } from "react-icons/pi";

function LateralMenu() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {user.role === "admin" ? (
        <Box
          display="flex"
          width="20%"
          borderRight="1px solid"
          flexDirection="column"
          alignItems="center"
          bg="#141414"
          
        >
          {/*------------------------Aba Principal-------------------------------------------------*/}
          <Stack
            direction="column"
            spacing={4}
            fontFamily="Poppins"
            marginBottom={2}
            width="100%"
            color="white"
          >
            <Box
              display="flex"
              alignItems="center"
              borderBottom="1px solid"
              gap={1}
            >
              <AiOutlineUser size={26} />
              <Text fontSize={20}>Principal</Text>
            </Box>
            <UnorderedList styleType="''" fontSize={17} cursor="pointer">
              <Link to='/main'><ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Início</ListItem></Link>
              <Link to='/perfil'><ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Perfil</ListItem></Link>
              <Link to='/regras'><ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Regras</ListItem></Link>
              <Link to='/faq'><ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>FAQ</ListItem></Link>
              <ListItem _hover={{ bg: "#fff", textColor: "#141414" }} onClick={onLogout}>Desconectar</ListItem>
            </UnorderedList>
          </Stack>
          {/*------------------------Aba Palpites-------------------------------------------------*/}
          <Stack
            direction="column"
            spacing={4}
            fontFamily="Poppins"
            marginBottom={2}
            width="100%"
            color="white"
          >
            <Box
              display="flex"
              alignItems="center"
              borderTop="1px solid"
              borderBottom="1px solid"
              gap={1}
            >
              <PiSoccerBallFill size={26} />
              <Text fontSize={20}>Palpites</Text>
            </Box>
            <UnorderedList styleType="''" fontSize={17} cursor="pointer">
              <Link to='/futebol'><ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Palpites Futebol</ListItem></Link>
              <Link to='/esports'><ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Palpites e-Sports</ListItem></Link>
            </UnorderedList>
          </Stack>
          {/*------------------------Aba Rankings-------------------------------------------------*/}
          <Stack
            direction="column"
            spacing={4}
            fontFamily="Poppins"
            marginBottom={2}
            width="100%"
            color="white"
          >
            <Box
              display="flex"
              alignItems="center"
              borderTop="1px solid"
              borderBottom="1px solid"
              gap={1}
            >
              <PiRankingFill size={26} />
              <Text fontSize={20}>Rankings</Text>
            </Box>
            <UnorderedList styleType="''" fontSize={17} cursor="pointer">
              <ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Semanal Futebol</ListItem>
              <ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Semanal e-Sports</ListItem>
              <ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Rankings Futebol</ListItem>
              <ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Rankings e-Sports</ListItem>
              <ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Hall de Títulos</ListItem>
            </UnorderedList>
          </Stack>
          {/*------------------------Aba Admin-------------------------------------------------*/}
          <Stack
            direction="column"
            spacing={4}
            fontFamily="Poppins"
            marginBottom={2}
            width="100%"
            color="white"
          >
            <Box
              display="flex"
              alignItems="center"
              borderTop="1px solid"
              borderBottom="1px solid"
              gap={1}
            >
              <PiRankingFill size={26} />
              <Text fontSize={20}>Admin</Text>
            </Box>
            <UnorderedList styleType="''" fontSize={17} cursor="pointer"> 
              <Link to="/jogos"><ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Jogos Futebol</ListItem></Link>
              <ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Jogos e-Sports</ListItem>
              <Link to="/competicoes"><ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Competições</ListItem></Link>
              <ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Campeonatos</ListItem>
              <Link to='/times'><ListItem _hover={{ bg: "#fff", textColor: "#141414" }}>Times</ListItem></Link>
            </UnorderedList>
          </Stack>
          <Button color="black" variant="ghost" onClick={onLogout} h="100%">
            Sair
          </Button>
        </Box>
      ) : (
        <h1>ok</h1>
      )}
    </>
  );
}

export default LateralMenu;

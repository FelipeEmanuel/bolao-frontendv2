import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Login";
import Cadastrar from "../components/Cadastrar";

function Home() {
  return (
    <Container p={0} maxWidth="100%" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        bg="white"
        p={4}
        w={1000}
        m="40px 0 15px 0"
        borderRadius="lg"
        alignItems="center"
      >
        <Text
          fontSize="6xl"
          fontWeight={600}
          fontFamily="Poppins"
          justifyContent="center"
          textAlign="center"
          marginBottom={2}
          color="#000"
        >
          Bolão da Galera!
        </Text>
        <Text
          fontSize="lg"
          fontWeight={600}
          fontFamily="Poppins"
          justifyContent="center"
          textAlign="center"
          marginBottom={2}
          color="gray"
        >
          Venha palpitar em campeonatos de futebol, e-sports e mais!
        </Text>
      </Box>
      <Stack direction="column" spacing={4} align="center" fontFamily="Poppins">
        <Box bg="white" w={1000} p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab _selected={{ color: "white", bg: "#00b3db" }}>Login</Tab>
              <Tab _selected={{ color: "white", bg: "#00b3db" }}>Cadastrar</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Cadastrar />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Container>
  );
}

export default Home;

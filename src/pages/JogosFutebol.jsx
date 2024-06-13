import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LateralMenu from "../components/LateralMenu";
import { useNavigate } from "react-router-dom";
import { get, post } from "../api";
import Pagination from "../components/Pagination";
import ListaJogosFutebol from "../components/ListaJogosFutebol";
import { escudos } from "../util/constants";
import { ordenarListaJogos } from "../util/ordenacoes";

function JogosFutebol() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [atualizou, setAtualizou] = useState(true);

  //Criar jogo
  const [competicao, setCompeticao] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [isocodetime1, setIsocodetime1] = useState("");
  const [isocodetime2, setIsocodetime2] = useState("");
  const [infoCamp, setInfoCamp] = useState("");
  const [infoJogo, setInfoJogo] = useState("");
  const [infoGroup, setInfoGroup] = useState("");
  const [placar1, setPlacar1] = useState("");
  const [placar2, setPlacar2] = useState("");
  const [gameType, setGameType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchData = () => {
    setTimeout(() => {
      get("api/games")
        .then((response) => {
          setData(response?.data);
          setIsFetching(false);
        })
        .catch((error) => {
          setError(error);
        });
    }, 1000);
    /*get("api/games")
          .then((response) => {
            setData(response?.data);
            setIsFetching(false);
          })
          .catch((error) => {
            setError(error);
          });*/
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [atualizou]);

  function toastError() {
    toast({
      title: "Ocorreu um erro, não foi possível adicionar o jogo!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }

  const adicionarJogo = () => {
    setLoading(true);
    const body = {
      time1,
      time2,
      placar1,
      placar2,
      competicao,
      dataLimite,
      isocodetime1,
      isocodetime2,
      infoCamp,
      infoJogo,
      infoGroup,
      gameType,
    };

    if (
      !time1 ||
      !time2 ||
      !competicao ||
      !dataLimite ||
      !isocodetime1 ||
      !isocodetime2 ||
      !infoCamp ||
      !infoJogo ||
      !infoGroup ||
      !gameType
    ) {
      toast({
        title: "Preencha todos os campos!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      post("/api/games", body)
        .then((response) => {
          if (response?.data) {
            toast({
              title: "Jogo adicionado com sucesso!",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
            onClose();
            setAtualizou(!atualizou);
          } else {
            setLoading(false);
            toastError();
          }
        })
        .catch((error) => {
          setLoading(false);
          toastError();
        });
    }
  };

  // Get current games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentPages = data?.games
    ?.sort(ordenarListaJogos)
    .reverse()
    .slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function nameImg1(valor) {
    escudos.forEach((e) => {
      if (e.img === valor) {
        setTime1(e.text);
      }
    });
    setIsocodetime1(valor);
  }

  function nameImg2(valor) {
    escudos.forEach((e) => {
      if (e.img === valor) {
        setTime2(e.text);
      }
    });
    setIsocodetime2(valor);
  }

  //Para o sistema de times
  /*function nameImg1(valor) {
    data?.escudosFutebol?.forEach((e) => {
      if (e.escudo === valor) {
        setTime1(e.nome);
      }
    });
    setIsocodetime1(valor);
  }

  function nameImg2(valor) {
    data?.escudosFutebol?.forEach((e) => {
      if (e.escudo === valor) {
        setTime2(e.nome);
      }
    });
    setIsocodetime2(valor);
  }*/

  function organizaCompeticao(value) {
    setCompeticao(value);
    let str1 = "";
    data?.competicoes.forEach((e) => {
      if (e._id === value) {
        str1 += `${e.name} ${e.ano}`;
        setInfoCamp(str1);
      }
    });
  }

  return (
    <>
      <Container p={0} maxWidth="100%" centerContent>
        <Box display="flex" flexDirection="row" marginTop="40px" p={4} w="95%">
          <LateralMenu />
          <Box bg="white" width="80%">
            {isFetching === true ? (
              <Spinner size="xl" />
            ) : (
              <>
                <section>
                  <Box
                    display="flex"
                    justifyContent="center"
                    padding="0 0 20px"
                  >
                    <Button
                      border="1px solid #000"
                      _hover="none"
                      color="white"
                      bgColor="green"
                      marginTop="20px"
                      marginBottom="10px"
                      padding="4px 20px 4px"
                      onClick={onOpen}
                    >
                      Adicionar novo jogo
                    </Button>
                  </Box>
                  {currentPages?.length > 0 && (
                    <Box
                      marginLeft="auto"
                      marginRight="auto"
                      w="95%"
                      textAlign="center"
                    >
                      {currentPages.map((jogo) => (
                        <ListaJogosFutebol
                          key={jogo._id}
                          jogo={jogo}
                          valorAtualizou={atualizou}
                          atualizou={setAtualizou}
                          competicoes={data?.competicoes}
                        />
                      ))}
                      <Pagination
                        gamesPerPage={gamesPerPage}
                        totalGames={data?.games?.length}
                        paginate={paginate}
                      />
                    </Box>
                  )}
                  {data?.games?.length === 0 && (
                    <h3>Não há jogos cadastrados</h3>
                  )}
                </section>
              </>
            )}
          </Box>
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent background="#141414" fontFamily="Poppins">
          <ModalHeader textAlign="center" color="#fff" fontSize="26px">
            Preencha os dados para adicionar um novo jogo!
          </ModalHeader>
          <ModalBody>
            <Box
              display="flex"
              gap="10px"
              justifyContent="center"
              flexDirection="column"
            >
              <Box display="flex">
                <FormControl w="100%" p={2} textAlign="center">
                  <FormLabel
                    color="white"
                    display="block"
                    marginBottom="5px"
                    fontSize="24px"
                    textAlign="center"
                  >
                    Time 1
                  </FormLabel>
                  <Select
                    required
                    value={isocodetime1}
                    onChange={(evento) => nameImg1(evento.target.value)}
                    boxShadow="10px 10px 30px rgba(0, 0, 0, 0.06)"
                    w="100%"
                    border="none"
                    fontSize="24px"
                    padding="10px"
                    boxSizing="border-box"
                    bgColor="#fff"
                  >
                    <option />
                    {escudos.map((item) => {
                      return (
                        <option key={item.text} label={item.text}>
                          {item.img}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl w="100%" p={2} textAlign="center">
                  <FormLabel
                    color="white"
                    display="block"
                    marginBottom="5px"
                    fontSize="24px"
                    textAlign="center"
                  >
                    Time 2
                  </FormLabel>
                  <Select
                    required
                    value={isocodetime2}
                    onChange={(evento) => nameImg2(evento.target.value)}
                    boxShadow="10px 10px 30px rgba(0, 0, 0, 0.06)"
                    w="100%"
                    border="none"
                    fontSize="24px"
                    padding="10px"
                    boxSizing="border-box"
                    bgColor="#fff"
                  >
                    <option />
                    {escudos.map((item) => {
                      return (
                        <option key={item.text} label={item.text}>
                          {item.img}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                {/*CÓDIGO PARA QUANDO O SISTEMA DE TIMES ESTIVER FUNCIONANDO
                <FormControl w="100%" p={2} textAlign="center">
                  <FormLabel color="white" display="block" marginBottom="5px" fontSize="24px" textAlign="center">Time 1</FormLabel>
                  <Select
                    required
                    value={isocodetime1}
                    onChange={(evento) => nameImg1(evento.target.value)}
                    boxShadow="10px 10px 30px rgba(0, 0, 0, 0.06)"
                    w="100%"
                    border="none"
                    fontSize="24px"
                    padding="10px"
                    boxSizing="border-box"
                    bgColor="#fff"
                  >
                    <option />
                    {data?.escudosFutebol?.map((item) => {
                      return (
                        <option key={item._id} label={item.nome}>
                          {item.escudo}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl w="100%" p={2} textAlign="center">
                  <FormLabel color="white" display="block" marginBottom="5px" fontSize="24px" textAlign="center">Time 2</FormLabel>
                  <Select
                    required
                    value={isocodetime2}
                    onChange={(evento) => nameImg2(evento.target.value)}
                    boxShadow="10px 10px 30px rgba(0, 0, 0, 0.06)"
                    w="100%"
                    border="none"
                    fontSize="24px"
                    padding="10px"
                    boxSizing="border-box"
                    bgColor="#fff"
                  >
                    <option />
                    {data?.escudosFutebol?.map((item) => {
                      return (
                        <option key={item._id} label={item.nome}>
                          {item.escudo}
                        </option>
                      );
                    })}
                  </Select>
                  </FormControl>*/}
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                textAlign="center"
                justifyContent="center"
                gap="10px"
              >
                <Box display="flex" flexDirection="column">
                  <FormLabel
                    color="white"
                    display="block"
                    marginBottom="5px"
                    fontSize="24px"
                    textAlign="center"
                  >
                    Placar Time 1
                  </FormLabel>
                  <NumberInput
                    min={0}
                    max={10}
                    onChange={(value) => setPlacar1(value)}
                    background="white"
                    size="md"
                    width="100%"
                    allowMouseWheel
                    borderRadius="lg"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box display="flex" flexDirection="column">
                  <FormLabel
                    color="white"
                    display="block"
                    marginBottom="5px"
                    fontSize="24px"
                    textAlign="center"
                  >
                    Placar Time 2
                  </FormLabel>
                  <NumberInput
                    min={0}
                    max={10}
                    onChange={(value) => setPlacar2(value)}
                    background="white"
                    size="md"
                    width="100%"
                    allowMouseWheel
                    borderRadius="lg"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <FormLabel
                  color="white"
                  display="block"
                  marginBottom="5px"
                  fontSize="24px"
                  textAlign="center"
                >
                  Competições
                </FormLabel>
                <Select
                  required
                  value={competicao}
                  onChange={(evento) => organizaCompeticao(evento.target.value)}
                  boxShadow="10px 10px 30px rgba(0, 0, 0, 0.06)"
                  w="100%"
                  border="none"
                  fontSize="24px"
                  padding="10px"
                  boxSizing="border-box"
                  bgColor="#fff"
                >
                  <option />
                  {data?.competicoes?.map((competicao) => {
                    return (
                      <option key={competicao._id} value={competicao._id}>
                        {competicao.name} {competicao.ano}
                      </option>
                    );
                  })}
                </Select>
              </Box>
              <Box
                display="flex"
                gap="10px"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                margin="10px"
              >
                <FormLabel
                  color="white"
                  display="block"
                  marginBottom="5px"
                  fontSize="24px"
                  textAlign="center"
                >
                  Data Limite (Ex: 2024-06-01T15:55:00)
                </FormLabel>
                <FormControl width="100%">
                  <Input
                    placeholder="Data limite para palpitar num jogo"
                    onChange={(e) => setDataLimite(e.target.value)}
                    background="white"
                    value={dataLimite}
                  />
                </FormControl>
              </Box>
              <Box
                display="flex"
                gap="10px"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                margin="10px"
              >
                <FormLabel
                  color="white"
                  display="block"
                  marginBottom="5px"
                  fontSize="24px"
                  textAlign="center"
                >
                  Info do Jogo (Ex: SÁB 26/11/2024 16:00)
                </FormLabel>
                <FormControl width="100%">
                  <Input
                    placeholder="Informações sobre o jogo"
                    onChange={(e) => setInfoJogo(e.target.value)}
                    background="white"
                    value={infoJogo}
                  />
                </FormControl>
              </Box>
              <Box
                display="flex"
                gap="10px"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                margin="10px"
              >
                <FormLabel
                  color="white"
                  display="block"
                  marginBottom="5px"
                  fontSize="20px"
                  textAlign="center"
                >
                  Info sobre a fase do jogo (Ex: Grupo A ou Final)
                </FormLabel>
                <FormControl width="100%">
                  <Input
                    placeholder="Informações sobre a fase do jogo"
                    onChange={(e) => setInfoGroup(e.target.value)}
                    background="white"
                    value={infoGroup}
                  />
                </FormControl>
              </Box>
              <Box display="flex" flexDirection="column">
                <FormLabel
                  color="white"
                  display="block"
                  marginBottom="5px"
                  fontSize="24px"
                  textAlign="center"
                >
                  Tipo de Jogo
                </FormLabel>
                <Select
                  required
                  value={gameType}
                  onChange={(evento) => setGameType(evento.target.value)}
                  boxShadow="10px 10px 30px rgba(0, 0, 0, 0.06)"
                  w="100%"
                  border="none"
                  fontSize="24px"
                  padding="10px"
                  boxSizing="border-box"
                  bgColor="#fff"
                >
                  <option />
                  <option value="1">1 - Normal</option>
                  <option value="2">2 - X2 Pontos</option>
                </Select>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              background="green"
              color="white"
              mr={3}
              onClick={adicionarJogo}
              _hover="none"
              isLoading={loading}
            >
              Adicionar novo jogo
            </Button>
            <Button
              variant="ghost"
              color="white"
              onClick={onClose}
              _hover={{ bg: "#fff", textColor: "#141414" }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default JogosFutebol;

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
  Spinner,
  StackDivider,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LateralMenu from "../components/LateralMenu";
import { useNavigate } from "react-router-dom";
import { get, post } from "../api";
import TimeCard from "../components/TimeCard";

function Times() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [atualizou, setAtualizou] = useState(true);

  const [nome, setNome] = useState("");
  const [escudo, setEscudo] = useState("");
  const [categoria, setCategoria] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  function setarEscudo (event) {
    const file = event.target.files[0];
      if (file) {
          //setFileName(file.name);
          console.log(file)
          const reader = new FileReader();
          reader.onloadend = () => {
              setEscudo(reader.result);
          };
          reader.readAsDataURL(file);
      }
  }

  function toastError(error) {
    if (error?.response?.data?.code === 451) {
      toast({
        title: "Um time com esse nome já existe!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchData = () => {
    setTimeout(() => {
      get("api/times/")
        .then((response) => {
          setData(response?.data);
          setIsFetching(false);
        })
        .catch((error) => {
          setError(error);
        });
    }, 1000);
    /*get("api/times")
      .then((response) => {
        setData(response?.data);
        setIsFetching(false);
      })
      .catch((error) => {
        setError(error);
      });*/
  };

  useEffect(() => {
    fetchData();
  }, [atualizou]);

  const addTime = () => {
    setLoading(true)
    if(!nome || !escudo || !categoria) {
      toast({
        title: "Preencha todos os campos!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
    const body = {
        nome, escudo, categoria
    }

    post('/api/times/', body)
    .then((response) => {
      if (response?.data) {
        toast({
            title: "Time criado com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        onClose();
        setLoading(false)
        setNome("")
        setEscudo("")
        setCategoria("")
        setAtualizou(!atualizou)
      } else {
        toastError();
      }
    })
    .catch((error) => {
      toastError(error);
      setLoading(false);
    });
  }

  //console.log(data);

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
                <Box display="flex" justifyContent="center" padding="0 0 20px">
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
                    Adicionar novo time
                  </Button>
                </Box>
                <VStack
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                  align="stretch"
                >
                  <h2 className="h2X">
                    Times de Futebol Ativos (Participantes de alguma competição)
                  </h2>
                  <Box display="flex" gap="20px" m="5px" flexWrap="wrap">
                    {data?.ativosFutebol?.map((time) => (
                      <TimeCard key={time._id} time={time} valorAtualizou={atualizou} atualizou={setAtualizou}/>
                    ))}
                    {data?.ativosFutebol?.length === 0 && (
                      <h2>Não há times nessa categoria.</h2>
                    )}
                  </Box>
                  <h2 className="h2X">Times de Futebol Inativos (Não estão participando de nenhuma competição)</h2>
                  <Box display="flex" gap="20px" m="5px" flexWrap="wrap">
                    {data?.inativosFutebol?.map((time) => (
                      <TimeCard key={time._id} time={time} valorAtualizou={atualizou} atualizou={setAtualizou}/>
                    ))}
                    {data?.inativosFutebol?.length === 0 && (
                      <h2>Não há times nessa categoria.</h2>
                    )}
                  </Box>
                  <h2 className="h2X">Times de e-Sports Ativos (Participantes de alguma competição)</h2>
                  <Box display="flex" gap="20px" m="5px" flexWrap="wrap">
                    {data?.ativosEsports?.map((time) => (
                      <TimeCard key={time._id} time={time} valorAtualizou={atualizou} atualizou={setAtualizou}/>
                    ))}
                    {data?.ativosEsports?.length === 0 && (
                      <h2>Não há times nessa categoria.</h2>
                    )}
                  </Box>
                  <h2 className="h2X">Times de e-Sports Inativos (Não estão participando de nenhuma competição)</h2>
                  <Box display="flex" gap="20px" m="5px" flexWrap="wrap">
                    {data?.inativosEsports?.map((time) => (
                      <TimeCard key={time._id} time={time} valorAtualizou={atualizou} atualizou={setAtualizou}/>
                    ))}
                    {data?.inativosEsports?.length === 0 && (
                      <h2>Não há times nessa categoria.</h2>
                    )}
                  </Box>
                </VStack>
              </>
            )}
          </Box>
        </Box>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">  
        <ModalOverlay />
        <ModalContent background="#141414" fontFamily="Poppins">
          <ModalHeader textAlign="center" color="#fff" fontSize="26px">
            Adicionar novo time!
          </ModalHeader>
          <ModalBody>
            <Box display="flex" gap="10px" justifyContent="center" flexDirection="column" alignItems="center" margin="10px">
                <FormLabel color="white" display="block" marginBottom="5px" fontSize="18px" textAlign="center">Nome do time</FormLabel>
                <FormControl width="80%">
                    <Input
                    placeholder="Nome do time"
                    onChange={(e) => setNome(e.target.value)}
                    background="white"
                    value={nome ? nome : ""}
                    />
                </FormControl>
            </Box>
            <Box display="flex" gap="10px" justifyContent="center" flexDirection="column" alignItems="center">
                <FormLabel color="white" display="block" marginBottom="5px" fontSize="18px" textAlign="center">Escudo do time</FormLabel>
                <input type="file" accept="image/*" onChange={setarEscudo}/>
            </Box>
            <Box display="flex" gap="10px" justifyContent="center" flexDirection="column" alignItems="center" margin="10px">
              <FormLabel color="white" display="block" marginBottom="5px" fontSize="18px" textAlign="center">Categoria do time</FormLabel>
              <FormControl width="80%">
                  <Input
                  placeholder="Categoria do time"
                  onChange={(e) => setCategoria(e.target.value)}
                  background="white"
                  value={categoria ? categoria : ""}
                  />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              background="green"
              color="white"
              mr={3}
              onClick={addTime}
              _hover="none"
              isLoading={loading}
            >
              Criar
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

export default Times;

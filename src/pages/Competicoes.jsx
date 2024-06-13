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
  Select,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LateralMenu from "../components/LateralMenu";
import { useNavigate } from "react-router-dom";
import { get, post } from "../api";
import CompCards from "../components/CompCards";

function Competicoes() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [atualizou, setAtualizou] = useState(true);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [ano, setAno] = useState("");
  const [campeonato, setCampeonato] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchData = () => {
    setTimeout(() => {
      get("api/competicoes")
        .then((response) => {
          setData(response?.data);
          setIsFetching(false);
        })
        .catch((error) => {
          setError(error);
        });
    }, 1000);
    /*get("api/competicoes")
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

  console.log(data);

  function organizaCampeonato(value) {
    setCampeonato(value);
    data?.campeonatos?.forEach((e) => {
      if (e._id === value) {
        setName(e.name);
      }
    });
  }

  function toastError() {
    toast({
      title: "Não foi possível criar a competição!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }

  function setarLogo (event) {
    const file = event.target.files[0];
      if (file) {
          //setFileName(file.name);
          console.log(file)
          const reader = new FileReader();
          reader.onloadend = () => {
              setImg(reader.result);
          };
          reader.readAsDataURL(file);
      }
  }

  const addComp = () => {
    setLoading(true);
    const body = {
      name, ano, campeonato, img
    };

    if (
      !name ||
      !ano ||
      !campeonato
    ) {
      toast({
        title: "Preencha todos os campos!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      post("/api/competicoes", body)
        .then((response) => {
          if (response?.data) {
            toast({
              title: "Competição criada com sucesso!",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
            onClose();
            setAtualizou(!atualizou);
            setAno('')
            setImg('')
            setName('')
            setCampeonato('')
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
                    Adicionar nova competição
                  </Button>
                </Box>
                <Box display="flex" gap="20px" m="5px" flexWrap="wrap">
                  {data?.competicoes?.map(
                    (comp) =>
                      comp.ativa === true && (
                        <CompCards
                          key={comp._id}
                          competicao={comp}
                          campeonatos={data?.campeonatos}
                        />
                      )
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent background="#141414" fontFamily="Poppins">
          <ModalHeader textAlign="center" color="#fff" fontSize="26px">
            Adicionar nova competição!
          </ModalHeader>
          <ModalBody>
            <Box display="flex" flexDirection="column">
              <FormLabel
                color="white"
                display="block"
                marginBottom="5px"
                fontSize="24px"
                textAlign="center"
              >
                Campeonato
              </FormLabel>
              <Select
                required
                value={campeonato}
                onChange={(evento) => organizaCampeonato(evento.target.value)}
                boxShadow="10px 10px 30px rgba(0, 0, 0, 0.06)"
                w="100%"
                border="none"
                fontSize="24px"
                padding="10px"
                boxSizing="border-box"
                bgColor="#fff"
              >
                <option />
                {data?.campeonatos?.map((campeonato) => {
                  return (
                    <option key={campeonato._id} value={campeonato._id}>
                      {campeonato.name}
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
                fontSize="18px"
                textAlign="center"
              >
                Ano da Competição (Ex: 2023, 2024 ou 2024.1)
              </FormLabel>
              <FormControl width="80%">
                <Input
                  placeholder="Ano da Competição"
                  onChange={(e) => setAno(e.target.value)}
                  background="white"
                  value={ano}
                />
              </FormControl>
            </Box>
            <Box
              display="flex"
              gap="10px"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <FormLabel
                color="white"
                display="block"
                marginBottom="5px"
                fontSize="18px"
                textAlign="center"
              >
                Logo da competição
              </FormLabel>
              <input type="file" accept="image/*" onChange={setarLogo} />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              background="green"
              color="white"
              mr={3}
              onClick={addComp}
              _hover="none"
              isLoading={loading}
            >
              Criar Competição
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

export default Competicoes;

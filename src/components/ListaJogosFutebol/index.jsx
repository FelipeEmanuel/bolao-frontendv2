import {
  Box,
  Button,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { put, remove } from "../../api";
import { escudos } from "../../util/constants";

function ListaJogosFutebol({ jogo, valorAtualizou, atualizou, competicoes }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [competicao, setCompeticao] = useState(jogo?.competicao);
  const [time1, setTime1] = useState(jogo?.time1);
  const [time2, setTime2] = useState(jogo?.time2);
  const [dataLimite, setDataLimite] = useState(jogo?.dataLimite);
  const [isocodetime1, setIsocodetime1] = useState(jogo?.isocodetime1);
  const [isocodetime2, setIsocodetime2] = useState(jogo?.isocodetime2);
  const [infoCamp, setInfoCamp] = useState(jogo?.infoCamp);
  const [infoJogo, setInfoJogo] = useState(jogo?.infoJogo);
  const [infoGroup, setInfoGroup] = useState(jogo?.infoGroup);
  const [placar1, setPlacar1] = useState(jogo?.placar1);
  const [placar2, setPlacar2] = useState(jogo?.placar2);
  const [gameType, setGameType] = useState(jogo?.gameType);
  const [loading, setLoading] = useState(false);

  function toastError() {
    toast({
      title: "Ocorreu um erro, não foi possível deletar o jogo!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }

  const deletarJogo = (id) => {
    remove(`/api/games/${id}`)
      .then((response) => {
        if (response?.data) {
          toast({
            title: "Jogo deletado com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          atualizou(!valorAtualizou);
        } else {
          toastError();
        }
      })
      .catch((error) => {
        toastError();
      });
  };

  const editarJogo = () => {
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
      put(`/api/games/${jogo._id}`, body)
        .then((response) => {
          if (response?.data) {
            onClose();
            setLoading(false);
            atualizou(!valorAtualizou);
            toast({
              title: "Jogo atualizado com sucesso!",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "bottom",
            });
          } else {
            toastError();
          }
        })
        .catch((error) => {
          toastError();
          setLoading(false);
        });
    }
  };

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

  function organizaCompeticao(value) {
    setCompeticao(value);
    let str1 = "";
    competicoes?.forEach((e) => {
      if (e._id === value) {
        str1 += `${e.name} ${e.ano}`;
        setInfoCamp(str1);
      }
    });
  }

  return (
    <>
      <Box
        bgColor="#f4f4f4"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="5px"
        margin="10px 10px"
        padding="10px"
        fontFamily="Poppins"
        fontSize="20"
        justifyContent="center"
      >
        <Box
          display="flex"
          justifyContent="flex-end"
          gap="10px"
          alignItems="start"
          cursor="pointer"
        >
          <Button onClick={onOpen}>edit</Button>
          <Button onClick={() => deletarJogo(jogo._id)}>delete</Button>
        </Box>
        <h3>
          {jogo.infoGroup} - {jogo.infoCamp} {jogo.gameType === 2 ? (<h3 style={{color: "red", fontSize: "16px"}}> X2 Pontos</h3>) : ""}
        </h3>
        {jogo.infoJogo}
        <Box
          display="flex"
          flexDirection="row"
          gap="10px"
          width="100%"
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            flexBasis="45%"
            justifyContent="flex-end"
            fontFamily="Poppins"
          >
            <img
              src={jogo.isocodetime1}
              alt="E1"
              style={{
                width: "1.75em",
                height: "1.75em",
              }}
            ></img>
            <h2 style={{ fontSize: "25px" }}>{jogo.time1}</h2>
          </Box>
          <h2 className="h2X">
            {jogo.placar1} x {jogo.placar2}
          </h2>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            flexBasis="47%"
            justifyContent="flex-start"
            fontFamily="Poppins"
          >
            <h2 style={{ fontSize: "25px" }}>{jogo.time2}</h2>
            <img
              src={jogo.isocodetime2}
              alt="Escudo Time 2"
              style={{
                width: "1.75em",
                height: "1.75em",
              }}
            ></img>
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent background="#141414" fontFamily="Poppins">
          <ModalHeader textAlign="center" color="#fff" fontSize="26px">
            Edite os dados desse jogo!
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
                  value={competicao ? competicao : ""}
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
                  {competicoes?.map((competicao) => {
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
              onClick={editarJogo}
              _hover="none"
              isLoading={loading}
            >
              Finalizar edição
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

export default ListaJogosFutebol;

import { Box, Button, Card, CardBody, CardHeader, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { imgDefault } from "../../util/constants";
import { put, remove } from "../../api";

function TimeCard({ time, valorAtualizou, atualizou }) {

    const [nome, setNome] = useState("")
    const [escudo, setEscudo] = useState("")
    const [categoria, setCategoria] = useState("")
    const [ativo, setAtivo] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [loading, setLoading] = useState(false)

    const deletarTime = ((id) => {
      remove(`/api/times/${id}`)
        .then((response) => {
          if(response?.data) {
            atualizou(!valorAtualizou)
            toast({
              title: "Time deletado com sucesso!",
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
        })
    })

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

    useEffect(() => {
      if(time) {
        setNome(time?.nome);
        setEscudo(time?.escudo);
        setCategoria(time?.categoria);
        setAtivo(time?.ativo);   
      } 
    }, [time])

    function toastError() {
      toast({
        title: "Ocorreu um erro, não foi possível atualizar o time!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }

    const editarTime = () => {
        setLoading(true)
        const body = {
            nome, escudo, categoria, ativo
        }

        put(`/api/times/${time._id}`, body)
        .then((response) => {
          if (response?.data) {
            onClose();
            setLoading(false)
            atualizou(!valorAtualizou)
            toast({
              title: "Time atualizado com sucesso!",
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

    function statusTime() {
      setAtivo(!ativo)
    }

  return (
    <>
      <Box display="flex" flex-direction="row" flex-wrap="wrap">
        <Card width="220px" borderRadius="none" fontFamily="Poppins">
          <CardHeader display="flex" justifyContent="center">
          <img
            src={time?.escudo ? time?.escudo : imgDefault}
            alt="E1"
            style={{
              width: "3em",
              height: "3em",
            }}
          ></img>
          </CardHeader>
          <CardBody display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="center">
                <Text fontFamily="Poppins">{time?.nome}</Text>
            </Box>
            <Box display="flex" justifyContent="center">
                <Text fontFamily="Poppins">Categoria: {time?.categoria}</Text>
            </Box>
            <Box display="flex" justifyContent="center" gap={4}>
                <Button onClick={onOpen}>Editar</Button>
                <Button onClick={() => deletarTime(time._id)}>Excluir</Button>
            </Box>
          </CardBody>
        </Card>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">  
        <ModalOverlay />
        <ModalContent background="#141414" fontFamily="Poppins">
          <ModalHeader textAlign="center" color="#fff" fontSize="26px">
            Edite esse time!
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
            <Box display="flex" gap="10px" justifyContent="center" flexDirection="column" alignItems="center" margin="10px">
              <FormLabel color="white" display="block" marginBottom="5px" fontSize="18px" textAlign="center">Status do time</FormLabel>
                {ativo && <Button onClick={statusTime}>Desativar time</Button>}
                {!ativo && <Button onClick={statusTime}>Ativar time</Button>}
                <Text color="white" display="block" marginBottom="5px" fontSize="18px" textAlign="center">Status: {ativo ? "Ativo": "Desativado"}</Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              background="green"
              color="white"
              mr={3}
              onClick={editarTime}
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

export default TimeCard;

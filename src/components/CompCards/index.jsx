import { Box, Button, Card, CardBody, CardHeader, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { imgDefault } from '../../util/constants'
import { AiFillCloseCircle } from "react-icons/ai"

function CompCards({competicao, campeonatos}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [atualizou, setAtualizou] = useState(true);
  const [name, setName] = useState(competicao?.name);
  const [img, setImg] = useState(competicao?.img);
  const [ano, setAno] = useState(competicao?.ano);
  const [campeonato, setCampeonato] = useState(competicao?.campeonato);


  function organizaCampeonato(value) {
    setCampeonato(value);
    campeonatos?.forEach((e) => {
      if (e._id === value) {
        setName(e.name);
      }
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

  const deletarComp = () => {}

  const editComp = () => {}
  return (
    <>
    <Box display="flex" flex-direction="row" flex-wrap="wrap">
        <Card width="300px" position="relative" fontFamily="Poppins">
            <AiFillCloseCircle 
                size={25} 
                className="deletarComp" 
                onClick={() => deletarComp(competicao?._id)}
                cursor="pointer"
            />
          <CardHeader display="flex" justifyContent="center" borderRadius="10px 10px 0px 0px" bgColor={competicao?.campeonato?.cor}>
          <img
            src={competicao?.img ? competicao?.img : imgDefault}
            alt="E1"
            style={{
                
                height: "12em",
                width: "12em",
                borderRadius: "50%",
                position: "relative",
                bottom: "-50px",
                paddingBottom: "-10px"
                }}
                ></img>
          </CardHeader>
          <CardBody display="flex" flexDirection="column" gap={2}>
            <Box textAlign="center" background="#fff" boxShadow="5px 5px 15px rgba(0, 0, 0, 0.08)" borderRadius="0px 0px 10px 10px" paddingTop="50px" paddingBottom="40px">
                <Text fontFamily="Poppins" color="#6278f7" fontSize="18px" lineHeight="12px" fontWeight="bold" marginBottom="8px">{competicao?.name}</Text>
                <Text fontFamily="Poppins" color="#212121" fontSize="18px" lineHeight="12px" padding="0px 8px">{competicao?.ano}</Text>
            </Box>
            <Box display="flex" justifyContent="center">
                {competicao?.ativa ? <Text fontFamily="Poppins" color="#00ff00" fontWeight="700" fontSize="18px">Em andamento</Text> : <Text fontFamily="Poppins" color="#ff0000">Encerrada</Text>}
            </Box>
            <Box display="flex" justifyContent="center" marginTop="15px" gap={2}>
                <Button display="flex" justifyContent="center" bgColor="green" color="white" margin="0px" padding="10px 15px 10px" cursor="pointer" border="1px solid #000" textAlign="center" alignItems="center" borderRadius="5px" fontSize="16px" fontWeight="700" whiteSpace="wrap" _hover="none" onClick={onOpen}>Editar competição</Button>
                <Button display="flex" justifyContent="center" bgColor="green" color="white" margin="0px" padding="10px 15px 10px" cursor="pointer" border="1px solid #000" textAlign="center" alignItems="center" borderRadius="5px" fontSize="16px" fontWeight="700" whiteSpace="wrap" _hover="none">Encerrar competição</Button>
            </Box>
          </CardBody>
        </Card>
      </Box>


      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent background="#141414" fontFamily="Poppins">
          <ModalHeader textAlign="center" color="#fff" fontSize="26px">
            Editar competição!
          </ModalHeader>
          <ModalBody>
            {/*<Box display="flex" flexDirection="column">
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
                {campeonatos?.map((campeonato) => {
                  return (
                    <option key={campeonato._id} value={campeonato._id}>
                      {campeonato.name}
                    </option>
                  );
                })}
              </Select>
            </Box>*/}
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
              onClick={editComp}
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
  )
}

export default CompCards
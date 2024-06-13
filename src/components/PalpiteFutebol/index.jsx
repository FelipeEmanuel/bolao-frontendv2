import { Box, Button, FormControl, Input, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { post } from "../../api";

function PalpiteFutebol({ jogo, competicao, palpitou }) {
  const [palpite1, setPalpite1] = useState(jogo?.palpite1);
  const [palpite2, setPalpite2] = useState(jogo?.palpite2);
  const [loading, setLoading] = useState(false);
  const toast = useToast();


  const aoPalpitar = (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      jogo_id: jogo._id,
      competicao,
      palpite1,
      palpite2,
    };

    if (!palpite1 || !palpite2) {
      toast({
        title: "Não é possível fazer um palpite vazio!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      post("/api/palpites", body)
        .then((response) => {
          if (response?.data) {
            palpitou(response?.data);
            toast({
                title: "Palpite realizado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
              });
            setLoading(false)
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

  function toastError() {
    toast({
      title: "Ocorreu um erro, não foi possível realizar o palpite!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }

  function onKeyPress1(event) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  return (
    <form onSubmit={aoPalpitar} fontFamily="Poppins">
      <Box
        display="flex"
        flexDirection="column"
        bgColor="#f4f4f4"
        alignItems="center"
        gap="5px"
        margin="10px 0"
        padding="20px"
        justifyContent="center"
        fontFamily="Poppins"
      >
        <Box display="flex" width="100%" position="relative">
          {jogo.gameType === 2 ? (
            <Box
              color="#FF0000"
              border="0"
              position="absolute"
              top="0"
              right="0"
              fontSize="13px"
              fontWeight="700"
            >
              X2 PONTOS!
            </Box>
          ) : (
            ""
          )}
        </Box>
        <h3>
          {jogo.infoGroup} - {jogo.infoCamp}
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
          >
            
              <img
                src={jogo.isocodetime1}
                alt="E1"
                style={{
                  width: "2em",
                  height: "2em",
                }}
              ></img>
              <h2 style={{fontSize: "25px"}}>{jogo.time1}</h2>
              <input
                type="text"
                className="placar"
                id="palpite1"
                name="palpite1"
                value={palpite1}
                onChange={(e) => setPalpite1(e.target.value)}
                onKeyPress={(e) => onKeyPress1(e)}
              />
          </Box>
          <h2 className="h2X">x</h2>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            flexBasis="47%"
            justifyContent="flex-start"
          >
              <input
                type="text"
                className="placar"
                id="palpite2"
                name="palpite2"
                value={palpite2}
                onChange={(e) => setPalpite2(e.target.value)}
                onKeyPress={(e) => onKeyPress1(e)}
              />
              <h2 style={{fontSize: "25px"}}>{jogo.time2}</h2>
              <img
                src={jogo.isocodetime2}
                alt="E2"
                style={{
                  width: "2em",
                  height: "2em",
                }}
              ></img>
          </Box>
        </Box>
        <Button
          type="submit"
          border="1px solid #000"
          _hover="none"
          color="white"
          bgColor="green"
          w="50%"
          marginBottom="10px"
          isLoading={loading}
        >
          Confirmar palpite
        </Button>
      </Box>
    </form>
  );
}

export default PalpiteFutebol;

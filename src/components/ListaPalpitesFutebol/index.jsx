import { Box } from "@chakra-ui/react";
import React from "react";

function ListaPalpitesFutebol({ palpite }) {
  return (
    <>
      <h3>{palpite?.jogo?.infoJogo} {"-"} {palpite?.jogo?.infoCamp}</h3>
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
            src={palpite?.jogo?.isocodetime1}
            alt="E1"
            style={{
              width: "1.75em",
              height: "1.75em",
            }}
          ></img>
          <h2 style={{fontSize: "25px"}}>{palpite?.jogo?.time1}</h2>
          <h2 style={{fontSize: "25px"}}>{palpite?.palpite1}</h2>
        </Box>
        <h2 style={{fontSize: "25px"}}>x</h2>
        <Box
          display="flex"
          flexDirection="row"
          gap="10px"
          flexBasis="47%"
          justifyContent="flex-start"
        >
          <h2 style={{fontSize: "25px"}}>{palpite?.palpite2}</h2>
          <h2 style={{fontSize: "25px"}}>{palpite?.jogo?.time2}</h2>
          <img
            src={palpite?.jogo?.isocodetime2}
            alt="E2"
            style={{
              width: "1.75em",
              height: "1.75em",
            }}
          ></img>
          <>
            {palpite?.jogo?.gameType === 1 && palpite?.pontuacao === 5 && (
              <h2 className="palpiteG">+{palpite?.pontuacao}</h2>
            )}
            {palpite?.jogo?.gameType === 1 && palpite?.pontuacao === 4 && (
              <h2 className="palpiteB">+{palpite?.pontuacao}</h2>
            )}
            {palpite?.jogo?.gameType === 1 && palpite?.pontuacao === 3 && (
              <h2 className="palpiteY">+{palpite?.pontuacao}</h2>
            )}
            {palpite?.jogo?.gameType === 1 && palpite?.pontuacao === 1 && (
              <h2 className="palpiteC">+{palpite?.pontuacao}</h2>
            )}
            {palpite?.jogo?.gameType === 2 && palpite?.pontuacao === 10 && (
              <h2 className="palpiteG">+{palpite?.pontuacao}</h2>
            )}
            {palpite?.jogo?.gameType === 2 && palpite?.pontuacao === 8 && (
              <h2 className="palpiteB">+{palpite?.pontuacao}</h2>
            )}
            {palpite?.jogo?.gameType === 2 && palpite?.pontuacao === 6 && (
              <h2 className="palpiteY">+{palpite?.pontuacao}</h2>
            )}
            {palpite?.jogo?.gameType === 2 && palpite?.pontuacao === 2 && (
              <h2 className="palpiteC">+{palpite?.pontuacao}</h2>
            )}
            {palpite?.jogo?.placar1 !== "" &&
              palpite?.jogo?.placar2 !== "" &&
              palpite?.pontuacao === 0 && (
                <h2 className="palpiteR">+{palpite?.pontuacao}</h2>
              )}
          </>
        </Box>
      </Box>
    </>
  );
}

export default ListaPalpitesFutebol;

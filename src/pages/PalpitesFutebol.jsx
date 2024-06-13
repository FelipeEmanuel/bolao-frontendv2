import { AbsoluteCenter, Box, Center, Container, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LateralMenu from "../components/LateralMenu";
import { get } from "../api";
import { useNavigate } from "react-router-dom";
import PalpiteFutebol from "../components/PalpiteFutebol";
import Pagination from "../components/Pagination";
import ListaPalpitesFutebol from "../components/ListaPalpitesFutebol";

function PalpitesFutebol() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const [palpitou, setPalpitou] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [games, setGames] = useState(null);
  const [qtdPalpitou, setQtdPalpitou] = useState(0);
  const [qtdNaoPalpitou, setQtdNaoPalpitou] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(5);
  const [currentPagePalpites, setCurrentPagePalpites] = useState(1);
  const [gamesPerPagePalpites] = useState(10);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchData = () => {
    setTimeout(() => {
      get("api/palpites/userPalpites")
        .then((response) => {
          setData(response?.data);
          setIsFetching(false);
        })
        .catch((error) => {
          setError(error);
        });
    }, 2000);
    /*get("api/palpites/userPalpites")
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
  }, [palpitou]);

  useEffect(() => {
    if (data) {
      data?.palpites?.forEach((p) => {
        p.pontuacao = 0;
        data?.gamesTodos?.forEach((g) => {
          if (p.jogo._id === g._id) {
            if (p.palpite1 === g.placar1 && p.palpite2 === g.placar2) {
              if (g.gameType === 2) {
                p.pontuacao = p.pontuacao + 10;
              } else {
                p.pontuacao = p.pontuacao + 5;
              }
            } else if (
              (p.palpite1 > p.palpite2 && g.placar1 > g.placar2) ||
              (p.palpite1 < p.palpite2 && g.placar1 < g.placar2)
            ) {
              if (g.gameType === 2) {
                p.pontuacao = p.pontuacao + 6;
              } else {
                p.pontuacao = p.pontuacao + 3;
              }
              if (p.palpite1 === g.placar1 || p.palpite2 === g.placar2) {
                if (g.gameType === 2) {
                  p.pontuacao = p.pontuacao + 2;
                } else {
                  p.pontuacao = p.pontuacao + 1;
                }
              }
            } else if (
              g.placar1 !== "" &&
              g.placar2 !== "" &&
              p.palpite1 === p.palpite2 &&
              g.placar1 === g.placar2
            ) {
              if (g.gameType === 2) {
                p.pontuacao = p.pontuacao + 6;
              } else {
                p.pontuacao = p.pontuacao + 3;
              }
            } else if (p.palpite1 === g.placar1 || p.palpite2 === g.placar2) {
              if (g.gameType === 2) {
                p.pontuacao = p.pontuacao + 2;
              } else {
                p.pontuacao = p.pontuacao + 1;
              }
            } else {
              p.pontuacao = p.pontuacao + 0;
            }
          }
        });
      });

      data?.palpites?.forEach((p) => {
        data?.gamesDisponiveis?.forEach((g) => {
          if (p.jogo._id === g._id) {
            g.palpite1 = p.palpite1;
            g.palpite2 = p.palpite2;
          }
        });
      });

      setGames(data?.gamesDisponiveis);

      let qtdPalpitesUser = 0;
      data?.gamesDisponiveis.forEach((gd) => {
        data?.palpites?.forEach((up) => {
          if (gd._id === up.jogo._id) {
            qtdPalpitesUser += 1;
          }
        });
      });

      const qtdGames = data?.gamesDisponiveis.length - qtdPalpitesUser;
      setQtdPalpitou(qtdPalpitesUser);
      setQtdNaoPalpitou(qtdGames);
    }
  }, [data]);

  // Jogos
  // Get current games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentPages = games?.sort().slice(indexOfFirstGame, indexOfLastGame);
  //const currentPages = games?.sort(ordenarListaJogos).slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Palpites
  // Get current games
  const indexOfLastGamePalpites = currentPagePalpites * gamesPerPagePalpites;
  const indexOfFirstGamePalpites = indexOfLastGamePalpites - gamesPerPagePalpites;
  const currentPagesPalpites = data?.palpites?.sort().reverse().slice(indexOfFirstGamePalpites, indexOfLastGamePalpites);
  //const currentPagesPalpites = data?.palpites?.sort(ordenarJogos).reverse().slice(indexOfFirstGamePalpites, indexOfLastGamePalpites);

  // Change page
  const paginatePalpites = pageNumber => setCurrentPagePalpites(pageNumber);

  console.log(data);

  return (
    <Container p={0} maxWidth="100%" centerContent>
      <Box display="flex" flexDirection="row" marginTop="40px" p={4} w="95%">
        <LateralMenu />
        <Box bg="white" width="80%">
          {isFetching === true ? (
            <Box w='100%' h="100%" display="flex" justifyContent="center" alignItems="center">
              <Spinner size="xl"/>
            </Box>
          ) : (
            <>
              <section className="main">
                <h1 style={{fontSize: "25px"}}>Bem-vindo, exemplo!</h1>
                <h2 style={{fontSize: "25px"}}>Abaixo estão os jogos disponíveis para palpitar e os seus palpites!</h2>
              </section>
              <Box display="flex" flexDirection="row" gap="25px">
                <section className="content">
                  <h2 style={{fontSize: "20px"}}>
                    Abaixo os jogos disponíveis para palpitar essa semana!
                  </h2>
                  <h3 style={{fontSize: "20px"}}>
                    Dos {games?.length} jogos disponíveis, você já palpitou em{" "}
                    {qtdPalpitou}!
                  </h3>
                  <h3 style={{fontSize: "20px"}}>Falta palpitar em {qtdNaoPalpitou} jogo(s)!</h3>
                  {currentPages?.length > 0 && (
                    <Box display="flex" flexDirection="column" flexBasis="50%">
                      {currentPages?.map((jogo) => (
                        <PalpiteFutebol key={jogo._id} jogo={jogo} competicao={jogo.competicao} palpitou={setPalpitou}/>
                      ))}
                      <Pagination gamesPerPage={gamesPerPage} totalGames={games?.length} paginate={paginate}/>
                    </Box>
                  )}
                  {games?.length === 0 && <h3>Não há jogos cadastrados</h3>}
                </section>
                <section className="content">
                  <h1 style={{fontSize: "25px"}}>Seus palpites da semana!</h1>
                  {
                    currentPagesPalpites?.length > 0 && (
                      <Box display="flex" flexDirection="column" bgColor="#f4f4f4" alignItems="center" gap="5px" justifyContent="center">
                        {
                          currentPagesPalpites?.map((palpite) => (
                            <ListaPalpitesFutebol key={palpite._id} palpite={palpite}/>
                          ))
                        }
                        <Pagination gamesPerPage={gamesPerPagePalpites} totalGames={data?.palpites?.length} paginate={paginatePalpites}/>
                      </Box>
                    )
                  }
                  {
                    currentPagesPalpites?.length === 0 && <h3>Você ainda não palpitou nos jogos dessa semana.</h3>
                  }
                </section>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default PalpitesFutebol;

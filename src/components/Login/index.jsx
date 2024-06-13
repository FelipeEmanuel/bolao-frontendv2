import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/main");
    }
  }, [user, navigate]);

  function toastError() {
    toast({
      title: "Email ou senha inválidos!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }
  
  const submitHandler = () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Preencha todos os campos!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const userData = {
      email,
      password,
    };

    login(userData)
      .then((response) => {
        if(response.data) {
          toast({
            title: "Login efetuado com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("user", JSON.stringify(response.data));
          setLoading(false)
          navigate('/main')
        } else {
          toastError();
        }
      })
      .catch((error) => {
        toastError();
        setLoading(false);
      });
  };

  return (
    <VStack spacing="10px" color="#000" fontFamily="Poppins">
      <Text fontSize="lg" fontWeight={600} fontFamily="Poppins" color="#141414">
        Faça Login e comece a palpitar!
      </Text>
      <FormControl id="email" isRequired>
        <InputGroup>
          <InputLeftAddon>
            <FaUser style={{ color: "#141414" }} />
          </InputLeftAddon>
          <Input
            value={email}
            type="email"
            placeholder="Digite seu E-mail"
            variant="flushed"
            p={2}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup size="md">
          <InputLeftAddon>
            <FaLock style={{ color: "#141414" }} />
          </InputLeftAddon>
          <Input
            value={password}
            variant="flushed"
            p={2}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Digite sua senha"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              width={100}
              height={10}
              onClick={handleClick}
              color="white"
              borderColor="#00b3db"
              bgColor="#00b3db"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        color="white"
        borderColor="#00b3db"
        bgColor="#00b3db"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;

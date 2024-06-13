import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api";

function Cadastrar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/main");
    }
  }, [user, navigate]);

  function toastError(error) {
    if (error.response.data.code === 452) {
      toast({
        title: "Email já cadastrado!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else if (error.response.data.code === 451) {
      toast({
        title: "Nome já está sendo utilizado!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

  const submitHandler = () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não são iguais!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    register(userData).then((response) => {
      if (response.data) {
        toast({
          title: "Cadastro realizado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoading(false);
        navigate("/main");
      } else {
        toastError();
      }
    }).catch((error) => {
      toastError(error);
      setLoading(false);
    });
  };

  return (
    <VStack spacing="10px" color="#000" fontFamily="Poppins">
      <Text fontSize="lg" fontWeight={600} fontFamily="Poppins" color="#141414">
        Crie uma conta e divirta-se!
      </Text>
      <FormControl id="name" isRequired>
        <FormLabel color="#000" p={2}>
          Nome
        </FormLabel>
        <Input
          placeholder="Digite seu nome"
          variant="flushed"
          p={2}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email2" isRequired>
        <FormLabel color="#000" p={2}>
          E-mail
        </FormLabel>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          variant="flushed"
          p={2}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password2" isRequired>
        <FormLabel color="#000" p={2}>
          Senha
        </FormLabel>
        <InputGroup size="md">
          <Input
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
      <FormControl id="password3" isRequired>
        <FormLabel color="#000" p={2}>
          Confirme sua Senha
        </FormLabel>
        <InputGroup size="md">
          <Input
            variant="flushed"
            p={2}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        Cadastrar
      </Button>
    </VStack>
  );
}

export default Cadastrar;

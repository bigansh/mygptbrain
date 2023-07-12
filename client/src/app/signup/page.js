"use client";
import { authenticateUser, authenticateUserByGoogle } from "@/api";
import { OnboardingBanner } from "@/assets";
import {
  Heading,
  Box,
  Divider,
  AbsoluteCenter,
  Input,
  Flex,
  FormLabel,
  Grid,
  Button,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
const Signup = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authenticateUser({
        queryType: "signup",
        data: userDetails,
      });
      if (res.status == 200) {
        toast({
          title: "Signed up successfully",
          position: "top",
          variant: "left-accent",
          status: "success",
          duration: 3000,
        });
      }
      // TODO : err 500 user already there
      localStorage.setItem("x-session-token", res.data.sessionToken);
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error while signing up",
        position: "top",
        variant: "left-accent",
        status: "error",
        duration: 3000,
      });
      console.log(error);
      localStorage.removeItem("x-session-token");
    }
  };

  return (
    <Grid w={"100vw"} h={"100vh"} bg="white" gridTemplateColumns={"1fr 2fr"}>
      <Flex flexDir={"column"} p={5} justifyContent={"center"} gap={2.5}>
        <FormLabel fontSize={"2xl"} fontWeight={"400"} mb={0} mt={2}>
          name
        </FormLabel>
        <Input
          id="name"
          type="name"
          value={userDetails.name}
          onChange={handleChange}
          placeholder="barun"
        />
        <FormLabel fontSize={"2xl"} fontWeight={"400"} mb={0} mt={2}>
          email
        </FormLabel>
        <Input
          id="email"
          type="email"
          value={userDetails.email}
          onChange={handleChange}
          placeholder="barundebnath91@gmail.com"
        />
        <FormLabel fontSize={"2xl"} fontWeight={"400"} mb={0} mt={2}>
          password
        </FormLabel>
        <Input
          id="password"
          type="password"
          value={userDetails.password}
          onChange={handleChange}
          placeholder="***"
        />

        <Button
          title="login"
          fontWeight={"400"}
          bg={"#DFE8FF"}
          _hover={{
            bg: "#DFE8FF",
          }}
          color={"black"}
          onClick={handleLoginSubmit}
          mt={2}
        >
          login
        </Button>
      </Flex>
      <Flex flexDir={"column"} p={5} gap={5} justifyContent={"center"}>
        <Heading fontSize={"2xl"} fontWeight={"400"}>
          let your brain talk...
        </Heading>

        <Image
          src={OnboardingBanner}
          alt="Onboarding Banner"
          style={{ width: "100%" }}
        />
      </Flex>
    </Grid>
  );
};

export default Signup;

import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import {
  Stack,
  Field,
  Input,
  Button,
  Box,
  Text,
  Heading,
  Loader,
} from "@chakra-ui/react";
import { validationForSignin } from "../../utilities/validation";
import { Link } from "react-router";
import { Form, Formik, Field as FormikField } from "formik";
import { Library } from "lucide-react";
import { Mail } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { View } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { AuthQuery } from "../../lib/tanstack_query/auth";
import { toast } from "sonner";

const SignIn = () => {
  const { isAuthenticate, isLoading, checkUserAuth } = useAuthContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  // QUERIES...
  const {
    mutateAsync: logInUser,
    isPending: loggingUser,
    isError: isLoginError,
    error: loginError,
  } = AuthQuery.useLoggingUser();

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [isAuthenticate, navigate]);

  useGSAP(
    () => {
      const elements = [
        logoRef.current,
        headingRef.current,
        formRef.current,
      ].filter(Boolean);

      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      gsap.from(elements, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  if (isLoading) return <Loader />;

  return (
    <>
      {!isAuthenticate && (
        <Box as="div" className="flex bg-[#171717]">
          <Box
            as="section"
            width="50%"
            bg="red.600"
            overflow={"hidden"}
            height="100vh"
            bgImage="url('/images/library.jpg')"
            bgSize="cover"
            bgRepeat="no-repeat"
            bgPosition="center"
            display={{
              base: "none",
              md: "block",
            }}
            className="filter brightness-75 hover:brightness-100   transition duration-300"
          />

          <section className="w-full md:w-1/2  h-screen flex text-white  justify-center items-center">
            <div
              ref={containerRef}
              className="  flex flex-1 justify-center items-center flex-col gap-4"
            >
              <div ref={logoRef}>
                {/* <img src="/public/images/logo.svg" alt="logo" /> */}
                {/* <img src="/images/logo.svg" alt="logo" width={"200px"} /> */}
                <Library size={50} />
              </div>

              <div ref={headingRef} className="flex flex-col gap-2">
                <Heading as="h2" className="text-center">
                  Log in to your account
                </Heading>
                <Text
                  as="p"
                  className="text-center"
                  fontSize={"0.9rem"}
                  fontWeight={"bold"}
                  color="#737373"
                >
                  Welcome back! Please enter your details.
                </Text>

                {isLoginError && (
                  <Text
                    as="p"
                    className="text-center"
                    fontSize={"0.9rem"}
                    fontWeight={"bold"}
                    color="red"
                    alignSelf={"center"}
                    width={{
                      base: "100%",
                      md: "60%",
                    }}
                  >
                    {loginError.message}
                  </Text>
                )}
              </div>

              <div ref={formRef} className="w-80">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      const session = await logInUser({
                        email: values.email,
                        password: values.password,
                      });

                      if (!session) return;

                      const isLoggedIn = await checkUserAuth();

                      if (isLoggedIn) {
                        resetForm();
                        navigate("/");
                      }
                    } catch (error) {
                      console.log("problem in logging user");
                      if (error.code === "ERR_NETWORK") {
                        toast.error("Timeout ! wait for a minute.");
                      }
                    }
                  }}
                  validationSchema={validationForSignin}
                >
                  <Form>
                    <Stack display={"flex"} flexDir="column" gap="2rem">
                      <FormikField ref={formRef} name="email">
                        {({ field, meta }) => (
                          <Field.Root invalid={!!(meta.touched && meta.error)}>
                            <Field.Label
                              name="email"
                              color="#f5f5f5"
                              mb="0.1rem"
                              letterSpacing={"0.05rem"}
                              fontSize="14px"
                              fontWeight={"bold"}
                            >
                              Email
                            </Field.Label>

                            <div
                              className=" 
                              group
                              relative
                              flex w-full
                              items-center
                              gap-2
                              h-12
                              rounded-md
                              focus-within:shadow-[0_0_10px_#22c55e]
                            focus-within:border-[#22c55e]
                              border
                            bg-[#171717] transition duration-100"
                            >
                              {/* icon */}
                              <Box ml={3}>
                                <Mail
                                  size={18}
                                  className=" text-gray-400
                                 transition group-focus-within:scale-125"
                                />
                              </Box>

                              {/* input */}
                              <Input
                                {...field}
                                name="email"
                                type="email"
                                bg="#171717"
                                placeholder="Enter your email..."
                                className="w-full bg-transparent px-3 py-2 
                     focus:outline-none"
                                border={"none"}
                                outline={"none"}
                              />
                            </div>
                            <Field.ErrorText>{meta.error}</Field.ErrorText>
                          </Field.Root>
                        )}
                      </FormikField>

                      <FormikField ref={formRef} name="password">
                        {({ field, meta }) => (
                          <Field.Root invalid={!!(meta.touched && meta.error)}>
                            <Field.Label
                              color="#f5f5f5"
                              mb="0.1rem"
                              letterSpacing={"0.05rem"}
                              fontSize="14px"
                              fontWeight={"bold"}
                            >
                              Password
                            </Field.Label>
                            <div
                              className=" 
                              group
                              relative
                              flex w-full
                              items-center
                              gap-2
                              h-12
                              rounded-md
                              focus-within:shadow-[0_0_10px_#22c55e]
                            focus-within:border-[#22c55e]
                              border
                            bg-[#171717] transition duration-100"
                            >
                              {/* icon */}
                              <Box ml={3}>
                                {show && (
                                  <View
                                    size={18}
                                    className=" text-gray-400
                                 transition group-focus-within:scale-125"
                                    onClick={() => setShow((prevs) => !prevs)}
                                  />
                                )}

                                {!show && (
                                  <EyeClosed
                                    size={18}
                                    className=" text-gray-400
                                 transition group-focus-within:scale-125"
                                    onClick={() => setShow((prevs) => !prevs)}
                                  />
                                )}
                              </Box>

                              {/* input */}
                              <Input
                                {...field}
                                name="password"
                                type={show ? "text" : "password"}
                                bg="#171717"
                                placeholder="Enter your password..."
                                className="w-full bg-transparent px-3 py-2 
                     focus:outline-none"
                                border={"none"}
                                outline={"none"}
                              />
                            </div>
                            <Field.ErrorText>{meta.error}</Field.ErrorText>
                          </Field.Root>
                        )}
                      </FormikField>

                      <Stack gap={"2rem"} ref={formRef}>
                        <Box>
                          <Button
                            borderRadius={"0.5rem"}
                            width={"100%"}
                            textAlign={"center"}
                            p="1rem"
                            bg={"#8b5cf6"}
                            color="white"
                            fontWeight={"700"}
                            fontSize={"0.8rem"}
                            _hover={{
                              background: "#7c3aed",
                              color: "white",
                            }}
                            disabled={loggingUser}
                            type="submit"
                          >
                            {loggingUser ? (
                              <div className=" flex flex-center gap-2">
                                <Loader /> Loading...
                              </div>
                            ) : (
                              "Log in"
                            )}
                          </Button>
                        </Box>

                        <Box
                          as="div"
                          display={"flex"}
                          justifyContent={"center"}
                        >
                          <Text color={"#e5e5e5"}>Don't have an account? </Text>

                          <Link to="/signup">
                            <Text as="span" className="mt-3" color="#7c3aed">
                              Sign up
                            </Text>
                          </Link>
                        </Box>
                      </Stack>
                    </Stack>
                  </Form>
                </Formik>
              </div>
            </div>
          </section>
        </Box>
      )}
    </>
  );
};

export default SignIn;

import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Library, User } from "lucide-react";
import { Mail } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { View } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";
import { Form, Formik, Field as FormikField } from "formik";
import { validationForSignup } from "../../utilities/validation";
import {
  Stack,
  Field,
  Input,
  Button,
  Box,
  Text,
  Heading,
  Loader,
  Flex,
} from "@chakra-ui/react";
import { AuthQuery } from "../../lib/tanstack_query/auth";
import { AuthServices } from "../../lib/backend_api/auth";

const SignUp = () => {
  const { isAuthenticate, isLoading, checkUserAuth } = useAuthContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  // QUERIES...

  const {
    mutateAsync: createNewUser,
    isPending: creatingNewUser,
    isError: isErrorSignup,
    error: signupError,
  } = AuthQuery.useCreatingNewUser();

  const {
    mutateAsync: userLoggedIn,
    isPending: loggingUser,
    isError: isErrorSignin,
    error: signinError,
  } = AuthQuery.useLoggingUser();

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [isAuthenticate, navigate]);

  useGSAP(() => {
    // Fade in the container slightly delayed
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
    });

    // Stagger children animations
    gsap.from([logoRef.current, headingRef.current, formRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.2, // each starts 0.2s after previous
      ease: "power2.out",
    });
  }, []);

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
            className="filter brightness-75 hover:brightness-100  transition duration-300"
          />

          <section className="w-full md:w-1/2 overflow-hidden text-white h-screen flex justify-center items-center">
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
                  Sign up to your account
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
                {isErrorSignup && (
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
                    {signupError.message}
                  </Text>
                )}
              </div>

              <div ref={formRef} className="w-80">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                  }}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      const newUser = await createNewUser({
                        userName: values.name,
                        email: values.email,
                        password: values.password,
                      });

                      if (!newUser) {
                        console.log("failed to create new user");
                        return;
                      }

                      console.log("user logged in!!!");
                      console.log(newUser.data.data.user[0].useremail);
                      console.log(newUser.data.data.user[0].userpassword);
                      const session = await userLoggedIn({
                        email: newUser.data.data.user[0].useremail,
                        password: newUser.data.data.user[0].userpassword,
                      });

                      if (!session) {
                        navigate("/signin");
                        return;
                      }

                      const newUserCreated = await AuthServices.createNewUser();

                      if (!newUserCreated) {
                        console.log("failed to make new user...");
                      }
                      const isLoggedin = await checkUserAuth({
                        authenticate: true,
                      });
                      if (isLoggedin) {
                        resetForm();
                        navigate("/");
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  validationSchema={validationForSignup}
                >
                  <Form>
                    <Stack display={"flex"} flexDir="column" gap="2rem">
                      <Flex
                        gap="1rem"
                        flexDir={{
                          base: "column",
                          lg: "row",
                        }}
                      >
                        <FormikField name="name">
                          {({ field, meta }) => (
                            <Field.Root
                              invalid={!!(meta.touched && meta.error)}
                            >
                              <Field.Label
                                name="name"
                                color="#f5f5f5"
                                mb="0.1rem"
                                letterSpacing={"0.05rem"}
                                fontSize="14px"
                                fontWeight={"bold"}
                              >
                                Name
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
                                  <User
                                    size={18}
                                    className=" text-gray-400
                                                              transition group-focus-within:scale-125"
                                  />
                                </Box>

                                {/* input */}
                                <Input
                                  {...field}
                                  name="name"
                                  type="text"
                                  bg="#171717"
                                  placeholder="Enter your name..."
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
                      </Flex>
                      <FormikField name="email">
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

                      <FormikField name="password">
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

                      <Button
                        type="submit"
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
                      >
                        {creatingNewUser ? (
                          <div className="flex flex-center gap-2">
                            <Loader /> Loading...
                          </div>
                        ) : (
                          "Sign up"
                        )}
                      </Button>
                      <Text fontSize={"16px"} color="white" textAlign="center">
                        Already have an account?{" "}
                        <Link to="/signin">
                          <Text as="span" color="#7c3aed">
                            Signin
                          </Text>
                        </Link>
                      </Text>
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

export default SignUp;

// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { BACK_END_URL } from "../../../env";
// import "./registercard.css";
// const RegisterCard = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [data, setData] = useState();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const resetDefault = () => {
//     setEmail("");
//     setFirstName("");
//     setLastName("");
//     setPassword("");
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(email, password);

//     try {
//       const response = await axios.post(`${BACK_END_URL}/user/register`, {
//         first_name: firstName,
//         last_name: lastName,
//         email,
//         password,
//       });
//       setData(response.data.user);

//       console.log(response.data);
//       resetDefault();
//       navigate("/login");
//     } catch (err) {}
//   };
//   return (
//     <>
//       <div className="container">
//         <div className="box">
//           <p>{data}</p>
//           <form onSubmit={handleSubmit}>
//             <div className="input_field">
//               <label>FirstName:</label>
//               <input
//                 value={firstName}
//                 type="name"
//                 name="firstname"
//                 onChange={(e) => {
//                   setFirstName(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="input_field">
//               <label>LastName:</label>
//               <input
//                 value={lastName}
//                 type="name"
//                 name="lastname"
//                 onChange={(e) => {
//                   setLastName(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="input_field">
//               <label>Email:</label>
//               <input
//                 type="email"
//                 value={email}
//                 name="email"
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="input_field">
//               <label>Password:</label>
//               <input
//                 value={password}
//                 type="password"
//                 name="password"
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="input_field">
//               <button type="submit">Submit</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BACK_END_URL } from '../../../env';

const RegisterCard = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const resetDefault = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try {
            const response = await axios.post(`${BACK_END_URL}/user/register`, {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });
            console.log(response.data);
            resetDefault();
            history('/login');
        } catch (err) {}
    };
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                marginTop="10vh"
                spacing={8}
                mx={'auto'}
                maxW={'lg'}
                py={12}
                px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Register</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool{' '}
                        <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    minW={'lg'}
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={5}>
                            <FormControl id="fname">
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormControl id="lemail">
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>
                                        Forgot password?
                                    </Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit">
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

export default RegisterCard;

import React, { useState } from 'react';
import axios from 'axios';
import { BACK_END_URL } from '../../../env';
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
const LoginCard = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('test@test');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try {
            await axios.post(
                `${BACK_END_URL}/user/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            history('/');
        } catch (err) {}
    };
    return (
        <Stack minH={'90vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                placeholder="Email"
                                value={email}
                                type="email"
                                name="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                placeholder="Password"
                                value={password}
                                type="password"
                                name="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </FormControl>
                        <Stack spacing={6}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.500'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                colorScheme={'blue'}
                                variant={'solid'}
                                type="submit"
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />
            </Flex>
        </Stack>
    );
};

export default LoginCard;

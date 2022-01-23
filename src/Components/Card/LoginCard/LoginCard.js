import React, { useState } from 'react';
import axios from 'axios';
import { BACK_END_URL } from '../../../env';
import {
    Button,
    // Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputRightElement,
    InputGroup,
    // Link,
    Spinner,
    Stack,
    useToast,
    Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { loginUser } from '../../../redux/actions/userAuth';
import { useDispatch } from 'react-redux';

const LoginCard = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const toast = useToast();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passShow, setPassShow] = useState(false);
    const resetState = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${BACK_END_URL}/user/login`, {
                email,
                password,
            });
            dispatch(
                loginUser({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    token: response.data.token,
                    logo: response.data.logo,
                })
            );
            history('/');
        } catch (err) {
            console.log(err?.response);
            err.response?.data?.message &&
                toast({
                    title: err.response?.data?.message,
                    position: 'top-right',
                    isClosable: true,
                });
        }
        resetState();
        setLoading(false);
    };
    // console.log(passShow);
    return (
        <Stack
            minH={'100vh'}
            direction={{
                base: 'column',
                md: 'row',
            }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                required
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
                            <InputGroup size="md">
                                <Input
                                    pr="4.5rem"
                                    type={passShow ? 'text' : 'password'}
                                    // type={show ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    value={password}
                                    name="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        title="show Password"
                                        h="1.75rem"
                                        size="sm"
                                        onClick={() => {
                                            setPassShow(!passShow);
                                        }}>
                                        {passShow ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={6}>
                            <Stack
                                direction={{
                                    base: 'column',
                                    sm: 'row',
                                }}
                                align={'start'}
                                justify={'space-between'}>
                                {/* <Checkbox>Remember me</Checkbox> */}
                                {/* //TODO: mailler for forget password */}
                                {/* <Link color={'blue.500'}>Forgot password?</Link> */}
                            </Stack>
                            <Button
                                title="Login"
                                colorScheme={'blue'}
                                variant={'solid'}
                                disabled={loading ? true : false}
                                type="submit">
                                {loading ? <Spinner size="sm" /> : 'Sign in'}
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

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    HStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BACK_END_URL } from '../../../env';

const RegisterCard = () => {
    const history = useNavigate();
    const [details, setDetails] = useState({
        name: '',
        password: '',
        subTitle: '',
        punchLine: '',
        webSite: '',
        address: '',
        contact: '',
        logo: '',
        email: '',
    });

    const resetDefault = () => {
        setDetails({
            name: '',
            password: '',
            subTitle: '',
            punchLine: '',
            webSite: '',
            address: '',
            contact: '',
            logo: '',
            email: '',
        });
    };

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        setDetails({ ...details, [e.target.name]: e.target.value });
    };
    // console.log(details);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BACK_END_URL}/user/register`, details);
            // console.log(response.data);
            resetDefault();
            history('/login');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack marginTop="10vh" spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Register</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
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
                                <FormLabel>Name</FormLabel>
                                <Input
                                    required
                                    type="text"
                                    name="name"
                                    value={details.name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <HStack>
                                <FormControl id="subTitle">
                                    <FormLabel>SubTitle</FormLabel>
                                    <Input
                                        required
                                        type="text"
                                        name="subTitle"
                                        value={details.subTitle}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="punchLine">
                                    <FormLabel>PunchLine</FormLabel>
                                    <Input
                                        required
                                        type="text"
                                        name="punchLine"
                                        value={details.punchLine}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>

                            <FormControl id="address">
                                <FormLabel>Address</FormLabel>
                                <Input
                                    required
                                    type="text"
                                    name="address"
                                    value={details.address}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="contact">
                                <FormLabel>Contact</FormLabel>
                                <Input
                                    required
                                    type="text"
                                    name="contact"
                                    value={details.contact}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <HStack>
                                <FormControl id="website">
                                    <FormLabel>Website</FormLabel>
                                    <Input
                                        required
                                        type="text"
                                        name="webSite"
                                        value={details.webSite}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        required
                                        type="email"
                                        name="email"
                                        value={details.email}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        required
                                        type="password"
                                        name="password"
                                        value={details.password}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl id="logo">
                                <FormLabel>Logo</FormLabel>
                                <Input
                                    required
                                    type="text"
                                    name="logo"
                                    value={details.logo}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                {/* <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack> */}
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit">
                                    Register
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

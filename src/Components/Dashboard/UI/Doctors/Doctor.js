import React, { useEffect, useState } from 'react';
import {
    chakra,
    Flex,
    Icon,
    useColorModeValue,
    Button,
    RadioGroup,
    Radio,
    Modal,
    ModalOverlay,
    useToast,
    ModalContent,
    ModalHeader,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Box,
    ModalBody,
    ModalCloseButton,
    InputGroup,
    Stack,
    SimpleGrid,
    ButtonGroup,
    InputLeftAddon,
    IconButton,
    Spinner,
    HStack,
    FormHelperText,
} from '@chakra-ui/react';
import { AiFillEdit, AiTwotoneLock } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import { BACK_END_URL } from '../../../../env';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import { FiUserPlus } from 'react-icons/fi';
const cookie = new Cookies();

function InitialFocus({ isOpen, setOpenModal, loading, setLoading }) {
    const toast = useToast();
    const initialRef = React.useRef();
    const finalRef = React.useRef();
    const initialState = {
        name: '',
        gender: 'male',
        mobileNumber: '',
        specialization: 'MBBS',
        spec: '',
        position: '',
    };

    const [data, setData] = useState(initialState);
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    console.log(data);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${BACK_END_URL}/doctor/create`, data, {
                headers: {
                    authorization: cookie.get('session', {
                        path: '/',
                    }),
                },
            });

            toast({
                description: 'Doctor Created',
                position: 'top-right',
            });
            console.log(response);
        } catch (err) {
            console.log(err);
            toast({
                description: err.response.data?.message || "Couldn't Create",
                position: 'top-right',
                status: 'error',
            });
        }
        setOpenModal(false);
        setData(initialState);
        setLoading(false);
    };

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                size="xl"
                isOpen={isOpen}
                onClose={() => {
                    setOpenModal(false);
                    setData(initialState);
                }}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>Add Doctor</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children="Dr." />
                                        <Input
                                            required
                                            placeholder="Name"
                                            value={data.name}
                                            name="name"
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
                                <FormControl as="fieldset">
                                    <FormLabel as="legend">Gender</FormLabel>
                                    <RadioGroup defaultValue="male">
                                        <HStack>
                                            <Radio
                                                required
                                                name="gender"
                                                onChange={handleChange}
                                                value="female">
                                                Female
                                            </Radio>
                                            <Radio
                                                required
                                                name="gender"
                                                value="male"
                                                onChange={handleChange}>
                                                Male
                                            </Radio>
                                        </HStack>
                                    </RadioGroup>

                                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Specialization</FormLabel>
                                    <Input
                                        required
                                        placeholder="Spec"
                                        value={data.specialization}
                                        name="specialization"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel>Awards and Positions</FormLabel>
                                    <Input
                                        required
                                        placeholder="Member at IMA, Former Senior Resident"
                                        type="text"
                                        value={data.spec}
                                        name="spec"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel> Current Postitions </FormLabel>
                                    <Input
                                        required
                                        placeholder="Consultant Gynaecologist, Infertility Specialist & Sonologist"
                                        type="text"
                                        value={data.position}
                                        name="position"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel>Mobile</FormLabel>
                                    <Input
                                        required
                                        placeholder="8969846714"
                                        type="number"
                                        value={data.mobileNumber}
                                        name="mobileNumber"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                type="submit"
                                disabled={loading ? true : false}
                                colorScheme="blue"
                                mr={3}>
                                {loading ? <Spinner size="sm" /> : 'Save'}
                            </Button>
                            <Button
                                onClick={() => {
                                    setOpenModal(false);
                                    setData(initialState);
                                }}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

const Doctor = () => {
    // const bg = useColorModeValue(
    //     'white',
    //     'gray.800'
    // );
    // const mobileNav = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const history = useNavigate();
    const bgColor = useColorModeValue('white', 'gray.800');
    const bgColor2 = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const {
                    data: { data: response },
                } = await axios.get(`${BACK_END_URL}/doctor/getDoc`, {
                    headers: {
                        authorization: cookie.get('session', {
                            path: '/',
                        }),
                    },
                });
                console.log(response);
                setPatients(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [openModal]);
    return (
        <>
            <Box marginTop="10vh">
                <InitialFocus
                    isOpen={openModal}
                    setOpenModal={setOpenModal}
                    loading={loading}
                    setLoading={setLoading}
                />
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} marginY={5} alignItems="center">
                        <Flex
                            justify={{
                                md: 'center',
                            }}>
                            <Button
                                size="sm"
                                variant="solid"
                                onClick={() => {
                                    setOpenModal(true);
                                }}
                                leftIcon={<Icon as={FiUserPlus} />}
                                colorScheme="purple">
                                Add New Doctor
                            </Button>
                        </Flex>
                    </HStack>
                </Flex>
                <Flex
                    w="full"
                    //   bg="gray.600"
                    //   p={50}
                    alignItems="center"
                    justifyContent="center">
                    <Stack direction={{ base: 'column' }} w="full" bg={{ md: bgColor }} shadow="lg">
                        <SimpleGrid
                            spacingY={3}
                            bg={bgColor2}
                            color={bgColor3}
                            columns={{
                                base: 1,
                                md: 4,
                            }}
                            w="full"
                            py={2}
                            px={10}
                            fontWeight="hairline">
                            <span>Name</span>
                            <chakra.span
                                textOverflow="ellipsis"
                                overflow="hidden"
                                whiteSpace="nowrap">
                                Created
                            </chakra.span>
                            <Flex
                                justify={{
                                    md: 'center',
                                }}>
                                <chakra.span
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                    whiteSpace="nowrap">
                                    Data
                                </chakra.span>
                            </Flex>
                            <Flex
                                justify={{
                                    md: 'center',
                                }}>
                                Actions
                            </Flex>
                        </SimpleGrid>
                        {patients.map((token, tid) => {
                            console.log(token._id);
                            return (
                                <Flex
                                    direction={{
                                        base: 'row',
                                        md: 'column',
                                    }}
                                    bg={bgColor}
                                    key={tid}>
                                    <SimpleGrid
                                        spacingY={3}
                                        columns={{
                                            base: 4,
                                            md: 4,
                                        }}
                                        w="full"
                                        py={2}
                                        px={10}
                                        fontWeight="hairline">
                                        <span>{token.name}</span>
                                        <chakra.span
                                            textOverflow="ellipsis"
                                            overflow="hidden"
                                            whiteSpace="nowrap">
                                            {token.doc_id}
                                        </chakra.span>
                                        <Flex
                                            justify={{
                                                md: 'center',
                                            }}>
                                            <Button
                                                size="sm"
                                                variant="solid"
                                                leftIcon={<Icon as={AiTwotoneLock} />}
                                                colorScheme="purple">
                                                View Profile
                                            </Button>
                                        </Flex>
                                        <Flex
                                            justify={{
                                                md: 'center',
                                            }}>
                                            <ButtonGroup variant="solid" size="sm" spacing={3}>
                                                <IconButton
                                                    colorScheme="blue"
                                                    onClick={() => {
                                                        history(`/dashboard/doctor/${token._id}`);
                                                    }}
                                                    icon={<BsBoxArrowUpRight />}
                                                />
                                                <IconButton
                                                    colorScheme="green"
                                                    icon={<AiFillEdit />}
                                                />
                                                <IconButton
                                                    colorScheme="red"
                                                    variant="outline"
                                                    icon={<BsFillTrashFill />}
                                                />
                                            </ButtonGroup>
                                        </Flex>
                                    </SimpleGrid>
                                </Flex>
                            );
                        })}
                    </Stack>
                </Flex>
            </Box>
        </>
    );
};

export default Doctor;

import React, { useEffect, useState } from 'react';
import {
    chakra,
    Flex,
    Icon,
    useColorModeValue,
    Button,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    RadioGroup,
    Radio,
    Box,
    Stack,
    SimpleGrid,
    ButtonGroup,
    IconButton,
    Select,
    HStack,
} from '@chakra-ui/react';
import { AiFillEdit, AiTwotoneLock } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import { BACK_END_URL } from '../../../../env';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import { FiUserPlus } from 'react-icons/fi';
import ButtonLoader from '../../../Util/ButtonLoader';
const cookie = new Cookies();

function InitialFocus({ isOpen, setOpenModalPt, loading, setLoading }) {
    const toast = useToast();
    const initialRef = React.useRef();
    const finalRef = React.useRef();
    const initialState = {
        name: '',
        email: '',
        gender: 'male',
        address: '',
        age: '',
        mobileNumber: '',
        docId: '',
        docName: '',
    };

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const [data, setData] = useState(initialState);
    const [doc, setDoc] = useState([]);

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
                console.log('Doc List', response);
                setDoc(response);
                setData({ ...data, docId: response[0]._id, docName: response[0].name });
            } catch (error) {
                console.log(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmitPt = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(data);
        try {
            const { data: response } = await axios.post(`${BACK_END_URL}/patient/create`, data, {
                headers: {
                    authorization: cookie.get('session', { path: '/' }),
                },
            });
            toast({
                description: 'Patient Created',
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
        setLoading(false);
        setData(initialState);
        setOpenModalPt(false);
    };
    console.log(data);
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                size="xl"
                isOpen={isOpen}
                onClose={() => {
                    setOpenModalPt(false);
                    setData(initialState);
                }}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmitPt}>
                        <ModalHeader>Create Patient</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        required
                                        placeholder="Name"
                                        value={data.name}
                                        name="name"
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        placeholder="Email"
                                        value={data.email}
                                        name="email"
                                        onChange={handleChange}
                                    />
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
                                    {/* <FormHelperText>
                                    Select only if you're a fan.
                                </FormHelperText> */}
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Address</FormLabel>
                                    <Input
                                        required
                                        placeholder="Address"
                                        value={data.address}
                                        name="address"
                                        onChange={handleChange}
                                    />
                                    {/* <Textarea
                                        borderRadius="xs"
                                        placeholder="Here is a sample placeholder"
                                        size="xs"
                                    /> */}
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
                                <FormControl as="fieldset">
                                    <FormLabel as="legend">Age</FormLabel>
                                    <Input
                                        required
                                        placeholder="Age"
                                        type="text"
                                        value={data.age}
                                        name="age"
                                        onChange={handleChange}
                                    />

                                    {/* <FormHelperText>
                                    Select only if you're a fan.
                                </FormHelperText> */}
                                </FormControl>
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
                            <FormControl>
                                <FormLabel>Select Doctor</FormLabel>
                                {doc && (
                                    <Select
                                        required
                                        variant="outline"
                                        name="docId"
                                        // placeholder=" "
                                        onChange={(e) => {
                                            // handleChange(e);
                                            const docItem = doc.find(
                                                (item) => item._id === e.target.value
                                            );
                                            setData({
                                                ...data,
                                                docId: e.target.value,
                                                docName: docItem.name,
                                            });
                                            console.log(
                                                doc.find((item) => item._id === e.target.value)
                                            );
                                        }}
                                        value={data.docId}>
                                        {doc.map((doctor, index) => {
                                            // console.log(doctor._id);
                                            return (
                                                <option key={index} value={doctor._id}>
                                                    {doctor.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                )}
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            {/* <Button colorScheme="blue" mr={3} type="submit">
                                Save
                            </Button> */}
                            <ButtonLoader
                                loading={loading}
                                text="Save"
                                colorScheme="blue"
                                mr={3}
                                type="submit"
                            />
                            <Button
                                onClick={() => {
                                    setOpenModalPt(false);
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

const Patient = () => {
    // const bg = useColorModeValue(
    //     'white',
    //     'gray.800'
    // );
    // const mobileNav = useDisclosure();
    const [openPtModal, setOpenPtModal] = useState(false);
    const history = useNavigate();
    const bgColor = useColorModeValue('white', 'gray.800');
    const bgColor2 = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const {
                    data: { data: response },
                } = await axios.get(`${BACK_END_URL}/patient/all`, {
                    headers: {
                        authorization: cookie.get('session', {
                            path: '/',
                        }),
                    },
                });
                // console.log(response);
                setPatients(response);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, [openPtModal]);

    return (
        <>
            <Box marginTop="10vh">
                <InitialFocus
                    isOpen={openPtModal}
                    setOpenModalPt={setOpenPtModal}
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
                                    // setOpenModal(true);
                                    setOpenPtModal(true);
                                }}
                                leftIcon={<Icon as={FiUserPlus} />}
                                colorScheme="purple">
                                Create New Patient
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
                                {/* <Button
              size="sm"
              variant="solid"
              leftIcon={<Icon as={AiTwotoneLock} />}
              colorScheme="purple"
            >
              View Profile
            </Button> */}
                            </Flex>
                            <Flex
                                justify={{
                                    md: 'center',
                                }}>
                                Actions
                            </Flex>
                        </SimpleGrid>
                        {patients.map((token, tid) => {
                            // console.log(token._id);
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
                                            {token.pt_id}
                                        </chakra.span>
                                        {/* <chakra.span
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                    whiteSpace="nowrap"
                                >
                                    {token._id}
                                </chakra.span> */}
                                        {/* <span>{token.mobile_number}</span> */}

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
                                                        history(
                                                            `/dashboard/prescription/${token._id}`
                                                        );
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

export default Patient;

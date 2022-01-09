import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    chakra,
    Flex,
    Icon,
    useColorModeValue,
    Button,
    Box,
    Stack,
    HStack,
    Select,
    SimpleGrid,
    ButtonGroup,
    FormControl,
    FormLabel,
    IconButton,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import Cookies from 'universal-cookie';
// import { useNavigate } from 'react-router';
import { BACK_END_URL } from '../../env';
import { differenceInDays, format } from 'date-fns';

const cookie = new Cookies();

const DoctorDash = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // console.log('doc Active id', id);
    // const history = useNavigate();
    const bgColor2 = useColorModeValue('white', 'gray.800');
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');
    // const bgColor = useColorModeValue('gray.200', 'white');
    // const bgColor2 = useColorModeValue('white', 'gray.900');
    // const bgColor3 = useColorModeValue('gray.500');
    const [patients, setPatients] = useState([]);
    const gridColumns = 6;
    useEffect(() => {
        (async () => {
            try {
                const {
                    data: { data: response },
                } = await axios.post(
                    `${BACK_END_URL}/patient/all`,
                    { docId: id },
                    {
                        headers: {
                            authorization: cookie.get('session', {
                                path: '/',
                            }),
                        },
                    }
                );
                console.log(response);
                setPatients(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

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
                // console.log('Doc List', response);
                setDoc(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <Flex>
                <Box marginTop="10vh" w="full">
                    <Flex
                        w="full"
                        h="90vh"
                        // bg="gray.900"
                        bg={bgColor2}
                        // marginTop={}
                        py={10}
                        px={25}
                        // alignItems="center"
                        flexDirection={'column'}
                        // justifyContent="center"
                    >
                        <HStack
                            display="flex"
                            // bg="gray.900"
                            bg={bgColor2}
                            spacing={7}
                            marginY={5}
                            alignItems="center">
                            <Flex justify={'center'} alignItems={'center'}>
                                <FormControl>
                                    <HStack>
                                        <FormLabel width={200}>Active Doctor:</FormLabel>
                                        <Select
                                            required
                                            variant="outline"
                                            name="docId"
                                            value={id}
                                            placeholder=" "
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                navigate(`/doctorPanel/${e.target.value}`, {
                                                    replace: true,
                                                });
                                            }}>
                                            {doc.map((doctor, index) => {
                                                // console.log(doctor._id);
                                                return (
                                                    <option key={index} value={doctor._id}>
                                                        {doctor.name}
                                                    </option>
                                                );
                                            })}
                                        </Select>
                                    </HStack>
                                </FormControl>

                                {/* <Button
                                    size="sm"
                                    variant="solid"
                                    onClick={() => {
                                        // setOpenModal(true);
                                        // setOpenPtModal(true);
                                    }}
                                    leftIcon={<Icon as={FiUserPlus} />}
                                    colorScheme="purple">
                                    Create New Patient
                                </Button> */}
                            </Flex>
                        </HStack>
                        <Stack
                            direction={{ base: 'column' }}
                            bg={{ md: bgColor }}
                            w="full"
                            shadow="lg">
                            <SimpleGrid
                                spacingY={3}
                                // bg={bgColor2}
                                bg={bgColor}
                                color={bgColor3}
                                columns={gridColumns}
                                justifyItems="center"
                                // columns={{
                                //     base: 3,
                                //     md: 3,
                                // }}
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
                                <chakra.span
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                    whiteSpace="nowrap">
                                    Recent Visit
                                </chakra.span>
                                <chakra.span
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                    whiteSpace="nowrap">
                                    Time
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
                                const dateDiff = differenceInDays(
                                    new Date(),
                                    new Date(token.updatedAt)
                                );
                                return (
                                    <Flex
                                        direction={{
                                            base: 'row',
                                            md: 'column',
                                        }}
                                        // bg={bgColor}
                                        bg={bgColor2}
                                        key={tid}>
                                        <SimpleGrid
                                            spacingY={3}
                                            // columns={{
                                            //     base: 4,
                                            //     md: 4,
                                            // }}
                                            columns={gridColumns}
                                            justifyItems="center"
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
                                            <chakra.span
                                                textOverflow="ellipsis"
                                                overflow="hidden"
                                                whiteSpace="nowrap">
                                                {dateDiff === 0 ? 'Today' : `${dateDiff} Days Ago`}
                                            </chakra.span>
                                            <chakra.span
                                                textOverflow="ellipsis"
                                                overflow="hidden"
                                                whiteSpace="nowrap">
                                                {format(new Date(token.updatedAt), 'hh:mm:aa')}
                                            </chakra.span>
                                            <Flex
                                                justify={{
                                                    md: 'center',
                                                }}>
                                                <Button
                                                    size="sm"
                                                    variant="solid"
                                                    onClick={() => {
                                                        navigate(`/prescription/${token._id}`);
                                                    }}
                                                    leftIcon={<Icon as={BsBoxArrowUpRight} />}
                                                    colorScheme="purple">
                                                    View
                                                </Button>
                                            </Flex>
                                            <Flex
                                                justify={{
                                                    md: 'center',
                                                }}>
                                                <ButtonGroup variant="solid" size="sm" spacing={3}>
                                                    {/* <IconButton
                                                        colorScheme="blue"
                                                        onClick={() => {
                                                            history(
                                                                `/doctorPanel/${token._id}`
                                                            );
                                                        }}
                                                        icon={
                                                            <BsBoxArrowUpRight />
                                                        }
                                                    /> */}
                                                    <IconButton
                                                        colorScheme="green"
                                                        icon={
                                                            <AiFillEdit
                                                                onClick={() => {
                                                                    console.log(
                                                                        'Clicked Iframe opne '
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                    />

                                                    <IconButton
                                                        colorScheme="red"
                                                        variant="outline"
                                                        icon={<BsFillTrashFill />}
                                                        //TODO Add modal to prompt confirm delete and toast on deletion
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
            </Flex>
        </>
    );
};

export default DoctorDash;

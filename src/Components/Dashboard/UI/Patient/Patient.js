import React, { useEffect, useState } from 'react';
import {
    chakra,
    Flex,
    Icon,
    useColorModeValue,
    Button,
    Box,
    Stack,
    SimpleGrid,
    ButtonGroup,
    IconButton,
    HStack,
} from '@chakra-ui/react';
import { AiFillEdit, AiTwotoneLock } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import { BACK_END_URL } from '../../../../env';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import { FiUserPlus } from 'react-icons/fi';
import { EditModal } from './Modal/PtEditModal';
import { InitialFocus } from './Modal/PtInitialFocus';
const cookie = new Cookies();

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
    const [openEditModal, setOpenEditMoal] = useState(false);
    const [reloadPatient, setReload] = useState(false);
    const [ptIndextoEdit, setPtToEdit] = useState();
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
                setPatients(response);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, [reloadPatient]);

    return (
        <>
            <Box marginTop="10vh">
                {openEditModal && (
                    <EditModal
                        isOpen={openEditModal}
                        setOpenModalPt={setOpenEditMoal}
                        loading={loading}
                        setLoading={setLoading}
                        setReload={setReload}
                        reload={reloadPatient}
                        ptDetails={patients[ptIndextoEdit]}
                    />
                )}

                {openPtModal && (
                    <InitialFocus
                        isOpen={openPtModal}
                        setOpenModalPt={setOpenPtModal}
                        loading={loading}
                        setLoading={setLoading}
                        setReload={setReload}
                        reload={reloadPatient}
                    />
                )}
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
                                base: 5,
                                md: 5,
                            }}
                            w="full"
                            py={2}
                            px={10}
                            fontWeight="hairline">
                            <chakra.span
                                textOverflow="ellipsis"
                                overflow="hidden"
                                whiteSpace="nowrap">
                                Patient ID
                            </chakra.span>
                            <span>Name</span>
                            <span>Doctor Assigned</span>
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
                                            base: 5,
                                            md: 5,
                                        }}
                                        w="full"
                                        py={2}
                                        px={10}
                                        fontWeight="hairline">
                                        <chakra.span
                                            textOverflow="ellipsis"
                                            overflow="hidden"
                                            whiteSpace="nowrap">
                                            {token.pt_id}
                                        </chakra.span>
                                        <span>{token.name}</span>
                                        <span>{token.doctor.name}</span>
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
                                                    onClick={() => {
                                                        // console.log('SELECTED ITd', tid);
                                                        setPtToEdit(tid);
                                                        setOpenEditMoal(true);
                                                    }}
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

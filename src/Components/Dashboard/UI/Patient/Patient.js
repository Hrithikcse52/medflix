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
    useToast,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import { IoCreateOutline } from 'react-icons/io5';
import axios from 'axios';
import { BACK_END_URL } from '../../../../env';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import { FiUserPlus } from 'react-icons/fi';
import { EditModal } from './Modal/PtEditModal';
import { InitialFocus } from './Modal/PtInitialFocus';
import { Loader } from '../../../Util/Loader';
import { ConfirmModal } from '../../../Util/ConfirmModal';
const cookie = new Cookies();

const Patient = () => {
    const [openPtModal, setOpenPtModal] = useState(false);
    const history = useNavigate();
    const toast = useToast();
    const bgColor = useColorModeValue('white', 'gray.800');
    const bgColor2 = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openEditModal, setOpenEditMoal] = useState(false);
    const [reloadPatient, setReload] = useState(false);
    const [ptIndextoEdit, setPtToEdit] = useState();
    const [ptIndextoDelete, setPtToDelete] = useState();
    const [deleteConfirmModal, setDeleteConfModal] = useState(false);
    const handleDelete = async () => {
        console.log('called', ptIndextoDelete);
        try {
            const response = await axios.delete(`${BACK_END_URL}/patient/at/${ptIndextoDelete}`, {
                headers: {
                    authorization: cookie.get('session', {
                        path: '/',
                    }),
                },
            });
            toast({
                title: response.data.message ?? 'Delete was Succesfull',
                position: 'top-right',
                isClosable: true,
            });
        } catch (err) {
            console.log(err);
            toast({
                description: err.response?.data?.message || "Couldn't delete",
                position: 'top-right',
                status: 'error',
            });
        }
        setReload(!reloadPatient);
        setDeleteConfModal(false);
    };

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
                        // loading={loading}
                        // setLoading={setLoading}
                        setReload={setReload}
                        reload={reloadPatient}
                    />
                )}

                {deleteConfirmModal && (
                    <ConfirmModal
                        isOpen={deleteConfirmModal}
                        onClose={setDeleteConfModal}
                        onClick={handleDelete}
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
                <Flex w="full" alignItems="center" justifyContent="center">
                    {loading ? (
                        <Loader />
                    ) : (
                        <Stack
                            direction={{ base: 'column' }}
                            w="full"
                            bg={{ md: bgColor }}
                            shadow="lg">
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
                                    Date
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
                                const date = new Date(token.updatedAt);
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
                                                {date.toDateString()}
                                            </chakra.span>
                                            <span>
                                                {token.name},({token.pt_id})
                                            </span>
                                            <span>{token.doctor.name}</span>
                                            <Flex
                                                justify={{
                                                    md: 'center',
                                                }}>
                                                <Button
                                                    title="View Profile"
                                                    size="sm"
                                                    onClick={() => {
                                                        history(`/dashboard/patient/${token._id}`, {
                                                            state: { token },
                                                        });
                                                    }}
                                                    variant="solid"
                                                    leftIcon={<Icon as={BsBoxArrowUpRight} />}
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
                                                        title="Create Prescription"
                                                        onClick={() => {
                                                            history(
                                                                `/dashboard/prescription/${token._id}`
                                                            );
                                                        }}
                                                        icon={<IoCreateOutline />}
                                                    />

                                                    <IconButton
                                                        colorScheme="green"
                                                        title="Edit Profile"
                                                        onClick={() => {
                                                            // console.log('SELECTED ITd', tid);
                                                            setPtToEdit(tid);
                                                            setOpenEditMoal(true);
                                                        }}
                                                        icon={<AiFillEdit />}
                                                    />
                                                    <IconButton
                                                        colorScheme="red"
                                                        onClick={() => {
                                                            setPtToDelete(token._id);
                                                            setDeleteConfModal(true);
                                                        }}
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
                    )}
                </Flex>
            </Box>
        </>
    );
};

export default Patient;

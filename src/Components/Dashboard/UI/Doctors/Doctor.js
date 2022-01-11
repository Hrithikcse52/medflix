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
import { InitialFocus } from './Modal/DocInitialFocus';
import { DocEditModal } from './Modal/DocEditModal';
const cookie = new Cookies();

const Doctor = () => {
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [docIndex, setDocIndex] = useState(0);
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
    }, [reload]);
    return (
        <>
            <Box marginTop="10vh">
                {openModal && (
                    <InitialFocus
                        isOpen={openModal}
                        setOpenModal={setOpenModal}
                        loading={loading}
                        setLoading={setLoading}
                    />
                )}
                {openEditModal && (
                    <DocEditModal
                        isOpen={openEditModal}
                        setOpenModal={setOpenEditModal}
                        setReload={setReload}
                        reload={reload}
                        docDetails={patients[docIndex]}
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
                                                    onClick={() => {
                                                        console.log('Edit Clicked');
                                                        setDocIndex(tid);
                                                        setOpenEditModal(true);
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

export default Doctor;

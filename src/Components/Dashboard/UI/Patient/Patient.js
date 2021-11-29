import React, { useEffect, useState } from 'react';
import {
    chakra,
    Flex,
    Icon,
    useColorModeValue,
    Button,
    // useBreakpointValue,
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
const cookie = new Cookies();

const Patient = ({ update, setOpenModal }) => {
    // const bg = useColorModeValue(
    //     'white',
    //     'gray.800'
    // );
    // const mobileNav = useDisclosure();
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
                } = await axios.get(
                    `${BACK_END_URL}/patient/all`,
                    // {
                    //     withCredentials: true,
                    // }
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
    }, [update]);

    // const data = [
    //     { name: 'Daggy', created: '7 days ago' },
    //     { name: 'Anubra', created: '23 hours ago' },
    //     { name: 'Josef', created: 'A few seconds ago' },
    //     { name: 'Sage', created: 'A few hours ago' },
    // ];
    return (
        <>
            <Box marginTop="10vh">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mx="auto">
                    <HStack
                        display="flex"
                        spacing={3}
                        marginY={5}
                        alignItems="center">
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
                    <Stack
                        direction={{ base: 'column' }}
                        w="full"
                        bg={{ md: bgColor }}
                        shadow="lg">
                        {/* <SimpleGrid
                    //   style={{
                    //     display: "flex",
                    //     flexDirection: "row",
                    //     justifyContent: "space-between",
                    //   }}
                    spacingY={3}
                    columns={{ base: 1, md: 4 }}
                    w={{ base: 120, md: 'full' }}
                    textTransform="uppercase"
                    bg={bgColor2}
                    color={bgColor3}
                    py={{ base: 1, md: 4 }}
                    px={{ base: 2, md: 10 }}
                    fontSize="md"
                    fontWeight="hairline"
                    display="table-header-group"
                >
                    <span>Name</span>
                    <span>Created</span>
                    <span>Data</span>
                    <chakra.span textAlign={{ md: 'right' }}>
                        Actions
                    </chakra.span>
                </SimpleGrid> */}
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
                            {/* <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                    >
                        Created
                    </chakra.span> */}
                            {/* <span>Name</span> */}

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
                                                leftIcon={
                                                    <Icon as={AiTwotoneLock} />
                                                }
                                                colorScheme="purple">
                                                View Profile
                                            </Button>
                                        </Flex>
                                        <Flex
                                            justify={{
                                                md: 'center',
                                            }}>
                                            <ButtonGroup
                                                variant="solid"
                                                size="sm"
                                                spacing={3}>
                                                <IconButton
                                                    colorScheme="blue"
                                                    onClick={() => {
                                                        history(
                                                            `/patient/${token._id}`
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

import React from 'react';
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
import { FiUserPlus } from 'react-icons/fi';

export const PrescriptionIndex = () => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const bgColor2 = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');
    return (
        <>
            <Box marginTop="10vh">
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} marginY={5} alignItems="center">
                        <Flex
                            justify={{
                                md: 'center',
                            }}>
                            <Button
                                size="sm"
                                variant="solid"
                                // onClick={() => {
                                //     // setOpenModal(true);
                                //     setOpenPtModal(true);
                                // }}
                                leftIcon={<Icon as={FiUserPlus} />}
                                colorScheme="purple">
                                Create New Patient
                            </Button>
                        </Flex>
                    </HStack>
                </Flex>
                <Flex w="full" alignItems="center" justifyContent="center">
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
                        <Flex
                            direction={{
                                base: 'row',
                                md: 'column',
                            }}
                            bg={bgColor}>
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
                                    {/* {token.pt_id} */}
                                    hello
                                </chakra.span>
                                {/* <span>{token.name}</span> */}
                                <span>Nameasdasd</span>
                                <span>asdasd</span>
                                <Flex
                                    justify={{
                                        md: 'center',
                                    }}>
                                    <Button
                                        title="View Profile"
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
                                            title="Create Prescription"
                                            onClick={() => {
                                                // history(`/dashboard/prescription/${token._id}`);
                                            }}
                                            icon={<BsBoxArrowUpRight />}
                                        />

                                        <IconButton
                                            colorScheme="green"
                                            title="Edit Profile"
                                            onClick={() => {
                                                // console.log('SELECTED ITd', tid);
                                                // setPtToEdit(tid);
                                                // setOpenEditMoal(true);
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
                    </Stack>
                </Flex>
            </Box>
        </>
    );
};

import {
    Button,
    ButtonGroup,
    chakra,
    Flex,
    Icon,
    IconButton,
    SimpleGrid,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillEdit, AiTwotoneLock } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const TableComponent = ({ tableData, iconSet, tableHeaders }) => {
    const history = useNavigate();
    const bgColor = useColorModeValue('white', 'gray.800');
    const bgColor2 = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');
    return (
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
                    <chakra.span textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                        Created
                    </chakra.span>
                    <Flex
                        justify={{
                            md: 'center',
                        }}>
                        <chakra.span textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
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
                {tableData.map((token, tid) => {
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
                                                history(`/dashboard/prescription/${token._id}`);
                                            }}
                                            icon={<BsBoxArrowUpRight />}
                                        />
                                        <IconButton colorScheme="green" icon={<AiFillEdit />} />
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
    );
};

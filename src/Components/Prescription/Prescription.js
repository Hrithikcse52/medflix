import {
    Box,
    Button,
    ButtonGroup,
    chakra,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
    IconButton,
    Input,
    SimpleGrid,
    Stack,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { BACK_END_URL } from '../../env';
import { cookie } from '../../utils';

const Prescription = () => {
    const { id } = useParams();
    const [ptData, setPtData] = useState({});
    useMemo(() => {
        (async () => {
            try {
                const { data: response } = await axios.get(`${BACK_END_URL}/patient/${id}`, {
                    headers: {
                        authorization: cookie.get('session', {
                            path: '/',
                        }),
                    },
                });
                setPtData(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <Stack>
            <Box marginTop={'10vh'} bg={useColorModeValue('inherit', 'inherit')} p={10}>
                {/* <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
                    <Box py={5}>
                        <Box
                            borderTop="solid 1px"
                            borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}></Box>
                    </Box>
                </Box> */}

                <Box alignItems={'center'} justifyContent={'center'}>
                    <chakra.form
                        onSubmit={handleSubmit}
                        shadow="base"
                        rounded={[null, 'md']}
                        overflow={{ sm: 'hidden' }}>
                        <Stack
                            // px={4}
                            // py={5}
                            p={[0, 6]}
                            bg={useColorModeValue('white', 'gray.700')}
                            spacing={6}>
                            <SimpleGrid columns={6} spacing={6}>
                                <FormControl as={GridItem} colSpan={[6, 2]}>
                                    <FormLabel
                                        htmlFor="first_name"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Name
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        autoComplete="given-name"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        value={ptData.name}
                                        rounded="md"
                                    />
                                </FormControl>
                                <FormControl as={GridItem} colSpan={[6, 2]}>
                                    <FormLabel
                                        htmlFor="mobile_number"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Mobile Number
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        name="mobile"
                                        id="mobile"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        value={ptData.mobile_number}
                                        rounded="md"
                                    />
                                </FormControl>
                                <FormControl as={GridItem} colSpan={[3, 1]}>
                                    <FormLabel
                                        htmlFor="last_name"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Age
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        name="age"
                                        id="age"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                        value={ptData.age}
                                    />
                                </FormControl>
                                <FormControl as={GridItem} colSpan={[3, 1]}>
                                    <FormLabel
                                        htmlFor="last_name"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Sex
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="age"
                                        id="age"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                        value={ptData.gender}
                                    />
                                </FormControl>
                                <FormLabel
                                    as={GridItem}
                                    colSpan={[6, 6]}
                                    htmlFor="email_address"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color={useColorModeValue('gray.700', 'gray.50')}>
                                    Vitals
                                </FormLabel>
                                <FormControl as={GridItem} colSpan={[2, 2]}>
                                    <FormLabel
                                        htmlFor="country"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        BP
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="complaint"
                                        id="complaint"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>
                                <FormControl as={GridItem} colSpan={[2, 1]}>
                                    <FormLabel
                                        htmlFor="country"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Pulse
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="complaint"
                                        id="complaint"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>
                                <FormControl as={GridItem} colSpan={[2, 1]}>
                                    <FormLabel
                                        htmlFor="country"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Weight
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="complaint"
                                        id="complaint"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>
                                <FormControl as={GridItem} colSpan={[2, 1]}>
                                    <FormLabel
                                        htmlFor="country"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Height
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="complaint"
                                        id="complaint"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>
                                <FormControl as={GridItem} colSpan={[2, 1]}>
                                    <FormLabel
                                        htmlFor="country"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Temperature
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="complaint"
                                        id="complaint"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>
                                <FormControl as={GridItem} colSpan={[6, 6]}>
                                    <FormLabel
                                        htmlFor="email_address"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Complaint
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="complaint"
                                        id="complaint"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>
                                <FormControl as={GridItem} colSpan={[6, 6]}>
                                    <FormLabel
                                        htmlFor="email_address"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={useColorModeValue('gray.700', 'gray.50')}>
                                        Diagnosis
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        name="complaint"
                                        id="complaint"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        w="full"
                                        rounded="md"
                                    />
                                </FormControl>

                                <Table />
                            </SimpleGrid>
                        </Stack>
                        <Box
                            px={{ base: 4, sm: 6 }}
                            py={3}
                            bg={useColorModeValue('gray.50', 'gray.900')}
                            textAlign="right">
                            <Button
                                type="submit"
                                colorScheme="brand"
                                _focus={{ shadow: '' }}
                                fontWeight="md">
                                Save
                            </Button>
                        </Box>
                    </chakra.form>
                </Box>

                <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
                    <Box py={5}>
                        <Box
                            borderTop="solid 1px"
                            borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}></Box>
                    </Box>
                </Box>
            </Box>
        </Stack>
    );
};

function Table() {
    const header = ['name', 'created', 'actions'];
    const data = [
        { name: 'Daggy', created: '7 days ago' },
        { name: 'Anubra', created: '23 hours ago' },
        { name: 'Josef', created: 'A few seconds ago' },
        { name: 'Sage', created: 'A few hours ago' },
    ];
    return (
        <Flex w="full" bg="gray.600" p={50} alignItems="center" justifyContent="center">
            <Table
                w="full"
                bg={useColorModeValue('white', 'gray.800')}
                display={{
                    base: 'block',
                    md: 'table',
                }}
                sx={{
                    '@media print': {
                        display: 'table',
                    },
                }}>
                <Thead
                    display={{
                        base: 'none',
                        md: 'table-header-group',
                    }}
                    sx={{
                        '@media print': {
                            display: 'table-header-group',
                        },
                    }}>
                    <Tr>
                        {header.map((x) => (
                            <Th key={x}>{x}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody
                    display={{
                        base: 'block',
                        lg: 'table-row-group',
                    }}
                    sx={{
                        '@media print': {
                            display: 'table-row-group',
                        },
                    }}>
                    {data.map((token, tid) => {
                        return (
                            <Tr
                                key={tid}
                                display={{
                                    base: 'grid',
                                    md: 'table-row',
                                }}
                                sx={{
                                    '@media print': {
                                        display: 'table-row',
                                    },
                                    gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
                                    gridGap: '10px',
                                }}>
                                {Object.keys(token).map((x) => {
                                    return (
                                        <React.Fragment key={`${tid}${x}`}>
                                            <Td
                                                display={{
                                                    base: 'table-cell',
                                                    md: 'none',
                                                }}
                                                sx={{
                                                    '@media print': {
                                                        display: 'none',
                                                    },
                                                    textTransform: 'uppercase',
                                                    // color: useColorModeValue(
                                                    //     'gray.400',
                                                    //     'gray.400'
                                                    // ),
                                                    fontSize: 'xs',
                                                    fontWeight: 'bold',
                                                    letterSpacing: 'wider',
                                                    fontFamily: 'heading',
                                                }}>
                                                {x}
                                            </Td>
                                            <Td
                                                // color={useColorModeValue('gray.500')}
                                                fontSize="md"
                                                fontWeight="hairline">
                                                {token[x]}
                                            </Td>
                                        </React.Fragment>
                                    );
                                })}
                                <Td
                                    display={{
                                        base: 'table-cell',
                                        md: 'none',
                                    }}
                                    sx={{
                                        '@media print': {
                                            display: 'none',
                                        },
                                        textTransform: 'uppercase',
                                        color: 'inherit',
                                        fontSize: 'xs',
                                        fontWeight: 'bold',
                                        letterSpacing: 'wider',
                                        fontFamily: 'heading',
                                    }}>
                                    Actions
                                </Td>
                                <Td>
                                    <ButtonGroup variant="solid" size="sm" spacing={3}>
                                        <IconButton
                                            colorScheme="blue"
                                            icon={<BsBoxArrowUpRight />}
                                        />
                                        <IconButton colorScheme="green" icon={<AiFillEdit />} />
                                        <IconButton
                                            colorScheme="red"
                                            variant="outline"
                                            icon={<BsFillTrashFill />}
                                        />
                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Flex>
    );
}

export default Prescription;

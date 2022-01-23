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
    Text,
    ListItem,
    List,
    StackDivider,
    Heading,
    Container,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { BACK_END_URL } from '../../env';
import { differenceInDays, format } from 'date-fns';
import { Loader } from '../Util/Loader';

const cookie = new Cookies();

const DoctorDash = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const bgColor2 = useColorModeValue('white', 'gray.800');
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');
    const [patients, setPatients] = useState([]);
    const [doc, setDoc] = useState([]);
    const [activeDoc, setActiveDoc] = useState({});
    const gridColumns = 6;
    useEffect(() => {
        setLoading(true);
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
                console.log('resp', response);
                setDoc(response);
                console.log('Doc List', doc);
                setActiveDoc(response.find((doc) => doc._id === id));
                console.log(
                    'find active',
                    response.find((doc) => doc._id === id)
                );
                console.log(activeDoc);
            } catch (error) {
                console.log(error);
            }
        })();
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

                setPatients(response);
            } catch (error) {
                console.log(error);
            }
        })();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            <Box marginTop="10vh">
                {loading ? (
                    <Loader />
                ) : (
                    <Container maxW={'7xl'}>
                        <HStack display="flex" spacing={7} marginY={5} alignItems="center">
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
                                                navigate(`/dashboard/doctor/${e.target.value}`, {
                                                    replace: true,
                                                });
                                            }}>
                                            {doc.map((doctor, index) => {
                                                return (
                                                    <option key={index} value={doctor._id}>
                                                        {doctor.name}
                                                    </option>
                                                );
                                            })}
                                        </Select>
                                    </HStack>
                                </FormControl>
                            </Flex>
                        </HStack>
                        <SimpleGrid
                            spacing={{ base: 8, md: 10 }}
                            // py={{ base: 18, md: 24 }}
                        >
                            <Stack spacing={{ base: 6, md: 10 }}>
                                <Box as={'header'}>
                                    <Heading
                                        lineHeight={1.1}
                                        fontWeight={600}
                                        fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                        Doctor Details
                                    </Heading>
                                </Box>

                                <Stack
                                    spacing={{ base: 4, sm: 6 }}
                                    direction={'column'}
                                    divider={<StackDivider borderColor={'gray.600'} />}>
                                    <Box>
                                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                            <List spacing={2}>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Name{': '}
                                                    </chakra.span>
                                                    {activeDoc?.name ?? 'loading'}
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Gender{': '}
                                                    </chakra.span>

                                                    <chakra.span textTransform={'capitalize'}>
                                                        {activeDoc?.gender}
                                                    </chakra.span>
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Specialization {': '}
                                                    </chakra.span>
                                                    {activeDoc?.specialization}
                                                </ListItem>
                                            </List>
                                            <List spacing={2}>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Contact{': '}
                                                    </chakra.span>
                                                    {activeDoc?.mobile_number}
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Position{': '}
                                                    </chakra.span>
                                                    <chakra.span>{activeDoc?.position}</chakra.span>
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Experiences {': '}
                                                    </chakra.span>
                                                    {activeDoc?.spec?.join(', ')}
                                                </ListItem>
                                            </List>
                                        </SimpleGrid>
                                    </Box>
                                    <Box>
                                        <Text
                                            fontSize={{ base: '16px', lg: '18px' }}
                                            color={'blue.300'}
                                            fontWeight={'500'}
                                            textTransform={'capitalize'}
                                            mb={'4'}>
                                            Patient history
                                        </Text>
                                    </Box>
                                </Stack>
                            </Stack>
                        </SimpleGrid>
                        <Flex>
                            <Box w="full">
                                <Flex
                                    w="full"
                                    flexDirection={'column'}
                                    // justifyContent="center"
                                >
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
                                                            {dateDiff === 0
                                                                ? 'Today'
                                                                : `${dateDiff} Days Ago`}
                                                        </chakra.span>
                                                        <chakra.span
                                                            textOverflow="ellipsis"
                                                            overflow="hidden"
                                                            whiteSpace="nowrap">
                                                            {format(
                                                                new Date(token.updatedAt),
                                                                'hh:mm:aa'
                                                            )}
                                                        </chakra.span>
                                                        <Flex
                                                            justify={{
                                                                md: 'center',
                                                            }}>
                                                            <Button
                                                                size="sm"
                                                                variant="solid"
                                                                onClick={() => {
                                                                    navigate(
                                                                        `/dashboard/patient/${token._id}`
                                                                    );
                                                                }}
                                                                leftIcon={
                                                                    <Icon as={BsBoxArrowUpRight} />
                                                                }
                                                                colorScheme="purple">
                                                                View
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
                    </Container>
                )}
            </Box>
        </>
    );
};

export default DoctorDash;

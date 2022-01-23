import React, { useMemo, useState } from 'react';
import {
    chakra,
    Flex,
    Icon,
    Button,
    Box,
    Stack,
    SimpleGrid,
    HStack,
    Container,
    Heading,
    StackDivider,
    List,
    ListItem,
    Image,
    useClipboard,
    useToast,
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { Loader } from '../Util/Loader';
import axios from 'axios';
import { BACK_END_URL, FRONT_END_URL } from '../../env';
import { useSelector } from 'react-redux';
import { toDataURL } from 'qrcode';
import { FiCopy } from 'react-icons/fi';

export const AboutUser = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.profile);
    const toast = useToast();
    const [userDetail, setUserDetail] = useState({});
    const [imageqr, setQrImage] = useState('');
    const { onCopy } = useClipboard(`${FRONT_END_URL}/reg/${user.id}`);
    const generateQr = async () => {
        const qr = await toDataURL(`${FRONT_END_URL}/reg/${user.id}`);
        setQrImage(qr);
        return qr;
    };

    useMemo(() => {
        setLoading(true);
        (async () => {
            try {
                await generateQr();
                const { data: userData } = await axios.get(`${BACK_END_URL}/user/detail`, {
                    params: { user_id: user.id },
                });
                setUserDetail(userData);
                document.title = userData.name + ': About';
            } catch (error) {
                console.log(error);
            }
        })();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.id]);
    return (
        <>
            <Box marginTop="10vh">
                {/* {openEndoModal && (
                    <ModalForEndo
                        isOpen={openEndoModal}
                        setOpen={setOpenEndoModel}
                        setReload={setReload}
                        reload={reload}
                        ptDetails={ptData}
                    />
                )} */}
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
                                    onCopy();
                                    toast({
                                        title: 'Copied to ClipBoard',
                                        position: 'top-right',
                                        isClosable: true,
                                    });
                                }}
                                leftIcon={<Icon as={FiCopy} />}
                                colorScheme="purple">
                                OPD Reg Link
                            </Button>
                            <Button
                                marginLeft={3}
                                size="sm"
                                variant="solid"
                                onClick={() => {}}
                                leftIcon={<Icon as={FiEdit} />}
                                colorScheme="purple">
                                Edit
                            </Button>
                        </Flex>
                    </HStack>
                </Flex>
                <Container maxW={'7xl'}>
                    <SimpleGrid spacing={{ base: 8, md: 10 }}>
                        <Stack spacing={{ base: 6, md: 10 }}>
                            <Box as={'header'}>
                                <Heading
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                    Organization Details
                                </Heading>
                            </Box>
                            {loading ? (
                                <Loader />
                            ) : (
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
                                                    {userDetail.name}
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Logo{': '}
                                                    </chakra.span>
                                                    <chakra.span style={{ display: 'inline' }}>
                                                        <Image src={userDetail.logo} alt="logo" />
                                                    </chakra.span>
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Subtitle{': '}
                                                    </chakra.span>
                                                    {userDetail.subTitle}
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Punchline{': '}
                                                    </chakra.span>
                                                    {userDetail.punchLine}
                                                </ListItem>
                                                {/* </List>
                                            <List spacing={2}> */}
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}
                                                        // textTransform={'uppercase'}
                                                    >
                                                        Contact{': '}
                                                    </chakra.span>
                                                    {userDetail.contact}
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Email{': '}
                                                    </chakra.span>
                                                    <chakra.span>{userDetail.email}</chakra.span>
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
                                                        Address {': '}
                                                    </chakra.span>
                                                    {userDetail.address}
                                                </ListItem>
                                            </List>
                                            <List>
                                                <Flex direction={'column'} width={'100%'}>
                                                    <Image src={imageqr} alt="" />
                                                    <Button mt={2}>
                                                        <a href={imageqr} download>
                                                            Download
                                                        </a>
                                                    </Button>
                                                </Flex>
                                            </List>
                                        </SimpleGrid>
                                    </Box>
                                    {/* <Flex justifyContent={'start'}>
                                        <Text
                                            fontSize={{ base: '16px', lg: '18px' }}
                                            color={'blue.300'}
                                            fontWeight={'500'}
                                            textTransform={'capitalize'}
                                            mb={'4'}>
                                            OPD Registration link
                                        </Text>
                                        <IconButton
                                            colorScheme="blue"
                                            onClick={() => {
                                                console.log('report');
                                            }}
                                            icon={<BsBoxArrowUpRight />}
                                        />
                                    </Flex> */}
                                </Stack>
                            )}
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    );
};

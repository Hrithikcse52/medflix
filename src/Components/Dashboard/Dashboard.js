import React, { useState } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';

/*
Modal,
initialRef,
finalRef,
ModalOverlay,
ModalContent,
ModalHeader,
ModalCloseButton,
ModalBody,
FormControl,
FormLabel,
Input,
initialRef,
FormControl,
FormLabel,
Input,
ModalFooter,
Button,
RadioGroup' is not defined      react/jsx-no-undef
  Radio,
  Radio,
  Radio,
  Radio,
  FormHelperTex,




 */

import {
    FiHome,
    FiTrendingUp,
    FiUserPlus,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { BACK_END_URL } from '../../env';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userAuth';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const LinkItems = [
    { name: 'Patient', icon: FiHome, route: 'patient' },
    { name: 'Log', icon: FiTrendingUp, route: 'log' },
    { name: 'Prescption', icon: FiCompass, route: 'prescription' },
    { name: 'Report', icon: FiStar, route: 'Report' },
    { name: 'Settings', icon: FiSettings, route: 'settings' },
];

const Dashboard = ({ setUpdate, children }) => {
    const initialState = {
        name: '',
        email: '',
        gender: 'male',
        address: '',
        age: '',
        mobileNumber: '',
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState(initialState);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmitPt = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            const { data: response } = await axios.post(
                `${BACK_END_URL}/patient/create`,
                data,
                // {
                //     withCredentials: true,
                // }
                {
                    headers: {
                        authorization: cookie.get('session', { path: '/' }),
                    },
                }
            );
            console.log(response);
        } catch (error) {}
        setUpdate(true);
        setData(initialState);
        setOpenModal(false);
    };

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} setOpenModal={setOpenModal} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
                <Modal
                    isOpen={openModal}
                    onClose={(e) => {
                        // console.log(e);
                        setOpenModal(false);
                    }}
                    size="xl"
                >
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleSubmitPt}>
                            <ModalHeader>Create Patient</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <HStack mb={2}>
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            required
                                            placeholder="Name"
                                            value={data.name}
                                            name="name"
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            placeholder="Email"
                                            value={data.email}
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </HStack>
                                <HStack mb={2}>
                                    <FormControl as="fieldset">
                                        <FormLabel as="legend">
                                            Gender
                                        </FormLabel>
                                        <RadioGroup defaultValue="male">
                                            <HStack>
                                                <Radio
                                                    required
                                                    name="gender"
                                                    onChange={handleChange}
                                                    value="female"
                                                >
                                                    Female
                                                </Radio>
                                                <Radio
                                                    required
                                                    name="gender"
                                                    value="male"
                                                    onChange={handleChange}
                                                >
                                                    Male
                                                </Radio>
                                            </HStack>
                                        </RadioGroup>
                                        {/* <FormHelperText>
                                    Select only if you're a fan.
                                </FormHelperText> */}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Address</FormLabel>
                                        <Input
                                            required
                                            placeholder="Address"
                                            value={data.address}
                                            name="address"
                                            onChange={handleChange}
                                        />
                                        {/* <Textarea
                                        borderRadius="xs"
                                        placeholder="Here is a sample placeholder"
                                        size="xs"
                                    /> */}
                                    </FormControl>
                                </HStack>
                                <HStack mb={2}>
                                    <FormControl as="fieldset">
                                        <FormLabel as="legend">Age</FormLabel>
                                        <Input
                                            required
                                            placeholder="Age"
                                            type="text"
                                            value={data.age}
                                            name="age"
                                            onChange={handleChange}
                                        />

                                        {/* <FormHelperText>
                                    Select only if you're a fan.
                                </FormHelperText> */}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Mobile</FormLabel>
                                        <Input
                                            required
                                            placeholder="8969846714"
                                            type="number"
                                            value={data.mobileNumber}
                                            name="mobileNumber"
                                            onChange={handleChange}
                                        />
                                        {/* <Textarea
                                        borderRadius="xs"
                                        placeholder="Here is a sample placeholder"
                                        size="xs"
                                    /> */}
                                    </FormControl>
                                </HStack>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} type="submit">
                                    Save
                                </Button>
                                <Button
                                    onClick={() => {
                                        setOpenModal(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    );
};

const SidebarContent = ({ onClose, ...rest }) => {
    const history = useNavigate();
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text
                    fontSize="2xl"
                    fontFamily="monospace"
                    fontWeight="bold"
                    onClick={() => {
                        history('/');
                    }}
                >
                    Logo
                </Text>
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} to={link.route}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const NavItem = ({ to, icon, children, ...rest }) => {
    const history = useNavigate();
    const handlePush = (e) => {
        e.preventDefault();
        history(to);
    };
    return (
        <Link href="#" onClick={handlePush} style={{ textDecoration: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, setOpenModal, ...rest }) => {
    const { user } = useSelector((state) => state.profile);
    const history = useNavigate();
    const dispatch = useDispatch();
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
                onClick={() => {
                    history('/');
                }}
            >
                Logo
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiUserPlus />}
                    onClick={() => {
                        setOpenModal(true);
                    }}
                />
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                        >
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm"> {user.fullName} </Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue(
                                'gray.200',
                                'gray.700'
                            )}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem
                                onClick={async (e) => {
                                    console.log('Res');
                                    try {
                                        const data = await axios.get(
                                            `${BACK_END_URL}/user/logout`,
                                            {
                                                headers: {
                                                    authorization: cookie.get(
                                                        'session',
                                                        { path: '/' }
                                                    ),
                                                },
                                            }
                                        );
                                        if (data.status === 200) {
                                            dispatch(logoutUser());
                                            history('/');
                                        }
                                        // console.log('data', data);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}
                            >
                                Sign out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
export default Dashboard;

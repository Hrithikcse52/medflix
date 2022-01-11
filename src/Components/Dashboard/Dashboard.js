import React from 'react';
import {
    Box,
    Flex,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from '@chakra-ui/react';

import {
    FiHome,
    // FiUserPlus,
    FiCompass,
    FiStar,
    FiSettings,
    // FiMenu,
    // FiBell,
    // FiChevronDown,
} from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router';

const LinkItems = [
    {
        name: 'Patients',
        icon: FiHome,
        route: 'patient',
    },
    {
        name: 'Doctors',
        icon: FaStethoscope,
        route: 'doctor',
    },
    {
        name: 'Prescption',
        icon: FiCompass,
        route: 'prescription',
    },
    {
        name: 'Report',
        icon: FiStar,
        route: 'report',
    },
    {
        name: 'Settings',
        icon: FiSettings,
        route: 'settings',
    },
];

const Dashboard = ({ children }) => {
    const { isOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{
                    base: 'none',
                    md: 'block',
                }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* <MobileNav onOpen={onOpen} setOpenModal={setOpenModal} /> */}
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
};

const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            marginTop="10vh"
            zIndex="1"
            h="full"
            {...rest}>
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
    const location = useLocation();
    const tab = location.pathname.split('/');
    const currentLoc = tab[2];
    const handlePush = (e) => {
        history(to);
    };

    return (
        <Box onClick={handlePush} style={{ textDecoration: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                my="4"
                bg={currentLoc === to ? 'cyan.800' : ''}
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
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
        </Box>
    );
};

export default Dashboard;

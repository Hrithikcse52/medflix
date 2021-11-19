import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    HStack,
    MenuButton,
    Avatar,
    VStack,
    Menu,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';

import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { BACK_END_URL } from '../../env';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userAuth';

export default function Nav() {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const history = useNavigate();
    const { isOpen, onToggle } = useDisclosure();
    const color1 = useColorModeValue('white', 'gray.900');
    const color2 = useColorModeValue('gray.200', 'gray.700');
    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'10vh'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                >
                    <Text
                        textAlign={useBreakpointValue({
                            base: 'center',
                            md: 'left',
                        })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                        onClick={() => {
                            history('/');
                        }}
                    >
                        Logo
                    </Text>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                {user ? (
                    <HStack spacing={{ base: '0', md: '6' }}>
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
                                            display={{
                                                base: 'none',
                                                md: 'flex',
                                            }}
                                            alignItems="flex-start"
                                            spacing="1px"
                                            ml="2"
                                        >
                                            <Text fontSize="sm">
                                                {user.fullName}
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                color="gray.600"
                                            >
                                                Admin
                                            </Text>
                                        </VStack>
                                        <Box
                                            display={{
                                                base: 'none',
                                                md: 'flex',
                                            }}
                                        >
                                            <FiChevronDown />
                                        </Box>
                                    </HStack>
                                </MenuButton>
                                <MenuList bg={color1} borderColor={color2}>
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
                                                        withCredentials: true,
                                                    }
                                                );
                                                if (data.status === 200) {
                                                    history('/');
                                                    dispatch(logoutUser());
                                                }
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
                ) : (
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}
                    >
                        <Button
                            as={'a'}
                            fontSize={'sm'}
                            fontWeight={400}
                            variant={'link'}
                            onClick={() => {
                                history('/login');
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bg={'pink.400'}
                            onClick={() => {
                                history('/register');
                            }}
                            _hover={{
                                bg: 'pink.300',
                            }}
                        >
                            Register
                        </Button>
                    </Stack>
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.label}
                                            {...child}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{
                        opacity: '100%',
                        transform: 'translateX(0)',
                    }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon
                        color={'pink.400'}
                        w={5}
                        h={5}
                        as={ChevronRightIcon}
                    />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity
                style={{ marginTop: '0!important' }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children &&
                        children.map((child) => {
                            console.log(child);
                            return (
                                <Link key={child.label} py={2} href={child.loc}>
                                    {child.label}
                                </Link>
                            );
                        })}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: 'Inspiration',
        children: [
            {
                label: 'Explore Design Work',
                subLabel: 'Trending Design to inspire you',
                href: '#',
                loc: '/dashboard',
            },
            {
                label: 'New & Noteworthy',
                subLabel: 'Up-and-coming Designers',
                href: '#',
                loc: '/dashboard',
            },
        ],
    },
    {
        label: 'Find Work',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
                loc: '/dashboard',
            },
            {
                label: 'Freelance Projects',
                subLabel: 'An exclusive list for contract work',
                href: '#',
                loc: '/dashboard',
            },
        ],
    },
    {
        label: 'Learn Design',
        href: '#',
        loc: '/dashboard',
    },
    {
        label: 'Dashboard',
        href: '#',
        loc: '/dashboard',
    },
];

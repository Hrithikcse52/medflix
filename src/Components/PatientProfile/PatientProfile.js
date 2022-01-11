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
    Image,
    Container,
    Heading,
    StackDivider,
    VStack,
    Text,
    List,
    ListItem,
} from '@chakra-ui/react';
import { FiUserPlus } from 'react-icons/fi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BACK_END_URL } from '../../env';
import { cookie } from '../../utils';
import moment from 'moment';
import { TableComponent } from '../TabelComponent/TableComponent';

export const PatientProfile = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    // const { state } = useLocation();
    const [ptData, setPtData] = useState({});
    const [reportsData, setReportData] = useState([]);
    const bgColor = useColorModeValue('white', 'gray.800');
    const bgColor2 = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');

    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await axios.get(`${BACK_END_URL}/patient/at/${id}`, {
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
            try {
                const { data: response } = await axios.get(`${BACK_END_URL}/reports/pt/${id}`, {
                    headers: {
                        authorization: cookie.get('session', {
                            path: '/',
                        }),
                    },
                });
                // console.log(response);
                if (response) {
                    setReportData(response);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);
    // console.log(reportsData);
    const tableRenderData = reportsData.map((report) => {
        const date = new Date(report.createdAt);
        return {
            patientID: report.patient.pt_id,
            doctorName: report.doctor.name,
            reportType: report.reportType,
            createdAt: date.toDateString(),
            reportId: report._id,
        };
    });
    // console.log(Object.keys(tableRenderData[0]));
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
                <Container maxW={'7xl'}>
                    <SimpleGrid
                        // columns={{ base: 1, lg: 2 }}
                        spacing={{ base: 8, md: 10 }}
                        // py={{ base: 18, md: 24 }}
                    >
                        {/* <Stack spacing={{ base: 6, md: 10 }}> */}
                        <Stack spacing={{ base: 6, md: 10 }}>
                            <Box as={'header'}>
                                <Heading
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                    Patient Details
                                </Heading>
                                {/* <Text
                                    color={useColorModeValue('gray.900', 'gray.400')}
                                    fontWeight={300}
                                    fontSize={'2xl'}>
                                    $350.00 USD
                                </Text> */}
                            </Box>

                            <Stack
                                spacing={{ base: 4, sm: 6 }}
                                direction={'column'}
                                divider={
                                    <StackDivider
                                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                                    />
                                }>
                                <Box>
                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                        <List spacing={2}>
                                            <ListItem>
                                                <chakra.span
                                                    fontSize={{ base: '16px', lg: '18px' }}
                                                    color={'blue.300'}
                                                    fontWeight={'500'}
                                                    // textTransform={'uppercase'}
                                                >
                                                    Name{': '}
                                                </chakra.span>
                                                {ptData.name}
                                            </ListItem>
                                            <ListItem>
                                                <chakra.span
                                                    fontSize={{ base: '16px', lg: '18px' }}
                                                    color={'blue.300'}
                                                    fontWeight={'500'}
                                                    // textTransform={'uppercase'}
                                                >
                                                    Gender{': '}
                                                </chakra.span>

                                                <chakra.span textTransform={'capitalize'}>
                                                    {ptData.gender}
                                                </chakra.span>
                                            </ListItem>
                                            <ListItem>
                                                <chakra.span
                                                    fontSize={{ base: '16px', lg: '18px' }}
                                                    color={'blue.300'}
                                                    fontWeight={'500'}
                                                    // textTransform={'uppercase'}
                                                >
                                                    Age {': '}
                                                </chakra.span>
                                                {ptData.age}
                                            </ListItem>
                                        </List>
                                        <List spacing={2}>
                                            <ListItem>
                                                <chakra.span
                                                    fontSize={{ base: '16px', lg: '18px' }}
                                                    color={'blue.300'}
                                                    fontWeight={'500'}
                                                    // textTransform={'uppercase'}
                                                >
                                                    Contact{': '}
                                                </chakra.span>
                                                {ptData.mobile_number}
                                            </ListItem>
                                            <ListItem>
                                                <chakra.span
                                                    fontSize={{ base: '16px', lg: '18px' }}
                                                    color={'blue.300'}
                                                    fontWeight={'500'}
                                                    // textTransform={'uppercase'}
                                                >
                                                    Email{': '}
                                                </chakra.span>
                                                <chakra.span>{ptData.email}</chakra.span>
                                            </ListItem>
                                            <ListItem>
                                                <chakra.span
                                                    fontSize={{ base: '16px', lg: '18px' }}
                                                    color={'blue.300'}
                                                    fontWeight={'500'}>
                                                    Address {': '}
                                                </chakra.span>
                                                {ptData.address}
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
                                        Report history
                                    </Text>
                                    {tableRenderData.length > 0 ? (
                                        <TableComponent
                                            tableData={tableRenderData}
                                            tableHeaders={[
                                                'Doctor Name',
                                                'Report Type',
                                                'Created',
                                                'Report ID',
                                            ]}
                                            tableDatatoShow={[
                                                'doctorName',
                                                'reportType',
                                                'createdAt',
                                                'reportId',
                                            ]}
                                            iconSet={[]}
                                        />
                                    ) : (
                                        <>
                                            <Flex justify={'center'}>No Reports Found!!</Flex>
                                        </>
                                    )}
                                </Box>
                            </Stack>
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    );
};

import React, { useEffect, useState } from 'react';
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
    Text,
    List,
    ListItem,
    useToast,
} from '@chakra-ui/react';
import { FiUserPlus } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BACK_END_URL } from '../../env';
import { cookie } from '../../utils';
import { TableComponent } from '../TabelComponent/TableComponent';
import { Loader } from '../Util/Loader';
import { ModalForEndo } from './ModalForEndo';

export const PatientProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openEndoModal, setOpenEndoModel] = useState(false);
    const [reload, setReload] = useState(false);
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [ptData, setPtData] = useState({});
    const [reportsData, setReportData] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data: response } = await axios.get(`${BACK_END_URL}/patient/at/${id}`, {
                    headers: {
                        authorization: cookie.get('session', {
                            path: '/',
                        }),
                    },
                });
                setPtData(response);
            } catch (error) {
                toast({
                    description: 'Something Went Wrong',
                    position: 'top-right',
                    status: 'error',
                });
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
                if (response) {
                    setReportData(response);
                }
            } catch (error) {
                toast({
                    description: 'Something Went Wrong',
                    position: 'top-right',
                    status: 'error',
                });
                console.log(error);
            }
            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, reload]);

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
    return (
        <>
            <Box marginTop="10vh">
                {openEndoModal && (
                    <ModalForEndo
                        isOpen={openEndoModal}
                        setOpen={setOpenEndoModel}
                        setReload={setReload}
                        reload={reload}
                        ptDetails={ptData}
                    />
                )}
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
                                    navigate(`/dashboard/prescription/${id}`);
                                }}
                                leftIcon={<Icon as={FiUserPlus} />}
                                colorScheme="purple">
                                Create New Report
                            </Button>
                            <Button
                                marginLeft={3}
                                size="sm"
                                variant="solid"
                                onClick={() => {
                                    setOpenEndoModel(true);
                                }}
                                leftIcon={<Icon as={FiUserPlus} />}
                                colorScheme="purple">
                                Create ENT Endo Report
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
                        <Stack spacing={{ base: 6, md: 10 }}>
                            <Box as={'header'}>
                                <Heading
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                    Patient Details
                                </Heading>
                            </Box>
                            {loading ? (
                                <Loader />
                            ) : (
                                <Stack
                                    spacing={{ base: 4, sm: 6 }}
                                    direction={'column'}
                                    divider={
                                        <StackDivider
                                            // eslint-disable-next-line react-hooks/rules-of-hooks
                                            // borderColor={useColorModeValue('gray.200', 'gray.600')}
                                            borderColor={'gray.600'}
                                        />
                                    }>
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
                                                    {ptData.name}
                                                </ListItem>
                                                <ListItem>
                                                    <chakra.span
                                                        fontSize={{ base: '16px', lg: '18px' }}
                                                        color={'blue.300'}
                                                        fontWeight={'500'}>
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
                                                        fontWeight={'500'}>
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
                            )}
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    );
};

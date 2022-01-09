import { AddIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    chakra,
    FormControl,
    FormLabel,
    GridItem,
    HStack,
    IconButton,
    Input,
    SimpleGrid,
    Stack,
    Modal,
    ModalFooter,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Iframe from 'react-iframe';
import { BACK_END_URL } from '../../env';
import { cookie } from '../../utils';

const Prescription = () => {
    const [adviceData, setAdviceData] = useState([{ med: '', dose: '', for: '' }]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [presData, setPresData] = useState({
        diagnosis: '',
        temp: '',
        height: '',
        weight: '',
        pulse: '',
        bp: '',
        comp: '',
    });
    const { id } = useParams();
    const [ptData, setPtData] = useState({});
    const [reportId, setReportId] = useState('');

    const handleAddClick = () => {
        setAdviceData([...adviceData, { med: '', dose: '', for: '' }]);
    };
    console.log('data:', adviceData);

    const handleDataChnage = (e) => {
        setPresData({ ...presData, [e.target.name]: e.target.value });
    };
    const setInitialData = () => {
        setPresData({
            diagnosis: '',
            temp: '',
            height: '',
            weight: '',
            pulse: '',
            bp: '',
            comp: '',
        });
        setAdviceData([{ med: '', dose: '', for: '' }]);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...adviceData];
        list[index][name] = value;
        setAdviceData(list);
    };
    // console.log('PresData', presData);

    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await axios.get(`${BACK_END_URL}/patient/${id}`, {
                    headers: {
                        authorization: cookie.get('session', {
                            path: '/',
                        }),
                    },
                });
                console.log('Prescription Response:', response);
                setPtData(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);
    // console.log('ptData', ptData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let finalData = { profileData: presData, medAdvice: adviceData };
        console.log('Final Data', finalData);
        const { data: response } = await axios.post(
            `${BACK_END_URL}/reports/save/${ptData._id}`,
            finalData
        );
        if (response !== 200) {
            toast({
                description: 'Report Not Created',
                position: 'top-right',
                status: 'error',
            });
        } else {
            setReportId(response.data._id);
            onOpen();
            console.log('Reponse Submit', response);
            setInitialData();
            toast({
                description: 'Report Created',
                position: 'top-right',
            });
        }

        // navigate(-1);
    };

    return (
        <Stack>
            <>
                <Modal onClose={onClose} size={'4xl'} isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Print Preview</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box
                                as={'div'}
                                id="pdfPreview"
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                }}>
                                <Iframe
                                    url={`${BACK_END_URL}/pug/p`}
                                    width="100%"
                                    height="450px"
                                    id="pdfPreviewIframe"
                                    className="myClassname"
                                    display="initial"
                                    position="relative"
                                    styles={{ backgroundColor: 'white' }}
                                />
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={() => {
                                    window.open(`${BACK_END_URL}/pug/${reportId}`);
                                }}>
                                Print
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
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
                                        name="bp"
                                        id="bp"
                                        value={presData.bp}
                                        onChange={handleDataChnage}
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
                                        name="pulse"
                                        id="pulse"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        value={presData.pulse}
                                        onChange={handleDataChnage}
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
                                        name="weight"
                                        id="weight"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        value={presData.weight}
                                        onChange={handleDataChnage}
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
                                        name="height"
                                        id="height"
                                        mt={1}
                                        focusBorderColor="brand.400"
                                        shadow="sm"
                                        size="sm"
                                        value={presData.height}
                                        onChange={handleDataChnage}
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
                                        name="temp"
                                        id="temp"
                                        mt={1}
                                        value={presData.temp}
                                        onChange={handleDataChnage}
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
                                        name="comp"
                                        id="complaint"
                                        mt={1}
                                        value={presData.comp}
                                        onChange={handleDataChnage}
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
                                        name="diagnosis"
                                        id="diagnosis"
                                        value={presData.diagnosis}
                                        onChange={handleDataChnage}
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
                                        Advice
                                    </FormLabel>

                                    {adviceData.map((advice, i) => (
                                        <>
                                            <HStack mt={3}>
                                                <Input
                                                    type="text"
                                                    name="med"
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    value={advice.med}
                                                    w="40%"
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    rounded="md"
                                                />
                                                <Input
                                                    type="text"
                                                    name="dose"
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    value={advice.dose}
                                                    w="30%"
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    rounded="md"
                                                />
                                                <Input
                                                    type="text"
                                                    name="for"
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    value={advice.for}
                                                    w="20%"
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    rounded="md"
                                                />
                                                <IconButton
                                                    aria-label="add more advice"
                                                    icon={<AddIcon />}
                                                    onClick={handleAddClick}
                                                />
                                            </HStack>
                                        </>
                                    ))}
                                </FormControl>

                                {/* <Table /> */}
                            </SimpleGrid>
                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                // bg={useColorModeValue('gray.500', 'gray.900')}
                                textAlign="right">
                                <Button
                                    type="submit"
                                    // colorScheme="brand"
                                    _focus={{ shadow: '' }}
                                    fontWeight="md">
                                    Save
                                </Button>
                            </Box>
                        </Stack>
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

// function Table() {
//     const header = ['name', 'created', 'actions'];
//     const data = [
//         { name: 'Daggy', created: '7 days ago' },
//         { name: 'Anubra', created: '23 hours ago' },
//         { name: 'Josef', created: 'A few seconds ago' },
//         { name: 'Sage', created: 'A few hours ago' },
//     ];
//     return (
//         <Flex w="full" bg="gray.600" p={50} alignItems="center" justifyContent="center">
//             <Table
//                 w="full"
//                 bg={useColorModeValue('white', 'gray.800')}
//                 display={{
//                     base: 'block',
//                     md: 'table',
//                 }}
//                 sx={{
//                     '@media print': {
//                         display: 'table',
//                     },
//                 }}>
//                 <Thead
//                     display={{
//                         base: 'none',
//                         md: 'table-header-group',
//                     }}
//                     sx={{
//                         '@media print': {
//                             display: 'table-header-group',
//                         },
//                     }}>
//                     <Tr>
//                         {header.map((x) => (
//                             <Th key={x}>{x}</Th>
//                         ))}
//                     </Tr>
//                 </Thead>
//                 <Tbody
//                     display={{
//                         base: 'block',
//                         lg: 'table-row-group',
//                     }}
//                     sx={{
//                         '@media print': {
//                             display: 'table-row-group',
//                         },
//                     }}>
//                     {data.map((token, tid) => {
//                         return (
//                             <Tr
//                                 key={tid}
//                                 display={{
//                                     base: 'grid',
//                                     md: 'table-row',
//                                 }}
//                                 sx={{
//                                     '@media print': {
//                                         display: 'table-row',
//                                     },
//                                     gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
//                                     gridGap: '10px',
//                                 }}>
//                                 {Object.keys(token).map((x) => {
//                                     return (
//                                         <React.Fragment key={`${tid}${x}`}>
//                                             <Td
//                                                 display={{
//                                                     base: 'table-cell',
//                                                     md: 'none',
//                                                 }}
//                                                 sx={{
//                                                     '@media print': {
//                                                         display: 'none',
//                                                     },
//                                                     textTransform: 'uppercase',
//                                                     // color: useColorModeValue(
//                                                     //     'gray.400',
//                                                     //     'gray.400'
//                                                     // ),
//                                                     fontSize: 'xs',
//                                                     fontWeight: 'bold',
//                                                     letterSpacing: 'wider',
//                                                     fontFamily: 'heading',
//                                                 }}>
//                                                 {x}
//                                             </Td>
//                                             <Td
//                                                 // color={useColorModeValue('gray.500')}
//                                                 fontSize="md"
//                                                 fontWeight="hairline">
//                                                 {token[x]}
//                                             </Td>
//                                         </React.Fragment>
//                                     );
//                                 })}
//                                 <Td
//                                     display={{
//                                         base: 'table-cell',
//                                         md: 'none',
//                                     }}
//                                     sx={{
//                                         '@media print': {
//                                             display: 'none',
//                                         },
//                                         textTransform: 'uppercase',
//                                         color: 'inherit',
//                                         fontSize: 'xs',
//                                         fontWeight: 'bold',
//                                         letterSpacing: 'wider',
//                                         fontFamily: 'heading',
//                                     }}>
//                                     Actions
//                                 </Td>
//                                 <Td>
//                                     <ButtonGroup variant="solid" size="sm" spacing={3}>
//                                         <IconButton
//                                             colorScheme="blue"
//                                             icon={<BsBoxArrowUpRight />}
//                                         />
//                                         <IconButton colorScheme="green" icon={<AiFillEdit />} />
//                                         <IconButton
//                                             colorScheme="red"
//                                             variant="outline"
//                                             icon={<BsFillTrashFill />}
//                                         />
//                                     </ButtonGroup>
//                                 </Td>
//                             </Tr>
//                         );
//                     })}
//                 </Tbody>
//             </Table>
//         </Flex>
//     );
// }

export default Prescription;

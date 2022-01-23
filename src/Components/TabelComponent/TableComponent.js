import {
    Button,
    ButtonGroup,
    chakra,
    Flex,
    IconButton,
    SimpleGrid,
    Stack,
    useColorModeValue,
    Modal,
    Box,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Iframe from 'react-iframe';
import { AiFillEdit } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import { BACK_END_URL } from '../../env';
import { useReactToPrint } from 'react-to-print';

const ModelPreview = ({ onClose, isOpen, reportId, patientName }) => {
    console.log('asdasds', patientName);
    const componentRef = useRef();
    const pageStyle = `
    @page {
      size: 210mm 297mm;
      font-size: 23px;
    }
  `;
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: pageStyle,
        documentTitle: patientName,
    });
    document.title = patientName;
    return (
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
                                borderRadius: '20px',
                            }}>
                            <Button style={{ marginBottom: '1rem' }} onClick={handlePrint}>
                                Print
                            </Button>
                            <div ref={componentRef} style={{ backgroundColor: 'white' }}>
                                <Iframe
                                    url={`${BACK_END_URL}/pug/preview/${reportId}`}
                                    width="100%"
                                    height="1045px"
                                    id="pdfPreviewIframe"
                                    className="myClassname"
                                    display="initial"
                                    position="relative"
                                    styles={{ backgroundColor: 'white' }}
                                />
                            </div>
                        </Box>
                    </ModalBody>
                    {/* <ModalFooter></ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
};

export const TableComponent = ({ tableData, tableHeaders, tableDatatoShow }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const bgColor2 = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedId, setSelectedId] = useState('');
    const [selectedName, setSelectedName] = useState('');
    console.log('dasd', selectedName);
    // console.log(tableHeaders.length);
    const colume = tableHeaders.length + 1;
    return (
        <>
            <ModelPreview
                isOpen={isOpen}
                onClose={onClose}
                reportId={selectedId}
                patientName={selectedName}
            />
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
                        // columns={colume}
                        columns={{
                            base: colume,
                            md: colume,
                        }}
                        w="full"
                        py={2}
                        fontWeight="hairline">
                        <span style={{ textAlign: 'center' }}> {tableHeaders[0] ?? 'name'} </span>
                        <chakra.span textAlign={'center'}>{tableHeaders[1]}</chakra.span>
                        <chakra.span textAlign={'center'}>{tableHeaders[2]}</chakra.span>
                        <Flex
                            justify={{
                                md: 'center',
                            }}>
                            <chakra.span>{tableHeaders[3]}</chakra.span>
                        </Flex>
                        <Flex
                            justify={{
                                md: 'center',
                            }}>
                            Actions
                        </Flex>
                    </SimpleGrid>
                    {tableData.map((token, tid) => {
                        console.log(token);
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
                                        base: colume,
                                        md: colume,
                                    }}
                                    w="full"
                                    py={2}
                                    fontWeight="hairline">
                                    {/* <span>{token.patientID}</span> */}
                                    <span style={{ textAlign: 'center' }}>
                                        {token[tableDatatoShow[0]]}
                                    </span>
                                    {/* <chakra.span
                                        textOverflow="ellipsis"
                                        overflow="hidden"
                                        whiteSpace="nowrap"> */}
                                    <chakra.span textAlign={'center'}>
                                        {/* {token.patientName} */}
                                        {token[tableDatatoShow[1]]}
                                    </chakra.span>
                                    {/* <chakra.span
                                        textOverflow="ellipsis"
                                        overflow="hidden"
                                        whiteSpace="nowrap"> */}
                                    <chakra.span textAlign={'center'}>
                                        {/* {token.doctorName} */}
                                        {token[tableDatatoShow[2]]}
                                    </chakra.span>
                                    <Flex
                                        justify={{
                                            md: 'center',
                                        }}>
                                        {/* {token.reportType} */}
                                        {token[tableDatatoShow[3]]}
                                    </Flex>
                                    <Flex
                                        justify={{
                                            md: 'center',
                                        }}>
                                        <ButtonGroup variant="solid" size="sm" spacing={3}>
                                            <IconButton
                                                colorScheme="blue"
                                                onClick={() => {
                                                    console.log('report', token.reportId);
                                                    setSelectedId(token.reportId);
                                                    setSelectedName(token[tableDatatoShow[1]]);
                                                    onOpen();
                                                }}
                                                icon={<BsBoxArrowUpRight />}
                                            />
                                            {/* <IconButton colorScheme="green" icon={<AiFillEdit />} />
                                            <IconButton
                                                colorScheme="red"
                                                variant="outline"
                                                icon={<BsFillTrashFill />}
                                            /> */}
                                        </ButtonGroup>
                                    </Flex>
                                </SimpleGrid>
                            </Flex>
                        );
                    })}
                </Stack>
            </Flex>
        </>
    );
};

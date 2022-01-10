import {
    Button,
    ButtonGroup,
    chakra,
    Flex,
    Icon,
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
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Iframe from 'react-iframe';
import { AiFillEdit, AiTwotoneLock } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { BACK_END_URL } from '../../env';
import { useReactToPrint } from 'react-to-print';

const ModelPreview = ({ onClick, onClose, isOpen, reportId, patientName }) => {
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
                            // ref={componentRef}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                // height: '600px',
                            }}>
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
                    <ModalFooter>
                        <Button onClick={handlePrint}>Print</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export const TableComponent = ({ tableData, tableHeaders, iconSet }) => {
    const history = useNavigate();
    const bgColor = useColorModeValue('white', 'gray.800');
    const bgColor2 = useColorModeValue('gray.100', 'gray.700');
    const bgColor3 = useColorModeValue('gray.500');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedId, setSelectedId] = useState('');
    const [selectedName, setSelectedName] = useState('');

    // console.log('TableComponent', Object.keys(tableData[0]));
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
                        columns={{
                            base: 5,
                            md: 5,
                        }}
                        w="full"
                        py={2}
                        px={10}
                        fontWeight="hairline">
                        <span> {tableHeaders[0] ?? 'name'} </span>
                        <chakra.span textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                            {tableHeaders[1]}
                        </chakra.span>
                        <chakra.span textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                            {tableHeaders[2]}
                        </chakra.span>
                        <Flex
                            justify={{
                                md: 'center',
                            }}>
                            <chakra.span
                                textOverflow="ellipsis"
                                overflow="hidden"
                                whiteSpace="nowrap">
                                {tableHeaders[3]}
                            </chakra.span>
                            {/* <Button
              size="sm"
              variant="solid"
              leftIcon={<Icon as={AiTwotoneLock} />}
              colorScheme="purple"
            >
              View Profile
            </Button> */}
                        </Flex>
                        <Flex
                            justify={{
                                md: 'center',
                            }}>
                            Actions
                        </Flex>
                    </SimpleGrid>
                    {tableData.map((token, tid) => {
                        // console.log(token._id);
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
                                        base: 5,
                                        md: 5,
                                    }}
                                    w="full"
                                    py={2}
                                    px={10}
                                    fontWeight="hairline">
                                    <span>{token.patientID}</span>
                                    <chakra.span
                                        textOverflow="ellipsis"
                                        overflow="hidden"
                                        whiteSpace="nowrap">
                                        {token.patientName}
                                    </chakra.span>
                                    <chakra.span
                                        textOverflow="ellipsis"
                                        overflow="hidden"
                                        whiteSpace="nowrap">
                                        {token.doctorName}
                                    </chakra.span>
                                    {/* <chakra.span
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                    whiteSpace="nowrap"
                                >
                                    {token._id}
                                </chakra.span> */}
                                    {/* <span>{token.mobile_number}</span> */}

                                    <Flex
                                        justify={{
                                            md: 'center',
                                        }}>
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            leftIcon={<Icon as={AiTwotoneLock} />}
                                            colorScheme="purple">
                                            View Profile
                                        </Button>
                                    </Flex>
                                    <Flex
                                        justify={{
                                            md: 'center',
                                        }}>
                                        <ButtonGroup variant="solid" size="sm" spacing={3}>
                                            <IconButton
                                                colorScheme="blue"
                                                onClick={() => {
                                                    setSelectedId(token.reportId);
                                                    setSelectedName(token.patientName);
                                                    onOpen();
                                                }}
                                                icon={<BsBoxArrowUpRight />}
                                            />
                                            <IconButton colorScheme="green" icon={<AiFillEdit />} />
                                            <IconButton
                                                colorScheme="red"
                                                variant="outline"
                                                icon={<BsFillTrashFill />}
                                            />
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

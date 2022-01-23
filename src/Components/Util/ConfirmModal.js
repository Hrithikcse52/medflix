import {
    Alert,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Center,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

export const ConfirmModal = ({ onClick, onClose, isOpen }) => {
    return (
        <>
            <Modal
                onClose={() => {
                    onClose(false);
                }}
                size={'xs'}
                isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Patient</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Alert
                                status="error"
                                borderRadius={'10'}
                                variant="subtle"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                height="200px">
                                <AlertIcon boxSize="40px" mr={0} />
                                <AlertTitle mt={1} fontSize="lg" textTransform="uppercase">
                                    Confirm Delete
                                </AlertTitle>
                                <Box mt={'4'}>
                                    <Button
                                        mr={'4'}
                                        onClick={() => {
                                            onClose(false);
                                        }}>
                                        Cancel
                                    </Button>
                                    <Button ml={'auto'} onClick={onClick}>
                                        Delete
                                    </Button>
                                </Box>
                            </Alert>
                        </Center>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

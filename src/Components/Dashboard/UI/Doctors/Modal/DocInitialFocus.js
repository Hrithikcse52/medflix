import {
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    RadioGroup,
    Radio,
    HStack,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    InputGroup,
    InputLeftAddon,
    Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRef, useState } from 'react';
import { BACK_END_URL } from '../../../../../env';
import { cookie } from '../../../../../utils';

export const InitialFocus = ({ isOpen, setOpenModal, reload, setReload }) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const initialRef = useRef();
    const finalRef = useRef();
    const initialState = {
        name: '',
        gender: 'male',
        mobileNumber: '',
        specialization: 'MBBS',
        spec: '',
        position: '',
    };

    const [data, setData] = useState(initialState);
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    console.log(data);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${BACK_END_URL}/doctor/create`, data, {
                headers: {
                    authorization: cookie.get('session', {
                        path: '/',
                    }),
                },
            });

            toast({
                description: 'Doctor Created',
                position: 'top-right',
            });
            console.log(response);
        } catch (err) {
            console.log(err);
            toast({
                description: err.response.data?.message || "Couldn't Create",
                position: 'top-right',
                status: 'error',
            });
        }
        setOpenModal(false);
        setData(initialState);
        setLoading(false);
        setReload(!reload);
    };

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                size="xl"
                isOpen={isOpen}
                onClose={() => {
                    setOpenModal(false);
                    setData(initialState);
                }}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>Add Doctor</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children="Dr." />
                                        <Input
                                            required
                                            placeholder="Name"
                                            value={data.name}
                                            name="name"
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
                                <FormControl as="fieldset">
                                    <FormLabel as="legend">Gender</FormLabel>
                                    <RadioGroup defaultValue="male">
                                        <HStack>
                                            <Radio
                                                required
                                                name="gender"
                                                onChange={handleChange}
                                                value="female">
                                                Female
                                            </Radio>
                                            <Radio
                                                required
                                                name="gender"
                                                value="male"
                                                onChange={handleChange}>
                                                Male
                                            </Radio>
                                        </HStack>
                                    </RadioGroup>

                                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Specialization</FormLabel>
                                    <Input
                                        required
                                        placeholder="Spec"
                                        value={data.specialization}
                                        name="specialization"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel>Awards and Positions</FormLabel>
                                    <Input
                                        required
                                        placeholder="Member at IMA, Former Senior Resident"
                                        type="text"
                                        value={data.spec}
                                        name="spec"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel> Current Postitions </FormLabel>
                                    <Input
                                        required
                                        placeholder="Consultant Gynaecologist, Infertility Specialist & Sonologist"
                                        type="text"
                                        value={data.position}
                                        name="position"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
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
                                </FormControl>
                            </HStack>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                type="submit"
                                disabled={loading ? true : false}
                                colorScheme="blue"
                                mr={3}>
                                {loading ? <Spinner size="sm" /> : 'Save'}
                            </Button>
                            <Button
                                onClick={() => {
                                    setOpenModal(false);
                                    setData(initialState);
                                }}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

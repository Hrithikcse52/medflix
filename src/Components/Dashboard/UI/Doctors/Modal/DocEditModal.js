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
} from '@chakra-ui/react';
import axios from 'axios';
import { isEqual } from 'lodash';
import { useRef, useState } from 'react';
import { BACK_END_URL } from '../../../../../env';
import { cookie } from '../../../../../utils';
import ButtonLoader from '../../../../Util/ButtonLoader';

export const DocEditModal = ({ isOpen, setOpenModal, docDetails, setReload, reload }) => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const initialRef = useRef();
    const finalRef = useRef();
    const initialState = {
        name: docDetails.name.substring(4),
        gender: docDetails.gender,
        mobileNumber: docDetails.mobile_number,
        specialization: docDetails.specialization,
        spec: docDetails.spec.join(', '),
        position: docDetails.position,
    };
    const [data, setData] = useState(initialState);
    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    // console.log('doc details', docDetails);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const returnData = {};
        if (data.name !== initialState.name) {
            returnData.name = data.name;
        }
        if (data.gender !== initialState.gender) {
            returnData.gender = data.gender;
        }
        if (data.spec !== initialState.spec) {
            returnData.spec = data.spec;
        }
        if (data.position !== initialState.position) {
            returnData.position = data.position;
        }
        if (data.mobileNumber !== initialState.mobileNumber) {
            returnData.mobileNumber = data.mobileNumber;
        }
        if (data.specialization !== initialState.specialization) {
            returnData.specialization = data.specialization;
        }
        // console.log('Final Data', returnData);

        try {
            const response = await axios.put(
                `${BACK_END_URL}/doctor/at/${docDetails._id}`,
                returnData,
                {
                    headers: {
                        authorization: cookie.get('session', {
                            path: '/',
                        }),
                    },
                }
            );

            toast({
                description: 'Doctor Updated',
                position: 'top-right',
            });
            // console.log(response);
        } catch (err) {
            console.error(err);
            toast({
                description: err.response.data?.message || "Couldn't Create",
                position: 'top-right',
                status: 'error',
            });
        }
        setOpenModal(false);
        setReload(!reload);
        setLoading(false);
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
                        <ModalHeader>Edit Doctor</ModalHeader>
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
                                    <RadioGroup defaultValue={initialState.gender || 'male'}>
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
                            <ButtonLoader
                                disabled={isEqual(initialState, data)}
                                loading={loading}
                                text="Save"
                                colorScheme="blue"
                                mr={3}
                                type="submit"
                            />
                            {/* <Button
                                type="submit"
                                disabled={loading ? true : false}
                                colorScheme="blue"
                                mr={3}>
                                {loading ? <Spinner size="sm" /> : 'Save'}
                            </Button> */}
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

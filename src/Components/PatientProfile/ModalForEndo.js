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
    Select,
    HStack,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BACK_END_URL } from '../../env';
import { cookie } from '../../utils';
import ButtonLoader from '../Util/ButtonLoader';
import { InputButton } from '../Util/InputButton';

export const ModalForEndo = ({ isOpen, setOpen, setReload, reload, ptDetails }) => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const initialRef = useRef();
    const finalRef = useRef();

    const initialState = {
        name: ptDetails.name,
        patientId: ptDetails._id,
        docId: ptDetails.doctor.id,
        docName: ptDetails.doctor.name,
        mobile_number: ptDetails.mobile_number,
        pt_id: ptDetails.pt_id,
        gender: ptDetails.gender,
        age: ptDetails.age,
        orgId: ptDetails.pt_at.id,
        orgName: ptDetails.pt_at.name,
        email: ptDetails.email,
        address: ptDetails.address,
        lnoseImp: 'lnos',
        rnoseImp: 'rnos',
        learImp: 'lear',
        rearImp: 'rear',
        tonsilImp: 'ton',
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const fileHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.files[0] });
    };
    const [data, setData] = useState(initialState);
    console.log(data);
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach((key) => formData.append(key, object[key]));
        return formData;
    }
    const handleSubmitPt = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(data);
        const formData = getFormData(data);
        console.log('FormData', formData.entries());
        try {
            const { data: response } = await axios.post(`${BACK_END_URL}/upload/images`, formData, {
                headers: {
                    authorization: cookie.get('session', { path: '/' }),
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast({
                description: 'Patient Created',
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
        setLoading(false);
        setOpen(false);
        setReload(!reload);
    };
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                size="4xl"
                isOpen={isOpen}
                onClose={() => {
                    setOpen(false);
                    setData(initialState);
                }}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmitPt}>
                        <ModalHeader>Create ENT EndoScope Report</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        // required
                                        placeholder="Name"
                                        value={data.name}
                                        name="name"
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        placeholder="Email"
                                        value={data.email}
                                        name="email"
                                        onChange={handleChange}
                                    />
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
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Address</FormLabel>
                                    <Input
                                        // required
                                        placeholder="Address"
                                        value={data.address}
                                        name="address"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack mb={2}>
                                <FormControl as="fieldset">
                                    <FormLabel as="legend">Age</FormLabel>
                                    <Input
                                        // required
                                        placeholder="Age"
                                        type="text"
                                        value={data.age}
                                        name="age"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Mobile</FormLabel>
                                    <Input
                                        // required
                                        placeholder="8969846714"
                                        type="number"
                                        value={data.mobile_number}
                                        name="mobileNumber"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl>
                                    <FormLabel>Left Ear</FormLabel>
                                    <HStack>
                                        <Input
                                            placeholder="Impression"
                                            type="text"
                                            value={data.learImp}
                                            name="learImp"
                                            onChange={handleChange}
                                        />
                                        <InputButton name="lear" onChange={fileHandler} />
                                    </HStack>
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl>
                                    <FormLabel>Right Ear</FormLabel>
                                    <HStack>
                                        <Input
                                            placeholder="Impression"
                                            type="text"
                                            value={data.rearImp}
                                            name="rearImp"
                                            onChange={handleChange}
                                        />
                                        <InputButton name="rear" onChange={fileHandler} />
                                    </HStack>
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl>
                                    <FormLabel>Left Nosetril</FormLabel>
                                    <HStack>
                                        <Input
                                            placeholder="Impression"
                                            type="text"
                                            value={data.lnoseImp}
                                            name="lnoseImp"
                                            onChange={handleChange}
                                        />
                                        <InputButton name="lnose" onChange={fileHandler} />
                                    </HStack>
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl>
                                    <FormLabel>Right Nosetril</FormLabel>
                                    <HStack>
                                        <Input
                                            placeholder="Impression"
                                            type="text"
                                            value={data.rnoseImp}
                                            name="rnoseImp"
                                            onChange={handleChange}
                                        />
                                        <InputButton name="rnose" onChange={fileHandler} />
                                    </HStack>
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl>
                                    <FormLabel>Tonsil</FormLabel>
                                    <HStack>
                                        <Input
                                            placeholder="Impression"
                                            type="text"
                                            value={data.tonsilImp}
                                            name="tonsilImp"
                                            onChange={handleChange}
                                        />
                                        <InputButton name="tonsil" onChange={fileHandler} />
                                    </HStack>
                                </FormControl>
                            </HStack>
                        </ModalBody>
                        <ModalFooter>
                            <ButtonLoader
                                loading={loading}
                                text="Save"
                                colorScheme="blue"
                                mr={3}
                                type="submit"
                            />
                            <Button
                                onClick={() => {
                                    setOpen(false);
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

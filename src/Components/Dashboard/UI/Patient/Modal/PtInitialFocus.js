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
import { BACK_END_URL } from '../../../../../env';
import { cookie } from '../../../../../utils';
import { useSelector } from 'react-redux';
import ButtonLoader from '../../../../Util/ButtonLoader';

export const InitialFocus = ({ isOpen, setOpenModalPt, setReload, reload }, props) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.profile);
    const toast = useToast();
    const initialRef = useRef();
    const finalRef = useRef();
    const initialState = {
        name: '',
        email: '',
        gender: 'male',
        address: '',
        age: '',
        mobileNumber: '',
        docId: '',
        docName: '',
        user_id: user?.id,
        user_name: user?.name,
    };
    // console.log(user);
    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const [data, setData] = useState(initialState);
    const [doc, setDoc] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const {
                    data: { data: response },
                } = await axios.get(`${BACK_END_URL}/doctor/getDoc`, {
                    headers: {
                        authorization: cookie.get('session', {
                            path: '/',
                        }),
                    },
                });
                // console.log('Doc List', response);
                setDoc(response);
                setData({ ...data, docId: response[0]._id, docName: response[0].name });
            } catch (error) {
                console.error(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmitPt = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // eslint-disable-next-line no-unused-vars
            const { data: _response } = await axios.post(`${BACK_END_URL}/patient/create`, data);
            toast({
                description: 'Patient Created',
                position: 'top-right',
            });
            toast({
                description: 'Patient Created ' || _response?.message,
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
        setLoading(false);
        setData(initialState);
        setOpenModalPt(false);
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
                    setOpenModalPt(false);
                    setData(initialState);
                }}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmitPt}>
                        <ModalHeader>Create Patient</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <HStack mb={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        required
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
                                        required
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
                                        required
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
                                        required
                                        placeholder="8969846714"
                                        type="number"
                                        value={data.mobileNumber}
                                        name="mobileNumber"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl>
                                <FormLabel>Select Doctor</FormLabel>
                                {doc && (
                                    <Select
                                        required
                                        variant="outline"
                                        name="docId"
                                        // placeholder=" "
                                        onChange={(e) => {
                                            // handleChange(e);
                                            const docItem = doc.find(
                                                (item) => item._id === e.target.value
                                            );
                                            setData({
                                                ...data,
                                                docId: e.target.value,
                                                docName: docItem.name,
                                            });
                                        }}
                                        value={data.docId}>
                                        {doc.map((doctor, index) => {
                                            return (
                                                <option key={index} value={doctor._id}>
                                                    {doctor.name} {doctor.specialization}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                )}
                            </FormControl>
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
                                    setOpenModalPt(false);
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

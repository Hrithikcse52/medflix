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
import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { BACK_END_URL } from '../../../../../env';
import { cookie } from '../../../../../utils';
import ButtonLoader from '../../../../Util/ButtonLoader';

export const EditModal = ({ isOpen, setOpenModalPt, setReload, reload, ptDetails }) => {
    // console.log('Edit', ptDetails);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const initialRef = useRef();
    const finalRef = useRef();

    const initialState = {
        name: ptDetails.name,
        email: ptDetails.email,
        gender: ptDetails.gender,
        address: ptDetails.address,
        age: ptDetails.age,
        mobileNumber: ptDetails.mobile_number,
        docId: ptDetails.doctor.id,
        docName: ptDetails.doctor.name,
    };
    // console.log(initialState);
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
                // setData({ ...data, docId: response[0]._id, docName: response[0].name });
            } catch (error) {
                console.error(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkData = () => {
        const returnData = {};
        if (data.name !== initialState.name) {
            returnData.name = data.name;
        }
        if (data.email !== initialState.email) {
            returnData.email = data.email;
        }
        if (data.gender !== initialState.gender) {
            returnData.gender = data.gender;
        }
        if (data.address !== initialState.address) {
            returnData.address = data.address;
        }
        if (data.age !== initialState.age) {
            returnData.age = data.age;
        }
        if (data.mobileNumber !== initialState.mobileNumber) {
            returnData.mobileNumber = data.mobileNumber;
        }
        if (data.docId !== initialState.docId) {
            returnData.docId = data.docId;
            returnData.docName = data.docName;
        }
        return returnData;
    };

    const handleSubmitPt = async (e) => {
        e.preventDefault();
        // setLoading(true);
        const updateData = checkData();
        // console.log('ChangeData', updateData);

        try {
            const { data: response } = await axios.put(
                `${BACK_END_URL}/patient/at/${ptDetails._id}`,
                updateData,
                {
                    headers: {
                        authorization: cookie.get('session', { path: '/' }),
                    },
                }
            );
            toast({
                description: 'Patient Updated',
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
        setOpenModalPt(false);
        setReload(!reload);
    };
    // console.log(data);
    // console.log(JSON.stringify(data) === JSON.stringify(initialState));
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
                        <ModalHeader>Edit Patient</ModalHeader>
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
                                    <RadioGroup defaultValue={data.gender || 'male'}>
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
                                    {/* <FormHelperText>
                                Select only if you're a fan.
                            </FormHelperText> */}
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
                                    {/* <Textarea
                                    borderRadius="xs"
                                    placeholder="Here is a sample placeholder"
                                    size="xs"
                                /> */}
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

                                    {/* <FormHelperText>
                                Select only if you're a fan.
                            </FormHelperText> */}
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
                                            // console.log(
                                            //     doc.find((item) => item._id === e.target.value)
                                            // );
                                        }}
                                        value={data.docId}>
                                        {doc.map((doctor, index) => {
                                            // console.log(doctor._id);
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
                            {/* <Button colorScheme="blue" mr={3} type="submit">
                            Save
                        </Button> */}
                            <ButtonLoader
                                disabled={isEqual(initialState, data)}
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

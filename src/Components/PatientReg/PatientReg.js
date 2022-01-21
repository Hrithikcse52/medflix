import {
    Flex,
    Box,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Radio,
    Image,
    Select,
    useToast,
} from '@chakra-ui/react';
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { images } from '../../Images';
import { Loader } from '../Util/Loader';
import { BACK_END_URL } from '../../env';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ButtonLoader from '../Util/ButtonLoader';

export default function PatientReg() {
    const { userId } = useParams();
    const [data, setData] = useState({
        name: '',
        email: '',
        gender: 'male',
        address: '',
        age: '',
        mobileNumber: '',
        docId: '',
        docName: '',
        user_id: userId,
    });
    const toast = useToast();
    const [doc, setDoc] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const { data: userData } = await axios.get(`${BACK_END_URL}/user/detail`, {
                    params: { user_id: userId },
                });
                setUserDetail(userData);
                document.title = userData.name + ': Registration';
                setData({ ...data, user_id: userData._id, user_name: userData.name });
            } catch (error) {
                console.log(error);
            }
        })();
        (async () => {
            try {
                const {
                    data: { data: response },
                } = await axios.post(`${BACK_END_URL}/doctor/docs`, { user_id: userId });
                setDoc(response);
                setData({ ...data, docId: response[0]._id, docName: response[0].name });
            } catch (error) {
                console.log(error);
            }
        })();

        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: response } = await axios.post(`${BACK_END_URL}/patient/create`, data);
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
        setData({
            name: '',
            email: '',
            gender: 'male',
            address: '',
            age: '',
            mobileNumber: '',
            docId: '',
            docName: '',
            userId,
        });
    };

    return (
        <>
            <Box maxW="full" maxh="100vh" overflow="hidden">
                <Flex justifyContent={'center'} alignItems={'center'} mt="10vh">
                    <Box
                        bg="#171923"
                        color="white"
                        borderRadius="lg"
                        m={{ sm: 4, md: 8, lg: 10 }}
                        p={{ sm: 5, md: 8, lg: 10 }}>
                        <Box p={4}>
                            {loading ? (
                                <Flex boxSize={'xl'} justifyContent={'center'}>
                                    <Loader height="200px" width="200px" />
                                </Flex>
                            ) : (
                                <>
                                    <Wrap
                                        className="asdasd"
                                        spacing={{ base: 10, sm: 3, md: 5, lg: 20 }}>
                                        <WrapItem>
                                            <Flex
                                                textAlign={'center'}
                                                justifyContent={'center'}
                                                direction={'column'}>
                                                <Heading>Register</Heading>
                                                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                                                    Fill up the form below to register yourself!
                                                </Text>
                                                <Box py={{ base: 2, sm: 3, md: 5, lg: 8 }}>
                                                    <VStack spacing={3} alignItems="center">
                                                        <Button
                                                            size="md"
                                                            variant="ghost"
                                                            p="3"
                                                            color="#DCE2FF"
                                                            _hover={{
                                                                border: '2px solid #1C6FEB',
                                                            }}
                                                            leftIcon={
                                                                <MdPhone
                                                                    color="#1970F1"
                                                                    size="20px"
                                                                />
                                                            }>
                                                            <Text>{userDetail.contact}</Text>
                                                        </Button>
                                                        <Button
                                                            size="md"
                                                            height="48px"
                                                            variant="ghost"
                                                            p="3"
                                                            color="#DCE2FF"
                                                            _hover={{
                                                                border: '2px solid #1C6FEB',
                                                            }}
                                                            leftIcon={
                                                                <MdEmail
                                                                    color="#1970F1"
                                                                    size="20px"
                                                                />
                                                            }>
                                                            <Text>{userDetail.email}</Text>
                                                        </Button>
                                                        <Button
                                                            size="md"
                                                            height="48px"
                                                            variant="ghost"
                                                            color="#DCE2FF"
                                                            _hover={{ border: '2px solid #1C6FEB' }}
                                                            leftIcon={
                                                                <MdLocationOn
                                                                    color="#1970F1"
                                                                    size="20px"
                                                                />
                                                            }>
                                                            <Text>{userDetail.address}</Text>
                                                        </Button>
                                                    </VStack>
                                                </Box>
                                                <Box>
                                                    <Flex
                                                        justifyContent={'center'}
                                                        alignContent={'center'}>
                                                        <Image src={userDetail.logo} />
                                                    </Flex>
                                                    <Text textAlign={'center'}>
                                                        {userDetail.subTitle}
                                                    </Text>
                                                    <Text as="i" textAlign={'center'}>
                                                        {userDetail.punchLine}
                                                    </Text>
                                                </Box>
                                                <Box mt={'4'}>
                                                    <Text textAlign={'center'}>
                                                        Made Possible via
                                                    </Text>
                                                    <Flex
                                                        justifyContent={'center'}
                                                        alignContent={'center'}>
                                                        <Image src={images.logo} />
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                        </WrapItem>
                                        <WrapItem>
                                            <Box bg="#1a202c" borderRadius="lg">
                                                <Box m={8} color="white">
                                                    <form onSubmit={handleSubmit}>
                                                        <VStack spacing={5}>
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
                                                            <FormControl
                                                                as="fieldset"
                                                                justifyContent={'center'}>
                                                                <FormLabel as="legend">
                                                                    Gender
                                                                </FormLabel>
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

                                                            <FormControl as="fieldset">
                                                                <FormLabel as="legend">
                                                                    Age
                                                                </FormLabel>
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
                                                                <FormLabel>Select Doctor</FormLabel>
                                                                {doc && (
                                                                    <Select
                                                                        required
                                                                        variant="outline"
                                                                        name="docId"
                                                                        onChange={(e) => {
                                                                            const docItem =
                                                                                doc.find(
                                                                                    (item) =>
                                                                                        item._id ===
                                                                                        e.target
                                                                                            .value
                                                                                );
                                                                            setData({
                                                                                ...data,
                                                                                docId: e.target
                                                                                    .value,
                                                                                docName:
                                                                                    docItem.name,
                                                                            });
                                                                        }}
                                                                        value={data.docId}>
                                                                        {doc.map(
                                                                            (doctor, index) => {
                                                                                return (
                                                                                    <option
                                                                                        key={index}
                                                                                        value={
                                                                                            doctor._id
                                                                                        }>
                                                                                        {
                                                                                            doctor.name
                                                                                        }{' '}
                                                                                        {
                                                                                            doctor.specialization
                                                                                        }
                                                                                    </option>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </Select>
                                                                )}
                                                            </FormControl>
                                                            <Flex width={'full'}>
                                                                <ButtonLoader
                                                                    loading={loading}
                                                                    text={'Submit'}
                                                                    type="submit"
                                                                    ml="auto"
                                                                />
                                                            </Flex>
                                                        </VStack>
                                                    </form>
                                                </Box>
                                            </Box>
                                        </WrapItem>
                                    </Wrap>
                                </>
                            )}
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </>
    );
}

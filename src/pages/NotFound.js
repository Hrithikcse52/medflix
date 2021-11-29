import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/alert';
import { Center, Flex, Stack } from '@chakra-ui/layout';
import React from 'react';

const NotFound = () => {
    return (
        <>
            <Flex align={'center'} justify={'center'}>
                <Stack
                    w="full"
                    minH={'90vh'}
                    direction={{
                        base: 'column',
                        md: 'row',
                    }}>
                    <Center>
                        <Alert
                            minW="100vw"
                            status="error"
                            variant="subtle"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            height="200px">
                            <AlertIcon boxSize="40px" mr={0} />
                            <AlertTitle mt={4} fontSize="lg">
                                404
                            </AlertTitle>
                            <AlertTitle
                                mb={1}
                                fontSize="lg"
                                textTransform="uppercase">
                                Page Not Found
                            </AlertTitle>
                            <AlertDescription
                                maxWidth="sm"
                                textTransform="uppercase"
                                fontSize="lg"
                                letterSpacing="1px"
                                lineHeight="28px">
                                you are in a wrong place
                            </AlertDescription>
                        </Alert>
                    </Center>
                </Stack>
            </Flex>
        </>
    );
};

export default NotFound;

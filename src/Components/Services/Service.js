import { Box, Button, Flex, HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import ServiceCard from './ServiceCard';

export const Service = () => {
    return (
        <>
            <Box mt={'10vh'} padding={'2'}>
                <HStack display="flex" spacing={3} marginY={5} alignItems="center">
                    <Flex
                        justify={{
                            md: 'center',
                        }}>
                        <Button
                            title="create new service"
                            size="sm"
                            variant="solid"
                            onClick={() => {
                                // navigate(`/dashboard/prescription/${id}`);
                            }}
                            leftIcon={<Icon as={FiUserPlus} />}
                            colorScheme="purple">
                            Create New Service
                        </Button>
                    </Flex>
                </HStack>
                <Flex
                    padding={'3'}
                    alignItems={'center'}
                    justifyContent={'space-around'}
                    flexWrap={'wrap'}>
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                </Flex>
            </Box>
        </>
    );
};

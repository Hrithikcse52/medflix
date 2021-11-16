import React from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

const FeatureItem = ({ title, text, icon }) => {
    return (
        <Stack align={'center'}>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}
            >
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text align={'center'} color={'gray.600'}>
                {text}
            </Text>
        </Stack>
    );
};

export default function Feature() {
    return (
        <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <FeatureItem
                    icon={<Icon as={FcAssistant} w={10} h={10} />}
                    title={'Lifetime Support'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <FeatureItem
                    icon={<Icon as={FcDonate} w={10} h={10} />}
                    title={'Unlimited Donations'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <FeatureItem
                    icon={<Icon as={FcDonate} w={10} h={10} />}
                    title={'Unlimited Donations'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <FeatureItem
                    icon={<Icon as={FcDonate} w={10} h={10} />}
                    title={'Unlimited Donations'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <FeatureItem
                    icon={<Icon as={FcDonate} w={10} h={10} />}
                    title={'Unlimited Donations'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <FeatureItem
                    icon={<Icon as={FcInTransit} w={10} h={10} />}
                    title={'Instant Delivery'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
            </SimpleGrid>
        </Box>
    );
}

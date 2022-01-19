import React from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import {
    FcAcceptDatabase,
    FcDataSheet,
    FcDocument,
    FcPortraitMode,
    FcServices,
    FcSpeaker,
} from 'react-icons/fc';

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
                mb={1}>
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
    const items = [
        {
            title: 'Robust Report Generation',
            text: 'You can generate reports like prescription ,endo-imaging reports and pretty much any report as it is customizable on the needs',
            icon: FcDocument,
        },
        {
            title: 'Patient Management',
            text: 'Patient work flow and management all in one place. ',
            icon: FcPortraitMode,
        },
        {
            title: 'Campaings',
            text: 'Feature of setting up campaings and marketing can be done via email / phone sms / IVR',
            icon: FcSpeaker,
        },
        {
            title: 'Managed Services',
            text: 'You can manage your services and set up according to the needs.',
            icon: FcServices,
        },
        {
            title: 'Online Registrations',
            text: 'Patients can register online via a special url made for the organization.',
            icon: FcAcceptDatabase,
        },
        {
            title: 'History Track',
            text: 'A complete history of patient is maintained in the dashboard and can be used for certain analytics.',
            icon: FcDataSheet,
        },
    ];
    return (
        <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                {items.map((item) => (
                    <FeatureItem
                        icon={<Icon as={item.icon} w={10} h={10} />}
                        title={item.title}
                        text={item.text}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
}

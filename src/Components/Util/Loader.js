import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { images } from '../../Images';

export const Loader = ({ width = '100px', height = '100px' }) => {
    return (
        <>
            <Flex w="full" alignItems="center" justifyContent="center">
                <Box width={width} height={height} mx={'auto'} className="Loader">
                    <img src={images.loader} alt="Loader" />
                </Box>
            </Flex>
        </>
    );
};

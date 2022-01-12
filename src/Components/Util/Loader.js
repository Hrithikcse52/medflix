import { Box } from '@chakra-ui/react';
import React from 'react';
import { images } from '../../Images';

export const Loader = ({ width = '100px', height = '100px' }) => {
    return (
        <>
            <Box width={width} height={height} className="Loader">
                <img src={images.loader} alt="Loader" />
            </Box>
        </>
    );
};

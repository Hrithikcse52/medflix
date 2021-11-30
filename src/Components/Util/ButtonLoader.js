import { Button } from '@chakra-ui/button';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react';

const ButtonLoader = ({ loading, text, ...props }) => {
    return (
        <>
            <Button {...props}>{loading ? <Spinner size="sm" /> : text}</Button>
        </>
    );
};

export default ButtonLoader;

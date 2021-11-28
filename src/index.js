import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './tailwind.css';
import App from './App';
import {
    ChakraProvider,
    extendTheme,
} from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const theme = extendTheme({
    config: {
        useSystemColorMode: true,
        initialColorMode: 'dark',
    },
});

ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </Provider>,

    document.getElementById('root')
);

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, HStack, Flex, Box, Icon } from '@chakra-ui/react';
import { FiUserPlus } from 'react-icons/fi';
import { TableComponent } from '../TabelComponent/TableComponent';
import axios from 'axios';
import { BACK_END_URL } from '../../env';
import { cookie } from '../../utils';

export const Report = () => {
    const tableHeaders = ['PtName', 'Created', 'Actions'];
    const [reportsData, setReportData] = useState([]);
    const [headers, setHeader] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data: response } = await axios.get(`${BACK_END_URL}/reports/list`, {
                    headers: {
                        authorization: cookie.get('session', {
                            path: '/',
                        }),
                    },
                });
                if (response.code === 200) {
                    setReportData(response.data);
                    if (reportsData.length > 0) console.log(Object.keys(reportsData[0]));
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log('reports', reportsData);
    return (
        <>
            <Box marginTop="10vh">
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} marginY={5} alignItems="center">
                        <Flex
                            justify={{
                                md: 'center',
                            }}>
                            {/* <Button
                                size="sm"
                                variant="solid"
                                onClick={() => {
                                    // setOpenModal(true);
                                    // setOpenPtModal(true);
                                }}
                                leftIcon={<Icon as={FiUserPlus} />}
                                colorScheme="purple"></Button> */}
                        </Flex>
                    </HStack>
                </Flex>
                <TableComponent tableData={[]} tableHeaders={['']} iconSet={[]} />
            </Box>
        </>
    );
};

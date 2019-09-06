import React from 'react';
import styled from 'styled-components';
import { ItemTable } from '../ItemTable';


export const Table = styled.View`
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: #e0e0e0;
    margin-top: 60px;
`;

export const TableList = ({ data, navigation }) => {
    return (
        <Table>
            {
                data.map((item, i) => {
                    return (
                        <ItemTable navigation={navigation} key={item.id || i} {...item} />
                    )
                })
            }
        </Table>
    )
}
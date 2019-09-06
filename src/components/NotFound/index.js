import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
    padding: 10px;
    width: 100%;
`;

const Title = styled.Text`
    color: gray;
    font-size: 20px;
    text-align: center;
`;

export const NotFoundText = ({ message }) => (
    <Container>
        <Title>{message || 'Not Found'}</Title>
    </Container>
);



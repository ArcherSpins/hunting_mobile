import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
    background-color: #2c3ef79c;
    padding: 6px 10px;
    width: 100%;
`;

const Title = styled.Text`
    color: white;
`;

export default ({ message }) => (
    <Container>
        <Title>{ message || 'Вы успешно создали разрешение!' }</Title>
    </Container>
);



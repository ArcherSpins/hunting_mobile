import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
    flex: 1;
    padding: 10px;
    background-color: #efefef;
    justify-content: center;
    align-items: center;
`;

const ErrorImage = styled.Image`
    width: 50%;
    height: 200px;
`;

const Title = styled.Text`
    font-size: 18px;
    color: #333;
`;

export default () => (
    <Container>
        <ErrorImage source={require('../../../assets/error.png')} />
        <Title>Произошла ошибка при загрузке!</Title>
    </Container>
);
import React from 'react';
import { Container, ImageLoad, TitleLoad } from './styled';

export default ({ message }) => (
    <Container>
        <ImageLoad source={require('../../../assets/not_ent.png')} />
        <TitleLoad>{message}</TitleLoad>
    </Container>
);

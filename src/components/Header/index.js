import React from 'react';
import { Container, Label, Icon, Logo, Text, Title } from './styled';

export const Header = ({user}) => {
    const filterStr =  user.customer_name ? user.customer_name.trim().split(' ').filter(a => a !== '') : [];
    const str = filterStr.length > 1 ? filterStr[1] : filterStr.length > 0 ? filterStr[0] : 'Нет имени';

    return (
        <Container>
            <Logo>
                <Icon>
                    <Text>S</Text>
                </Icon>
                <Label>{str}</Label>
            </Logo>
            <Title>
                Hunter 05
            </Title>
        </Container>
    )
}
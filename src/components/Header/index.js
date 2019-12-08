import React from 'react';
import { Icon as IconNative } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import { Container, Label, Icon, Logo, Text, Title } from './styled';

export const Header = ({user, navigation = { navigate: () => {} }}) => {
    const filterStr =  user.customer_name ? user.customer_name.trim().split(' ').filter(a => a !== '') : [];
    const str = filterStr.length > 1 ? filterStr[1] : filterStr.length > 0 ? filterStr[0] : 'Нет имени';
    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Logo>
                    <Icon>
                        <Text>S</Text>
                    </Icon>
                    <Label>{str}</Label>
                </Logo>
            </View>
            <Title>
                Hunter 05
            </Title>
            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SETTINGS', ({ user }))}>
                    <IconNative style={{ color: "#fff9" }} name="settings" />
                </TouchableOpacity>
            </View>
        </Container>
    )
}
import React, { useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components';

const Title = styled.Text`
    font-size: 18px;
    text-align: center;
    color: #333;
`;

const Button = styled.TouchableOpacity`
    padding: 5px 15px;
    margin-top: 20px;
    background-color: #3b99fc;
    border-radius: 4px;
`;

export default ({ navigation }) => {
    const [successPayment, toggleStatusPayment] = useState(false);
    const { error, successClosePayment } = navigation.state.params;


    if (error || successClosePayment || successPayment) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Title>
                    {successClosePayment ? 'Произошла отмена оплаты' : successPayment ? 'Оплата успешна' : 'Произошла ошибка оплаты'}
                </Title>
                <Button onPress={() => navigation.navigate('DETAILS')}>
                    <Text style={{ color: 'white' }}>Вернуться</Text>
                </Button>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title>Идёт проверка оплаты...</Title>
            <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />
        </View>
    );
}

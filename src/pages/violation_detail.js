import React, { useEffect, useState } from 'react';
import { Toast } from 'native-base';
import { ImageBackground, Dimensions, StyleSheet, AsyncStorage, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    HeaderDetails,
    FooterTabs,
    Loading,
} from '../components';
import { Text, CardMapDetail, ContainerPage, Content, Div } from './styled';
import { url } from '../url';

const w = Dimensions.get('window').width;

const TitleCard = styled.Text`
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #d4d4d4;
`;


const ViolationDetailComponent = ({ navigation, connected }) => {
    const [violation, setViolation] = useState(null);
    const { title, data, headerTitle } = navigation.state.params;

    useEffect(async () => {
        if (connected) {
            fetch(`${url}/api/v1/Customer/Violation/${data.data_customer_violations_id}`)
                .then(response => response.json())
                .then(async data => {
                    setViolation(data);
                    await _setAsyncData(`violation_data_${data.data_customer_violations_id}`, JSON.stringify(data));
                })
                .catch(err => Toast.show({
                    text: err,
                    type: 'danger'
                }));
        } else {
            const violation = await _getAsyncData(`violation_data_${data.data_customer_violations_id}`);
            violation ? setViolation(JSON.parse(violation)) : Toast.show({
                text: 'Ошибка подключения',
                type: 'danger'
            });
        }
    }, [data]);

    const _setAsyncData = async (label, value) => {
        try {
            await AsyncStorage.setItem(label, value);
        } catch (error) {
            return
        }
    }
    
    const _getAsyncData = async (label) => {
        try {
            const value = await AsyncStorage.getItem(label);
            if (value) {
                return value;
            }
        } catch (error) {
            return {}
        }
    }

    return (
        <ContainerPage>
            <HeaderDetails onGoBack={() => navigation.goBack()} title={headerTitle || title} />
            <StatusBar backgroundColor="#36404a" barStyle="light-content" />
            <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                <Content>
                    <Text style={styles.title}>Нарушение</Text>
                    {
                        violation ? (
                            <CardMapDetail>
                                <TitleCard>{violation.pr_violation_name}</TitleCard>
                                <Div>
                                    <Text style={styles.title}>Номер протокола: {violation.pr_number_protocol || 'Не найдено'}</Text>
                                </Div>
                                <Div>
                                    <Text style={styles.title}>Охотничье угодье: {violation.pr_hunting_farm_name || 'Не найдено'}</Text>
                                </Div>
                                <Div>
                                    <Text style={styles.title}>Штраф: {violation.amount_fine || 'Не найдено'}</Text>
                                </Div>
                            </CardMapDetail>
                        ) : <Loading />
                    }
                </Content>
            </ImageBackground>
            <FooterTabs navigation={navigation} />
        </ContainerPage>
    );
}


const styles = StyleSheet.create({
    title: {
        padding: 10
    }
});

const mapStateToProps = state => ({
    connected: state.connect.connected,
});

const ViolationDetail = connect(mapStateToProps, {})(ViolationDetailComponent);


export { ViolationDetail };

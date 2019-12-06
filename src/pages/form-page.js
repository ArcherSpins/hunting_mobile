import React, { PureComponent } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Icon, Text, DatePicker, Toast } from 'native-base';
import { View, StatusBar, BackHandler, AsyncStorage } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import { Loading } from '../components';

import { authUserAction, stopLoadingFormAction } from '../redux/actions';

import { url } from '../url';


class FormPage extends PureComponent {

    constructor() {
        super();

        this.state = {
            registrator: false,
            seria: {
                value: '05',
                success: false,
            },
            nomer: {
                value: '018233',
                success: false,
            },
            date: {
                value: null,
                success: false
            }
        }
        // NetInfo.isConnected.fetch().then(isConnected => {
        //     alert(isConnected);
        // });
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        return true;
    }

    componentWillUnmount() {
        this.setState({registrator: false});
        this.backHandler.remove()
    }

    componentDidUpdate() {
        this.validation();
    }

    validation = () => {
        const { seria, nomer, date } = this.state;
        if (!seria.success && seria.value.length === 2 && seria.value.replace(/[0-9]{2}/, '').length === 0) {
            this.setState({
                seria: {
                    ...seria,
                    success: true,
                }
            });
        } else if(seria.success && (seria.value.length < 2 || !seria.value.replace(/[0-9]{2}/, '').length === 0)) {
            this.setState({
                seria: {
                    ...seria,
                    success: false,
                }
            });
        }

        if (!nomer.success && nomer.value.length === 6 && nomer.value.replace(/[0-9]{6}/, '').length === 0) {
            this.setState({
                nomer: {
                    ...nomer,
                    success: true,
                }
            });
        } else if(nomer.success && (nomer.value.length < 6 || !nomer.value.replace(/[0-9]{6}/, '').length === 0)) {
            this.setState({
                nomer: {
                    ...nomer,
                    success: false,
                }
            });
        }

        if (!date.success && date.value) 
            this.setState({
                date: {
                    ...date,
                    success: true
                }
            });
        else if (date.success && !date.value) this.setState({
            date: {
                ...date,
                success: false
            }
        });
    }

    changeSeria = (e) => {
        const { seria } = this.state;
        if (e.nativeEvent.text.length < 3) {
            this.setState({
                seria: {
                    ...seria,
                    value: e.nativeEvent.text,
                }
            });
        }
    }

    changeNomer = (e) => {
        const { nomer } = this.state;
        if (e.nativeEvent.text.length < 7) {
            this.setState({
                nomer: {
                    ...nomer,
                    value: e.nativeEvent.text,
                }
            });
        }
    }

    setDate = (d) => this.setState({ date: { ...this.state.date, value: d } });

    _storeData = async (label, value) => {
        try {
          await AsyncStorage.setItem(label, value);
        } catch (error) {
          return;
        }
    };

    submitFormAuth = () => {
        const { seria, nomer, date } = this.state;
        const { navigation, authUserAction } = this.props;

        if (seria.success && nomer.success && date.success)
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    try {
                        fetch(`${url}/api/v1/Customer?docserial=${seria.value}&docnumber=${nomer.value}&issuedate=${format(date.value, 'dd.MM.yyyy')}`, {
                            headers: {
                                Authorization: 'uptec4nGePz9QDqqAz0bEmV3B15NEnUq'
                            }
                        })
                            .then(response => response.json())
                            .then(async data => {
                                if (data.Message && data.Message === 'Произошла ошибка.') {
                                    return Toast.show({
                                        text: 'Произошла ошибка на сервере',
                                        buttonText: 'x',
                                        type: 'danger'
                                    });
                                }
                                if (data.data_customer_id) {
                                    authUserAction({nomer, seria, ...data});
                                    console.log(data, 'set local')
                                    await this._storeData('user', JSON.stringify(data));
                                    navigation.navigate('HOME');
                                    return data;
                                }
                                Toast.show({
                                    text: 'Не найдено данных',
                                    buttonText: 'x',
                                    type: 'danger'
                                });
                            })
                            .catch(err => Toast.show({
                                text: err,
                                buttonText: 'x',
                                type: 'danger'
                            }));
                    } catch(err) {
                        return Toast.show({
                            text: err,
                            buttonText: 'x',
                            type: 'danger'
                        });
                    }
                } else {
                    Toast.show({
                        text: 'Ошибка подключения',
                        buttonText: 'x',
                        type: 'danger'
                    });
                }
            });
        else {
            Toast.show({
                text: 'Пустые поля!',
                buttonText: 'x',
                type: 'danger'
            });
        }
    }

    render() {
        const { seria, nomer, registrator, date } = this.state;
        const { formLoading, user, navigation } = this.props;

        if (user && user.data_customer_id) {
            navigation.navigate('HOME');
        }

        return (
            <Container>
                <Header style={{backgroundColor: '#36404a'}} />

                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                {/* <CreatePermission /> */}
                <Content style={{flex: 1, paddingTop: 80}}>
                    <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 20}}>Авторизация</Text>
                    <Form style={{justifyContent: 'center', flex: 1}}>
                        <Item success={seria.success} style={{marginBottom: 10}}>
                            <Input style={{ color: "#333", paddingLeft: 10 }} placeholder="Серия паспорта" value={seria.value} onChange={this.changeSeria} />
                            {
                                seria.success ? <Icon name='checkmark-circle' /> : null
                            }
                        </Item>
                        <Item success={nomer.success}>
                            <Input style={{ color: "#333", paddingLeft: 10 }} placeholder="Номер паспорта" value={nomer.value} onChange={this.changeNomer} />
                            {
                                nomer.success ? <Icon name='checkmark-circle' /> : null
                            }
                        </Item>
                        <Item style={{ paddingTop: 10, paddingBottom: 5, justifyContent: 'space-between' }} success={date.success}>
                            <DatePicker
                                defaultDate={date.value}
                                locale={"ru"}
                                formatChosenDate={date => format(date, 'dd.MM.yyyy')}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"slide"}
                                androidMode={"calendar"}
                                placeHolderText="Дата выдачи"
                                textStyle={{ color: "#333" }}
                                placeHolderTextStyle={{ color: "#333" }}   
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                            {
                                date.success ? <Icon name='checkmark-circle' /> : null
                            }
                        </Item>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginRight: 20}}>
                            <Button
                                disabled={(!nomer.success || !seria.success || !date.success)}
                                primary={(nomer.success && seria.success && date.success)}
                                onPress={this.submitFormAuth}
                            ><Text> Войти </Text></Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        formLoading: state.user.formLoading,
    }
}

const mapDispatchToProps = {
    authUserAction, stopLoadingFormAction
}


export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
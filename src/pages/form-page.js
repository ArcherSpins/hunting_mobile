import React, { PureComponent } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Icon, Text } from 'native-base';
import { View, AsyncStorage, StatusBar } from 'react-native';
import axios from 'axios';
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
        }
        // NetInfo.isConnected.fetch().then(isConnected => {
        //     alert(isConnected);
        // });
    }

    componentWillUnmount() {
        this.setState({registrator: false});
    }

    componentDidUpdate() {
        this.validation();
    }

    validation = () => {
        const { seria, nomer } = this.state;
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

    _storeData = async (label, value) => {
        try {
          await AsyncStorage.setItem(label, value);
        } catch (error) {
          console.log(error);
        }
    };

    submitFormAuth = () => {
        const { seria, nomer } = this.state;
        const { navigation, authUserAction } = this.props;

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                try {
                    fetch(`${url}/api/v1/Customer/${seria.value}/${nomer.value}`, {
                        headers: {
                            Authorization: 'uptec4nGePz9QDqqAz0bEmV3B15NEnUq'
                        }
                    })
                        .then(response => response.json())
                        .then(async data => {
                            console.log(data, `${url}/api/v1/Customer/${seria.value}/${nomer.value}`)
                            authUserAction({nomer, seria, ...data});
                            await this._storeData('user', JSON.stringify(data));
                            navigation.navigate('HOME');
                            return data;
                        })
                        .catch(err => console.log(`${url}/api/v1/Customer/${seria.value}/${nomer.value}`, err));
                } catch(err) {
                    console.log(err)
                }
            } else {
                alert('нет подключения к интернету');
            }
        });
    }

    render() {
        const { seria, nomer, registrator } = this.state;
        const { formLoading, user, navigation } = this.props;

        if (user) {
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
                            <Input placeholder="Серия паспорта" value={seria.value} onChange={this.changeSeria} />
                            {
                                seria.success ? <Icon name='checkmark-circle' /> : null
                            }
                        </Item>
                        <Item success={nomer.success}>
                            <Input placeholder="Номер паспорта" value={nomer.value} onChange={this.changeNomer} />
                            {
                                nomer.success ? <Icon name='checkmark-circle' /> : null
                            }
                        </Item>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginRight: 20}}>
                            <Button
                                disabled={(!nomer.success || !seria.success)}
                                primary={(nomer.success && seria.success)}
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
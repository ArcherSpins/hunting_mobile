import React, { PureComponent } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Icon, Text } from 'native-base';
import { View, AsyncStorage, StatusBar } from 'react-native';
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

    componentDidMount = async () => {
        const { authUserAction, stopLoadingFormAction, navigation } = this.props;
        try {
            const result = await this._getAsyncData('user');
            if (result) {
                authUserAction(JSON.parse(result));
//                navigation.navigate('HOME');
            }

            this.validation();
        } catch(err) {
            console.log(err)
        } finally {
            stopLoadingFormAction();
        }       
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

    _getAsyncData = async (label) => {
        try {
            const value = await AsyncStorage.getItem(label);
            if (value) {
                return value;
            }
        } catch (error) {
            console.log(error);
        }
    }

    submitFormAuth = () => {
        const { seria, nomer } = this.state;
        const { navigation, authUserAction } = this.props;
        NetInfo.isConnected.fetch().then(async isConnected => {
            if (isConnected) {
                fetch(`http://172.16.17.11:8080/api/v1/Customer/${seria.value}/${nomer.value}`, {
                    headers: {
                        Authorization: 'uptec4nGePz9QDqqAz0bEmV3B15NEnUq'
                    }
                })
                    .then(response => response.json())
                    .then(async data => {
                        authUserAction({nomer, seria, ...data});
                        navigation.navigate('HOME');
                        await this._storeData('user', JSON.stringify(data));
                        return data;
                    })
                    .catch(err => alert(Object.keys(err).join(' ')));
            } else {
                alert('нет подключения к интернету');
            }
        });
        
    }

    render() {
        const { seria, nomer } = this.state;
        const { formLoading } = this.props;


        if (formLoading)
            return <Loading />;

        return (
            <Container>
                <Header style={{backgroundColor: '#36404a'}} />

                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
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
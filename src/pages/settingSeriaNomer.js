import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Content, Form, Item, Input, Label, Button, Text, Icon, DatePicker, Toast } from 'native-base';
import styled from 'styled-components';

import { authUserAction } from '../redux/actions';

import { url } from '../url';

const ButtonsGroup = styled.View`
    display: flex;
    flex-direction: row;
    padding: 20px;
    margin-top: 10px;
    justify-content: flex-end;
`;


class FormComponent extends Component {

    constructor(props) {
        super(props);
        const { user } = props.navigation.state.params;
        const dateArr = user.issue_date.split('.').map(p => Number(p)).reverse();
        this.state = {
            chosenDate: {
                value: new Date(dateArr[0], dateArr[1], dateArr[2]),
                success: false
            },
            seria: {
                value: this.props.navigation.state.params.user ? this.props.navigation.state.params.user.serial : '',
                success: false,
            },
            nomer: {
                value: this.props.navigation.state.params.user ? this.props.navigation.state.params.user.number : '',
                success: false,
            },
        };
        this.setDate = this.setDate.bind(this);
    }


    componentDidUpdate() {
        this.validation();
    }

    validation = () => {
        const { seria, nomer, chosenDate } = this.state;
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

        if (!chosenDate.success && chosenDate.value) 
            this.setState({
                chosenDate: {
                    ...chosenDate,
                    success: true
                }
            });
        else if (chosenDate.success && !chosenDate.value) this.setState({
            chosenDate: {
                ...chosenDate,
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
    
    setDate(newDate) {
        this.setState({ chosenDate: { ...this.state.chosenDate, value: newDate } });
    }

    _storeData = async (label, value) => {
        try {
          await AsyncStorage.setItem(label, value);
        } catch (error) {
          return;
        }
    };

    submitFormEdit = () => {
        const { seria, nomer, chosenDate } = this.state;
        const { navigation, authUserAction } = this.props;

        if (seria.success && nomer.success && chosenDate.success) {
            try {
                fetch(`${url}/api/v1/Customer?docserial=${seria.value}&docnumber=${nomer.value}&issuedate=${format(chosenDate.value, 'dd.MM.yyyy')}`, {
                    headers: {
                        Authorization: 'uptec4nGePz9QDqqAz0bEmV3B15NEnUq'
                    }
                })
                    .then(response => response.json())
                    .then(async data => {

                        authUserAction({nomer, seria, ...data});
                        await this._storeData('user', JSON.stringify(data));
                        navigation.navigate('HOME');
                        return data;
                    })
                    .catch(err => Toast.show({
                        text: err,
                        buttonText: 'x',
                        type: 'danger'
                    }));
            } catch(err) {
                Toast.show({
                    text: err,
                    buttonText: 'x',
                    type: 'danger'
                })
            }
            
        } else {
            Toast.show({
                text: 'Пустые поля!',
                buttonText: 'x',
                type: 'danger'
            })
        }
    }

  render() {
    const { seria, nomer, registrator, chosenDate } = this.state;
    const { navigation } = this.props;
    const { user } = navigation.state.params;
    const stylesItem = {marginBottom: 10, flexDirection: 'column', alignItems: 'flex-start'};
    const stylesLabel = { paddingLeft: 10, fontSize: 14 };

    return (
      <Content style={{ paddingTop: 70 }}>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>Редактирование</Text>
        <Form style={{ marginTop: 40 }}>
            <View style={stylesItem}>
                <Label style={stylesLabel}>Серия</Label>
                <Item success={seria.success}>
                    <Input style={{ color: "#333", paddingLeft: 10 }} placeholder="Серия паспорта" value={seria.value} onChange={this.changeSeria} />
                    {
                        seria.success ? <Icon name='checkmark-circle' /> : null
                    }
                </Item>
            </View>
            <View style={stylesItem}>
                <Label style={stylesLabel}>Номер</Label>
                <Item success={nomer.success}>
                    <Input style={{ color: "#333", paddingLeft: 10 }} placeholder="Номер паспорта" value={nomer.value} onChange={this.changeNomer} />
                    {
                        nomer.success ? <Icon name='checkmark-circle' /> : null
                    }
                </Item>
            </View>
            <View style={stylesItem}>
                <Label style={stylesLabel}>Дата выдачи</Label>
                <Item success={chosenDate.success} style={{ width: '100%', paddingRight: 15, justifyContent: 'space-between' }}>
                    <DatePicker
                        defaultDate={this.state.chosenDate.value}
                        locale={"ru"}
                        timeZoneOffsetInMinutes={undefined}
                        formatChosenDate={date => format(date, 'dd.MM.yyyy')}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText={user.issue_date}
                        textStyle={{ color: "#333" }}
                        placeHolderTextStyle={{ color: "#333" }}
                        onDateChange={this.setDate}
                        disabled={false}
                    />
                    {
                        chosenDate.success ? <Icon name='checkmark-circle' /> : null
                    }
                </Item>
            </View>
        </Form>
        <ButtonsGroup>
            <Button onPress={this.submitFormEdit} primary style={{ marginRight: 10 }} disabled={(!nomer.success || !seria.success || !chosenDate.success)}>
                <Text>Сохранить</Text>
            </Button>
            <Button onPress={() => navigation.goBack()} danger>
                <Text>Отменить</Text>
            </Button>
        </ButtonsGroup>
      </Content>
    );
  }
}

const mapStateToProps = (state) => state

const mapDispatchToProps = {
    authUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
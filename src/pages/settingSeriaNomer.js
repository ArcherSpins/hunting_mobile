import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text, Icon, DatePicker } from 'native-base';
import styled from 'styled-components';

const ButtonsGroup = styled.View`
    display: flex;
    flex-direction: row;
    padding: 20px;
    margin-top: 10px;
    justify-content: flex-end;
`;


export default class FormComponent extends Component {

    constructor(props) {
        super(props);
        const { user } = props.navigation.state.params;
        const dateArr = user.issue_date.split('.').map(p => Number(p)).reverse();
        this.state = {
            chosenDate: new Date(dateArr[0], dateArr[1], dateArr[2]),
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
    
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

  render() {
    const { seria, nomer, registrator } = this.state;
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
                <Item style={{ width: '100%' }}>
                    <DatePicker
                        defaultDate={this.state.chosenDate}
                        locale={"ru"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText={user.issue_date.replace(/\./g, '/')}
                        textStyle={{ color: "#333" }}
                        placeHolderTextStyle={{ color: "#333" }}
                        onDateChange={this.setDate}
                        disabled={false}
                    />
                </Item>
            </View>
        </Form>
        <ButtonsGroup>
            <Button primary style={{ marginRight: 10 }} disabled={(!nomer.success || !seria.success)}>
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
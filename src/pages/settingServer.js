import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text, Icon, DatePicker } from 'native-base';
import styled from 'styled-components';

import { url } from '../url';

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
        this.state = {
            server: url,
            success: false
        };
    }


    componentDidUpdate() {
        this.validation();
    }

    validation = () => {
        const { server, success } = this.state;
        if (!success && /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/.test(server)) {
            this.setState({
                success: true
            });
        } else if(success && !/(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/.test(server)) {
            this.setState({
                success: false
            });
        }
    }

    changeServer = (e) => {
        const { server } = this.state;
        this.setState({
            server: e.nativeEvent.text
        });
    }

  render() {
    const { server, success } = this.state;
    const { navigation } = this.props;
    const stylesItem = {marginBottom: 10, flexDirection: 'column', alignItems: 'flex-start'};
    const stylesLabel = { paddingLeft: 10, fontSize: 14 };
    return (
      <Content style={{ paddingTop: 70 }}>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>Редактирование сервера</Text>
        <Form style={{ marginTop: 40 }}>
            <View style={stylesItem}>
                <Label style={stylesLabel}>Сервер</Label>
                <Item success={success}>
                    <Input style={{ color: "#333", paddingLeft: 10 }} placeholder="Сервер" value={server} onChange={this.changeServer} />
                    {
                        success ? <Icon name='checkmark-circle' /> : null
                    }
                </Item>
            </View>
        </Form>
        <ButtonsGroup>
            <Button primary style={{ marginRight: 10 }} disabled={(!success || !success)}>
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
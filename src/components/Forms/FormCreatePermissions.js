import React from 'react';
import { Modal, Text, Picker, View } from 'react-native';
import styled from 'styled-components';
import { Form, Item, Input, Button } from 'native-base';
// import YandexPayment from 'react-native-yandex-payment';
import WebView from '../Webview';
import { url } from '../../url';

const Container = styled.View`
    background-color: rgba(0,0,0,0.6);
    flex: 1;
`;

const ModalComp = styled.View`
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    shadow-offset: {width: 2, height: 2};
    shadow-color: rgba(0,0,0,0.4);
    shadow-opacity: 0.5;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    flex: 1;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: tomato;
    border-radius: 25px;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    padding-bottom: 1px;
`;


const Title = styled.Text`
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
`;

const Label = styled.Text`
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
`;

const FieldBlock = styled.View`
    margin-bottom: 10px;
`;


class CreatePermission extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            hunting_grounds: {
                value: '',
                selected: false,
                error: false,
                id: ''
            },
            season: {
                value: '',
                selected: false,
                data: [],
                error: false,
                id: ''
            },
            stamp_duty: {
                data: {
                    Tariff: null,
                    Charge: null
                }
            },
            isOpenWebview: false,
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange = (idx, selectedOption) => {
        console.log(idx, selectedOption)
        switch(idx) {
            case 'hunting_grounds':
                this._fetchHuntiongSeason(selectedOption);
                this.setState({
                    hunting_grounds: {
                        ...this.state.hunting_grounds,
                        value: selectedOption,
                        selected: true,
                        id: selectedOption,
                    }
                });
                break;
            case 'season':
                this._fetchSeason(selectedOption);
                this.setState({
                    season: {
                        ...this.state.season,
                        value: selectedOption,
                        selected: true,
                        id: selectedOption,
                    }
                });
                break;
            default: break;
        }
    }

    _fetchHuntiongSeason = (id) => {
        fetch(`${url}/api/v1/Seasons/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({
                season: {
                    ...this.state.season,
                    data,
                }
            })
        })
        .catch(error => {
            console.log(JSON.stringify(error), error);
        })
    }

    _fetchSeason = (id) => {
        fetch(`${url}/api/v1/Seasons/${id}/Tariff`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            this.setState({
                stamp_duty: {
                    data,
                }
            })
        })
        .catch(error => {
            console.log(JSON.stringify(error), error);
        })
    }

    changeInput = (idx, e) => {
        this.setState({
            [idx]: {
                value: e.nativeEvent.text,
            }
        });
    }

    getFormPay = async () => {
        const { user } = this.props;
        const { season } = this.state;
        console.log(user, season)
        const response = await fetch(`${url}/api/v1/Payment/paymentPage?huntingFarmSeasonId=${season.value}&customerLicId=${user.data_customer_hunting_lic_id}`, {
            method: 'post'
        });
        const data = await response.json();
        console.log(data)
        return data.Success;
    }

    onSubmit = async () => {
        const { onSubmit } = this.props;
        let status = true;
        for(let i in this.state) {
            if (this.state[i].value === '') {
                this.setState({[i]: {
                    ...this.state[i],
                    error: true
                }});
            } else {
                this.setState({[i]: {
                    ...this.state[i],
                    error: false
                }});
                status = false;
            }
        }
        const data = await this.getFormPay();
        if (data) {
            this.setState({ isOpenWebview: true, FormUrl: data.FormUrl });
            onSubmit(data, null);
        }
        
    }

    onCloseWebview = () => {
        this.setState({ isOpenWebview: false });
    }

    render() {
        const { huntings } = this.props;
        
        return (
            <Container>
                <ModalComp>
                    <Title>Создание разрешения</Title>
                    <FieldBlock>
                        <Label>Охотугодье</Label>
                        <View style={{
                            borderColor: this.state.hunting_grounds.error ? 'tomato' : 'rgba(0,0,0,0.3)',
                            borderWidth: 1,
                            borderRadius: 4
                        }}>
                            <Picker
                                selectedValue={this.state.hunting_grounds.value || ''}
                                style={{
                                    height: 40,
                                    width: '100%',
                                }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.onChange('hunting_grounds', itemValue)
                                }>
                                {
                                    [{ hunting_farm_id: null, hunting_farm_name: 'Не выбрано' }, ...huntings].map(item => (
                                        <Picker.Item key={item.hunting_farm_id} label={item.hunting_farm_name} value={item.hunting_farm_id} />
                                    ))
                                }
                            </Picker>
                        </View>
                    </FieldBlock>
                    <FieldBlock>
                        <Label>Сезон</Label>
                        <View style={{
                            borderColor: this.state.season.error ? 'tomato': 'rgba(0,0,0,0.3)',
                            borderWidth: 1,
                            borderRadius: 4
                        }}>
                            <Picker
                                selectedValue={this.state.season.value || ''}
                                enabled={this.state.season.data.length > 0}
                                style={{
                                    height: 40,
                                    width: '100%',
                                }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.onChange('season', itemValue)
                                }>
                                {
                                    [{ season_name: 'Не выбрано', season_id: null }, ...this.state.season.data].map((item, i) => (
                                        <Picker.Item key={item.animal_season_id || i } label={item.season_name} value={item.season_id} />
                                    ))
                                }
                            </Picker>
                        </View>
                    </FieldBlock>
                    {
                        this.state.stamp_duty.data.Tariff !== null ? (
                            <FieldBlock>
                                <Label>Гос пошлина</Label>
                                <View style={{
                                    borderColor: 'rgba(0,0,0,0.3)',
                                    borderWidth: 1,
                                    borderRadius: 4
                                }}>
                                    <Text style={{height: 40, padding: 10}}>{this.state.stamp_duty.data.Tariff}</Text>
                                </View>
                            </FieldBlock>
                        ) : null
                    }
                    {
                        this.state.stamp_duty.data.Charge !== null ? (
                            <FieldBlock>
                                <Label>Установленный сбор</Label>
                                <View style={{
                                    borderColor: 'rgba(0,0,0,0.3)',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                }}>
                                    <Text style={{height: 40, padding: 10}}>{this.state.stamp_duty.data.Charge}</Text>
                                </View>
                            </FieldBlock>
                        ) : null
                    }
                    <Button
                        disabled={!this.state.hunting_grounds.selected || !this.state.season.selected}
                        style={{ marginTop: 25 }}
                        onPress={this.onSubmit}
                        primary={this.state.hunting_grounds.selected && this.state.season.selected}
                    >
                        <Text style={{textAlign: 'center', width: '100%', color: '#fff'}}> Создать </Text>
                    </Button>
                </ModalComp>
            </Container>
        );
    }
}


export { CreatePermission };


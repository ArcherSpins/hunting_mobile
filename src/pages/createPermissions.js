import React from 'react';
import { View, ScrollView, Dimensions, ImageBackground, AsyncStorage, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import { Header, CardData, TableList, CreatePermission, HeaderDetails, Loading, WebView } from '../components';
import { Container, ContainerPage } from './styled';
import { getPermissionAction, getViolationsAction, setConnect, getHuntings, notLoadHunting } from '../redux/actions';
import { url } from '../url';

const w = Dimensions.get('window').width;

const password = 'chekmaster*?1';
const userName = 'chekmaster-api';

class CreatePermissions extends React.Component {

    state = {
        errorLoad: false,
        loading: false,
        isOpenWebview: false
    }

    _setAsyncData = async (label, value) => {
        try {
            await AsyncStorage.setItem(label, value);
        } catch (error) {
            return {}
        }
    }

    _getAsyncData = async (label) => {
        try {
            const value = await AsyncStorage.getItem(label);
            if (value) {
                return value;
            }
        } catch (error) {
            return {}
        }
    }

    componentDidMount = async () => {
        const { getHuntings } = this.props;
        this.setState({ loading: false, isOpenWebview: false });
        NetInfo.isConnected.fetch().then(async isConnected => {
            if (isConnected) {
                await this.fetchHuntings();
                return false;
            } else {
                const huntings = await this._getAsyncData('huntings');
                huntings ? getHuntings(JSON.parse(huntings)) : this.setState({ errorLoad: true });
            }
        });
    }

    fetchHuntings = async () => {
        const { getHuntings } = this.props;

        fetch(`${url}/api/v1/HuntingFarm`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(async (data) => {
            getHuntings(data);
            await this._setAsyncData('huntings', JSON.stringify(data));
        })
        .catch(error => {
            Toast.show({
                text: error,
                type: 'danger'
            })
        })
    }

    onSubmit = (data, token) => {
        const { goMessage } = this.props.navigation.state.params;
        const { user } = this.props;
        this.setState({ loading: true });
        // const idx = Math.random() * 10000000;
        console.log(data)
        this.setState({ loading: false, isOpenWebview: true, url: data.FormUrl, orderId: data.OrderId });

        // fetch(`https://web.rbsuat.com/ab/rest/register.do?amount=10000&language=ru&orderNumber=${idx}&password=${password}&returnUrl=https://web.rbsuat.com/ab/finish.html?success=true&failUrl=https://web.rbsuat.com/ab/finish.html?success=false&userName=${userName}&pageView=DESKTOP`, {
        //     method: 'GET',
        // })
        // .then(response => response.json())
        // .then(data => {
        //     this.setState({ loading: false, isOpenWebview: true, url: data.formUrl, orderId: data.orderId });
        // })
        // .catch(error => {
        //     Toast.show({
        //         text: error,
        //         type: 'danger'
        //     })
        // })
        // fetch(`${url}/api/v1/Seasons/Payment`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: 'uptec4nGePz9QDqqAz0bEmV3B15NEnUq'
        //     },
        //     body: JSON.stringify({
        //         Payment_token: token,
        //         Hunting_farm_season_id: data.season.value,
        //         Customer_hunting_lic_id: user.data_customer_hunting_lic_id,
        //     })
        // })
        // .then(response => response.json())
        // .then(async data => {
        //     this.setState({ loading: false, isOpenWebview: true });
        //     // await goMessage();
        //     // this.props.navigation.goBack();
        // })
        // .catch(error => {
        //     console.log(error, JSON.stringify(error));
        // })
    }

    onCloseWebview = (fail, check) => {
        const { orderId } = this.state;
        if (check) {
            const { navigation } = this.props;
            navigation.navigate('PAYMENT_CHECK');
        }
        if (fail) this.closePayment(orderId);
        if (!fail && !check) this.setState({ isOpenWebview: false });
    }

    closePayment = (orderId) => {
        const { navigation } = this.props;
        fetch(`https://web.rbsuat.com/ab/rest/reverse.do?language=ru&orderId=${orderId}&password=${password}&userName=${userName}`)
            .then(response => response.json())
            .then(data => {
                // if (data.errorCode === '6') {
                //     console.log(data)
                //     navigation.navigate('PAYMENT_CHECK', ({ error: true }))
                // } else if(data.errorCode === '0') {
                //     console.log(data)
                //     navigation.navigate('PAYMENT_CHECK', ({ successClosePayment: true }))
                // }
            })
            .catch(err => this.setState({ isOpenWebview: false }))
    }

    render() {
        const { user, navigation, huntings, loadingHunting } = this.props;

        if (loadingHunting || this.state.loading) {
            return <Loading />
        }


        if (this.state.isOpenWebview) {
            return (
                <WebView
                    title="Оплата"
                    url={this.state.url}
                    goBack={this.onCloseWebview}
                />
            )
        }

        return (
            <ContainerPage>
                <HeaderDetails onGoBack={() => navigation.goBack()} title="Создание разрешения" />
                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                    <ScrollView>
                        <CreatePermission user={user} onSubmit={this.onSubmit} huntings={huntings} />
                    </ScrollView>
                </ImageBackground>
            </ContainerPage>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    huntings: state.hunting.huntings,
    loadingHunting: state.hunting.loadingHunting,
});

const mapDispatchToProps = {
    getHuntings,
    notLoadHunting,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePermissions);

import React from 'react';
import { View, ScrollView, Dimensions, ImageBackground, AsyncStorage, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import { Header, CardData, TableList, CreatePermission, HeaderDetails, Loading } from '../components';
import { Container, ContainerPage } from './styled';
import { getPermissionAction, getViolationsAction, setConnect, getHuntings, notLoadHunting } from '../redux/actions';
import { url } from '../url';

const w = Dimensions.get('window').width;



class CreatePermissions extends React.Component {

    state = {
        errorLoad: false,
    }

    _setAsyncData = async (label, value) => {
        try {
            await AsyncStorage.setItem(label, value);
        } catch (error) {
            console.log(error);
        }
    }
    
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

    componentDidMount = async () => {
        const { getHuntings } = this.props;
        NetInfo.isConnected.fetch().then(async isConnected => {
            if (isConnected) {
                await this.fetchHuntings();
                console.log('fetch data');
                return false;
            } else {
                const huntings = await this._getAsyncData('huntings');
                huntings ? getHuntings(JSON.parse(huntings)) : this.setState({ errorLoad: true });
            }
        });
         
    }

    // _payPermission = () => {
    //     fetch('https://edge.qiwi.com/sinap/api/v2/terms/21013/payments', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-type': 'application/json',
    //             Authorization: 'Bearer 7a41f792b198e9dc979ea3898ad9f2ad',
    //         },
    //         body: JSON.stringify({
    //             id: '123213213',
    //             sum: {
    //             amount: 1,
    //             currency: '643',
    //             },
    //             paymentMethod: {
    //             accountId: '643',
    //             type: 'Account',
    //             },
    //             fields: {
    //             account: '5486732053692539',
    //             },
    //         }),
    //         })
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(err => console.log(err))
    // }

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
            console.log(error);
        })
    }

    onSubmit = (data) => {
        const { goMessage } = this.props.navigation.state.params;
        const { user } = this.props;
        fetch(`${url}/api/v1/Customer/Permission/Add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'uptec4nGePz9QDqqAz0bEmV3B15NEnUq'
            },
            body: JSON.stringify({
                Hunting_farm_season_id: data.season.value,
                Customer_hunting_lic_id: user.data_customer_hunting_lic_id,
            })
        })
        .then(response => response.json())
        .then(async data => {
            console.log(data);
            await goMessage();
            this.props.navigation.goBack();
        })
        .catch(error => {
            console.log(error, JSON.stringify(error));
        })
    }

    render() {
        const { user, navigation, huntings, loadingHunting } = this.props;
        
        if (loadingHunting) {
            return <Loading />
        }

        return (
            <ContainerPage>
                <HeaderDetails onGoBack={() => navigation.goBack()} title="Создание разрешения" />
                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                    <ScrollView>
                        <CreatePermission onSubmit={this.onSubmit} huntings={huntings} />
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

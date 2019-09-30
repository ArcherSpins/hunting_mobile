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
        loading: false,
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
        this.setState({ loading: false });
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

    onSubmit = (data, token) => {
        const { goMessage } = this.props.navigation.state.params;
        const { user } = this.props;
        this.setState({ loading: true });
        fetch(`${url}/api/v1/Seasons/Payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'uptec4nGePz9QDqqAz0bEmV3B15NEnUq'
            },
            body: JSON.stringify({
                Payment_token: token,
                Hunting_farm_season_id: data.season.value,
                Customer_hunting_lic_id: user.data_customer_hunting_lic_id,
            })
        })
        .then(response => response.json())
        .then(async data => {
            this.setState({ loading: false });
            await goMessage();
            this.props.navigation.goBack();
        })
        .catch(error => {
            console.log(error, JSON.stringify(error));
        })
    }

    render() {
        const { user, navigation, huntings, loadingHunting } = this.props;

        if (loadingHunting || this.state.loading) {
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

import React from 'react';
import { ImageBackground, Dimensions, StatusBar, PermissionsAndroid, View, AsyncStorage, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Toast } from 'native-base'
import Geolocation from 'react-native-geolocation-service';
import {
    HeaderDetails,
    ListItemComponent, 
    FooterTabs,
    ItemDetailsForHungry,
    ItemDetailsForInfo,
    UserComponent,
    NotFoundText,
    Loading,
    CreatePermission,
    AlertMessage
} from '../components';
import { connect } from 'react-redux';
import { ContainerPage, Content, AddedButton } from './styled';
import { getLocationUser, setLocationUser, getPermissionAction, fetchPermission } from '../redux/actions';

import { url } from '../url';

const w = Dimensions.get('window').width;

class DetailsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            ready: false,
            where: {lat: null, lng: null},
            error: null,
            alertMessage: false,
            createPermission: false,
            loading: false,
            dataPermissions: []
        }
    }

     async componentDidMount() {
        const { getLocationUser, navigation } = this.props;
        const { user } = navigation.state.params;

        if (user) {
            this.fetchPermissions();
            NetInfo.isConnected.fetch().then(async isConnected => {
                setConnect(isConnected);
                if (isConnected) {
                    getLocationUser();
                    const geoOptions = {
                        enableHighAccuracy: true,
                        timeOut: 300000,
                        maximumAge: 60 * 60 * 24
                    }
                    try {
                         this.setState({ ready: false, error: null });
                         const granted = await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                            {
                             'title': 'Example App',
                             'message': 'Example App access to your location '
                            }
                         );
                         if (granted) {
                            Geolocation.getCurrentPosition(
                                this.geoSuccess,
                                this.geoFailure,
                                geoOptions
                             );
                         } else {
                            alert('Включи геолокацию');
                         }

                    } catch (err) {
                        Toast.show({
                            text: err,
                            type: 'danger'
                        })
                    }
                } else {
                    const location_user =  await this._getAsyncData('location_user');
                    location_user ? this.geoSuccess(JSON.parse(location_user)) : alert('Нет данных и интернета');
                }
            });

        }
    }

    fetchPermissions = async () => {
        const { getPermissionAction, user, connected, fetchPermission } = this.props;
        if (connected) {
            fetchPermission();
            if (user.data_customer_hunting_lic_id) {
                fetch(`${url}/api/v1/HuntingFarm/License/${user.data_customer_hunting_lic_id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(async (data) => {
                        this.setState({ dataPermissions: data });
                        getPermissionAction(data);
                        // FsService.writeJsonFile(`permissions.json`, data)
                        await this._setAsyncData('license_hunting', JSON.stringify(data));
                    })
                    .catch(error => {
                        getPermissionAction([]);
                    });
            } else {
                getPermissionAction([]);
            }

        } else {
            getPermissionAction([]);
            Toast.show({
                text: 'Ошибка подключения',
                type: 'danger'
            })
        }
        this.setState({ loading: false, })
    }

    goMessage = async (message) => {
        this.setState({ loading: true, })
        await this.fetchPermissions();
        this.setState({
            alertMessage: true,
        });
    }

    componentWillUnmount() {
        const { setLocationUser } = this.props;
        setLocationUser(null);
        this.setState({
            alertMessage: false,
        });
    }

     _setAsyncData = async (label, value) => {
        try {
            await AsyncStorage.setItem(label, value);
        } catch (error) {
            return
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

    geoSuccess = async (position) => {
        const { setLocationUser } = this.props;
        setLocationUser(position.coords);
        await this._setAsyncData('location_user', JSON.stringify(position.coords));
        this.setState({ ready: true, where: position });
    }

    geoFailure = (err) => {
        const { setLocationUser } = this.props;
        this.setState({
            error: err.message
        });
        setLocationUser(null);
    }

    openCreateForm = () => {
        this.setState({ createPermission: true });
    }

    closeCreateForm = () => {
        this.setState({ createPermission: false });
    }


    render() {
        const { navigation, locationLoading, location, permissionLoading } = this.props;
        const { title, info, data, user, headerTitle, permissionPage } = navigation.state.params;
        if (locationLoading || permissionLoading || this.state.loading)
            return <Loading />

        return(
            <ContainerPage>
                <HeaderDetails onGoBack={() => navigation.goBack()} title={headerTitle || title} />
                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                {
                    this.state.createPermission && permissionPage && (
                        <CreatePermission closeModal={this.closeCreateForm} />
                    )
                }
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                    {
                        permissionPage && (
                            <AddedButton onPress={() => navigation.navigate('CREATE_PERMISSIONS', ({ goMessage: this.goMessage }))}>
                                <Text style={{fontSize: 24, color: "#fff"}}>+</Text>
                            </AddedButton>
                        )
                    }
                    {
                        this.state.alertMessage && <AlertMessage />
                    }
                    <Content>
                        <View style={{paddingBottom: 40}}>
                            {
                                !user ?
                                    data.length > 0 && <ListItemComponent
                                                            textStyle={{width: '100%'}}
                                                            navigation={navigation}
                                                            Item={info ? ItemDetailsForInfo : ItemDetailsForHungry}
                                                            data={this.state.dataPermissions.length < data.length 
                                                        ? data.map((item, i) => i === data.length - 1 ? {...item, last: true} : item)
                                                        : this.state.dataPermissions.map((item, i) => i === data.length - 1 ? {...item, last: true} : item)} />
                                    || <NotFoundText />
                                : <UserComponent location={location} navigation={navigation} user={user} />
                            }
                        </View>
                    </Content>
                </ImageBackground>
                <FooterTabs navigation={navigation} />
            </ContainerPage>
        );
    }
}

const mapStateToProps = state => ({
    permission: state.permission.permission,
    locationLoading: state.user.locationLoading,
    location: state.user.location,
    user: state.user.user,
    permissionLoading: state.permission.permissionLoading,
    connected: state.connect.connected,
});

const mapDispatchToProps = {
    getLocationUser, setLocationUser, getPermissionAction,
    fetchPermission
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
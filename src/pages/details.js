import React from 'react';
import { ImageBackground, Dimensions, StatusBar, PermissionsAndroid, View, AsyncStorage, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
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
                        console.log(err)
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
                        console.log(data);
                        getPermissionAction(data);
                        // FsService.writeJsonFile(`permissions.json`, data)
                        await this._setAsyncData('license_hunting', JSON.stringify(data));
                    })
                    .catch(error => {
                        console.log(error);
                        getPermissionAction([]);
                    });
            } else {
                getPermissionAction([]);
            }
            
        } else {
            getPermissionAction([]);
            alert('Нет подключения к интернету');
        }
    }

    goMessage = async (message) => {
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
        console.log(err.message);
    }

    openCreateForm = () => {
        this.setState({ createPermission: true });
    }

    closeCreateForm = () => {
        this.setState({ createPermission: false });
    }


    render() {
        const { navigation, locationLoading, location, permission, permissionLoading } = this.props;
        const { title, info, data, user, headerTitle } = navigation.state.params;

        if (locationLoading || permissionLoading)
            return <Loading />

        return(
            <ContainerPage>
                <HeaderDetails onGoBack={() => navigation.goBack()} title={headerTitle || title} />
                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                {
                    this.state.createPermission && permission && (
                        <CreatePermission closeModal={this.closeCreateForm} />
                    )
                }
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                    {
                        permission && (
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
                                                            data={data.map((item, i) => i === data.length - 1 ? {...item, last: true} : item)} />
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
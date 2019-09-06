import React from 'react';
import { ImageBackground, Dimensions, StatusBar, PermissionsAndroid, View, AsyncStorage } from 'react-native';
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
    Loading
} from '../components';
import { connect } from 'react-redux';
import { ContainerPage, Content } from './styled';
import { getLocationUser, setLocationUser } from '../redux/actions';

const w = Dimensions.get('window').width;

class DetailsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            ready: false,
            where: {lat: null, lng: null},
            error: null
        }
    }

     async componentDidMount() {
        const { getLocationUser, navigation } = this.props;
        const { user } = navigation.state.params;
        if (user) {
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

    componentWillUnmount() {
        const { setLocationUser } = this.props;
        setLocationUser(null);
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


    render() {
        const { navigation, locationLoading, location } = this.props;
        const { title, info, data, user, headerTitle } = navigation.state.params;

        if (locationLoading)
            return <Loading />

        return(
            <ContainerPage>
                <HeaderDetails onGoBack={() => navigation.goBack()} title={headerTitle || title} />
                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
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
});

const mapDispatchToProps = {
    getLocationUser, setLocationUser
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
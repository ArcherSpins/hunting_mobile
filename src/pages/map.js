import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StatusBar, AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import { HeaderDetails, FooterTabs, Loading, ErrorBoundry } from '../components';
import { ContainerPage } from './styled';
import { setHuntingCoordinat, notMapLoading } from '../redux/actions';
import { url } from '../url';

class MapPage extends React.Component {

    state = {
        region: {
            latitude: this.props.huntingMapCoordinats[0] ? this.props.huntingMapCoordinats[0].latitude : 0,
            longitude: this.props.huntingMapCoordinats[0] ? this.props.huntingMapCoordinats[0].longitude : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        markers: [
            {
                id: 1,
                coordinate: {
                    latitude: 37.78825,
                    longitude: -122.4324,
                },
                image: 'https://cdn6.aptoide.com/imgs/9/9/f/99f557745b17195d0ebbd2dd006d3ca7_icon.png?w=256',
            },
        ],
        error: false,
    }

    componentDidMount() {
        const { item, path, loadingMapHunting } = this.props.navigation.state.params;
        const { setHuntingCoordinat } = this.props;
        const { error } = this.state;

        if (!loadingMapHunting || error) {
            NetInfo.isConnected.fetch().then(async isConnected => {
                if (isConnected) {
                    fetch(`${url}${path}/${item.id}/Location`)
                        .then(response => response.json())
                        .then(async data => {
                            try {
                                setHuntingCoordinat(data);
                                this.setState({
                                    region: {
                                        ...this.state.region,
                                        latitude: data[0].latitude,
                                        longitude: data[0].longitude,
                                    }
                                })
                                await this._setAsyncData(`map_${item.id}`, JSON.stringify(data));
                            } catch(err) {
                                this.setState({ error: true });
                                
                                Toast.show({
                                    text: String(err),
                                    type: 'danger'
                                });
                            }
                        })
                        .catch(err => 
                            Toast.show({
                                text: String(err),
                                type: 'danger'
                            }));
                } else {
                    const map = await this._getAsyncData(`map_${item.id}`);
                    map ? setHuntingCoordinat(JSON.parse(map)) : Toast.show({
                        text: 'Ошибка подключения',
                        type: 'danger'
                    });
                }
            });
            
        }        
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

    componentWillUnmount() {
        const { notMapLoading } = this.props;
        notMapLoading();
        this.setState({error: false});
    }

    onRegionChange = (region) => {
        this.setState({ region });
    }

    dragMarker = (e, id) => {
        const { markers } = this.state;
        const idx = markers.findIndex(item => item.id === id);
        const marker = markers[idx];
        marker.coordinate = e.nativeEvent.coordinate;
        this.setState({ 
            markers:  [...markers.slice(0, idx), marker, ...markers.slice(idx + 1)]
        })
    }

    componentDidCatch() {
        Toast.show({
            text: 'Произошла неизвестная ошибка',
            type: 'danger'
        })
    }

    render() {
        const { navigation, huntingMapCoordinats, loadingMapHunting } = this.props;
        const { markers, error, region } = this.state;


        if (loadingMapHunting)
            return <Loading />;

        if (error)
            return (
                <ContainerPage>
                    <HeaderDetails onGoBack={() => navigation.goBack()} title={'Карта'} />
                    <ErrorBoundry />
                </ContainerPage>
            );

        return (
            <ContainerPage>
                <HeaderDetails onGoBack={() => navigation.goBack()} title={'Карта'} />
                 <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                    <MapView
                        style={{flex: 1}}
                        region={region}>
                           <MapView.Polygon fillColor="#af342d75" coordinates={huntingMapCoordinats} />
                        </MapView>
                <FooterTabs navigation={navigation} />
            </ContainerPage>
        )
    }
}

const mapStateToProps = state => {
    return {
        huntingMapCoordinats: state.hunting.huntingMapCoordinats,
        loadingMapHunting: state.hunting.loadingMapHunting,
    };
};

const mapDispatchToProps = {
    setHuntingCoordinat,
    notMapLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);

import React from 'react';
import { ImageBackground, Dimensions, AsyncStorage, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import { 
    HeaderDetails,
    ListItemComponent, 
    FooterTabs,
    ItemDetailsForInfo,
    Loading,
    ErrorLoad
} from '../components';
import { ContainerPage, Content } from './styled';
import { getHuntings, notLoadHunting } from '../redux/actions';
import { url } from '../url';

const w = Dimensions.get('window').width;


class HuntingPage extends React.PureComponent {

    state = {
        errorLoad: false,
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

    componentWillUnmount() {
        const { notLoadHunting } = this.props;
        notLoadHunting();
    }

     render() {
        const { navigation, huntings, loadingHunting } = this.props;
        const { title } = navigation.state.params;
        const { errorLoad } = this.state;

        if (errorLoad)
            return <ErrorLoad message="Не удалось загрузить данные!" />

        if (loadingHunting)
            return <Loading />

        return(
            <ContainerPage>
                <HeaderDetails onGoBack={() => navigation.goBack()} title={title || 'Охотничьи ресурсы'} />

                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                    <Content>
                        <ListItemComponent 
                            navigation={navigation} 
                            styleRight={{width: '10%'}} 
                            styleLeft={{width: '90%'}} 
                            Item={ItemDetailsForInfo} 
                            style={{paddingBottom: 40}}
                            data={huntings.map(item => ({...item, path: 'DETAILMAP'}))} 
                        />
                    </Content>
                </ImageBackground>
                <FooterTabs navigation={navigation} />
            </ContainerPage>
        )
     }
}

const mapStateToProps = state => ({
    huntings: state.hunting.huntings,
    loadingHunting: state.hunting.loadingHunting,
});

const mapDispatchToProps = {
    getHuntings,
    notLoadHunting,
};

export default connect(mapStateToProps, mapDispatchToProps)(HuntingPage);
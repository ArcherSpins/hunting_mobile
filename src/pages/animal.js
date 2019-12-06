import React from 'react';
import { ImageBackground, Dimensions, AsyncStorage, StatusBar } from 'react-native';
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import { HeaderDetails, FooterTabs, Loading, ItemDetailsForHungry } from '../components';
import { ContainerPage, Content, Div, Text } from './styled';
import { getAnimalsAction, loadingAnimalsStop } from '../redux/actions';
import { url } from '../url';

const w = Dimensions.get('window').width;


class AnimalPage extends React.Component {

    componentDidMount = async () => {
        const { getAnimalsAction, connected } = this.props;

        if (connected) {
            await this.fetchAnimals();
        } else {
            const animals = await this._getAsyncData('animals');
            animals ? getAnimalsAction(JSON.parse(animals)) : alert('Нет интернета');
        }
    }

    componentWillUnmount() {
        const { loadingAnimalsStop } = this.props;
        loadingAnimalsStop();
    }

    fetchAnimals = async () => {
        const { getAnimalsAction } = this.props;

        fetch(`${url}/api/v1/Animal/All`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(async (data) => {
                getAnimalsAction(data);
                await this._setAsyncData('animals', JSON.stringify(data));
            })
            .catch(error => {
                Toast.show({
                    text: error,
                    type: 'danger'
                })
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

    render() {
        const { navigation, loadingAnimals, animals } = this.props;

        if (loadingAnimals)
            return (
                <Loading />
            );
        return(
            <ContainerPage>
                <HeaderDetails searchIcon onGoBack={() => navigation.goBack()} title={'Животное'} />
                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                    <Content style={{flex: 1}}>
                        <Div style={{paddingBottom: 40}}>
                            {
                                animals.map((item, i) => (
                                    <ItemDetailsForHungry
                                        navigation={navigation}
                                        key={item.id || item.animal_id || i}
                                        item={
                                            {
                                                ...item,path: 'DETAIL_ANIMAL',
                                                id: item.animal_id,
                                                active: true,
                                                iconName: 'right',
                                                iconSize: 14,
                                                iconColor: '#a29f9f',
                                            }
                                        }
                                    />
                                ))
                            }
                        </Div>
                    </Content>
                </ImageBackground>
                <FooterTabs navigation={navigation} />
            </ContainerPage>
        )
    }
}


const mapStateToProps = state => ({
    animals: state.animal.animals,
    loadingAnimals: state.animal.loadingAnimals,
    connected: state.connect.connected,
});

const mapDispatchToProps = {
    getAnimalsAction,
    loadingAnimalsStop,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimalPage);
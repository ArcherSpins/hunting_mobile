import React from 'react';
import { ImageBackground, Dimensions, StyleSheet, AsyncStorage, StatusBar } from 'react-native';
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import { HeaderDetails, FooterTabs, Loading, ItemDetailsForHungry } from '../components';
import { ContainerPage, Content, CardMapDetail, Text, BgImage, Div, CardContent, FoneBlock } from './styled';
import { setActiveAnimal, stopActiveAnimalLoading } from '../redux/actions';
import { url } from '../url';

const w = Dimensions.get('window').width;


class AnimalDetailPage extends React.Component {

    componentDidMount = async () => {
        const { item } = this.props.navigation.state.params;
        const { setActiveAnimal } = this.props;
        const animal = await this._getAsyncData(`animal_${item.id || item.animal_id}`);
        animal ? setActiveAnimal(JSON.parse(animal)) : await this.fetchAnimal();
    }

    fetchAnimal = async () => {
        const { item } = this.props.navigation.state.params;
        const { setActiveAnimal } = this.props;

        fetch(`${url}/api/v1/Animal/${item.id || item.animal_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(async (data) => {
            setActiveAnimal(data);
            await this._setAsyncData(`animal_${item.id || item.animal_id}`, JSON.stringify(data));
        })
        .catch(error => {
            Toast.show({
                text: error,
                type: 'danger'
            })
        });
    }

    componentWillUnmount() {
        const { stopActiveAnimalLoading } = this.props;
        stopActiveAnimalLoading();
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

    render() {
        const { navigation, activeAnimal } = this.props;
        const { item } = this.props.navigation.state.params;

        if (activeAnimal.loading)
            return <Loading />;

        return(
            <ContainerPage>
                <HeaderDetails searchIcon onGoBack={() => navigation.goBack()} title={'Животное'} />

                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                    <Content style={{flex: 1, paddingBottom: 20}}>
                        <CardMapDetail style={styles.card_detail}>
                            <Div>
                                <BgImage source={activeAnimal.image ? {uri: `data:image/png;base64,${activeAnimal.image}`} : require('../../assets/not_image.png')}>
                                    <FoneBlock>
                                        <Text style={styles.title}>{ activeAnimal.name || 'Not title' }</Text>
                                    </FoneBlock>
                                </BgImage>
                                <CardContent>
                                    <Text style={{flex: 1}}>
                                        { activeAnimal.description }
                                    </Text>
                                    <ItemDetailsForHungry   
                                        path={'/api/v1/Animal'}
                                        navigation={navigation}
                                        item={
                                            {
                                                title: 'Карта',
                                                path: 'MAP',
                                                last: true,
                                                id: item.id || item.animal_id,
                                                active: true,
                                                iconName: 'right',
                                                iconSize: 14,
                                                iconColor: '#a29f9f',
                                            }
                                        }
                                        style={styles.map_link}
                                    />
                                </CardContent>
                            </Div>
                        </CardMapDetail>
                    </Content>
                </ImageBackground>
                <FooterTabs navigation={navigation} />
            </ContainerPage>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 18,
        position: "absolute",
        bottom: 10,
        left: 10,
    },
    card_detail: {
        overflow: 'hidden',
        marginBottom: 30,
    },
    map_link: {
        
    },
});


const mapStateToProps = state => ({
    activeAnimal: state.animal.activeAnimal,
});

const mapDispatchToProps = {
    setActiveAnimal,
    stopActiveAnimalLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimalDetailPage);
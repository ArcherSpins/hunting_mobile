import React from 'react';
import { ImageBackground, Dimensions, AsyncStorage } from 'react-native';
import { Button, Text, Toast } from 'native-base';
import { connect } from 'react-redux';
import {
    HeaderDetails,
    FooterTabs,
    Loading,
    Uploading,
} from '../components';
import {
    ContainerPage,
    Content,
} from './styled';
import {
    getDefaultAnimals,
    setErrorDefaultAnimalLoading,
    getDefaultAnimalsCoordinats,
    resetLoadingStage,
    getDefaultHuntings,
    setErrorDefaultAnimalCoordinatsLoading,
    setErrorDefaultHuntingsLoading,
    getDefaultViolations,
    setErrorDefaultViolations,
    setErrorDefaultHuntingFarm,
    getDefaultHuntingFarm,
    getDefaultHuntingFarmLocation,
    setErrorDefaultHuntingFarmLocation,
    hunting_farm_location,
} from '../redux/actions';
import { url } from '../url';

const w = Dimensions.get('window').width;

class UploadPage extends React.PureComponent {

    state = {
        modal: false,
    }

    async componentDidMount() {
        await this.getDefaultAnimals();
        await this.getDefaultAnimalsCoordinats();
        await this.getDefaultHuntings();
        await this.getDefaultViolations();
        await this.getDefaultHuntingFarm();
        await this.getDefaultHuntingFarmLocation();
    }

    // получение локальных данных
    getDefaultAnimals = async () => {
        const { getDefaultAnimals } = this.props;
        const animals = await this._getAsyncData('default_animals_data');
        animals ? getDefaultAnimals(JSON.parse(animals), 'SET_DEFAULT_ANIMALS') : getDefaultAnimals([], 'SET_DEFAULT_ANIMALS');
    }

    getDefaultAnimalsCoordinats = async () => {
        const { getDefaultAnimalsCoordinats } = this.props;
        const coordinats = await this._getAsyncData('default_animals_data_coordinats');
        coordinats ? getDefaultAnimalsCoordinats(JSON.parse(coordinats), 'SET_DEFAULT_ANIMALS_COORDINATS') : getDefaultAnimalsCoordinats([], 'SET_DEFAULT_ANIMALS_COORDINATS');
    }

    getDefaultHuntings = async () => {
        const { getDefaultHuntings } = this.props;
        const huntings = await this._getAsyncData('default_huntings_data');
        huntings ? getDefaultHuntings(JSON.parse(huntings), 'SET_DEFAULT_HUNTINGS') : getDefaultHuntings([], 'SET_DEFAULT_HUNTINGS');
    }

    getDefaultViolations = async () => {
        const { getDefaultViolations } = this.props;
        const violations = await this._getAsyncData('default_violations_data');
        violations ? getDefaultViolations(JSON.parse(violations), 'SET_DEFAULT_VIOLATIONS') : getDefaultViolations([], 'SET_DEFAULT_VIOLATIONS')
    }

    getDefaultHuntingFarm = async () => {
        const { getDefaultHuntingFarm } = this.props;
        const huntingFarm = await this._getAsyncData('default_huntings_farm_data');
        huntingFarm ? getDefaultHuntingFarm(JSON.parse(huntingFarm), 'SET_DEFAULT_HUNTING_FARM') : getDefaultHuntingFarm([], 'SET_DEFAULT_HUNTING_FARM')
    }

    getDefaultHuntingFarmLocation = async () => {
        const { getDefaultHuntingFarmLocation } = this.props;
        const location = await this._getAsyncData('default_huntings_farm_location_data');
        location ? getDefaultHuntingFarmLocation(JSON.parse(location), 'SET_DEFAULT_HUNTING_FARM_LOCATION') : getDefaultHuntingFarmLocation([], 'SET_DEFAULT_HUNTING_FARM_LOCATION')
    }

    // запросы на скачивание

    _fetchAnimals = () => {
        return fetch(`${url}/api/v1/Load/Animal`).then(response => response.json());
    }

    _fetchAnimalsCoordinats = () => {
        return fetch(`${url}/api/v1/Load/Animal/Location`).then(response => response.json())
    }

    _fetchViolations = async () => {
        return fetch(`${url}/api/v1/Load/Customer/Violations`).then(response => response.json())
    }

    _fetchHuntings = async () => {
        const { getDefaultHuntings, setErrorDefaultHuntingsLoading } = this.props;

        fetch(`${url}/api/v1/Load/Customer`)
            .then(response => response.json())
            .then(async data => {
                await this._setAsyncData('default_huntings_data', JSON.stringify(data));
                getDefaultHuntings(data);
            })
            .catch(error => setErrorDefaultHuntingsLoading(error));
    }

    _fetchHuntingFarm = async () => {
        return fetch(`${url}/api/v1/Load/HuntingFarm`).then(response => response.json())
    }

    _fetchHuntingFarmLocation = () => {
        return fetch(`${url}/api/v1/Load/HuntingFarm/Location`).then(response => response.json());
    }

    // закрытие модалки
    closeModal = () => {
        this.setState({ modal: false });
    }
    
    // сабмит на скачивание
    submitUploadData = async () => {
        const {
            getDefaultAnimals,
            getDefaultAnimalsCoordinats,
            getDefaultViolations,
            getDefaultHuntingFarm,
            getDefaultHuntingFarmLocation,
        } = this.props;
        this.setState({ modal: true });

        // animals
        const animals = await this._fetchAnimals();
        getDefaultAnimals(animals);
        await this._setAsyncData('default_animals_data', JSON.stringify(animals));

        const animalCoordinats = await this._fetchAnimalsCoordinats();
        await this._setAsyncData('default_animals_data_coordinats', JSON.stringify(animalCoordinats));
        getDefaultAnimalsCoordinats(animalCoordinats);

        const violations = await this._fetchViolations();
        await this._setAsyncData('default_violations_data', JSON.stringify(violations));
        getDefaultViolations(violations);

        const huntigFarm = await this._fetchHuntingFarm();
        await this._setAsyncData('default_huntings_farm_data', JSON.stringify(huntigFarm));
        getDefaultHuntingFarm(huntigFarm);

        const huntigFarmLocation = await this._fetchHuntingFarmLocation();
        await this._setAsyncData('default_huntings_farm_location_data', JSON.stringify(huntigFarmLocation));
        getDefaultHuntingFarmLocation(huntigFarmLocation);

        this.closeModal();
        // await this._fetchHuntings();
    }

    // работа с локальным хранением
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
        const {
            navigation,
            default_animals,
            loading_default_animals,
            errorAnimalsDefault,
            stageLoading,
            loading_default_animals_coordinats,
            default_animals_coordinats,
            loading_default_huntings,
            default_huntings,
            hunting_farm,
            hunting_farm_location,
            default_violations,
        } = this.props;

        if (loading_default_animals || loading_default_animals_coordinats || loading_default_huntings)
            return <Loading />;
        
        if (errorAnimalsDefault.errorLoaded)
            Toast.show({
                text: errorAnimalsDefault.message,
                type: 'danger'
            })

        return (
            <ContainerPage>
                <Uploading visible={this.state.modal} loading={{length: 8, stage: stageLoading}} />
                <HeaderDetails onGoBack={() => navigation.goBack()} title='Обновления' />
                    <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                        <Content>
                            <Text>Животных: { default_animals.length }</Text>
                            <Text>Координатов: { default_animals_coordinats.length }</Text>
                            <Text>Охотники: { default_huntings.length }</Text>
                            <Text>Охотничьих угодий: { hunting_farm.length }</Text>
                            <Text>Координаты охотничьих угодий: { hunting_farm_location.length }</Text>
                            <Text>Нарушений: { default_violations.length }</Text>
                            <Button
                                primary
                                onPress={this.submitUploadData}
                            >
                                <Text> Primary </Text>
                            </Button>
                        </Content>
                    </ImageBackground>
                <FooterTabs navigation={navigation} />
            </ContainerPage>
        );
    }
}

const mapStateToProps = state => ({
    default_animals: state.defaultData.default_animals,
    loading_default_animals: state.defaultData.loading_default_animals,
    errorAnimalsDefault: state.defaultData.errorAnimalsDefault,
    stageLoading: state.defaultData.stageLoading,
    loading_default_animals_coordinats: state.defaultData.loading_default_animals_coordinats,
    default_animals_coordinats: state.defaultData.default_animals_coordinats,
    loading_default_huntings: state.defaultData.loading_default_huntings,
    default_huntings: state.defaultData.default_huntings,
    hunting_farm: state.defaultData.hunting_farm,
    hunting_farm_location: state.defaultData.hunting_farm_location,
    default_violations: state.defaultData.default_violations,
});

const mapDispatchToProps = {
    getDefaultAnimals,
    setErrorDefaultAnimalLoading,
    getDefaultAnimalsCoordinats,
    resetLoadingStage,
    getDefaultHuntings,
    setErrorDefaultAnimalCoordinatsLoading,
    setErrorDefaultHuntingsLoading,
    getDefaultViolations,
    setErrorDefaultViolations,
    getDefaultHuntingFarm,
    setErrorDefaultHuntingFarm,
    getDefaultHuntingFarmLocation,
    setErrorDefaultHuntingFarmLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);

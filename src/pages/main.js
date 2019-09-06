import React from 'react';
import { View, ScrollView, Dimensions, ImageBackground, AsyncStorage, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import { Header, CardData, TableList } from '../components';
import { Container, ContainerPage } from './styled';
import { getPermissionAction, getViolationsAction, setConnect } from '../redux/actions';
import { Loading } from '../components';
import { url } from '../url';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const data = [
    {
        id: 1,
        title: 'Охотничьи ресурсы',
        content: 'Сведения о территориях, на которых может проводиться охота',
        icon: `<svg viewBox="0 0 101 109" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><g fill="#36404A" fill-rule="evenodd"><path d="M99.118 35.901c-.588-5.56-4.704-12.808-9.146-16.107 0 0-6.64-4.93-14.972-9.822-8.34-4.895-15.856-8.275-15.856-8.275C56.63.566 53.314 0 49.998 0c-3.314 0-6.63.566-9.144 1.697 0 0-7.519 3.38-15.856 8.275-8.334 4.892-14.971 9.822-14.971 9.822C5.586 23.093 1.468 30.34.88 35.9.88 35.901 0 44.212 0 54c0 9.787.882 18.099.882 18.099.587 5.56 4.706 12.807 9.144 16.104 0 0 6.639 4.932 14.974 9.829 8.337 4.892 15.856 8.275 15.856 8.275C43.37 107.438 46.686 108 50 108c3.316 0 6.632-.563 9.146-1.694 0 0 7.516-3.383 15.856-8.275 8.331-4.896 14.971-9.828 14.971-9.828 4.443-3.297 8.559-10.544 9.147-16.104 0 0 .88-8.312.88-18.099 0-9.788-.88-18.099-.88-18.099h-.002zm-4.586 35.714c-.457 4.322-3.876 10.349-7.316 12.902-.064.05-6.555 4.855-14.557 9.556-8.006 4.698-15.34 8.013-15.409 8.044-1.827.818-4.468 1.288-7.252 1.288s-5.427-.47-7.248-1.288c-.073-.03-7.385-3.334-15.412-8.042-8.002-4.704-14.495-9.51-14.56-9.556-3.439-2.553-6.855-8.583-7.314-12.9C5.46 71.536 4.61 63.413 4.61 54c0-9.407.85-17.533.855-17.615.46-4.32 3.875-10.349 7.318-12.905.063-.047 6.528-4.837 14.556-9.546 8.002-4.7 15.34-8.014 15.41-8.047 1.824-.82 4.465-1.29 7.249-1.29s5.426.47 7.247 1.29c.077.033 7.384 3.334 15.415 8.047 8.002 4.697 14.495 9.5 14.556 9.548 3.44 2.552 6.859 8.583 7.316 12.902.011.08.856 8.21.856 17.615 0 9.412-.846 17.535-.857 17.616h.002z"/><path d="M67.208 71.525c1.339 6.667-5.33 8.113-8.268 7.245-2.937-.868-8.929-1.012-8.929-1.012s-6.008.144-8.946 1.012c-2.937.874-9.612-.578-8.28-7.245 1.334-6.667 7.209-6.378 8.819-15.365 1.605-8.988 8.413-8.409 8.413-8.409s6.79-.579 8.396 8.409c1.599 8.987 7.463 8.698 8.795 15.365zM56.175 47.166c3.615 1.134 7.607-1.965 8.923-6.92 1.316-4.948-.544-9.88-4.159-11.012-3.615-1.134-7.607 1.965-8.923 6.92-1.316 4.948.544 9.88 4.159 11.012zm14.982-1.802c-3.482-1.543-7.758 1.073-9.551 5.847-1.794 4.774-.428 9.892 3.054 11.429 3.481 1.537 7.757-1.073 9.55-5.847 1.794-4.774.428-9.886-3.053-11.429zM43.82 47.166c3.615-1.133 5.475-6.064 4.159-11.012-1.316-4.95-5.314-8.047-8.924-6.914-3.61 1.133-5.475 6.064-4.159 11.013 1.316 4.948 5.309 8.047 8.924 6.913zM35.34 62.64c3.482-1.543 4.848-6.661 3.054-11.429-1.793-4.768-6.069-7.39-9.55-5.847-3.482 1.543-4.848 6.66-3.055 11.429 1.794 4.774 6.07 7.39 9.551 5.847z" fill-rule="nonzero"/></g></svg>`,
        last: false,
        url: 'ANIMAL'
    },
    {
        id: 2,
        title: 'Охотничьи угодья',
        content: 'Сведения о территориях, на которых может проводиться охота',
        icon: `<svg viewBox="0 0 101 109" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><g fill="#36404A" fill-rule="evenodd"><path d="M99.118 35.901c-.588-5.56-4.704-12.808-9.146-16.107 0 0-6.64-4.93-14.972-9.822-8.34-4.895-15.856-8.275-15.856-8.275C56.63.566 53.314 0 49.998 0c-3.314 0-6.63.566-9.144 1.697 0 0-7.519 3.38-15.856 8.275-8.334 4.892-14.971 9.822-14.971 9.822C5.586 23.093 1.468 30.34.88 35.9.88 35.901 0 44.212 0 54c0 9.787.882 18.099.882 18.099.587 5.56 4.706 12.807 9.144 16.104 0 0 6.639 4.932 14.974 9.829 8.337 4.892 15.856 8.275 15.856 8.275C43.37 107.438 46.686 108 50 108c3.316 0 6.632-.563 9.146-1.694 0 0 7.516-3.383 15.856-8.275 8.331-4.896 14.971-9.828 14.971-9.828 4.443-3.297 8.559-10.544 9.147-16.104 0 0 .88-8.312.88-18.099 0-9.788-.88-18.099-.88-18.099h-.002zm-4.586 35.714c-.457 4.322-3.876 10.349-7.316 12.902-.064.05-6.555 4.855-14.557 9.556-8.006 4.698-15.34 8.013-15.409 8.044-1.827.818-4.468 1.288-7.252 1.288s-5.427-.47-7.248-1.288c-.073-.03-7.385-3.334-15.412-8.042-8.002-4.704-14.495-9.51-14.56-9.556-3.439-2.553-6.855-8.583-7.314-12.9C5.46 71.536 4.61 63.413 4.61 54c0-9.407.85-17.533.855-17.615.46-4.32 3.875-10.349 7.318-12.905.063-.047 6.528-4.837 14.556-9.546 8.002-4.7 15.34-8.014 15.41-8.047 1.824-.82 4.465-1.29 7.249-1.29s5.426.47 7.247 1.29c.077.033 7.384 3.334 15.415 8.047 8.002 4.697 14.495 9.5 14.556 9.548 3.44 2.552 6.859 8.583 7.316 12.902.011.08.856 8.21.856 17.615 0 9.412-.846 17.535-.857 17.616h.002z"/><path d="M50.002 27C39.496 27 31 35.496 31 46.002c0 14.25 19.002 35.288 19.002 35.288s19.001-21.037 19.001-35.288C69.003 35.496 60.507 27 50.002 27zm0 25.788a6.789 6.789 0 0 1-6.787-6.786 6.789 6.789 0 0 1 6.787-6.787 6.789 6.789 0 0 1 6.786 6.787 6.789 6.789 0 0 1-6.786 6.786z" fill-rule="nonzero"/></g></svg>`,
        last: false,
        url: 'HUNTING'
    },
    {
        id: 3,
        title: 'Информация',
        content: 'Данные о правилах охоты, получения охотничьих билетов, разрешений на охоту',
        icon: `<svg width="40" height="40" viewBox="0 0 101 109" xmlns="http://www.w3.org/2000/svg"><g fill="#36404A" fill-rule="evenodd"><path d="M99.118 35.901c-.588-5.56-4.704-12.808-9.146-16.107 0 0-6.64-4.93-14.972-9.822-8.34-4.895-15.856-8.275-15.856-8.275C56.63.566 53.314 0 49.998 0c-3.314 0-6.63.566-9.144 1.697 0 0-7.519 3.38-15.856 8.275-8.334 4.892-14.971 9.822-14.971 9.822C5.586 23.093 1.468 30.34.88 35.9.88 35.901 0 44.212 0 54c0 9.787.882 18.099.882 18.099.587 5.56 4.706 12.807 9.144 16.104 0 0 6.639 4.932 14.974 9.829 8.337 4.892 15.856 8.275 15.856 8.275C43.37 107.438 46.686 108 50 108c3.316 0 6.632-.563 9.146-1.694 0 0 7.516-3.383 15.856-8.275 8.331-4.896 14.971-9.828 14.971-9.828 4.443-3.297 8.559-10.544 9.147-16.104 0 0 .88-8.312.88-18.099 0-9.788-.88-18.099-.88-18.099h-.002zm-4.586 35.714c-.457 4.322-3.876 10.349-7.316 12.902-.064.05-6.555 4.855-14.557 9.556-8.006 4.698-15.34 8.013-15.409 8.044-1.827.818-4.468 1.288-7.252 1.288s-5.427-.47-7.248-1.288c-.073-.03-7.385-3.334-15.412-8.042-8.002-4.704-14.495-9.51-14.56-9.556-3.439-2.553-6.855-8.583-7.314-12.9C5.46 71.536 4.61 63.413 4.61 54c0-9.407.85-17.533.855-17.615.46-4.32 3.875-10.349 7.318-12.905.063-.047 6.528-4.837 14.556-9.546 8.002-4.7 15.34-8.014 15.41-8.047 1.824-.82 4.465-1.29 7.249-1.29s5.426.47 7.247 1.29c.077.033 7.384 3.334 15.415 8.047 8.002 4.697 14.495 9.5 14.556 9.548 3.44 2.552 6.859 8.583 7.316 12.902.011.08.856 8.21.856 17.615 0 9.412-.846 17.535-.857 17.616h.002z"/><path d="M50 29c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm2.5 37.5h-5v-15h5v15zm0-20h-5v-5h5v5z" fill-rule="nonzero"/></g></svg>`,
        last: true,
        url: 'INFO'
    }
];


class MainPage extends React.PureComponent {

    constructor() {
        super();
        
        NetInfo.isConnected.addEventListener('connectionChange', (isConnected) => {
            // alert(isConnected ? 'отлично есть соединение' : 'нет интернета перехожу на локалку')
        });
    }

    componentDidMount = async () => {
        const { getPermissionAction, getViolationsAction, setConnect } = this.props;

        NetInfo.isConnected.fetch().then(async isConnected => {
            setConnect(isConnected);
            if (isConnected) {
                await this.fetchPermissions();
                await this.fetchViolations();
            } else {
                const permissions =  await this._getAsyncData(`license_hunting`);
                const violations = await this._getAsyncData('violations_customer');
                permissions ? getPermissionAction(JSON.parse(permissions)) : alert('Извините нет загруженных данных');
                violations ? getViolationsAction(JSON.parse(violations)) : alert('Извините нет загруженных данных');
            }
        });
    };

    fetchPermissions = async () => {
        const { getPermissionAction, user, connected } = this.props;
        if (connected) {
            fetch(`${url}/api/v1/HuntingFarm/License/${user.data_customer_hunting_lic_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(async (data) => {
                    getPermissionAction(data);
                    // FsService.writeJsonFile(`permissions.json`, data)
                    await this._setAsyncData('license_hunting', JSON.stringify(data));
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            alert('Нет подключения к интернету');
        }
    }

    fetchViolations = async () => {
        const { getViolationsAction, user, connected } = this.props;
        if (connected) {
            fetch(`${url}/api/v1/Customer/${user.data_customer_id}/Violations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(async (data) => {
                    getViolationsAction(data);
                    await this._setAsyncData('violations_customer', JSON.stringify(data));
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            alert('Нет подключения к интернету');
        }
        
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
        const { navigation, user, permission, permissionLoading, violations, loadingViolations } = this.props;
        if (!user) {
            return navigation.navigate('FORM_PAGE');
        }

        if (permissionLoading || loadingViolations)
            return <Loading />

        return (
            <ContainerPage>
                <Header user={user} />
                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                    <ScrollView>
                        <Container>
                            <CardData
                                title={`${user.serial} ${user.number}`}
                                icon={`<svg width="60" height="60" viewBox="0 0 103 110" xmlns="http://www.w3.org/2000/svg"><g fill="rgba(255, 255, 255, .6)" fill-rule="evenodd"><path d="M101.145 36.662c-.6-5.656-4.778-13.026-9.29-16.382 0 0-6.74-5.013-15.203-9.99-8.47-4.977-16.103-8.417-16.103-8.417C57.997.726 54.63.15 51.263.15c-3.365 0-6.733.576-9.287 1.723 0 0-7.636 3.44-16.103 8.417-8.462 4.977-15.202 9.99-15.202 9.99-4.512 3.356-8.69 10.726-9.287 16.382 0 0-.895 8.45-.895 18.405 0 9.95.895 18.404.895 18.404.597 5.657 4.775 13.027 9.285 16.377 0 0 6.742 5.018 15.204 9.998 8.467 4.973 16.103 8.412 16.103 8.412 2.554 1.15 5.922 1.725 9.287 1.725 3.367 0 6.734-.575 9.285-1.725 0 0 7.632-3.44 16.1-8.412 8.465-4.98 15.204-9.998 15.204-9.998 4.513-3.35 8.692-10.72 9.29-16.376 0 0 .895-8.452.895-18.403 0-9.955-.895-18.405-.895-18.405zm-4.657 36.316c-.464 4.394-3.937 10.528-7.43 13.12-.066.052-6.66 4.938-14.783 9.717-8.13 4.78-15.576 8.15-15.648 8.184-1.85.83-4.536 1.31-7.363 1.31-2.828 0-5.512-.48-7.363-1.31-.07-.036-7.495-3.394-15.645-8.182-8.13-4.782-14.722-9.668-14.79-9.72-3.493-2.597-6.96-8.726-7.424-13.12-.01-.08-.868-8.343-.868-17.91 0-9.57.86-17.836.87-17.918.463-4.39 3.936-10.523 7.43-13.123.063-.05 6.628-4.92 14.777-9.712C36.38 9.54 43.83 6.168 43.9 6.137c1.853-.836 4.536-1.313 7.364-1.313 2.827 0 5.51.477 7.36 1.31.075.034 7.498 3.39 15.653 8.186 8.124 4.777 14.717 9.657 14.782 9.707 3.49 2.598 6.964 8.732 7.428 13.123.01.082.87 8.347.87 17.917 0 9.568-.86 17.83-.87 17.91z"/><path d="M82.084 30.527h-62.81a4.68 4.68 0 0 0-4.683 4.674v38.56a4.677 4.677 0 0 0 4.683 4.673h62.81c2.59 0 4.683-2.09 4.683-4.674V35.2a4.678 4.678 0 0 0-4.682-4.673zM19.274 35.2h62.81v38.56h-62.81V35.2z"/><path d="M57.687 46.837H73.44a2.34 2.34 0 0 0 2.34-2.337 2.34 2.34 0 0 0-2.34-2.336H57.687a2.339 2.339 0 0 0-2.34 2.336 2.338 2.338 0 0 0 2.34 2.337m0 18.257H73.44a2.34 2.34 0 0 0 2.34-2.337 2.34 2.34 0 0 0-2.34-2.337H57.687a2.34 2.34 0 0 0-2.34 2.337 2.34 2.34 0 0 0 2.34 2.337m0-9.054H73.44a2.34 2.34 0 0 0 2.34-2.338 2.34 2.34 0 0 0-2.34-2.337H57.687a2.34 2.34 0 0 0-2.34 2.337 2.34 2.34 0 0 0 2.34 2.337M25.11 68.163h23.113c.708 0 1.38-.322 1.823-.87.445-.55.616-1.268.467-1.957-.985-4.6-4.07-8.323-8.06-10.19a8.669 8.669 0 0 0 2.942-6.508c0-4.804-3.914-8.71-8.726-8.71-4.815 0-8.73 3.906-8.73 8.71 0 2.59 1.142 4.91 2.942 6.508-3.985 1.867-7.07 5.59-8.062 10.19-.144.69.027 1.408.47 1.958.444.547 1.113.87 1.82.87zM36.67 44.6a4.04 4.04 0 0 1-.001 8.078 4.044 4.044 0 0 1-4.05-4.04 4.044 4.044 0 0 1 4.05-4.037zm0 13.922c3.41 0 6.526 1.973 8.202 4.968H28.464c1.68-2.995 4.79-4.968 8.205-4.968z"/></g></svg>`}
                                 meta="27.02.2019"
                                url="DETAILS"
                                navigation={navigation}
                                user={user}
                                headerTitle="Охотничий билет"
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                <CardData
                                    styleTitle={{fontSize: 16}}
                                    icon={`<svg width="50" height="50" viewBox="0 0 101 110" xmlns="http://www.w3.org/2000/svg"><g fill="rgba(255, 255, 255, .4)" fill-rule="evenodd"><path d="M99.906 36.426c-.593-5.604-4.738-12.908-9.213-16.233 0 0-6.688-4.968-15.08-9.898-8.4-4.933-15.97-8.34-15.97-8.34C57.11.815 53.77.245 50.43.245c-3.337 0-6.677.57-9.21 1.71 0 0-7.573 3.407-15.97 8.34-8.395 4.93-15.08 9.898-15.08 9.898-4.473 3.325-8.62 10.63-9.212 16.233 0 0-.887 8.376-.887 18.24 0 9.863.888 18.24.888 18.24.592 5.603 4.74 12.907 9.21 16.23 0 0 6.687 4.97 15.083 9.905 8.397 4.93 15.97 8.34 15.97 8.34 2.533 1.14 5.873 1.706 9.21 1.706 3.34 0 6.68-.567 9.213-1.707 0 0 7.57-3.41 15.97-8.34 8.392-4.934 15.08-9.904 15.08-9.904 4.475-3.323 8.62-10.627 9.213-16.23 0 0 .886-8.377.886-18.24 0-9.864-.886-18.24-.886-18.24zm-4.62 35.992c-.46 4.356-3.904 10.43-7.368 13.003-.065.05-6.603 4.893-14.663 9.63-8.064 4.735-15.45 8.076-15.52 8.107-1.84.825-4.5 1.298-7.305 1.298-2.804 0-5.466-.473-7.3-1.298-.073-.03-7.438-3.36-15.523-8.105-8.06-4.74-14.6-9.583-14.665-9.63-3.464-2.573-6.905-8.65-7.367-13-.006-.085-.862-8.272-.862-17.757 0-9.48.856-17.67.862-17.752.462-4.354 3.903-10.43 7.37-13.006.064-.047 6.576-4.875 14.662-9.62 8.06-4.737 15.45-8.077 15.522-8.11 1.836-.826 4.496-1.3 7.3-1.3 2.805 0 5.466.474 7.3 1.3.077.033 7.437 3.36 15.526 8.11 8.06 4.733 14.6 9.573 14.662 9.622 3.464 2.572 6.908 8.65 7.368 13.003.012.08.863 8.273.863 17.752 0 9.485-.852 17.672-.864 17.753z"/><path d="M50.077 69.71a4.639 4.639 0 0 0-4.643 4.633c0 2.557 2.08 4.63 4.643 4.63a4.638 4.638 0 0 0 4.644-4.63 4.638 4.638 0 0 0-4.643-4.632m-7.903-10.789a2.9 2.9 0 0 0-2.902 2.895 2.9 2.9 0 0 0 2.902 2.894c1.6 0 2.904-1.297 2.904-2.893 0-1.6-1.304-2.895-2.905-2.895m15.463-.001a2.9 2.9 0 0 0-2.902 2.895 2.903 2.903 0 0 0 5.805.001c0-1.6-1.3-2.895-2.903-2.895"/><path d="M73.73 45.865a15.644 15.644 0 0 0-11.36 4.867c-1.36-.723-2.86-1.198-4.377-1.508a16.789 16.789 0 0 0 7.46-7.974c.3-.113.585-.285.827-.527l8.073-8.053a2.31 2.31 0 0 0 0-3.275 2.323 2.323 0 0 0-3.282 0l-4.165 4.157v-12.69a2.32 2.32 0 0 0-2.322-2.315 2.32 2.32 0 0 0-2.322 2.316V33.35l-4.168-4.158a2.323 2.323 0 0 0-3.282 0 2.31 2.31 0 0 0 0 3.274l6.557 6.545c-1.794 4.406-6.128 7.523-11.184 7.523-4.902 0-9.128-2.936-11.017-7.136l6.747-6.727a2.311 2.311 0 0 0 0-3.275 2.323 2.323 0 0 0-3.282 0l-4.523 4.512V20.863c0-1.278-1.04-2.316-2.322-2.316s-2.32 1.038-2.32 2.316v12.132l-3.815-3.803a2.323 2.323 0 0 0-3.282 0 2.308 2.308 0 0 0 0 3.274l7.862 7.844c.093.147.197.287.324.413.06.06.127.104.19.154a16.785 16.785 0 0 0 7.568 8.315c-1.388.277-2.768.68-4.036 1.292a15.671 15.671 0 0 0-11.14-4.62c-4.83 0-9.324 2.172-12.337 5.96a2.31 2.31 0 0 0 0 2.877 15.68 15.68 0 0 0 12.335 5.96c1.797 0 3.546-.305 5.193-.877-.02.323-.032.65-.032.993v10.602c0 9.78 7.976 17.735 17.78 17.735 9.804 0 17.782-7.956 17.782-17.735V60.776c0-.447-.023-.877-.054-1.294a15.714 15.714 0 0 0 5.927 1.177 15.68 15.68 0 0 0 12.334-5.96 2.305 2.305 0 0 0 0-2.877 15.678 15.678 0 0 0-12.333-5.958zm-53.925 7.398a11.036 11.036 0 0 1 7.33-2.766c2.733 0 5.317.99 7.33 2.766a11.045 11.045 0 0 1-7.33 2.764c-2.734 0-5.317-.99-7.33-2.764zm43.41 18.115c0 7.226-5.893 13.103-13.138 13.103-7.244 0-13.138-5.876-13.138-13.102V60.776c0-5.615 3.315-7.513 13.137-7.513 9.822 0 13.137 1.898 13.137 7.513v10.602zm10.516-15.35c-2.734 0-5.316-.99-7.33-2.765a11.036 11.036 0 0 1 7.33-2.766c2.733 0 5.318.99 7.33 2.766a11.043 11.043 0 0 1-7.33 2.764z"/></g></svg>`}
                                    styleIcon={{width: 50, height: 50}}
                                    style={{backgroundColor: '#ef3e58', width: '48%'}}
                                    title="Разрешение на охоту"
                                    meta={permission.length > 0 ? `найдено: ${permission.length}` : 'не найдены'}
                                    url="DETAILS"
                                    navigation={navigation}
                                    data={permission}
                                    info={true}
                                />
                                <CardData
                                    styleTitle={{fontSize: 16}}
                                    icon={`<svg width="50" height="50" viewBox="0 0 101 109" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path d="M100 36.2c-.6-5.6-4.7-12.9-9.2-16.2 0 0-6.7-5-15.1-9.9-8.4-4.9-15.9-8.3-15.9-8.3C57.3.6 54 0 50.7 0s-6.7.6-9.2 1.7c0 0-7.6 3.4-15.9 8.3-8.4 4.9-15.1 9.9-15.1 9.9C6 23.3 1.8 30.6 1.3 36.2c0 0-.9 8.4-.9 18.2 0 9.9.9 18.2.9 18.2.6 5.6 4.7 12.9 9.2 16.2 0 0 6.7 5 15.1 9.9 8.4 4.9 15.9 8.3 15.9 8.3 2.5 1.1 5.9 1.7 9.2 1.7 3.3 0 6.7-.6 9.2-1.7 0 0 7.6-3.4 15.9-8.3 8.4-4.9 15.1-9.9 15.1-9.9 4.5-3.3 8.6-10.6 9.2-16.2 0 0 .9-8.4.9-18.2-.1-9.8-1-18.2-1-18.2zm-4.6 36c-.5 4.4-3.9 10.4-7.4 13-.1 0-6.6 4.9-14.6 9.6-8 4.7-15.4 8.1-15.5 8.1-1.8.8-4.5 1.3-7.3 1.3s-5.5-.5-7.3-1.3c-.1 0-7.4-3.4-15.5-8.1-8-4.7-14.6-9.6-14.6-9.6-3.5-2.6-6.9-8.7-7.4-13 0-.1-.9-8.3-.9-17.8s.9-17.7.9-17.8c.5-4.4 3.9-10.4 7.4-13 .1 0 6.6-4.9 14.6-9.6 8-4.7 15.4-8.1 15.5-8.1 1.8-.8 4.5-1.3 7.3-1.3s5.5.5 7.3 1.3c.1 0 7.4 3.4 15.5 8.1 8 4.7 14.6 9.6 14.6 9.6 3.5 2.6 6.9 8.7 7.4 13 0 .1.9 8.3.9 17.8s-.9 17.7-.9 17.8z" fill="rgba(255, 255, 255, .4)"/><path d="M50.7 55.4c-.6 0-1.2-.3-1.6-.8-.2-.2-4.6-6.1-4.6-13.4 0-9 3.4-10.9 6.2-10.9 2.8 0 6.2 1.9 6.2 10.9 0 7.3-4.4 13.2-4.6 13.4-.4.5-1 .8-1.6.8zm0-21.1c-1.4 0-2.2 2.6-2.2 6.9 0 3.3 1.2 6.4 2.2 8.4 1-2 2.2-5.1 2.2-8.4 0-4.4-.9-6.9-2.2-6.9z" fill="rgba(255, 255, 255, .4)"/><path d="M46.4 64.2c0-2.3 1.9-4.2 4.2-4.2 2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2-2.3 0-4.2-1.8-4.2-4.2z"/><path d="M50.7 70.4c-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2 3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2zm0-8.4c-1.2 0-2.2 1-2.2 2.2 0 1.2 1 2.2 2.2 2.2 1.2 0 2.2-1 2.2-2.2 0-1.2-1-2.2-2.2-2.2z" fill="rgba(255, 255, 255, .4)"/><path d="M77 78.4H24.3c-3.5 0-6.5-1.8-8.2-4.9-1.6-3.1-1.4-6.6.5-9.5l26.3-42.5c1.8-2.6 4.6-4.1 7.7-4.1 3.1 0 6 1.5 7.7 4.1l26.4 42.6c1.9 2.8 2.1 6.4.5 9.4-1.7 3.1-4.8 4.9-8.2 4.9zM50.7 21.5c-1.8 0-3.4.8-4.4 2.3L20 66.2v.1c-1.1 1.6-1.2 3.7-.3 5.4.9 1.7 2.7 2.8 4.6 2.8H77c2 0 3.7-1 4.6-2.8.9-1.7.8-3.8-.3-5.4L55 23.7c-1-1.4-2.6-2.2-4.3-2.2z" fill="rgba(255, 255, 255, .4)"/></g></svg>`}
                                    styleIcon={{width: 50, height: 50}}
                                    style={{backgroundColor: '#ef3e58', width: '48%', marginLeft: 10}}
                                    title="Нарушения"
                                     meta={`найдено: ${violations.length}`}
                                    url="VIOLATION"
                                    navigation={navigation}
                                    data={violations}
                                />
                            </View>
                            <TableList 
                                data={data} 
                                navigation={navigation}
                            />
                        </Container>
                    </ScrollView>
                </ImageBackground>
            </ContainerPage>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user.user,
        permission: state.permission.permission,
        permissionLoading: state.permission.permissionLoading,
        violations: state.violation.violations,
        loadingViolations: state.violation.loadingViolations,
        connected: state.connect.connected,
    };
};

const mapDispatchToProps = {
    getPermissionAction, getViolationsAction,
    setConnect,
};


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
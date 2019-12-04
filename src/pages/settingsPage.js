import React from 'react';
import { View, ScrollView, Dimensions, ImageBackground, StatusBar, BackHandler, AsyncStorage } from 'react-native';
import {
    HeaderDetails,
} from '../components';
import Settings from '../components/SettingsComponent';
import { Container, ContainerPage } from './styled';

import { authUserAction, stopLoadingFormAction } from '../redux/actions';

const w = Dimensions.get('window').width;
import { url } from '../url';

export class SettignsPage extends React.Component {

    submitFormAuth = () => {
        // const { seria, nomer } = this.state;
        // const { navigation, authUserAction } = this.props;

        // NetInfo.isConnected.fetch().then(isConnected => {
        //     if (isConnected) {
        //         try {
        //             fetch(`${url}/api/v1/Customer/${seria.value}/${nomer.value}`, {
        //                 headers: {
        //                     Authorization: 'uptec4nGePz9QDqqAz0bEmV3B15NEnUq'
        //                 }
        //             })
        //                 .then(response => response.json())
        //                 .then(async data => {
        //                     console.log(data, `${url}/api/v1/Customer/${seria.value}/${nomer.value}`)
        //                     authUserAction({nomer, seria, ...data});
        //                     await this._storeData('user', JSON.stringify(data));
        //                     navigation.navigate('HOME');
        //                     return data;
        //                 })
        //                 .catch(err => console.log(`${url}/api/v1/Customer/${seria.value}/${nomer.value}`, err));
        //         } catch(err) {
        //             console.log(err)
        //         }
        //     } else {
        //         alert('нет подключения к интернету');
        //     }
        // });
    }


    render() {
        const { navigation } = this.props;
        return (
            <ContainerPage style={{ padding: 0 }}>
                <HeaderDetails onGoBack={() => navigation.goBack()} title="Настройки" />
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                    <ScrollView>
                        <Container style={{ padding: 0 }}>
                            <Settings user={navigation.state.params.user} navigation={navigation} />
                        </Container>
                    </ScrollView>
                </ImageBackground>
            </ContainerPage>
        );
    }
}


export default SettignsPage;

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

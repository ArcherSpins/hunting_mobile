import React from 'react';
import { ImageBackground, Dimensions, StatusBar } from 'react-native';
import { HeaderDetails, FooterTabs, ListItemComponent, ItemDetailsForInfo } from '../components';
import { ContainerPage, Content } from './styled';


const w = Dimensions.get('window').width;


const data = [
    {
        id: 1,
        title: 'Правила охоты',
        path: 'HOME'
    },
    {
        id: 2,
        title: 'Как получить охотничий билет',
        path: 'HOME'
    },
    {
        id: 3,
        title: 'Как получить разрешение на охоту',
        path: 'HOME'
    },
    {
        id: 4,
        title: 'Ответственность за нарушение',
        path: 'HOME'
    },
    {
        id: 5,
        title: 'Сроки охоты',
        path: 'HOME'
    }
]



const InfoPage = ({ navigation }) => {
    const { title } = navigation.state.params;

    return (
        <ContainerPage>
            <HeaderDetails onGoBack={() => navigation.goBack()} title={title || 'Информация'} />

            <StatusBar backgroundColor="#36404a" barStyle="light-content" />
            <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                <Content>
                    <ListItemComponent navigation={navigation} styleRight={{minWidth: 50}} styleLeft={{minWidth: 300}} Item={ItemDetailsForInfo} data={data} />
                </Content>
            </ImageBackground>
            <FooterTabs navigation={navigation} />
        </ContainerPage>
    );
}


export { InfoPage }
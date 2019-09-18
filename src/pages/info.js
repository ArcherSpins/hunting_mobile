import React from 'react';
import { ImageBackground, Dimensions, StatusBar } from 'react-native';
import { HeaderDetails, FooterTabs, ListItemComponent, ItemDetailsForInfo } from '../components';
import { ContainerPage, Content } from './styled';


const w = Dimensions.get('window').width;


const data = [
    {
        id: 1,
        title: 'Правила охоты',
        path: 'REGULATION_HUNT'
    },
    {
        id: 2,
        title: 'Как получить охотничий билет',
        path: 'HUNTER_BILET'
    },
    {
        id: 3,
        title: 'Как получить разрешение на охоту',
        path: 'PERMISSION_HUNTER '
    },
    {
        id: 4,
        title: 'Ответственность за нарушение',
        path: 'RESPONSIBILITY'
    },
    {
        id: 5,
        title: 'Сроки охоты',
        path: 'HUNTING_PERIOD'
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
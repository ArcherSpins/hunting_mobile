import React from 'react';
import { ImageBackground, Dimensions } from 'react-native';
import { 
    HeaderDetails,
    ListItemComponent, 
    FooterTabs,
    ItemDetailsForInfo,
    Loading,
    ErrorLoad
} from '../components';
import { ContainerPage, Content, CardMapDetail, Text } from './styled';
import styled from 'styled-components';

const w = Dimensions.get('window').width;

const Header = styled.View`
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom-width: 1px;
    border-color: rgba(0,0,0,0.2);
    font-weight: bold;
`;

export const HuntingPeriod = ({ title, navigation }) => {
    return (
        <ContainerPage>
            <HeaderDetails onGoBack={() => navigation.goBack()} title={title || 'Сроки охоты'} />
            <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                <Content>
                    <CardMapDetail style={{marginBottom: 30}}>
                        <Header>
                            <Text>
                                Сроки и особенности охоты на территории охотничьих угодий Республики Дагестан.
                            </Text>
                        </Header>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            Региональные особенности сроков охоты, способы и ограничения охоты на территории охотничьих угодий Республики Дагестан утверждены Указом Президента Республики Дагестан от 28 февраля 2013 года № 67 «Об определении видов разрешенной охоты и параметров осуществления охоты в охотничьих угодьях на территории Республики Дагестан, за исключением особо охраняемых природных территорий федерального значения».
                        </Text>
                        <Header>
                            <Text>
                                Виды разрешенной охоты в охотничьих угодьях на территории Республики Дагестан
                            </Text>
                        </Header>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            1. Промысловая охота.
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            2. Любительская и спортивная охота.
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            3. Охота в целях осуществления научно-исследовательской, образовательной деятельности.
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            4. Охота в целях регулирования численности охотничьих ресурсов.
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            5. Охота в целях акклиматизации, переселения и гибридизации охотничьих ресурсов.
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            6. Охота в целях содержания и разведения охотничьих ресурсов в полувольных условиях или искусственно созданной среде обитания.
                        </Text>
                        <Header>
                            <Text>
                                Параметры осуществления охоты на территории Республики Дагестан, за исключением особо охраняемых природных территорий федерального значения
                            </Text>
                        </Header>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            1) на дикого кабана:
                            все половозрастные группы, за исключением самок с приплодом текущего года, - с 1 июня по 30 сентября;
                            все половозрастные группы - с 1 октября по 31 января;
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            2) на серую ворону, большого баклана и болотного луня - с третьей субботы августа по 31 декабря (отнесены к объектам охоты на территории ох. уг. РД);
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            3) на зайца-русака, лисицу, корсака и енотовидную собаку - с 15 сентября по 31 января;
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            4) на селезней утиных водоплавающих птиц - в период весенней охоты с 1 марта в течение 10 (десяти) календарных дней;
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            5) на иные виды охотничьих ресурсов - в соответствии со сроками, установленными       Правилами охоты, утвержденными приказом Министерства природных ресурсов и экологии Российской Федерации от 16 ноября 2010 г. N 512.
                        </Text>
                    </CardMapDetail>
                </Content>
            </ImageBackground>
        </ContainerPage>
    );
}



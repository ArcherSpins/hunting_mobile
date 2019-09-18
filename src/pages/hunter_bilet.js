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

export const HunterBilet = ({ title, navigation }) => {
    return (
        <ContainerPage>
            <HeaderDetails onGoBack={() => navigation.goBack()} title={title || 'Охотничьи ресурсы'} />
            <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                <Content>
                    <CardMapDetail style={{marginBottom: 30}}>
                        <Header>
                            <Text>
                                Возможность охотничьего билета
                            </Text>
                        </Header>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10}}>
                            Решение оформить охотничий билет даст вам новые права и обязанности: 
                            1. Вы сможете получить лицензию на покупку, возможность хранения, а также ношения гладкоствольного оружия; 
                            2. охотничий билет подтверждает, что охотник имеет соответствующие знания по использованию охотничьего оружия, знает правила охоты и владеет техникой безопасности; 3. решив получить охотничий билет, Вы сможете охотиться, не нарушая закон. Вы сможете купить охотничье оружие, использовать его, приобретать путевки в охотничьи хозяйства, получать лицензии на отстрел птиц, а также животных; 
                            4. охотничий билет, а также разрешение на ношение и хранение дома охотничьего оружия дает возможность избежать проблем при перевозке гладкоствольного оружия самообороны;
                            5. купить охотничий билет государственного образца важно и в случае, если в будущем решите приобрести для самообороны огнестрельное гладкоствольное оружие. В этом случае Вам не придется сдавать экзамен с целью подтверждения знаний безопасного обращения с оружием; 
                            6. наличие охотничьего билета будет полезным и в случае, если спустя лет 5 вы решите приобрести оружие с нарезным стволом. В соответствии с Законом лишь владельцы охотничьего гладкоствольного оружия с необходимым стажем в 5 лет могут рассчитывать на покупку нарезного ствола.
                        </Text>
                        <Header>
                            <Text>
                                Документы, необходимые для получения охотничьего билета
                            </Text>
                        </Header>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            Заявление на получение охотничьего билета
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            2 личные фотографии в черно-белом или цветном исполнении, размером 35 x 45 мм, с четким изображением лица, строго в анфас, без головного убора;
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            Копия паспорта гражданина России со страницами с регистрацией места жительства;
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>Согласие на обработку своих персональных данных (не требуется в случае добровольного предоставления справки об отсутствии судимости);</Text>
                    </CardMapDetail>
                </Content>
            </ImageBackground>
        </ContainerPage>
    );
}



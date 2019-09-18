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

export const Responsibility = ({ title, navigation }) => {
    return (
        <ContainerPage>
            <HeaderDetails onGoBack={() => navigation.goBack()} title={title || 'Ответственность за нарушение'} />
            <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                <Content>
                    <CardMapDetail style={{marginBottom: 30}}>
                        <Header>
                            <Text>
                                Ответственность за нарушение правил охоты.
                            </Text>
                        </Header>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            за повторное нарушение правил охоты в течение года грозит штраф для граждан – от 4 тыс. до 5 тыс. рублей с конфискацией орудий охоты или без таковой или лишением права охотиться на срок от года до трех лет, а для должностных лиц — от 35 тыс. до 50 тыс. рублей с возможной конфискацией орудий охоты;
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            гражданам за нарушение правил охоты грозит штраф от 500 руб. до 4 тыс. рублей с конфискацией орудий охоты или без таковой или лишением права охотиться на срок до 2х лет, а должностным лицам — штраф от 20 тыс. до 35 тыс. рублей с возможной конфискацией орудий охоты;
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            за охоту вне сезона охоты граждане могут лишиться права охоты на срок от года до двух лет, а на должностных лиц накладывается штраф от 35 тыс. до 50 тыс. рублей, также с возможной конфискаций орудий охоты;
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            в случае если охотник отказался предъявить охотничий билет, разрешение на добычу охотничьих ресурсов, путевку или разрешения на хранение и ношение охотничьего оружия (огнестрельного и пневматического), его лишат права охоты на срок от года до двух лет, а если это должностное лицо — придется заплатить штраф от 25 тыс. до 40 тыс. рублей с возможной конфискаций орудий охоты;
                        </Text>
                        <Text style={{paddingHorizontal: 10, paddingVertical: 10}}>
                            добыча копытных животных и медведей, отнесенных к охотничьим ресурсам, без обязательного разрешения, либо с нарушением предусмотренных разрешением условий будет наказываться: лишением права охотиться на срок от года до трех лет.
                        </Text>
                    </CardMapDetail>
                </Content>
            </ImageBackground>
        </ContainerPage>
    );
}



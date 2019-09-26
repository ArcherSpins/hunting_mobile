import React from 'react';
import { View } from 'react-native';

import { SvgXml } from 'react-native-svg';
import { Container, Title, Icon, Meta } from './styled';

export const CardData = (props) => {
    const {title, icon, meta, style, styleTitle, styleIcon, url, navigation, data, info, user, headerTitle} = props;

    return (
        <Container onPress={() => navigation.navigate(url, ({title, data, info, user, headerTitle, ...props}))} activeOpacity={0.8} style={style}>
            <View style={{width: '70%'}}>
                <Title style={styleTitle}>{ title }</Title>
                <Meta>{ meta }</Meta>
            </View>
            <View>
                {
                    icon ? <SvgXml xml={icon} /> : null
                }
            </View>
        </Container>
    )   
}
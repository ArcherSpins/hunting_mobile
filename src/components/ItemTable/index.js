import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components';
import IconItem from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';
import { Icon, ListItem, Text, Left, Right } from 'native-base';

const ItemTouch = styled.TouchableOpacity`
    padding: 10px;
    border-bottom-width: 1px;
    border-color: #c5c5c5;
    &:nth-child(n+2) {
        border-bottom: none;
    }
`;

const Img = styled.Image`
    width: 50px;
    height: 55px;
`;

const ContentComponent = styled.View`
    width: 75%;
`;

const Item = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 20px;
    padding-top: 10px;
    width: 90%;
`;

const Parag = styled.Text`
    color: #969696;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-color: #e0e0e0;
    width: 90%;
`;


const Subtitle = styled.Text`
    color: #9c9c9c;
    font-size: 14px;
    width: 100%;
`;

const Div = styled.View`
`;

const Status = styled.Text`
    font-size: 10px;
    border-radius: 3px;
    padding: 1px 6px;
    color: white;
    margin-right: 10px;
`;

export const ItemTable = ({icon, iconXml, title, content, last, navigation, url}) => {
    console.log(icon)
    return (
        <TouchableOpacity onPress={() => navigation.navigate(url, ({title}))} activeOpacity={0.8}>
            <Item>
                {
                    icon ? <SvgXml xml={icon} /> : null
                }
                <ContentComponent>
                    <Title  numberOfLines={1}>{ title }</Title>
                    <Parag  numberOfLines={1} style={{borderBottomWidth: last ? 0 : 1}}>{ content }</Parag>
                </ContentComponent>
                <Icon name="arrow-forward" style={{color: 'gray', fontSize: 16}} />
            </Item>
        </TouchableOpacity>
    );
}


export const ItemDetailsForHungry = (props) => {
    const {item, navigation = {navigate: () => {}}, style, last, children, arrow, textStyle} = props;
    return (
        <ListItem onPress={() => item.path ? navigation.navigate(item.path, ({...props})) : console.log('not path')} style={[{borderBottomWidth: item.last || last ? 0 : 1}, style]}>
            <Left style={{width: '85%', minWidth:'85%'}}>
                <Div style={{paddingRight: 10}}>
                {
                    item.subtitle ? <Subtitle  numberOfLines={1}>{ item.subtitle }</Subtitle>
                    : null
                }
                <Text  numberOfLines={1} style={[{minWidth:150, padding: 0, textAlign: 'left'}, textStyle]}>{ item.title || item.name || children }</Text>
                {
                    item.date_given ? <Subtitle  numberOfLines={1}>{ item.date_given }</Subtitle>
                    : null
                }
                </Div>
            </Left>
            <Right style={{flexDirection: 'row', alignItems: 'center', minWidth: '10%', justifyContent: 'flex-start'}}>
                {
                    item.active ?
                        <IconItem style={{marginRight: 10}} name={item.iconName || "checkcircle"} size={item.iconSize || 24} color={item.iconColor || `#4caf50`} />
                    : null
                }
                {
                    item.calendar ? 
                        <IconEnt style={{marginRight: 10}} name={item.iconName || "calendar"} size={item.iconSize || 24} color={item.iconColor || `tomato`} />
                    : null
                }
                {
                    arrow ? <Icon name="arrow-forward" /> : null
                }
            </Right>
        </ListItem>
    );
}

export const ItemDetailsForInfo = ({item, styleLeft, styleRight, navigation, children, textStyle}) => (
    <ItemTouch onPress={() => item.path ? navigation.navigate(item.path, ({item})) : 'not path'} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Div style={{width: '60%', minWidth: '60%'}}>
            <Div style={{ width: '100%' }}>
                {
                    item.subtitle || item.group_type_name ? <Subtitle numberOfLines={1}>{ item.subtitle || item.group_type_name }</Subtitle>
                    : null
                }
                <Text numberOfLines={1} style={[{textAlign: 'left', width: '100%'}]}>{ item.title  || item.name || item.hunting_farm_name || children }</Text>
                {
                    item.date_given ? <Subtitle numberOfLines={1}>{ item.date_given }</Subtitle>
                    : null
                }
            </Div>
        </Div>
        <Div style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '40%', paddingRight: 10}, styleRight]}>
            {
                item.active || item.back ?
                (
                    <Status numberOfLines={1} style={{backgroundColor: item.active ? '#4caf50' : '#f44336', width: 80}}>{ item.active ? 'сезон открыт' : 'нет корешка'}</Status>
                )
                : null
            }
            <Icon name="arrow-forward" style={{ color: 'gray', fontSize: 16 }} />
        </Div>
    </ItemTouch>
)


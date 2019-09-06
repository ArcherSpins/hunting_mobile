import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components';
import IconItem from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';
import { Icon, ListItem, Text, Left, Right } from 'native-base';

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
`;

const Parag = styled.Text`
    color: #969696;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-color: #e0e0e0;
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
                    <Title>{ title }</Title>
                    <Parag style={{borderBottomWidth: last ? 0 : 1}}>{ content }</Parag>
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
            <Left>
                <Div>
                    {
                        item.subtitle ? <Subtitle>{ item.subtitle }</Subtitle>
                        : null
                    }
                    <Text style={[textStyle]}>{ item.title || item.name || children }</Text>
                    {
                        item.date_given ? <Subtitle>{ item.date_given }</Subtitle>
                        : null
                    }
                </Div>
            </Left>
            <Right style={{flexDirection: 'row', alignItems: 'center', minWidth: 150, justifyContent: 'flex-end'}}>
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
    <ListItem onPress={() => item.path ? navigation.navigate(item.path, ({item})) : 'not path'} style={{borderBottomWidth: item.last ? 0 : 1}}>
        <Left style={styleLeft}>
            <Div>
                {
                    item.subtitle || item.group_type_name ? <Subtitle>{ item.subtitle || item.group_type_name }</Subtitle>
                    : null
                }
                <Text style={[textStyle]}>{ item.title  || item.name || item.hunting_farm_name || children }</Text>
                {
                    item.date_given ? <Subtitle>{ item.date_given }</Subtitle>
                    : null
                }
            </Div>
        </Left>
        <Right style={[{flexDirection: 'row', alignItems: 'center', minWidth: 150, justifyContent: 'flex-end'}, styleRight]}>
            {
                item.active || item.back ? 
                (
                    <Status style={{backgroundColor: item.active ? '#4caf50' : '#f44336'}}>{ item.active ? 'сезон открыт' : 'нет корешка'}</Status>
                )
                : null
            }
            <Icon name="arrow-forward" />
        </Right>
    </ListItem>
)


import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Dimensions, ImageBackground, Text, View } from 'react-native';
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import {
    HeaderDetails,
    ListItemComponent, 
    FooterTabs,
    ItemDetailsForHungry,
    ItemDetailsForInfo,
    UserComponent,
    NotFoundText,
    Loading,
} from '../components';
import { ContainerPage, Content, Container } from './styled';
import { setPermissionDetailAnimals } from '../redux/actions';
import { url } from '../url';

const w = Dimensions.get('window').width;
const styles = {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c1c1c1',
} 

const PermissionDetailComponent = ({ navigation, listAnimals, setPermissionDetailAnimals, loading, user }) => {
    const { headerTitle, title, item } = navigation.state.params;

    useEffect(() => {
        fetch(`${url}/api/v1/HuntingFarm/License/${item.data_customer_hunting_lic_perm_id}/Animal`)
            .then(response => response.json())
            .then(data => setPermissionDetailAnimals(data))
            .catch(error => 
            Toast.show({
                text: 'Ошибка подключения',
                type: 'danger'
            }));
    }, []);

    if (loading)
        return <Loading />;

    return (
        <ContainerPage>
            <HeaderDetails onGoBack={() => navigation.goBack()} title={headerTitle || title || item.hunting_farm_name} />
            <StatusBar backgroundColor="#36404a" barStyle="light-content" />
            <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                <Content>
                    <Container style={styles}>
                        <ItemDetailsForHungry
                            textStyle={{
                                width: '100%'
                            }}
                            item={{
                                title: `${user.serial} - ${user.number}`,
                                subtitle: 'Серия и номер бланка'
                            }}
                        />
                        {
                            user.birth_date && (
                                <ItemDetailsForHungry
                                    textStyle={{
                                        width: '100%'
                                    }}
                                    item={{
                                        title: user.birth_date,
                                        subtitle: 'Дата выдачи'
                                    }}
                                />
                            )
                        }
                        {
                            user.issue_body && (
                                <ItemDetailsForHungry
                                    textStyle={{
                                        width: '98%',
                                        float: 'left'
                                    }}
                                    item={{
                                        title: user.issue_body,
                                        subtitle: 'Кем выдан'
                                    }}
                                />
                            )
                        }
                        {
                            item.group_type_name && (
                                <ItemDetailsForHungry
                                    textStyle={{
                                        width: '100%'
                                    }}
                                    item={{
                                        title: item.group_type_name,
                                        subtitle: 'Группа видов'
                                    }}
                                />
                            )
                        }
                        {
                            item.hunting_farm_id && item.hunting_farm_name && (
                                <ItemDetailsForHungry
                                    textStyle={{
                                        width: '100%'
                                    }}
                                    path="/api/v1/HuntingFarm"
                                    navigation={navigation}
                                    item={{
                                        title: item.hunting_farm_name,
                                        id: item.hunting_farm_id,
                                        subtitle: 'Место охоты',
                                        last: true,
                                        path: 'MAP'
                                    }}
                                />
                            )
                        }
                    </Container>
                    {
                        listAnimals && listAnimals.length > 0 && (
                            <View>
                                <Text style={{padding: 15, fontSize: 15, color: 'gray', marginTop: 20}}>Список животных для охоты</Text>
                                <Container style={[styles, {marginBottom: 30}]}>
                                    {
                                        listAnimals.map((item, i) => (
                                            <ItemDetailsForHungry
                                                key={i}
                                                textStyle={{
                                                    width: '100%'
                                                }}
                                                item={{
                                                    id: item.data_customer_hunting_lic_perm_animal_id,
                                                    title: item.animal_name,
                                                    date_given: `${item.date_start} - ${item.date_stop}`,
                                                    last: i === listAnimals.length - 1,
                                                }}
                                            />
                                        ))
                                    }
                                </Container>
                            </View>
                        )
                    }
                </Content>
            </ImageBackground>
            <FooterTabs navigation={navigation} />
        </ContainerPage>
    );
}

const mapStateToProps = state => {
    return {
        listAnimals: state.permissionDetail.listAnimals,
        loading: state.permissionDetail.loading,
        user: state.user.user,
    }
}

const PermissionDetail = connect(mapStateToProps, {setPermissionDetailAnimals})(PermissionDetailComponent);

export { PermissionDetail };

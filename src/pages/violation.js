import React from 'react';
import { ImageBackground, Dimensions, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { HeaderDetails, FooterTabs, ItemDetailsForHungry, NotFoundText } from '../components';
import { ContainerPage, Content, Div } from './styled';
// get width
const w = Dimensions.get('window').width;

const Title = styled.Text`
    color: rgba(0,0,0,.54);
    margin: 18px 16px 16px;
`;

const Container = styled.View`
    padding: 6px;
    border-width: 1px;
    border-color: #d2d2d2;
`;

const ViolationPage = React.memo(({ navigation }) => {
    const { title, data } = navigation.state.params;
    return (
        <ContainerPage>
            <HeaderDetails onGoBack={() => navigation.goBack()} title={title} />
            <StatusBar backgroundColor="#36404a" barStyle="light-content" />
            <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1}}>
                <Content style={{flex: 1}}>
                    {
                        data.length > 0 ? (
                            <View>
                                <Title>
                                    Нарушения
                                </Title>
                                <Container style={{paddingBottom: 30}}>
                                    <Div>
                                        {
                                            data.map((item, i) => {
                                                return (
                                                    <ItemDetailsForHungry
                                                        arrow
                                                        navigation={navigation}
                                                        title="Нарушение"
                                                        item={{
                                                            calendar: item.active || true,
                                                            subtitle: item.number_protocol,
                                                            date_given: item.date_create,
                                                            iconSize: 20,
                                                            path: 'VIOLATION_DETAIL',
                                                            last: i === data.length - 1
                                                        }}
                                                        data={item}
                                                        key={i}
                                                    >
                                                        {item.violation_name}
                                                    </ItemDetailsForHungry>
                                                );
                                            })
                                        }
                                    </Div>
                                </Container>
                            </View>
                        )
                        :
                        <NotFoundText />
                    }
                </Content>
            </ImageBackground>
            <FooterTabs navigation={navigation} />
        </ContainerPage>
    );
});

const mapStateToProps = state => ({
    violations: state.violation.violations,
    loadingViolations: state.violation.loadingViolations,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ViolationPage);

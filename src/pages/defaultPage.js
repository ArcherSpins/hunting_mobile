import React from 'react';
import styled from 'styled-components';
import { View, AsyncStorage, StatusBar, ImageBackground, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { authUserAction } from '../redux/actions';

const Title = styled.Text`
    text-align: center;
    color: #063e86;
    font-size: 18px;
`;

const Image = styled.Image`
    width: 120px;
    height: 120px;
    margin-top: 30%;
`;

class DefaultPageComponent extends React.Component {

    componentDidMount = async () => {
        const { authUserAction, navigation } = this.props;
        try {
            const result = await this._getAsyncData('user');
            if (!result) {
                authUserAction(JSON.parse(result));
                setTimeout(() => navigation.navigate('HOME'), 1000)
            } else {
                navigation.navigate('FORM_PAGE');
            }
        } catch(err) {
            console.log(err)
        } finally {
            stopLoadingFormAction();
        }
    }

    _getAsyncData = async (label) => {
        try {
            const value = await AsyncStorage.getItem(label);
            if (value) {
                return value;
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <ImageBackground source={require('../img/login-bg.jpg')} style={{flex: 1, alignItems: 'center', paddingTop: 100}}>
                <View style={{ alignItems: 'center' }}>
                    <Title>МИНИСТЕРСТВО ПРИРОДНЫХ РЕСУРСОВ И ЭКОЛОГИИ РЕСПУБЛИКИ ДАГЕСТАН</Title>
                    <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />
                    {/* <Image source={require('../../assets/loading.gif')} /> */}
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
}

const mapDispatchToProps = {
    authUserAction,
}

const DefaultPage = connect(mapStateToProps, mapDispatchToProps)(DefaultPageComponent);

export { DefaultPage };

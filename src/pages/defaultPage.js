import React from 'react';
import styled from 'styled-components';
import { View, AsyncStorage, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { authUserAction } from '../redux/actions';

const Container = styled.View`
    flex: 1;
    background-color: #20232a;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
`;

class DefaultPageComponent extends React.Component {

    componentDidMount = async () => {
        const { authUserAction, navigation } = this.props;
        try {
            const result = await this._getAsyncData('user');
            if (result) {
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
            <Container>
                <Image source={{ uri: 'https://i.gifer.com/8p7m.gif' }} />
            </Container>
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

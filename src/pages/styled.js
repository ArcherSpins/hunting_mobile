import styled from 'styled-components';

export const Container = styled.View`
    padding: 10px;
    flex: 1;
`;

export const ContainerPage = styled.View`
    flex: 1;
`;

export const Content = styled.ScrollView`
    flex: 1;
    padding-top: 20px;
`;

export const Text  = styled.Text`
`;

export const GoBackButton = styled.TouchableOpacity`
    color: white;
`;

export const CardMapDetail = styled.View`
    border-radius: 5px;
    border-width: 1px;
    border-color: #e0dbdb;
    border-bottom-width: 2px;
    border-bottom-color: gray;
    margin-left: 10px;
    margin-right: 10px;
    background-color: white;
`;

export const CardText = styled.Text`
    margin-bottom: 10px;
    padding: 10px;
`;


export const BgImage = styled.ImageBackground`
    width: 100%;
    height: 300px;
`;


export const Div = styled.View`

`;

export const CardContent = styled.View`
    padding: 10px;
`;

export const FoneBlock = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0, 0.3);
`;

export const AddedButton = styled.TouchableOpacity`
    padding: 5px;
    background-color: #36404a;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    justify-content: center;
    align-items: center;
    bottom: 20px;
    z-index: 1000;
    right: 10px;
`;

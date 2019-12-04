import styled from 'styled-components';

export const Container = styled.View`
    background-color: #36404a;
    padding: 10px;
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    height: 70px;
`;

export const Logo = styled.View`
    display: flex;
    background-color: rgba(0,0,0,.12);
    border-radius: 16px;
    align-items: center;
    flex-direction: row;
    padding-right: 10px;
    max-width: 70%;
`;

export const Icon = styled.View`
    border-radius: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    background-color: #f44336;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`;

export const Text = styled.Text`
    color: white;
`;

export const Title = styled.Text`
    color: white;
    font-size: 20px;
`;

export const Label = styled.Text`
    color: white;
`;
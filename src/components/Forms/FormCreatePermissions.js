import React from 'react';
import { Modal, Text } from 'react-native';
import styled from 'styled-components';


const Container = styled.View`
    background-color: rgba(0,0,0,0.6);
    flex: 1;
`;

const ModalComp = styled.View`
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    shadow-offset: {width: 2, height: 2};
    shadow-color: rgba(0,0,0,0.4);
    shadow-opacity: 0.5;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    flex: 1;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: tomato;
    border-radius: 25px;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    padding-bottom: 1px;
`;


const Title = styled.Text`
    font-size: 18px;
    
`;

class CreatePermission extends React.Component {
    render() {
        return (
            <Modal animationType="slide">
                <Container>
                    <ModalComp>
                        <Title>Modal</Title>
                        <CloseButton onPress={this.props.closeModal}>
                            <Text style={{color: "#fff", fontSize: 18, fontWeight: 'bold'}}>×</Text>
                        </CloseButton>
                    </ModalComp>
                </Container>
            </Modal>
        );
    }
}

export { CreatePermission };


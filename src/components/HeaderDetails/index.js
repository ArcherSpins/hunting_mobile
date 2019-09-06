import React, { Component } from 'react';
import styled from 'styled-components';
import { Header, Left, Body, Right, Button, Icon } from 'native-base';


const Title = styled.Text`
    color: white;
    font-size: 20px;
`;


export class HeaderDetails extends Component {
  render() {
    const { title, onGoBack, searchIcon } = this.props;

    return (
      <Header style={{backgroundColor: '#36404a', height: 70, paddingTop: 15}}>
        <Left>
            <Button onPress={onGoBack} transparent>
              <Icon name='arrow-back' />
            </Button>
        </Left>
        <Body>
          <Title>{ title }</Title>
        </Body>
        {
          searchIcon ? 
          (
            <Right>
              <Button transparent>
                <Icon name='search' />
              </Button>
            </Right>
          ) : null
        }
      </Header>
    );
  }
}
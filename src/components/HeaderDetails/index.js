import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styled from 'styled-components';
import { Header, Left, Body, Right, Button, Icon } from 'native-base';


const Title = styled.Text`
    color: ${props => props.color ? props.color : 'white'};
    font-size: ${props => props.size || '20px'};
`;

const HeaderSearch = styled.View`
  flex-direction: row;
`;



export class HeaderDetails extends Component {

  state = {
    value: '',
    search: false,
  }

  updateSearch = (search) => {
    this.setState({ value: search });
  }

  toggleSearch = (status) => {
    this.setState({ search: status });
  }

  render() {
    const { title, onGoBack, searchIcon } = this.props;
    const { search, value } = this.state;

    if (search)
      return (
        <HeaderSearch>
          <SearchBar
            placeholder="Поиск..."
            onChangeText={this.updateSearch}
            value={value}
            inputStyle={{
              backgroundColor: '#fff',
            }}
            placeholder="Поиск..."
            placeholderTextColor="#333"
            inputContainerStyle={{
              borderWidth: 0,
              backgroundColor: '#fff'
            }}
            containerStyle={{
              width: '82%',
              backgroundColor: '#fff'
            }}
          />
          <TouchableOpacity onPress={() => this.toggleSearch(false)} style={{
            backgroundColor: 'white',
            width: '18%',
            borderWidth: 1,
            borderTopColor: '#333',
            borderBottomColor: '#333',
            borderLeftColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Title color="#333" size="12px">закрыть</Title>
          </TouchableOpacity>
        </HeaderSearch>
      );

    return (
      <Header style={{backgroundColor: '#36404a', height: 70, paddingTop: 15, justifyContent: 'space-between'}}>
        <Left style={{ marginRight: 30 }}>
            <Button style={{minWidth: 50}} onPress={onGoBack} transparent>
              <Icon name='arrow-back' />
            </Button>
        </Left>
        <Body style={{width: '60%', minWidth: 200}}>
          <Title style={{width: '100%'}}>{ title }</Title>
        </Body>
        <Right>
          {/* {
            searchIcon && !search ? (
              <Button onPress={() => this.toggleSearch(true)} transparent>
                <Icon name='search' />
              </Button>
            ) : null
          } */}
        </Right>
        {/* {
          searchIcon && !search ? 
          (
            
          ) : null
        } */}
      </Header>
    );
  }
}
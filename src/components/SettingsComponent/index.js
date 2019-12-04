import React from 'react';
import { List, Thumbnail, Content, Button, ListItem, Text, Icon, Left, Body, Right, DatePicker } from 'native-base';

export default class SettignsPage extends React.Component {
  

  render() {
    const { navigation, user } = this.props;

    return (
      <React.Fragment>
        <Content style={{ padding: 0, marginBottom: 20 }}>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://www.logolynx.com/images/logolynx/03/039b004617d1ef43cf1769aae45d6ea2.png' }} />
              </Left>
              <Body>
                <Text>{user.customer_name}</Text>
                <Text note>{user.issue_body}</Text>
              </Body>
              {/* <Right>
                <Text note>{user.birth_date}</Text>
              </Right> */}
            </ListItem>
          </List>
        </Content>
        <Content style={{ padding: 0 }}>
          <ListItem itemDivider>
            <Text>Мои данные</Text>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('SETTING_PASSPORT', ({ user }))} icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="create" />
              </Button>
            </Left>
            <Body>
              <Text style={{ color: "#333", paddingLeft: 10 }}>Охотничий билет</Text>
            </Body>
            <Right>
              <Text style={{ fontSize: 12 }}>Изменить</Text>
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('SETTING_SERVER', ({ user }))} icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="cloud" />
              </Button>
            </Left>
            <Body>
              <Text style={{ color: "#333", paddingLeft: 10 }}>Сервер</Text>
            </Body>
            <Right>
              <Text style={{ fontSize: 12 }}>Изменить</Text>
            </Right>
          </ListItem>
        </Content>
      </React.Fragment>
    );
  }
}
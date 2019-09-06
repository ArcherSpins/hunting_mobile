import React, { Component } from 'react';
import { Content, List } from 'native-base';


const styles = {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c1c1c1',
} 

class ListItemComponent extends Component {
  render() {

    const { data, Item, styleLeft, styleRight, navigation, style } = this.props;
    return (
        <Content style={[styles, style]}>
            <List>
                {
                    data.map((item, i) => (
                        <Item navigation={navigation} styleLeft={styleLeft} styleRight={styleRight} key={item.id || i} item={item} {...this.props} />
                    ))
                }                
            </List>
        </Content>
    );
  }
}

export { ListItemComponent }
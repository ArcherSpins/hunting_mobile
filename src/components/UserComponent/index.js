import React from 'react';
import { View } from 'react-native';
import { ItemDetailsForHungry } from '../index';
import { ContainerList } from '../../ui-kit';

export class UserComponent extends React.PureComponent {

    state = {
        permission: false,
        getPermission: false,
    }

    componentDidUpdate() {
        const { location } = this.props;
        const { permission } = this.state;
        if (location && !permission) {
            const result = this.inPoly(location.latitude);
            this.setState({ permission: result, getPermission: true });
        }
    }

    componentWillUnmout() {
        this.setState({ getPermission: false });
    }

    inPoly(x,y){
       var xp = new Array(-73,-33,7,-33); // Массив X-координат полигона
        var yp = new Array(-85,-126,-85,-45); // Массив Y-координат полигона
          npol = xp.length;
          j = npol - 1;
          var c = false;
          for (i = 0; i < npol;i++){
              if ((((yp[i]<=y) && (y<yp[j])) || ((yp[j]<=y) && (y<yp[i]))) &&
              (x > (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])) {
                 c = !c
               }
               j = i;
          }
       return c;
     }

    render () {
        const { user, location } = this.props;
        const { permission } = this.state;
        return (
           <ContainerList>
               <ItemDetailsForHungry
                   item={{
                       subtitle: 'ФИО',
                       name: user.customer_name,
                   }}
               />
               <ItemDetailsForHungry
                   item={{
                       subtitle: 'Дата рождения',
                       name: user.birth_date,
                   }}
               />
               <ItemDetailsForHungry
                   item={{
                       subtitle: 'Номер билета',
                       name: user.serial + ' ' + user.number,
                   }}
               />
               <ItemDetailsForHungry
                   item={{
                       subtitle: 'Кем выдан',
                       name: user.issue_body,
                   }}
               />
               <ItemDetailsForHungry
                   item={{
                       subtitle: 'Дата выдачи',
                       name: user.issue_date,
                   }}
               />
               <ItemDetailsForHungry
                   item={{
                       subtitle: 'Статус',
                       name: user.status,
                       active: true,
                   }}
               />
               <ItemDetailsForHungry
                  item={{
                      subtitle: 'Местоположение',
                      name: permission ? 'Разрешено охотиться' : 'Запрещено охотиться',
                  }}
                  last
               />
           </ContainerList>
       );
    }
}
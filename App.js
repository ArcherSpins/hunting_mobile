import React from 'react';
import { View, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {
  MainPage,
  DetailsPage,
  InfoPage,
  ViolationPage,
  AnimalPage,
  MapPage,
  HuntingPage,
  DetailMap,
  AnimalDetailPage,
  FormPage,
  ViolationDetail,
  PermissionDetail,
  UploadPage,
  RegulationHunt,
  HunterBilet,
  PermissionHunter,
  Responsibility,
  HuntingPeriod,
  CreatePermissions,
  DefaultPage,
  PaymentPageCheck,
  SettingServer,
  SettingSeriaNumber,
  SettignsPage
} from './src/pages';
import { Loading } from './src/components';
import reducer from './src/redux/reducers';

const AppNavigator = createAppContainer(createStackNavigator(
  {
      DEFAULT_PAGE: {
        screen: DefaultPage,
        navigationOptions: {
          header: null,
        },
      },
      SETTING_PASSPORT: {
        screen: SettingSeriaNumber,
        navigationOptions: {
          header: null,
        },
      },
      FORM_PAGE: {
        screen: FormPage,
        navigationOptions: {
          header: null,
        },
      },
      SETTING_SERVER: {
        screen: SettingServer,
        navigationOptions: {
          header: null,
        },
      },
      HOME: {
        screen: MainPage,
        navigationOptions: {
            header: null,
        },
      },
      PAYMENT_CHECK: {
        screen: PaymentPageCheck,
        navigationOptions: {
            header: null,
        },
      },
      DETAILS: {
        screen: DetailsPage, 
        navigationOptions: {
          header: null,
        },
      },
      INFO: {
        screen: InfoPage,
        navigationOptions: {
          header: null,
        },
      },
      CREATE_PERMISSIONS: {
        screen: CreatePermissions,
        navigationOptions: {
          header: null,
        },
      },
      VIOLATION: {
        screen: ViolationPage,
        navigationOptions: {
          header: null,
        },
      },
      ANIMAL: {
        screen: AnimalPage,
        navigationOptions: {
          header: null,
        },
      },
      MAP: {
        screen: MapPage,
        navigationOptions: {
          header: null,
        },
      },
      HUNTING: {
        screen: HuntingPage,
        navigationOptions: {
          header: null,
        },
      },
      DETAILMAP: {
        screen: DetailMap,
        navigationOptions: {
          header: null,
        },
      },
      DETAIL_ANIMAL: {
        screen: AnimalDetailPage,
        navigationOptions: {
          header: null,
        },
      },
      VIOLATION_DETAIL: {
        screen: ViolationDetail,
        navigationOptions: {
          header: null,
        },
      },
      PERMISSION_DETAIL: {
        screen: PermissionDetail,
        navigationOptions: {
          header: null,
        },
      },
      REGULATION_HUNT: {
        screen: RegulationHunt,
        navigationOptions: {
          header: null,
        },
      },
      HUNTER_BILET: {
        screen: HunterBilet,
        navigationOptions: {
          header: null,
        },
      },
      PERMISSION_HUNTER: {
        screen: PermissionHunter,
        navigationOptions: {
          header: null,
        },
      },
      RESPONSIBILITY: {
        screen: Responsibility,
        navigationOptions: {
          header: null,
        },
      },
      SETTINGS: {
        screen: SettignsPage,
        navigationOptions: {
          header: null,
        },
      },
      HUNTING_PERIOD: {
        screen: HuntingPeriod,
        navigationOptions: {
          header: null,
        },
      }
  },
  {
      initialRouteName: "DEFAULT_PAGE"
  }
));

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default class App extends React.Component {



  render() {


    return(
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

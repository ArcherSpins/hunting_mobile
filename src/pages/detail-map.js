import React from 'react';
import { ImageBackground, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Toast } from 'native-base';
import { HeaderDetails, FooterTabs, Loading, ItemDetailsForHungry } from '../components';
import { ContainerPage, Content, CardMapDetail, CardText } from './styled';
import { setDealHuntingDataAction } from '../redux/actions';
import { url } from '../url';

const w = Dimensions.get('window').width;

class DetailMap extends React.Component {

    componentDidMount = () => {
        const { item } = this.props.navigation.state.params;
        const { setDealHuntingDataAction } = this.props;

        fetch(`${url}/api/v1/HuntingFarm/${item.hunting_farm_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setDealHuntingDataAction(data))
        .catch(error => {
            Toast.show({
                text: error,
                type: 'danger'
            })
        })
    }

    render() {
        const { navigation, hunting_description, hunting_farm_area } = this.props;
        const { item } = navigation.state.params;

        return(
            <ContainerPage>
                <HeaderDetails searchIcon onGoBack={() => navigation.goBack()} title={item.title || item.hunting_farm_name} />

                <StatusBar backgroundColor="#36404a" barStyle="light-content" />
                <ImageBackground source={require('../img/login-bg.jpg')} style={{width: w, flex: 1,}}>
                    <Content style={{flex: 1}}>
                        <CardMapDetail style={{marginBottom: 30}}>
                            <CardText>
                                { hunting_description }
                            </CardText>
                            <ItemDetailsForHungry item={{title: hunting_farm_area, subtitle: 'Площадь'}} />
                            <ItemDetailsForHungry item={{title: hunting_farm_area, subtitle: 'Площадь'}} />
                            <ItemDetailsForHungry item={{title: hunting_farm_area, subtitle: 'Площадь'}} />

                            
                            <ItemDetailsForHungry arrow path={'/api/v1/HuntingFarm'} navigation={navigation} item={{title: 'Карта', path: 'MAP', last: true, id: item.hunting_farm_id}} />
                            {/* {
                                data.map((item, i) => (
                                    <ItemDetailsForHungry size={hunting_farm_area} navigation={navigation} key={item.id || i} item={item} />
                                ))
                            }  */}
                        </CardMapDetail>
                    </Content>
                </ImageBackground>
                <FooterTabs navigation={navigation} />
            </ContainerPage>
        )
    }
}

const mapStateToProps = state => {
    return {
        hunting_farm_area: state.hunting.hunting_farm_area,
        hunting_description: state.hunting.hunting_description,
    }
}

const mapDispatchToProps = {
    setDealHuntingDataAction
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailMap);
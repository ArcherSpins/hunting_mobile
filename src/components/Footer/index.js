import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import EntIcon from 'react-native-vector-icons/Entypo';
import FeIcon from 'react-native-vector-icons/Feather';
import { SvgXml } from 'react-native-svg';
import { Footer, FooterTab, Button } from 'native-base';

const ButtonResoursesIcon = `<svg width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M18.572 17.01c.589 2.667-2.346 3.245-3.638 2.898-1.293-.347-3.929-.405-3.929-.405s-2.644.058-3.936.405c-1.293.35-4.23-.231-3.643-2.898.586-2.667 3.171-2.551 3.88-6.146.706-3.595 3.701-3.364 3.701-3.364s2.989-.231 3.695 3.364c.703 3.595 3.283 3.48 3.87 6.146zm-4.855-9.743c1.59.453 3.347-.786 3.926-2.768.58-1.98-.239-3.952-1.83-4.406-1.59-.453-3.347.786-3.926 2.768-.579 1.98.24 3.952 1.83 4.406zm6.592-.721c-1.532-.618-3.413.429-4.202 2.338-.79 1.91-.189 3.957 1.343 4.572 1.532.615 3.414-.43 4.203-2.339.789-1.91.188-3.954-1.344-4.571zm-12.028.72c1.59-.453 2.409-2.425 1.83-4.405C9.53.881 7.773-.357 6.184.096 4.596.549 3.775 2.52 4.354 4.5c.58 1.98 2.336 3.219 3.927 2.766zm-3.731 6.19c1.532-.617 2.133-2.664 1.344-4.572-.79-1.907-2.67-2.956-4.203-2.338C.16 7.163-.442 9.21.347 11.117c.79 1.91 2.671 2.956 4.203 2.339z" fill="#fff" fill-rule="nonzero"/></svg>`;
const ButtonMapIcon = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.444 0l-.177.033-5.934 2.3L6.667 0 .4 2.111a.56.56 0 0 0-.4.533v16.8A.55.55 0 0 0 .556 20l.177-.033 5.934-2.3L13.333 20l6.267-2.111a.56.56 0 0 0 .4-.533V.556A.55.55 0 0 0 19.444 0zm-6.11 17.778l-6.667-2.345V2.223l6.666 2.344v13.21z" fill="#fff" fill-rule="nonzero"/></svg>`;

const FooterTabs = ({ navigation }) => {
    return (
        <Footer style={{backgroundColor: '#36404a'}}>
            <FooterTab style={{backgroundColor: '#36404a'}}>
                <Button onPress={() => navigation.navigate('HOME')}>
                    <EntIcon name="home" style={{color: '#fff', fontSize: 27}} />
                </Button>
                <Button onPress={() => navigation.navigate('ANIMAL')}>
                    <SvgXml xml={ButtonResoursesIcon} />
                </Button>
                <Button onPress={() => navigation.navigate('HUNTING', ({title: 'Охотничьи ресурсы'}))}>
                    <SvgXml xml={ButtonMapIcon} />
                </Button>
                <Button onPress={() => navigation.navigate('INFO', ({title: 'Информация'}))}>
                    <Icon name="exclamationcircle" style={{color: '#fff', fontSize: 27}} />
                </Button>
            </FooterTab>
        </Footer>
    );
}

export { FooterTabs }
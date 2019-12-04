import React from 'react';
import styled from 'styled-components';
import { WebView  } from 'react-native-webview';
import { HeaderDetails, Loading } from '..';

const Container = styled.View`
    flex: 1;
`;

const INJECTED_JAVASCRIPT = `(function() {
    window.alert(JSON.stringify(window.location));
})();`;

const runFirst = `
    true;
`;
//.match(/\orderId=.+&/)[0].replace(/.+=/, '').replace('&', '')
export default ({ goBack, title, url }) => (
    <Container>
        <HeaderDetails onGoBack={() => goBack()} title={title} />
        <WebView
            source={{ uri: url }}
            style={{ flex: 1 }}
            injectJavaScript={INJECTED_JAVASCRIPT}
            renderLoading={() => <p style={{ flex: 1 }}>Loading..</p>}
            onShouldStartLoadWithRequest={request => {
                console.log(request)
                if (request.url.match(/success=.+?&/)[0].replace('&', '').replace('success=', '') === 'false') {
                    goBack();
                    return false;
                }

                goBack(true);

                return true;
            }}
            injectedJavaScript={runFirst}
        />
    </Container>
)




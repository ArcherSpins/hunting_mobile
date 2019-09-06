import React from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';

const Uploading = ({ visible, loading }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
    >
        <View style={styles.modal}>
            <View style={styles.modal_component}>
                <Text>Hello World!</Text>
                <View style={{height: 3, backgroundColor: 'blue', width: (loading.stage/loading.length) * 100 + '%'}}></View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modal_component: {
        backgroundColor: 'white',
        padding: 20,
        width: '70%'
    }
});

export { Uploading };

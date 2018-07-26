import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from 'prop-types';

import {colors} from '../config/colors'

export class PopMessage extends Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
        message: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    }

    render() {
        return (
            <Animatable.View animation={"bounceIn"}style={styles.messageContainer}>
                <View style={styles.messageContent}>
                    <Text style={styles.textMessage}>{this.props.message}</Text>
                </View>
                <View style={styles.buttonCloseContent}>
                    <View style={styles.buttonClickArea}>
                        <Icon.Button
                            name={"close"}
                            color={'white'}
                            size={16}
                            backgroundColor={"transparent"}
                            onPress={()=> this.props.onClose()}
                        />
                    </View>
                </View>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        alignItems: 'center',
        backgroundColor: colors.red,
        borderRadius: 10,
        bottom: 10,
        flexDirection: 'row',
        margin: 10,
        paddingLeft: 10,
        paddingRight: 0,
        paddingVertical: 10,
        position: 'absolute',
    },
    messageContent: {
        flexDirection: 'row',
        flex: 1,
    },
    buttonClickArea: {
        width: 45,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonCloseContent: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textMessage: {
        color: 'white',
        fontSize: 12,
    }
});
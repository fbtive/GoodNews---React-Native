import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {colors} from "../config/colors";

export default class SourceItem extends Component {
    constructor(props) {
        super(props);
    }

    render(){

        return (
            <Animatable.View animation={"flipInY"} iterationCount={1} >
                <View style={styles.content}>
                    <Text style={styles.title}>{this.props.item.name}</Text>
                    <View style={styles.contentDescription}>
                        <Text style={styles.description}>
                            {this.props.item.description}
                        </Text>
                    </View>
                </View>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        borderLeftWidth: 7,
        borderLeftColor: colors.primary,
        borderRightWidth: 1,
        borderRightColor: colors.border,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        margin:10,
        paddingVertical: 10,
        paddingHorizontal: 15
    },

    contentDescription: {
        flexDirection: 'row'
    },

    description: {
        color: colors.grayText,
        fontSize: 12,
        flexWrap: 'wrap'
    },

    title: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700'
    }
})
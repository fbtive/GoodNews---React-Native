import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

import {colors} from "../config/colors";

export default class NewsItem extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let image = <Image source={require('../assets/images/picture.png')}
                           style={[styles.image]}/>;
        if(this.props.item.urlToImage){
            image = <Image source={{uri: this.props.item.urlToImage}}
                           style={[styles.image]}/>
        }

        return (
            <Animatable.View animation={"bounceInUp"} iterationCount={1} >
                <View style={styles.content}>
                    {image}
                    <View style={styles.newsContent}>
                        <Text style={styles.title} numberOfLines={3}>{this.props.item.title}</Text>
                        <Text style={styles.description} ellipsizeMode={'tail'} numberOfLines={1}>
                            {this.props.item.description}
                        </Text>
                        <View style={styles.dateContent}>
                            <Text style={styles.date}>
                                {moment(this.props.item.publishedAt).format("lll")}
                            </Text>
                        </View>
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
        borderLeftColor: colors.secondary,
        borderRightWidth: 1,
        borderRightColor: colors.border,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        flexDirection: 'row',
        margin:10,
    },

    dateContent: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    date: {
        color: colors.grayText,
        fontSize: 14
    },

    description: {
        color: colors.grayText,
        fontSize: 12,
        flexWrap: 'wrap'
    },

    image: {
        width: 100,
        height: 100
    },

    newsContent: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1
    },

    title: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '700'
    },
})
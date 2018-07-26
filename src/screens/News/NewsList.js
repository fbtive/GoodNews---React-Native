import React, {Component} from 'react';
import {Linking, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {NewsAPI} from '../../API/NewsAPI';
import {colors} from "../../config/colors";
import {PopMessage} from "../../components/PopMessage";
import NewsItem from '../../components/NewsItem';


export default class NewsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            newsList: [],
            news: {
                error: false,
                message: 'Oops'
            },

            //form
            search: ''
        }

        this.getNewsBySource = _.debounce(this.getNewsBySource, 1000);
    }

    static navigationOptions = ({navigation}) =>{
        return {
            title: navigation.state.params.item.name,
            headerBackTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white'
            },
            headerStyle: {
                backgroundColor: colors.primaryLight
            }
        }
    }

    componentDidMount() {
        this.getNewsBySource();
    }

    async getNewsBySource() {
        this.setState({isFetching: true});
        let data = await NewsAPI.getEveryNewsOnSource(this.props.navigation.state.params.item.id, this.state.search)
            .then(data => {
                console.debug("data articles : " + JSON.stringify(data.articles));
                this.setState({
                    isFetching: false,
                    newsList: data.articles,
                    news: {
                        error: false,
                        message: 'Oops',
                    }
                })
            }).catch(error => {
                console.debug("Error Get News in +"+this.props.navigation.state.params.item.id+": "+ error);
                this.setState({
                    isFetching: false,
                    news: {
                        error: true,
                        message: NewsAPI.getErrorMessage(error)
                    }
                })
            })
    }

    changeSearch(text) {
        this.setState({
            search: text
        });
        this.getNewsBySource();
    }

    closePopMessage() {
        this.setState({
            news: {
                error: false,
                message: 'Oops'
            }
        })
    }

    openURL(URL) {
        Linking.canOpenURL(URL).then(supported => {
            if (!supported) {
                return Promise.reject('No Supported Browser to Open URL');
            } else {
                return Linking.openURL(URL);
            }
        }).catch(err => {
            this.setState({
                news:{
                    error: true,
                    message: err
                }
            })
        });
    }

    render() {

        let errorMessage;
        if(this.state.news.error) {
            errorMessage = <PopMessage message={this.state.news.message}
                                       onClose={() => {this.closePopMessage()}}/>
        }

        return (
            <View style={styles.container}>
                <View style={styles.formGroup}>
                    <TextInput
                        placeholder={"Search in "+this.props.navigation.state.params.item.name}
                        placeholderTextColor={colors.grayText}
                        value={this.state.search}
                        onChangeText={(text) => this.changeSearch(text)}
                        style={styles.searchInput}
                    />
                    <View style={styles.icon}>
                        <Icon.Button name={"search"} size={20} color={colors.text} backgroundColor={"transparent"}/>
                    </View>
                </View>
                <FlatList
                    data={this.state.newsList}
                    initialNumToRender={10}
                    onEndReachedThreshold={0.35}
                    keyExtractor={(item, index) => "article"+index}
                    onRefresh={() => this.getNewsBySource()}
                    refreshing={this.state.isFetching}
                    renderItem={({item, separators}) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {this.openURL(item.url)}}
                            >
                                <NewsItem item={item}/>
                            </TouchableOpacity>
                        )
                    }}
                />
                {errorMessage}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    formGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.grayText,
        borderBottomWidth: 1,
    },
    searchInput: {
        flex: 1,
        marginHorizontal: 10,
    },
    icon: {
        width: 45
    }
})
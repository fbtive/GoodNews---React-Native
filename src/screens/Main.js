import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {NewsAPI} from '../API/NewsAPI';
import {colors} from '../config/colors';
import SourceItem from '../components/SourceItem';
import {PopMessage} from '../components/PopMessage';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            sources: {
                error: false,
                message: 'Oops'
            },
            sourceList: []
        }
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Welcome to GoodNews',
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: colors.primaryLight
        }
    })

    componentDidMount() {
        this.requestSources();
    }

    async requestSources() {
        this.setState({isFetching: true});
        let data = await NewsAPI.getAllSources().then(data => {
            if(data.status == 'ok'){
                this.setState({
                    isFetching: false,
                    sourceList: data.sources,
                    sources: {
                        error: false,
                        message: 'Ooops'
                    }
                });
            }
        }).catch(error => {
            console.debug("Error Fetch Sources" + error);
            this.setState({
                isFetching: false,
                sources: {
                    error: true,
                    message: NewsAPI.getErrorMessage(error)+" Drag the top scroll to re-request"
                }
            });
        })
    }

    navigateNews(item){
        this.props.navigation.navigate({routeName: 'NewsList', params: {item: item}});
    }

    closePopMessage() {
        this.setState({
            sources: {
                error: false,
                message: 'Oops',
            }
        })
    }

    render() {

        let errorMessage;
        if(this.state.sources.error) {
            errorMessage = <PopMessage message={this.state.sources.message}
                                     onClose={() => {this.closePopMessage()}}/>
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.sourceList}
                    initialNumToRender={10}
                    onEndReachedThreshold={0.35}
                    keyExtractor={(item, index) => item.id}
                    onRefresh={() => this.requestSources()}
                    refreshing={this.state.isFetching}
                    renderItem={({item, separators}) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {this.navigateNews(item)}}
                            >
                                <SourceItem item={item}/>
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
    }
})
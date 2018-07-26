import {createStackNavigator} from 'react-navigation';

import Main from '../screens/Main';
import NewsList from '../screens/News/NewsList';

export default createStackNavigator({
    Main: {
        screen: Main
    },
    NewsList: {
        screen: NewsList
    }
})
import {createStackNavigator,createAppContainer} from 'react-navigation';
import User from '../component/user';
import Userdetails from '../component/userDetails';
import UserPost from '../component/userPost';

const appNavigation=createStackNavigator({
    user:User,
    userdetails:Userdetails,
    userpost:UserPost
},
    {
        initialRouteName:'user'
    },
);

export default createAppContainer(appNavigation)
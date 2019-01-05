
import React from 'react'
import { Text,Button, Animated, Easing,Image, TouchableOpacity } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { fromLeft, zoomIn, zoomOut,flipY,flipX,fromTop,fadeIn } from 'react-navigation-transitions'
import Home from '../home';
import About from '../about';
import Register from '../register';
import Login from '../login';
import Logout from '../logout';
import AddStudent from '../AddStudent';
import EditData from '../EditData';


// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
})

// drawer stack
const DrawerStack = DrawerNavigator({
    home: { screen: Home,  navigationOptions: {
            title: 'Home Page', }},
    addstudent:{screen:AddStudent,navigationOptions: {
    title: 'Add Student Data', }},
        editdata:{screen:EditData,navigationOptions: {
                title: 'Student Edit Data', }},
    about: { screen: About,navigationOptions: {
            title: 'About', } },
    logout:{screen:Logout}
}
,{
    gesturesEnabled: false
},
    {
        transitionConfig:()=>fromTop(3000)
    })

const DrawerNavigation = StackNavigator({
    DrawerStack: { screen: DrawerStack },

}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: 'white'},
        gesturesEnabled: false,

    headerLeft: <TouchableOpacity onPress={() => {
            navigation.navigate('DrawerOpen')
        }}><Image source={require('../../images/menu.png')} style={{height:35,width:30}}/></TouchableOpacity>
    }
    )
})

// login stack

const LoginStack = StackNavigator({
    login: { screen: Login,navigationOptions: {
            title: 'Login Page', } },
    register: { screen: Register,navigationOptions: {
            title: 'Register Page', } },
},
    {
        transitionConfig: ()=>fromTop(2000)
    }
    ,{
    headerMode: 'float',
    navigationOptions: {
        headerStyle: {backgroundColor: 'white'},
        title: 'Sharp Note'
    },
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerNavigation }
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack'
})

export default PrimaryNav



/*Animation*/


const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];

    // Custom transitions go there
    if (prevScene
        && prevScene.route.routeName === 'home'
        && nextScene.route.routeName === 'about') {
        return zoomIn();
    } else if (prevScene
        && prevScene.route.routeName === 'login'
        && nextScene.route.routeName === 'register') {
        return flipY(3000);
    }
    return fromLeft();
}

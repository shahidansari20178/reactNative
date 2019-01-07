import React, {Component} from 'react';
import {Platform, StyleSheet,Dimensions, Text, View,TouchableHighlight,Button,Image,TouchableOpacity,ImageBackground,PixelRatio} from 'react-native';
import  t from 'tcomb-form-native';
import FloatingLabel from 'react-native-floating-label';
var _ = require('lodash');
const Form = t.form.Form;

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const Email = t.subtype(t.Str, (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
});
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.borderRadius = 15;
stylesheet.textbox.normal.color = "#ffff";

const User = t.struct({

    email: t.String,
    password: t.String,

});
const options = {
    fields: {
        password: {
            type: 'password',
            placeholder: 'Password',
            error: "enter password",
            secureTextEntry:true,
            factory: FloatingLabel,
            stylesheet: stylesheet,
            icon:{}
        },
        email: {
            placeholder: 'abc@gmail.com',
            error: 'Insert a valid email',
            factory: FloatingLabel,
            stylesheet: stylesheet
        },
    }
};

export default class Login extends Component<Props> {


    constructor(props)
    {
        super(props);
        this.state={
            data:[],
            name:'',
            job:'',
            msg:''
        }
    }
    componentDidMount=()=>
    {
       // debugger

    }
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
       // alert("username :"+value.username+" password :"+value.password)
        //this.setState({name:value.username,job:value.password})

        if(value!==null)
        {
            this.registerApi(value);
        }
    }
    // registerApi=(value)=>
    // {
    //    // debugger
    //     //alert(value.username,value.password);
    //
    //     fetch(`http://localhost:3000/login?email=${value.username}&password=${value.password}`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     }).then((response) => response.json())
    //         .then((responseJson) => {
    //             //return responseJson;
    //            // debugger
    //             //const data=JSON.stringify(responseJson)
    //          //   alert(data)
    //             if(responseJson.length >0 )
    //             {
    //                 //this.setState({data:responseJson});
    //                 this.props.navigation.navigate('DrawerStack')
    //
    //             }
    //             else
    //             {
    //                 this.setState({msg:"Wrong Credentials"});
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //
    // }

    render() {
            //console.log('--------',this.state.data)
     //   const {token}=this.state.data;



        return (
            <ImageBackground source={require('../images/blurBg.png')}  style={{width: '100%', height: '100%'}}>
            <View style={styles.container} >

                    <View style={{alignItems:'center',width:'100%',justifyContent:'flex-end',flex:1}}>
                        {/*<Text style={{fontSize:25}}>Login</Text>*/}
                        <Image source={require('../images/react_logo.png')} />
                        <Text style={{fontSize:30,color:'#ffff'}}>React Native</Text>
                    </View>
                <View style={{flex: 1,width:SCREEN_WIDTH-20,marginRight: 10,marginLeft: 10}}>
                <Form

                    ref={c => this._form = c} // assign a ref
                    type={User}
                    options={options}
                />
                    <TouchableOpacity  onPress={this.handleSubmit}>
                    <Text style={styles.buttonText}>
                        Log In
                    </Text>
                    </TouchableOpacity>

                    <View style={{alignItems:'center'}}>
                    <Text
                        style={[styles.linky]}
                        onPress={() => this.props.navigation.navigate('register')} >
                        I haven't Account ??
                    </Text>
                    </View>


                    {/*<Text*/}
                    {/*style={styles.linky}*/}
                    {/*onPress={() => this.props.navigation.navigate('drawerStack')} >*/}
                    {/*Pretend we logged in 1*/}
                {/*</Text>*/}
                    </View>
            </View>
            </ImageBackground>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        color : '#ffff',
        //style={styles.backgroundImage}
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    linky: {
        color: '#ffff',
        paddingTop: 10,
        fontSize: 20,
        alignItems: 'center',
        justifyContent:'center'
    }
});

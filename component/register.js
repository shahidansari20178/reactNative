import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Button,
    ScrollView,
    ImageBackground,
    Dimensions,
    PixelRatio,
    Image
} from 'react-native';
import  t from 'tcomb-form-native';
import FloatingLabel from 'react-native-floating-label';
var Form = t.form.Form;
var _ = require('lodash');
var Gender = t.enums({
    M: 'Male',
    F: 'Female'
});
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.borderRadius = 15;



const Email = t.subtype(t.Str, (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
});
const Mobile = t.subtype(t.Str, (mobile) => {
    const reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return reg.test(mobile);
});
const age = t.subtype(t.Str, (age) => {
    const reg = /^([1-9][0-9]?){0,1}$/;
    return reg.test(age);
});




/*this.samePassword = t.refinement(t.String, (s) => {
    return s == this.state.person.user_password;
})*/

const User = t.struct({
    name:t.String,
    gender:Gender,
    age:age,
    mobile:Mobile,
    email: Email,
    password: t.String,
    confirmpassword:t.String,
});
const options = {
    fields: {
        name: {
            placeholder: 'Name',
            error: 'Insert a valid Name',
            factory: FloatingLabel,
            stylesheet: stylesheet,
        },
        age:{
            placeholder: '20',
            error: 'Please enter Age',
            factory: FloatingLabel,
            stylesheet: stylesheet,
        },

        mobile:
            {
                placeholder: 'e.g: 1234567890',
                error: 'please enter mobile number',
                factory: FloatingLabel,
                stylesheet: stylesheet,
            },
        email: {
            placeholder: 'e.g: abc@gmail.com',
            error: 'Insert a valid email',
            factory: FloatingLabel,
            stylesheet: stylesheet,
        },
        password: {
            type: 'password',
            placeholder: 'Password',
            error: "enter password",
            secureTextEntry: true,
            factory: FloatingLabel,
            stylesheet: stylesheet,
        },
        confirmpassword: {
            type: 'password',
            placeholder: 'Confirm Password',
            error: "Password and Confirm are not match",
            secureTextEntry: true,
            factory: FloatingLabel,
            stylesheet: stylesheet,
        },


    }
} // optional rendering options (see documentation)

export default class Login extends Component<Props> {

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        alert("username :"+value+" password :"+value.password)
     //   this.registerApi(value)
        /*if(value!==null)
        {
            alert("name :"+value.bdate.toLocaleString())
        }*/
    }
    /*onChange(person) {
        this.setState({ person });
        if(person.reenter_password != null && person.reenter_password != "") {
            this.validate = this.refs.form.getValue();
        }
    }*/

    // registerApi=(value)=>
    // {
    //  ///   debugger;
    //     fetch('http://localhost:3000/StudentDetails', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             name: value.name,
    //             email: value.email,
    //             password: value.password,
    //             gender: value.gender,
    //             bdate: value.bdate,
    //             mobile: value.mobile
    //
    //         }),
    //     }).then((response) => response.json())
    //         .then((responseJson) => {
    //             //return responseJson;
    //             this.setState({data:responseJson});
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //
    // }
    render() {
        return (
            <ScrollView >
                <ImageBackground source={require('../images/blurBg.png')}  style={{width: '100%', height: '100%'}}>
                    <View style={styles.container} >

                        <View style={{alignItems:'center',backgroundColor:"pink",width:'100%',justifyContent:'flex-end'}}>
                            {/*<Text style={{fontSize:25}}>Login</Text>*/}
                            <Image source={require('../images/user1.png')} />

                        </View>
                        <View style={{flex: 1,width:SCREEN_WIDTH-20,marginRight: 10,marginLeft: 10,color:'#ffff'}}>
                <Form
                    ref={c => this._form = c} // assign a ref
                    type={User}
                    options={options}
                    /*onChange={(v) => this.onChange(v)}*/
                    style={styles.container}
                />
                <Button
                    title="Sign Up!"
                    onPress={this.handleSubmit}
                />
                <View style={{alignItems:'center'}}>
                    <View style={{alignItems:'center'}}>
                <Text
                    style={styles.linky}
                    onPress={() => this.props.navigation.navigate('login')} >
                    I have already Account ??
                </Text>
                    </View>
                </View>
                        </View>
                </View>
                </ImageBackground>


            </ScrollView>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        color : '#ffff',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },

    linky: {
        color: '#FFFF',
        paddingTop: 10,
        fontSize: 20
    }
});

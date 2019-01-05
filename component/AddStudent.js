import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableHighlight,Button,ScrollView} from 'react-native';
import  t from 'tcomb-form-native';
import FloatingLabel from 'react-native-floating-label';
var Form = t.form.Form;
var Gender = t.enums({
    M: 'Male',
    F: 'Female'
});
// here we are: define your domain model
const Email = t.subtype(t.Str, (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
});
const Mobile = t.subtype(t.Str, (mobile) => {
    const reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return reg.test(mobile);
});

/*this.samePassword = t.refinement(t.String, (s) => {
    return s == this.state.person.user_password;
})*/

const User = t.struct({
    name:t.String,
    email: Email,
    password: t.String,
    cpassword:t.String,
    gender:Gender,
    bdate:t.Date,
    mobile:Mobile,
    terms: t.Boolean
});
const options = {
    fields: {
        password: {
            type: 'password',
            placeholder: 'Password',
            error: "enter password",
            secureTextEntry: true,
            factory: FloatingLabel
        },
        cpassword: {
            type: 'password',
            placeholder: 'Confirm Password',
            error: "Password didn't Match",
            secureTextEntry: true,
            factory: FloatingLabel
        },
        bdate:{
            mode:'date'
        },
        name: {
            placeholder: 'Krupali dudhat',
            error: 'Insert a valid username',
            factory: FloatingLabel
        },
        email: {
            placeholder: 'e.g: abc@gmail.com',
            error: 'Insert a valid email',
            factory: FloatingLabel
        },
        mobile:
            {
                placeholder: 'e.g: 8980939668',
                error: 'please enter mobile number',
                factory: FloatingLabel
            },
        terms: {
            label: 'Applicable terms'
        }
    }
} // optional rendering options (see documentation)

export default class AddStudent extends Component<Props> {
    static navigationOptions=({navigation})=> {
        return ({
            title: "Add Student Data"
        })
    }
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        //alert("username :"+value+" password :"+value.password)
        this.registerApi(value)
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

    registerApi=(value)=>
    {
        ///   debugger;
        fetch('http://localhost:3000/StudentDetails', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: value.name,
                email: value.email,
                password: value.password,
                gender: value.gender,
                bdate: value.bdate,
                mobile: value.mobile

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                //return responseJson;
                this.setState({data:responseJson});
               // this.props.navigation.navigate('home')
            })
            .catch((error) => {
                console.error(error);
            });

    }
    render() {
        return (
            <ScrollView >
                <View style={styles.container}>
                    <View style={{alignItems:'center'}}>
                        <Text
                            style={styles.linky}
                            onPress={() => this.props.navigation.navigate('home')} >
                            Show Student List
                        </Text>
                    </View>
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

                    </View>
                </View>
                {/*<Text
                    style={styles.linky}
                    onPress={() => this.props.navigation.navigate('drawerStack')} >
                    Pretend we logged in 1
                </Text>*/}
            </ScrollView>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',

        padding: 20,
        backgroundColor: '#ffffff',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    linky: {
        color: 'blue',
        paddingTop: 10,
        fontSize: 20
    }
});

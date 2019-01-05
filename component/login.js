import React, {Component} from 'react';
import {Platform, StyleSheet,Dimensions,PixelRatio, Text, View,TouchableHighlight,Button,Image,TouchableOpacity} from 'react-native';
import  t from 'tcomb-form-native';
import FloatingLabel from 'react-native-floating-label';
const Form = t.form.Form;


// here we are: define your domain model
const Email = t.subtype(t.Str, (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
});
const User = t.struct({

    username: t.String,
    password: t.String,
    terms: t.Boolean
});
const options = {
    fields: {
        password: {
            type: 'password',
            placeholder: 'Password',
            error: "enter password",
            secureTextEntry:true,
            factory: FloatingLabel

        },
        username: {
            placeholder: 'e.g: abc@gmail.com',
            error: 'Insert a valid email',
            factory: FloatingLabel
        },
        terms: {
            label:'Applicable terms'
        }
    }
}; // optional rendering options (see documentation)

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
        this.registerApi(value);
        /*if(value!==null)
        {
            if(value.username==="Shahid@gmail.com" && value.password==="123")
            {
                this.props.navigation.navigate('DrawerStack')
            }
            else
            {
                this.setState({ value: null });;
            }
        }*/
    }
    registerApi=(value)=>
    {
       // debugger
        //alert(value.username,value.password);

        fetch(`http://localhost:3000/login?email=${value.username}&password=${value.password}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                //return responseJson;
               // debugger
                //const data=JSON.stringify(responseJson)
             //   alert(data)
                if(responseJson.length >0 )
                {
                    //this.setState({data:responseJson});
                    this.props.navigation.navigate('DrawerStack')

                }
                else
                {
                    this.setState({msg:"Wrong Credentials"});
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
            //console.log('--------',this.state.data)
     //   const {token}=this.state.data;



        return (
            <View style={styles.container}  >
            <View style={{alignItems:'center',backgroundColor:'lightblue',borderStyle:'solid',borderRadius: 10,margin:10,flex:1,shadow:0.9}}>
                <View style={{alignItems:'center',flex: 1,width:'100%'}}>
                    {/*<Text style={{fontSize:25}}>Login</Text>*/}
                    <Image source={require('../images/user.png')} style={{height:120,width:120}}/>
                    <Text></Text>
                </View>
                <View style={{backgroundColor:'#fff',flex:3,width:'100%',}}>
                <Form

                    ref={c => this._form = c} // assign a ref
                    type={User}
                    options={options}
                />
                    <Button
                        title="Log In"
                        onPress={this.handleSubmit}
                    />

                    <Text style={{color:'red',fontSize:15}}>{this.state.msg }{this.state.data.name}</Text>
                    {/*<Text
                        style={[styles.linky,{alignItems:'center'}]}
                        onPress={() => this.props.navigation.navigate('register')} >
                        I haven't Account ??
                    </Text>*/}

                    {/*<TouchableOpacity style={{alignItems:'center'}} onPress={this.handleSubmit}>
                        <Image source={require('../images/login.jpeg')} style={{height:70,width:80}}/>
                    </TouchableOpacity>*/}

                </View>


                {/*<Text
                    style={styles.linky}
                    onPress={() => this.props.navigation.navigate('drawerStack')} >
                    Pretend we logged in 1
                </Text>*/}
            </View>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
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
        fontSize: 20,
        alignItems: 'center'
    }
});

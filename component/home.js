/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, Platform, StyleSheet, Text, View,TouchableOpacity,Image,Alert} from 'react-native';
import  axios from 'axios';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class home extends Component<Props> {

static navigationOptions=({navigation})=>
{
    return({
        title:"Home"
    })
}
    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            userList: []
        }
    }

    componentDidMount() {
       // debugger
        this.makeAPICall();
        //alert(this.state.userList)
    }


    keyExtractor = (item) => {
        return item.id + "";
    };

    renderSeparator = ({leadingItem, section})=>{
        return <View style={{height:10}}/>;
    };

    renderEmpty = () => {
        return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:15}}>
                {"No data found"}
            </Text>
        </View>
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.makeAPICall();

    };

    makeAPICall = () => {
       // debugger;
        fetch('http://localhost:3000/StudentDetails')
            .then((response) => response.json())
            .then((responseJson) => {
//debugger
                //alert(JSON.parse(responseJson))
                this.setState({
                    userList: responseJson,
                    refreshing: false
                });
            })
            .catch((error) => {
             //   debugger
                alert(error);
            });
    };

    deleteCall=(id)=>
    {
        fetch(`http://localhost:3000/StudentDetails/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.makeAPICall();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    EditCall=(id)=>
    {
        //alert(JSON.stringify(id))
        this.props.navigation.navigate('editdata',{edit:id})
    }
    confirmBox=(id,action)=>
    {
        if(action==="edit")
        {
            Alert.alert(

                'Edit',
                'Are you sure you want to Edit ??',
                [

                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => this.EditCall(id)},
                ],
                { cancelable: false }
            )
        }
        else
        {
            Alert.alert(

                'Delete',
                'Are you sure you want to delete ??',
                [

                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => this.deleteCall(id)},
                ],
                { cancelable: false }
            )
        }
    }

    renderItem = ({item, index}) => {
        //debugger
        return(
            <View key={index} style={{borderRadius:5,padding:10, borderWidth:1, borderColor:'#bdbdbd',backgroundColor:'lightblue', marginLeft:10, marginRight:10}}>

                <Text style={{fontSize: 15,alignItems: 'center'}}>{"Name :"+item.name}</Text>
                <Text style={{fontSize: 15,color:'blue'}}>{"Email :"+item.email}</Text>
                <Text style={{fontSize: 15,alignItems: 'center'}}>{"Gender :"+item.gender}</Text>
                <Text style={{fontSize: 15,alignItems: 'center'}}>{"Birth Date :"+item.bdate}</Text>
                <Text style={{fontSize: 15,alignItems: 'center'}}>{"Mobile :"+item.mobile}</Text>
                <TouchableOpacity style={{alignSelf:'flex-end'}} onLongPress={()=>this.confirmBox(item.id,"delete")}>
                    <Image style={ {height:30,width:30}} source={require('../images/delete.png')}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>this.confirmBox(item,"edit")}>
                    <Image style={ {height:30,width:30}} source={require('../images/edit.png')}/>
                </TouchableOpacity>
            </View>
        )
    };

    render() {

      //  debugger;
        console.log('-----------',this.state.userList);
        return (
            <View style={styles.container}>
                <View Style={{alignItems:'center'}}><Text style={{fontSize: 30,color:'red'}}>Student Information</Text></View>
                <FlatList data={this.state.userList}
                          contentContainerStyle={{top:20}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListEmptyComponent={this.renderEmpty}
                          onRefresh={this.onRefresh}
                          refreshing={this.state.refreshing}
                          ListFooterComponent={<View style={{ height: 50}}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },
    titleText: {
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 20
    },
    rowContainer: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 5,
        justifyContent:'center',
        padding: 5
    }
});
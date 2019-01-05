import React, {Component} from 'react';
import {FlatList, StyleSheet,
    Text, View, Button,
    TouchableOpacity} from 'react-native';

export  default  class userDetails extends Component
{
    constructor(props)
    {
        super(props);
        this.state= {
            userDetail: this.props.navigation.state.params.userDetail
        }
    }
 render(){
        const  {name,username,email} =this.state.userDetail;
        return(
          <View style={styles.container}>
              <Text style={styles.titleText}>{name}</Text>
              <Text style={styles.details}>{username}</Text>
              <Text style={[styles.details,{color:'blue'}]}>{email}</Text>

          </View>
        );
 }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    titleText:{
        fontSize: 30,
        marginBottom: 10,
        marginTop: 10
    },
    details: {
        fontSize: 20,
        marginBottom:10
    }
});
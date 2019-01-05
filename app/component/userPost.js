import React, {PureComponent} from 'react';
import {FlatList, StyleSheet,
    Text, View, Button,
    TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import {GetPost } from "../actions/postAction";

class UserPost extends PureComponent{

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Post List'
        };
    };

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            postList: []
        }
    }

    componentDidMount() {
        debugger;
        console.log('------------jksbasjbfsdh-----------');
        this.props.GetPost();
    }

    componentWillReceiveProps(nextProps, nextState){
        console.log("componentWillReceiveProps");
        console.log(nextProps);
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
        this.props.GetPost().then(res=>{
            this.setState({refreshing: false});
        });
    };

    onRowClick = (item) => {

    };

    renderItem = ({item, index}) => {
        const {rowContainer} = styles;
        return(
            <TouchableOpacity onPress={()=>this.onRowClick(item)}>
                <View key={index} style={rowContainer}>
                    <Text style={{fontSize: 30,color:'#00f'}}>
                        {item.title}</Text>
                    <Text style={{fontSize: 20}}>{item.body}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        const {refreshing} = this.state;
        const {postList} = this.props;
        debugger;
        console.log(this.props);
        return (
            <View style={styles.container}>
                <FlatList data={postList}
                          contentContainerStyle={{top:20}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListEmptyComponent={this.renderEmpty}
                          onRefresh={this.onRefresh}
                          refreshing={refreshing}
                          ListFooterComponent={<View style={{ height: 50}}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        justifyContent:'center',
    },
    titleText: {
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 20
    },
    rowContainer: {
        borderRadius:5,
        padding:10,
        borderWidth:1,
        borderColor:'#bdbdbd',
        marginLeft:10,
        marginRight:10
    }
});

const mapStateToProps = (state) => {
    const {postList} = state.post;
    return {
        postList
    };
};

export default connect(mapStateToProps,{
    GetPost
})(UserPost);
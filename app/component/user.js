import React, {PureComponent} from 'react';
import {FlatList, StyleSheet,
    Text, View, Button,
    TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {GetUser} from "../actions/userAction";
import {GetPost} from "../actions/postAction";
import * as Animatable from 'react-native-animatable';
class user extends PureComponent {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'User List'
        };
    };

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            userList: []
        }
    }

    componentDidMount() {
        debugger;
        //console.log("----------------dksnkdsn-----------");
        this.props.GetUser();
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
        debugger
        this.setState({refreshing: true});
        this.props.GetUser().then(res=>{
            this.setState({refreshing: false});
        });
    };

    onRowClick = (item) => {
        this.props.navigation.navigate('userdetails',{userDetail: item});
    };

    renderItem = ({item, index}) => {
        const {rowContainer} = styles;
        debugger
        return(
            <TouchableOpacity onPress={()=>this.onRowClick(item)} >
                <View key={index} style={rowContainer}>
                    <Animatable.Text animation="swing" easing="ease-out" iterationCount="infinite" style={{fontSize: 30}}>
                        {item.name}</Animatable.Text>
                    <Animatable.Text animation="fadeInDown" easing="ease-out" iterationCount="infinite" style={{fontSize: 20}}>{item.email}</Animatable.Text>
                </View>
            </TouchableOpacity>
        )
    };
    press=()=>
    {this.props.navigation.navigate('userpost');

    }

    handleTextRef = ref => this.text = ref;

    render() {
        //console.log("User List=>"+this.props.userList);
        const {refreshing} = this.state;
        const {userList} = this.props;
        debugger;
        console.log("User List=>"+this.props);


        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center',marginTop: 30}}>
                <Animatable.Text  animation="slideInDown" iterationCount={5} direction="alternate">Click on Heart Dear</Animatable.Text>
                    <TouchableOpacity onPress={this.press}><Animatable.Text animation="bounce" easing="ease-out" iterationCount="infinite" style={{fontSize:30,color:'blue'}}>❤️</Animatable.Text>
                    </TouchableOpacity>
                </View>
                {/*<TouchableOpacity onPress={() => this.setState({fontSize: (this.state.fontSize || 10) + 5 })}>
                    <Animatable.Text transition="fontSize" style={{fontSize: this.state.fontSize || 10}}>Size me up, Scotty</Animatable.Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.text.transitionTo({ bounce: 0.2 })} style={{alignItems: 'center',paddingTop: 20}}>
                    <Animatable.Text ref={this.handleTextRef} style={{fontSize:30,color:'blue'}}>Goto Post List</Animatable.Text>

                </TouchableOpacity>*/}

                <FlatList data={userList}
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
        backgroundColor:'white',
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
        backgroundColor:'lightblue',
        borderColor:'red',
        marginLeft:10,
        marginRight:10
    }
});

const mapStateToProps = (state) => {
    const {userList} =state.user;
    const {postList} = state.post;
    return {
        userList,
        postList
    };
};

export default connect(mapStateToProps,{
    GetUser
})(user);
import React, {Component} from 'react';
import { FlatList, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import {SwipeListView, SwipeRow}  from 'react-native-swipe-list-view';
import {deleteFavorite} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes, 
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});


class Favorites extends Component{
    render(){
        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {
            
            return(
                
                    <ListItem
                        key={index}
                        hideChevron={true}
                        onPress={() => navigate('Dishdetail', {dishId: item.id})}
                        >
                        <Avatar rounded source={{uri: baseUrl + item.image}} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
               
            );
        }

        const renderHiddenItem = ({item, index}) => {

            const rightButton = [
                {
                    text: 'delete',
                    type: 'delete',
                    onPress: () =>this.props.deleteFavorite(item.id)
                }
            ];
            return(
                <View style={styles.rowBack}>
                    <TouchableOpacity  
                         style={[styles.backRightBtn, styles.backRightBtnRight]}
                        onPress={() =>this.props.deleteFavorite(item.id)}>
                        <Text style={styles.backTextWhite}>Delete</Text>
                    </TouchableOpacity>
                </View>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading/>
            );
        }
        else if (this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            return(
                <View style={styles.container}>
                    <SwipeListView
                        data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                        renderItem={renderMenuItem}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        />
                </View>
                    );
                    
        }

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);


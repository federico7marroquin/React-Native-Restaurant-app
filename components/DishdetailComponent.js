import React, { Component } from 'react';
import { Text, View,FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)) 
})


function RenderDish(props) {

    const item = props.dish;
    
        if (item != null) {
            return(
                <Card>
                    <Card.Image style= {{ alignItems: 'center', justifyContent: 'center' }} source={ {uri: baseUrl + item.image}}>
                        <Card.FeaturedTitle >{item.name}</Card.FeaturedTitle>
                    </Card.Image>
                    <Text style={{margin: 10}}>
                        {item.description}
                    </Text>
                    <Icon 
                        raised 
                        reverse 
                        name = {props.favorite ? 'heart': 'heart-o'} 
                        type='font-awesome'
                        color = '#f50'
                        onPress = { ()=> props.favorite ? console.log('Arlready favorite'): props.onPress()}>

                    </Icon>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props){
    const comments = props.comments;
    const renderCommentItem = ({ item, index}) => {
        return(
            <View key={index} style = {{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>    
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>    
                <Text style={{fontSize: 12}}>{'--'+item.author+', '+item.date} Stars</Text>    
            </View>
        );
    }

    return(
        <Card>
            <Card.Title>Comments</Card.Title>
            <FlatList
                data={comments}
                renderItem = {renderCommentItem}
                keyExtractor={(item,index) => index.toString()}/>
        </Card>
    );
}
class Dishdetail extends Component {

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <View>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                favorite= {this.props.favorites.some(el => el=== dishId)}
                onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment)=> comment.dishId === dishId)} />
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
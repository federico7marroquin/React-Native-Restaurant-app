import React, { Component, useState } from 'react';
import { Text, View,FlatList, StyleSheet , ScrollView, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input  } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postComment, postFavorite} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
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

                    <View style={styles.formRow}>
                        <Icon 
                            raised 
                            reverse 
                            name = {props.favorite ? 'heart': 'heart-o'} 
                            type='font-awesome'
                            color = '#f50'
                            onPress = { ()=> props.favorite ? console.log('Arlready favorite'): props.onPress()}>

                        </Icon>
                        <Icon 
                            raised 
                            reverse 
                            name = 'pencil'
                            type='font-awesome'
                            color = '#512DA8'
                            onPress = { ()=> props.toggleModal()}>

                        </Icon>

                    </View>
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
const Dishdetail =(props) => {

    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(3.3);
    const [author, setAutor] = useState("");
    const [comment, setComment] = useState("");

    function markFavorite(dishId){
        props.postFavorite(dishId);
    }

    function createComment(dishId,rating,author,comment){
        props.postComment(dishId,rating,author,comment);
    }
    
    const toggleModal = () => {
        setShowModal(!showModal);
        setRating(3.3);
        setAutor("");
        setComment("");
        
    }

    
    const dishId = props.route.params.dishId;

    const handleComments = () => {
        console.log(JSON.stringify({rating,author,comment}));
        createComment(dishId,rating,author,comment);
        toggleModal();
    }
        return(
            <ScrollView>
                <RenderDish dish={props.dishes.dishes[+dishId]} 
                favorite= {props.favorites.some(el => el=== dishId)}
                onPress={() => markFavorite(dishId)}
                toggleModal={() => toggleModal()}
                />
                <RenderComments comments={props.comments.comments.filter((comment)=> comment.dishId === dishId)} />
                <Modal
                    animationType = 'slide'
                    transparent= {false}
                    visible = {showModal}
                    
                    >
                    <View style={styles.modal}>
                        <Rating showRating fractions={1} onFinishRating={value => setRating(value)} startingValue={3.3} />
                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={value => setAutor(value)}
                            />
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={value => setComment(value)}
                            />
                        <View style={styles.modalButtons} >
                            <Button 
                                onPress ={handleComments}
                                color='#512DA8'
                                title= 'SUBMIT'
                                />
                                
                        </View>   
                        <View style={styles.modalButtons}>
                            <Button 
                                color='#9c9c9c'
                                onPress ={toggleModal}
                                title= 'CANCEL'
                                />
                            
                        </View>     
                        
                    </View>

                </Modal>
            </ScrollView>
        );
}



const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 40
    },
    formLabel: {
        fontSize: 18,
         flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    modalButtons: {
        marginVertical: 20
    }
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}


function RenderItem(props) {
    const item = props.item;
    if(props.isLoading){
        return(
            <Loading/>
        );
    }
    else if(props.errMess){
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }
    else {  
        if(item!= null){
            return(
                <Card>
                    <Card.Image style= {{ alignItems: 'center', justifyContent: 'center' }} source= {{uri: baseUrl + item.image}}>
                        <Card.FeaturedTitle >{item.name}</Card.FeaturedTitle>
                        <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
                    </Card.Image>
                    <Text style={{margin: 10}}>
                        {item.description}
                    </Text>
                </Card>
                
            );
        }
        else{
            return(<View></View>)
        }
    }
}
class Home extends Component {

    
     
    render(){
        return (
            <ScrollView>
                <RenderItem isLoading ={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}item={ this.props.dishes.dishes.filter((dish) => dish.featured)[0]}/>
                <RenderItem isLoading ={this.props.promotions.isLoading} errMess={this.props.promotions.errMess}item={ this.props.promotions.promotions.filter((promo) => promo.featured)[0]}/>
                <RenderItem isLoading ={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}item={ this.props.leaders.leaders.filter((leader) => leader.featured)[0]}/>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card} from 'react-native-elements';
import { DISHES} from '../shared/dishes';
import { PROMOTIONS} from '../shared/promotions';
import { LEADERS} from '../shared/leaders';


function RenterItem(props) {
    const item = props.item;
    if(item!= null){
        return(
            <Card>
                <Card.Image style= {{ alignItems: 'center', justifyContent: 'center' }} source= {require('./images/uthappizza.png')}>
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
class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            dishes: DISHES,
            promotions: PROMOTIONS,
            leaders: LEADERS
        }
    }
     
    render(){
        return (
            <ScrollView>
                <RenterItem item={ this.state.dishes.filter((dish) => dish.featured)[0]}/>
                <RenterItem item={ this.state.promotions.filter((promo) => promo.featured)[0]}/>
                <RenterItem item={ this.state.leaders.filter((leader) => leader.featured)[0]}/>
            </ScrollView>
        );
    }
}

export default Home;
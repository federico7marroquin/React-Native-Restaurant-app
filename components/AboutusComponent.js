import React, {Component} from 'react';
import { ScrollView, FlatList, View, Text  } from 'react-native';
import { Card,ListItem, Avatar } from 'react-native-elements';
import { LEADERS} from '../shared/leaders';



function History(){
    return(
        <Card>
            <Card.Title >Our History</Card.Title>
            <Card.Divider></Card.Divider>
            <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary 
                icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can 
                be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  
                Featuring four of the best three-star Michelin chefs in the world, 
                you never know what will arrive on your plate the next time you visit us.</Text>
            <Text></Text>
            <Text>The restaurant traces its humble beginnings to The Frying Pan, 
                a successful chain started by our CEO, Mr. Peter Pan, that featured 
                for the first time the world's best cuisines in a pan.</Text>
        </Card>  
    );
}

class AboutUs extends Component {

    constructor(props){
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }

    

    render() {
        const renderLeaderItem = ({item}) => {

            return (
                    <ListItem >
                        <Avatar rounded source={ require('./images/alberto.png')} />
                        <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
            );
        };

        const { navigate} = this.props.navigation;
        return (
            <View>
                <History/>
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                    <Card.Divider></Card.Divider>
                    <FlatList   inverted
                        data={this.state.leaders}
                        keyExtractor={ (item, index) => index.toString()}
                        renderItem={renderLeaderItem}
    
                        />
                </Card>
            </View>
        );
    }
}

export default AboutUs;
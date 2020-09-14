import React, {Component} from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    render() {
        const renderMenuItem = ({item}) => {

            return (
                    <ListItem bottomDivider  onPress={()=>navigate('Dishdetail', {dishId: item.id})} >
                        <Avatar source={ require('./images/uthappizza.png')} />
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
                <FlatList 
                    data={this.state.dishes}
                    keyExtractor={ (item, index) => index.toString()}
                    renderItem={renderMenuItem}
                    />
        );
    }
}


export default Menu;
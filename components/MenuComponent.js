import React, {Component} from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
    }
}

class Menu extends Component {


    render() {
        const renderMenuItem = ({item, index}) => {

            return (
                    <Tile  
                        key={index}
                        title = {item.name}
                        caption = {item.description}
                        featured  
                        onPress={()=>navigate('Dishdetail', {dishId: item.id})} 
                        imageSrc={{uri: baseUrl +  item.image}}
                        />
            );
        };

        const { navigate} = this.props.navigation;
        return (
                <FlatList 
                    data={this.props.dishes.dishes}
                    keyExtractor={ (item, index) => index.toString()}
                    renderItem={renderMenuItem}
                    />
        );
    }
}


export default connect(mapStateToProps)(Menu);
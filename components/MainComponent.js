import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import {Image, StyleSheet, View, Text, Platform, ScrollView} from 'react-native';


import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactComponent';
import AboutUs from './AboutusComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';

import {connect} from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
});

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavoritesNavigator = createStackNavigator();



function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options ={({navigation})=>
                ({
                    headerLeft: () => (
                    <Icon name='menu' size ={24}
                    color='white'
                    onPress={()=> navigation.toggleDrawer()}
                    iconStyle={{marginLeft: 10}}
                   />
                   )})}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ 
                    headerTitle: "Dish Detail"
                    
                }}
                
            />            
        </MenuNavigator.Navigator>
    );
}
function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
                
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options ={({navigation})=>
                ({
                    headerLeft: () => (
                    <Icon name='menu' size ={24}
                    color='white'
                    onPress={()=> navigation.toggleDrawer()}
                    iconStyle={{marginLeft: 10}}
                   />
                   )})}
            />          
        </HomeNavigator.Navigator>
    );
}
function ContactNavigatorScreen() {
    return(
        <ContactNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <ContactNavigator.Screen
                name="Contanct"
                component={ContactUs}
                options ={({navigation})=>
                ({
                    headerLeft: () => (
                    <Icon name='menu' size ={24}
                    color='white'
                    onPress={()=> navigation.toggleDrawer()}
                    iconStyle={{marginLeft: 10}}
                   />
                   )})}
            />          
        </ContactNavigator.Navigator>
    );
}
function AboutNavigatorScreen() {
    return(
        <AboutNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <AboutNavigator.Screen
                name="About Us"
                component={AboutUs}
                options ={({navigation})=>
                ({
                    headerLeft: () => (
                    <Icon name='menu' size ={24}
                    color='white'
                    onPress={()=> navigation.toggleDrawer()}
                    iconStyle={{marginLeft: 10}}
                   />
                   )})}
            />          
        </AboutNavigator.Navigator>
    );
}

function ReservationNavigatorScreen() {
    return(
        <ReservationNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <ReservationNavigator.Screen
                name="Reserve Table"
                component={Reservation}
                options ={({navigation})=>
                ({
                    headerLeft: () => (
                    <Icon name='menu' size ={24}
                    color='white'
                    onPress={()=> navigation.toggleDrawer()}
                    iconStyle={{marginLeft: 10}}
                   />
                   )})}
            />          
        </ReservationNavigator.Navigator>
    );
}

function FavoritesNavigatorScreen() {
    return(
        <FavoritesNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <FavoritesNavigator.Screen
                name="My Favorites"
                component={Favorites}
                options ={({navigation})=>
                ({
                    headerLeft: () => (
                    <Icon name='menu' size ={24}
                    color='white'
                    onPress={()=> navigation.toggleDrawer()}
                    iconStyle={{marginLeft: 10}}
                   />
                   )})}
            />          
        </FavoritesNavigator.Navigator>
    );
}

const Drawer  = createDrawerNavigator();

function selectIcon(iconName,tintColor){
    return(
            <Icon
                name = {iconName}
                type = 'font-awesome'
                size = {24}
                color = {tintColor}/>
       
    );
}


function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{flex:1}}>
                <Image source={require('./images/logo.png')} style={styles.drawerImage} />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
            </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }
class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
  render() {
    return (
    <NavigationContainer>
      <Drawer.Navigator  drawerContent= {CustomDrawerContent} drawerStyle={{backgroundColor: '#D1C4E9'}} initialRouteName="Home">
        <Drawer.Screen  name="Home" component={HomeNavigatorScreen} 
        options={{drawerIcon: ({tintColor})=> selectIcon("home",tintColor)}}/>
        <Drawer.Screen name="About Us" component={AboutNavigatorScreen} 
        options={{drawerIcon: ({tintColor})=> selectIcon('info-circle',tintColor) }}/>
        <Drawer.Screen name="Menu" component={MenuNavigatorScreen} 
        options={{drawerIcon: ({tintColor})=> selectIcon("list",tintColor)}}/>
        <Drawer.Screen name="Contact Us" component={ContactNavigatorScreen}
         options={{drawerIcon: ({tintColor})=> selectIcon("address-card",tintColor)}}/>
        <Drawer.Screen name="My Favorites" component={FavoritesNavigatorScreen}
        options={{drawerIcon: ({tintColor})=> selectIcon("heart",tintColor)}}/>
        <Drawer.Screen name="Reserve Table" component={ReservationNavigatorScreen}
        options={{drawerIcon: ({tintColor})=> selectIcon("cutlery",tintColor)}}/>
         
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})
  
export default connect(mapStateToProps,mapDispatchToProps)(Main);
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,  } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactComponent';
import AboutUs from './AboutusComponent';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();



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
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
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
            />          
        </AboutNavigator.Navigator>
    );
}

 const Drawer  = createDrawerNavigator();

class Main extends Component {

  render() {
 
    return (
    <NavigationContainer>
      <Drawer.Navigator drawerStyle={{backgroundColor: '#D1C4E9', }} initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeNavigatorScreen} />
        <Drawer.Screen name="About Us" component={AboutNavigatorScreen} />
        <Drawer.Screen name="Menu" component={MenuNavigatorScreen} />
        <Drawer.Screen name="Contact Us" component={ContactNavigatorScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}
  
export default Main;
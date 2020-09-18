import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Switch, Button, Picker} from 'react-native';
import {DateTimePicker} from '@react-native-community/datetimepicker';

class Reservation extends Component {
    constructor(props){
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: ''
        }
    }

    static nagivationOptions = {
        title: 'Reserve Table'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            guests: 1,
            smoke: false,
            date: ''
        })
    }

    render() {
        return(
            <ScrollView>
                <View style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Number of Guests</Text>
                    <Picker
                         style = {styles.formItem}
                         selectedValue = {this.state.guests}
                         onValueChange = {(itemValue, itemIndex) => {this.setState({ guests: itemValue})}}
                        >
                        <Picker.item label='1' value='1'/>
                        <Picker.item label='2' value='2'/>
                        <Picker.item label='3' value='3'/>
                        <Picker.item label='4' value='4'/>
                        <Picker.item label='5' value='5'/>
                        <Picker.item label='6' value='6'/>
                    </Picker>
                </View>
                <View  style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value ={this.state.smoking}
                        trackColor = '#512DA8'
                        onValueChange ={(value) => this.setState({smoking: value})}
                        >

                    </Switch>
                </View>
                <View  style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Date and Time</Text>
                    <DateTimePicker
                        style = {{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format = ''
                        mode= 'datetime'
                        placeholder ='select date and time'
                        minDate='2020-01-01'
                        confirmBtnText= 'Confirm'
                        cancelBtnText= 'Cancel'
                        customStyles = {{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            },
                        }}
                        onDateChange = {(date) => {this.setState({date: date})}}
                        />
                </View>
                <View  style = {styles.formRow}>
                    <Button
                        title = 'Reserve'
                        color = '#512DA8'
                        onPress = {() => this.handleReservation()}
                        accessibilityLabel='Learn more about thus purple button'
                        />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
         flex: 2
    },
    formItem: {
        flex: 1
    }
})

export default Reservation;
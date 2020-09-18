import React, {Component, useState} from 'react';
import {Text, View, ScrollView, StyleSheet, Switch, Button, Picker, Platform, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const  Reservation = () => {
    const [date,setDate] = useState(new Date());
    const [guests, setGuests] = useState('1');
    const [smoking, setSmoking] = useState(false);
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [showModal, setShowModal] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS=== 'ios');
        setDate(currentDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };

    const showTimepicker = () => {
        showMode('time');
      };

    const toggleModal = () => {
        setShowModal(!showModal);
        
    }

    const resetForm = () => {
        setGuests(1);
        setSmoking(false);
        setDate(new Date())
    }


    const handleReservation = () => {
        console.log(JSON.stringify({date,guests,smoking}));
        toggleModal();
    }

    return(
        <ScrollView>
            <View style = {styles.formRow}>
                <Text style = {styles.formLabel}>Number of Guests</Text>
                <Picker
                        style = {styles.formItem}
                        selectedValue = {guests}
                        onValueChange = {(itemValue, itemIndex) => {setGuests(itemValue)}}
                    >
                    <Picker.Item label='1' value='1'/>
                    <Picker.Item label='2' value='2'/>
                    <Picker.Item label='3' value='3'/>
                    <Picker.Item label='4' value='4'/>
                    <Picker.Item label='5' value='5'/>
                    <Picker.Item label='6' value='6'/>
                </Picker>
            </View>
            <View  style = {styles.formRow}>
                <Text style = {styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value ={smoking}
                    trackColor = '#512DA8'
                    onValueChange ={(value) => setSmoking(value)}
                    >

                </Switch>
            </View>
            <View  style = {styles.formRow}>
                <Text style = {styles.formLabel}>Date and Time</Text>
                <Text style = {{fontSize: 12, flex: 2} }>{date+""}</Text>
                <View style={styles.formColum}>
                    <View>
                        <Button onPress={showDatepicker} color = '#512DA8' title="Set date"/>
                    </View>
                    <View>
                        <Button onPress={showTimepicker}  color = '#512DA8' title="Set time"/>
                    </View>
                </View>
                
            
                {show && (<DateTimePicker
                    style={{flex: 2, marginRight: 20}}
                    testID='DatePicker'
                    value={date}
                    date={date}
                    mode={mode}
                    placeholder="select date and Time"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onChange = {onChange}
                    />)}
                
            </View>
            <View  style = {styles.formRow}>
                <Button 
                    title = 'Reserve'
                    color = '#512DA8'
                    onPress = {handleReservation}
                    accessibilityLabel='Learn more about this purple button'
                    />
            </View>
            <Modal
                animationType = 'slide'
                transparent= {false}
                visible = {showModal}
                onDismiss={()=>{toggleModal(); resetForm();}}
                onRequestClose={()=>{toggleModal(); resetForm();}}
                >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Your Reservation</Text>
                    <Text style={styles.modalText}>Number of Guests: {guests}</Text>
                    <Text style={styles.modalText}>Smoking?: {smoking? "Yes":"No"}</Text>
                    <Text style={styles.modalText}>Date and Time: {date+""}</Text>
                    <Button
                        onPress ={()=> {toggleModal(); resetForm();}}
                        color='#512DA8'
                        title= 'Close'
                        >

                        </Button>
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
        margin: 20
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
    }
    
})

export default Reservation;
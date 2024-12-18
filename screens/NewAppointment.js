import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, ScrollView, RefreshControl } from 'react-native';
import { Appbar, IconButton, Title, Button as PaperButton, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { createAppointment, getPatientByUserId } from '../api/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NurseItem = ({ nurse }) => {
  return (
    <View style={styles.nurseItem}>
      <Image 
        source={require('../assets/avatar-default.png')}
        style={styles.nurseAvatar}
      />
      <View style={styles.nurseInfo}>
        <Text style={styles.nurseName}>{nurse.fullName}</Text>
        <Text style={styles.nurseExperience}>Experience: {nurse.experience_years} years</Text>
      </View>
    </View>
  );
};

const NewAppointment = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [symptoms, setSymptoms] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [vehicle, setVehicle] = useState('None'); // Changed default to 'None'
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(''); // Add this line after other useState declarations
  const [patientData, setPatientData] = useState(null);

  const loadStoredData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      const storedPatientData = await AsyncStorage.getItem('patientData');
      
      if (storedPatientData) {
        const patientData = JSON.parse(storedPatientData);
        setPatientData(patientData);
        console.log('Loaded patient data from storage:', patientData);
      }
      
      if (!storedUserData || !storedPatientData) {
        alert('Required data not found');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
      alert('Error loading data');
      navigation.goBack();
    }
  };

  // Replace existing useEffect for fetching patient data
  React.useEffect(() => {
    loadStoredData();
  }, []);

  // Add debug logging for selectedNurse
  React.useEffect(() => {
    console.log('Current selectedNurse:', selectedNurse);
    console.log('Route params:', route.params);
  }, [selectedNurse, route.params]);

  // Thêm giá ước tính mẫu
  const estimatedPrices = {
    servicePrice: 500000,
    vehiclePrice: vehicle === 'Car' ? 200000 : (vehicle === 'Motor' ? 100000 : 0),
    get total() {
      return this.servicePrice + this.vehiclePrice;
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // Update selected nurse when returning from SelectNurse screen
  React.useEffect(() => {
    if (route.params?.selectedNurse) {
      setSelectedNurse(route.params.selectedNurse);
    }
  }, [route.params?.selectedNurse]);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Format: "YYYY-MM-DD"
  };

  const formatTime = (time) => {
    // Extract just the time portion and add Z
    return time.toISOString().split('T')[1];
  };

  const handleSelectNurse = () => {
    const appointmentDateTime = {
      date: formatDate(date),
      time: formatTime(time)
    };
    // Pass current selectedNurse when navigating
    navigation.navigate('SelectNurse', { 
      appointmentDateTime,
      currentNurse: selectedNurse // Add this
    });
  };

  const resetForm = () => {
    setDate(new Date());
    setTime(new Date());
    setSymptoms('');
    setVehicle('None');
    setLocation(''); // Add this line to reset location
    // Do NOT reset selectedNurse here
  };

  const onRefresh = React.useCallback(() => {
    console.log('Refreshing data...\n');
    console.log('Current nurse before refresh:', selectedNurse);
    setRefreshing(true);
    resetForm();
    // Re-fetch patient data only
    const fetchPatientData = async () => {
      try {
        const userId = route.params?.userData.user_id;
        if (userId) {
          const response = await getPatientByUserId(userId);
          setPatientData(response);
        }
      } catch (error) {
        console.error('Error refreshing patient data:', error);
      }
    };
    fetchPatientData();
    console.log('Current nurse after refresh:', selectedNurse);
    setRefreshing(false);
  }, [selectedNurse]); // Add selectedNurse to dependency array

  const handleSubmit = async () => {
    if (!selectedNurse) {
      alert('Please select a nurse');
      return;
    }

    if (!patientData) {
      alert('Patient data not found');
      return;
    }

    const appointmentData = {
      patient_id: patientData.id, // This should now work as the ID is at root level
      nurse_id: selectedNurse.nurse_id,
      date: formatDate(date),
      time: formatTime(time),
      location: location,
      symptoms: symptoms,
      transportation: vehicle // This now matches the API requirements
    };

    console.log('Submitting appointment data:', appointmentData);

    try {
      const response = await createAppointment(appointmentData);
      alert('Appointment created successfully!');
      navigation.goBack();
    } catch (error) {
      alert('Failed to create appointment: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <View style={styles.headerCenter}>
          <Title style={styles.appTitle}>New Appointment</Title>
        </View>
        <View style={styles.headerRight}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo}
          />
        </View>
      </Appbar.Header>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.content}>
          <Text>New Appointment</Text>
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            value={date.toLocaleDateString()}
            onPressIn={() => setShowDatePicker(true)}
          />
          <TextInput
            style={styles.input}
            placeholder="Select Time"
            value={time.toLocaleTimeString()}
            onPressIn={() => setShowTimePicker(true)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe Symptoms"
            value={symptoms}
            onChangeText={setSymptoms}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={onDateChange}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              onChange={onTimeChange}
            />
          )}
          
          <View style={styles.vehicleContainer}>
            <Text style={styles.sectionTitle}>Transport Service</Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="None"
                  status={vehicle === 'None' ? 'checked' : 'unchecked'}
                  onPress={() => setVehicle('None')}
                />
                <Text>None</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="Car"
                  status={vehicle === 'Car' ? 'checked' : 'unchecked'}
                  onPress={() => setVehicle('Car')}
                />
                <Text>Car</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="Motor"
                  status={vehicle === 'Motor' ? 'checked' : 'unchecked'}
                  onPress={() => setVehicle('Motor')}
                />
                <Text>Motor</Text>
              </View>
            </View>
          </View>

          <View style={styles.selectedNurseContainer}>
            <Text style={styles.sectionTitle}>Selected Nurse</Text>
            {selectedNurse ? (
              <NurseItem nurse={selectedNurse} />
            ) : (
              <Text style={styles.noNurseText}>No nurse selected</Text>
            )}
            <PaperButton 
              mode="outlined" 
              onPress={handleSelectNurse}
              style={styles.selectNurseButton}
            >
              {selectedNurse ? 'Change Nurse' : 'Select Nurse'}
            </PaperButton>
          </View>

          <View style={styles.estimatedPriceContainer}>
            <Text style={styles.sectionTitle}>Estimated Price</Text>
            <View style={styles.priceDetails}>
              <View style={styles.priceRow}>
                <Text>Service Fee:</Text>
                <Text>{estimatedPrices.servicePrice.toLocaleString()} VND</Text>
              </View>
              {vehicle !== 'None' && (
                <View style={styles.priceRow}>
                  <Text>Vehicle Fee ({vehicle}):</Text>
                  <Text>{estimatedPrices.vehiclePrice.toLocaleString()} VND</Text>
                </View>
              )}
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalText}>{estimatedPrices.total.toLocaleString()} VND</Text>
              </View>
            </View>
          </View>

          <PaperButton mode="contained" onPress={handleSubmit}>
            Submit
          </PaperButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Thay đổi màu nền giống header
  },
  header: {
    backgroundColor: '#fff',
    elevation: 4,
    justifyContent: 'space-between',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Thêm màu nền giống header
    paddingVertical: 20, // Thêm padding để tạo khoảng cách
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  textArea: {
    height: 100,
    paddingTop: 8, // Add padding to align text to top
    textAlignVertical: 'top', // Align text to top
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  scrollView: {
    width: '100%',
  },
  nursesContainer: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 250, // Giữ chiều cao cố định
  },
  nursesList: {
    flexGrow: 0, // Thêm flexGrow
    height: 200, // Thay maxHeight bằng height
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nurseItem: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  nurseAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nurseInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  nurseName: {
    fontSize: 16,
    fontWeight: '500',
  },
  nurseSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  vehicleContainer: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estimatedPriceContainer: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  priceDetails: {
    marginTop: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontWeight: 'bold',
  },
  selectedNurseContainer: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectNurseButton: {
    marginTop: 10,
  },
  noNurseText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
  },
  nurseExperience: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  }
});

export default NewAppointment;

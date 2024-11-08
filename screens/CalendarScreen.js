import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Title, Card, IconButton, Surface } from 'react-native-paper';
import AppointmentCard from '../components/AppointmentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../api/apis'; // Added import

const { width } = Dimensions.get('window');

const CalendarScreen = ({ navigation }) => {
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const loadStoredData = async () => {
    try {
      const storedPatientData = await AsyncStorage.getItem('patientData');
      const storedAppointments = await AsyncStorage.getItem('appointments');
      
      if (storedPatientData) {
        setPatientData(JSON.parse(storedPatientData));
      }
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await api.getUpcomingAppointments(patientData.user_id);
      setAppointments(data);
      await AsyncStorage.setItem('appointments', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStoredData();
    if (patientData?.user_id) {
      fetchAppointments();
    }
  }, [patientData?.user_id]);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Appointments Management</Title>
      
      <View style={styles.buttonContainer}>
        <Surface style={styles.surface}>
          <IconButton
            icon="calendar-plus"
            iconColor="white"
            size={32}
            style={styles.iconButton}
            onPress={() => navigation.navigate('NewAppointment')}
          />
          <Text style={styles.buttonLabel}>New Appointment</Text>
        </Surface>

        <Surface style={styles.surface}>
          <IconButton
            icon="calendar-text"
            iconColor="white"
            size={32}
            style={styles.iconButton}
            onPress={() => navigation.navigate('ViewAppointments', { patientData })}
          />
          <Text style={styles.buttonLabel}>View Appointments</Text>
        </Surface>
      </View>
      <Title>Upcoming Appointments</Title>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 16 }} />
      ) : (
        <ScrollView 
          style={styles.appointmentsScrollView}
          showsVerticalScrollIndicator={true}
        >
          <Card style={styles.sectionCard}>
            <Card.Content>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <Text style={styles.noActivityText}>No upcoming appointments</Text>
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#0099FF',
  },
  iconButton: {
    margin: 0,
  },
  buttonLabel: {
    color: 'white',
    marginTop: 4,
    fontSize: 12,
  },
  sectionCard: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
  },
  noActivityText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#666',
  },
  appointmentsScrollView: {
    maxHeight: 400, // Giới hạn chiều cao tối đa
    marginTop: 8,
  },
});

export default CalendarScreen;

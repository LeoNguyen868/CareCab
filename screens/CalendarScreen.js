import React from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { Title, Card, IconButton, Surface } from 'react-native-paper';
import AppointmentCard from '../components/AppointmentCard';

const { width } = Dimensions.get('window');

const CalendarScreen = ({ navigation, patientData }) => {
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Heart Care Center'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Brown',
      specialty: 'Neurologist',
      date: '2024-01-22',
      time: '2:30 PM',
      location: 'Brain & Spine Center'
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Wilson',
      specialty: 'Dermatologist',
      date: '2024-01-25',
      time: '3:45 PM',
      location: 'Skin Care Clinic'
    }
  ];

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
      <ScrollView 
            style={styles.appointmentsScrollView}
            showsVerticalScrollIndicator={true}
          >
      <Card style={styles.sectionCard}>
        <Card.Content>
          
          
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <Text style={styles.noActivityText}>No upcoming appointments</Text>
            )}
          
        </Card.Content>
      </Card>
      </ScrollView>
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
  // Styles copied from MainScreen
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

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Title, Card, IconButton, Surface } from 'react-native-paper';

const CalendarScreen = ({ navigation }) => {
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
            onPress={() => navigation.navigate('ViewAppointments')}
          />
          <Text style={styles.buttonLabel}>View Appointments</Text>
        </Surface>
      </View>

      <Card style={styles.upcomingContainer}>
        <Card.Title title="Upcoming Appointments" />
        <Card.Content>
          {/* Add your upcoming appointments list here */}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    backgroundColor: '#6495ED', // Changed from '#6200ee' to deep blue
  },
  iconButton: {
    margin: 0,
  },
  buttonLabel: {
    color: 'white',
    marginTop: 4,
    fontSize: 12,
  },
  upcomingContainer: {
    flex: 1,
    marginTop: 16,
  },
});

export default CalendarScreen;

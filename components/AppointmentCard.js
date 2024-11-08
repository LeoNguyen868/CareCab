import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import * as api from '../api/apis';
import * as ultiAPI from '../api/ultis_api';

const AppointmentCard = ({ appointment }) => {
  const [nurse, setNurse] = useState(null);

  useEffect(() => {
    const fetchNurse = async () => {
      if (appointment.nurse_id) {
        const nurseData = await getNurse_infor();
        setNurse(nurseData);
      }
    };
    fetchNurse();
  }, [appointment.nurse_id]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };
api.getUpcomingAppointments
  // Format time
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };
  const getNurse = async () => {
    const nurse = await api.getNurse(appointment.nurse_id);
    return nurse;
  }
  const getNurse_infor = async () => {
    k= await getNurse();
    const profile = await api.getUserProfile(k.user_id);
    return profile;
  }

  return (
    <Card style={styles.appointmentCard}>
      <Card.Content style={styles.appointmentCardContent}>
        <View style={styles.appointmentHeader}>
          <View>
            <Text style={styles.doctorName}>
              {appointment.nurse_id ? `Nhân viên: ${nurse?.full_name || 'Loading...'}` : 'Not assigned'}
            </Text>
            <Text style={styles.specialty}>Status: {appointment.status}</Text>
          </View>
          <IconButton icon="chevron-right" size={20} />
        </View>
        <View style={styles.appointmentDetails}>
          <View style={styles.dateTimeContainer}>
            <View style={styles.detailItem}>
              <IconButton icon="calendar" size={16} style={styles.detailIcon} />
              <Text style={styles.detailText}>{formatDate(appointment.date)}</Text>
            </View>
            <View style={styles.detailItem}>
              <IconButton icon="clock" size={16} style={styles.detailIcon} />
              <Text style={styles.detailText}>{formatTime(appointment.startAt)}</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <IconButton icon="map-marker" size={16} style={styles.detailIcon} />
            <Text style={styles.detailText}>{appointment.location}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  appointmentCard: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  appointmentCardContent: {
    padding: 8,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  specialty: {
    color: '#666',
    fontSize: 12,
  },
  appointmentDetails: {
    marginTop: 2,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailIcon: {
    margin: 0,
    padding: 0,
  },
  detailText: {
    fontSize: 12,
    marginLeft: -8,
  },
});

export default AppointmentCard;

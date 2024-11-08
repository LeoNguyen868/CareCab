import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Appbar, Title, ActivityIndicator } from 'react-native-paper';
import AppointmentCard from '../components/AppointmentCard';
import { getPatientAppointments } from '../api/apis';

const Tab = createMaterialTopTabNavigator();



const AppointmentView = ({ statuses, userId }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAppointments = async () => {
    try {
      // // Use mock data first
      // const mockResponse = MOCK_APPOINTMENTS;
      
      // // Filter appointments based on status array
      // const filteredAppointments = mockResponse.filter((apt: Appointment) => 
      //   Array.isArray(statuses) 
      //     ? statuses.includes(apt.status)
      //     : apt.status === statuses
      // );
      
      // setAppointments(filteredAppointments);

      // Uncomment below when ready to use real API
      
      const response = await getPatientAppointments(userId);
      const filteredAppointments = response.filter((apt: Appointment) => 
        Array.isArray(statuses) 
          ? statuses.includes(apt.status)
          : apt.status === statuses
      );
      setAppointments(filteredAppointments);
      
    } catch (err) {
      setError('Không thể tải lịch hẹn');
      console.error(err);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAppointments();
      //console.log('Refreshing data...');
      //console.log('userId', userId);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchAppointments().finally(() => setLoading(false));
  }, [userId, statuses]);

  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'nurseConfirm': return '#9C27B0';
      case 'start': return '#2196F3';
      case 'stop': return '#FF5722';
      case 'complete': return '#4CAF50';
      case 'canceled': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'nurseConfirm': return 'Y tá đã xác nhận';
      case 'start': return 'Đang thực hiện';
      case 'stop': return 'Tạm dừng';
      case 'complete': return 'Hoàn thành';
      case 'canceled': return 'Đã hủy';
      default: return status;
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0099FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0099FF']}
        />
      }
    >
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentContainer}>
            <AppointmentCard appointment={appointment} />
            <Text style={[styles.status, { color: getStatusColor(appointment.status) }]}>
              {getStatusText(appointment.status)}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noActivityText}>
          Không có lịch hẹn nào
        </Text>
      )}
    </ScrollView>
  );
};

const ActiveAppointments = ({ userId }) => (
  <AppointmentView 
    statuses={['pending', 'nurseConfirm', 'start', 'stop']} 
    userId={userId}
  />
);

const CompletedAppointments = ({ userId }) => (
  <AppointmentView 
    statuses="complete" 
    userId={userId}
  />
);

const CancelledAppointments = ({ userId }) => (
  <AppointmentView 
    statuses="canceled" 
    userId={userId}
  />
);

const ViewAppointments = ({ navigation, route }) => {
  const patientData = route.params?.patientData;
  console.log('userId', patientData);
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Title style={styles.appTitle}>Lịch hẹn</Title>
      </Appbar.Header>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#fff' },
          tabBarIndicatorStyle: { backgroundColor: '#0099FF' },
          tabBarLabelStyle: { fontSize: 14 },
          tabBarActiveTintColor: '#0099FF',
          tabBarInactiveTintColor: '#666',
        }}
      >
        <Tab.Screen 
          name="Active" 
          children={() => <ActiveAppointments userId={patientData.id} />}
          options={{ tabBarLabel: 'Đang hoạt động' }}
        />
        <Tab.Screen 
          name="Completed" 
          children={() => <CompletedAppointments userId={patientData.id} />}
          options={{ tabBarLabel: 'Hoàn thành' }}
        />
        <Tab.Screen 
          name="Cancelled"
          children={() => <CancelledAppointments userId={patientData.id} />}
          options={{ tabBarLabel: 'Đã hủy' }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 1,
  },
  appTitle: {
    fontSize: 20,
    flex: 1,
  },
  appointmentContainer: {
    marginBottom: 16,
  },
  status: {
    top:-45,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 16,
    marginTop: 8,
  },
  noActivityText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    color: '#F44336',
    fontSize: 16,
  },
});

export default ViewAppointments;

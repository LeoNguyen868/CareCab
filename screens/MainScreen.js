import React, { useState, useCallback, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Dimensions,
  SafeAreaView,
  Image,
  RefreshControl,
  ActivityIndicator 
} from 'react-native';
import { 
  Card, 
  Title, 
  Searchbar,
  Surface, 
  Text,
  IconButton,
  Avatar,
  useTheme,
  Appbar,
  BottomNavigation,
  Button
} from 'react-native-paper';
import CalendarScreen from './CalendarScreen';
import ChatScreen from './ChatScreen';
import SettingsScreen from './SettingsScreen';
import AppointmentCard from '../components/AppointmentCard';
import * as api from '../api/apis';
import * as ultiAPI from '../api/ultis_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const scale = size => (width / 320) * size;

const MainScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [userData, setUserData] = useState(route.params?.userData || {});
  const [index, setIndex] = useState(0);
  const [patientData, setPatientData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const loadData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      const storedPatientData = await AsyncStorage.getItem('patientData');
      const storedAppointments = await AsyncStorage.getItem('appointments');

      if (storedUserData) setUserData(JSON.parse(storedUserData));
      if (storedPatientData) setPatientData(JSON.parse(storedPatientData));
      if (storedAppointments) setUpcomingAppointments(JSON.parse(storedAppointments));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await api.getUpcomingAppointments(userData.user_id);
      const patient = await api.getPatientByUserId(userData.user_id);
      // Sort appointments by date and take the latest one
      const sortedAppointments = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      const latestAppointment = sortedAppointments.length > 0 ? [sortedAppointments[0]] : [];
      setUpcomingAppointments(latestAppointment);
      setPatientData(patient);
      
      // Store data locally
      await storeData('userData', userData);
      await storeData('patientData', patient);
      await storeData('appointments', latestAppointment);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load local data first
    loadData();
    // Then fetch fresh data
    if (userData.user_id) {
      fetchAppointments();
    }
  }, [userData.user_id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      console.log('Refreshing data...\n');
      console.log(patientData);
      await fetchAppointments();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setRefreshing(false);
  }, []);

  const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'calendar', title: 'Appointments', focusedIcon: 'calendar', unfocusedIcon: 'calendar-outline' },
    { key: 'chat', title: 'Messages', focusedIcon: 'message', unfocusedIcon: 'message-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' }, // Changed from profile to settings
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => (
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* Upcoming Appointments Section */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title>Latest Appointment</Title>
            {loading ? (
              <ActivityIndicator style={{marginTop: 16}} />
            ) : upcomingAppointments.length > 0 ? (
              <AppointmentCard appointment={upcomingAppointments[0]}/>
            ) : (
              <Text style={styles.noActivityText}>No upcoming appointments</Text>
            )}
          </Card.Content>
        </Card>

        {/* Main Features Grid */}
        <View style={styles.featuresGrid}>
          <Card style={styles.featureCard} onPress={() => navigation.navigate('NewAppointment',{userData})}>
            <Card.Content style={styles.featureContent}>
              <IconButton icon="calendar-plus" size={30} />
              <Text>New Appointment</Text>
            </Card.Content>
          </Card>
          <Card style={styles.featureCard} onPress={() => navigation.navigate('ViewAppointments',{patientData})}>
            <Card.Content style={styles.featureContent}>
              <IconButton icon="history" size={30} />
              <Text>History</Text>
            </Card.Content>
          </Card>
          <Card style={styles.featureCard} onPress={() => navigation.navigate('UserProfile',{userData})}>
            <Card.Content style={styles.featureContent}>
              <IconButton icon="account-details" size={30} />
              <Text>Personal Info</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Advertisement Banners */}
        <ScrollView 
          horizontal 
          style={styles.bannerContainer}
          showsHorizontalScrollIndicator={false}
        >
          {[1, 2, 3].map((item) => (
            <Surface key={item} style={styles.adBanner}>
              <Text>Advertisement {item}</Text>
            </Surface>
          ))}
        </ScrollView>
      </ScrollView>
    ),
    calendar: () => <CalendarScreen navigation={navigation} patientData={patientData}/>,
    chat: () => <ChatScreen navigation={navigation} />,
    settings: () => <SettingsScreen navigation={navigation} />
  });

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo}
          />
          <Title style={styles.appTitle}>CareCab</Title>
        </View>
        <IconButton icon="bell" onPress={() => navigation.navigate('Notification1')} />
      </Appbar.Header>

      <Searchbar
        placeholder="Search services or staff..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.bottomNav}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 4,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  appTitle: {
    fontSize: 20,
  },
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionCard: {
    marginBottom: 16,
  },
  noActivityText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#666',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureCard: {
    width: '31%',
    marginBottom: 16,
  },
  featureContent: {
    alignItems: 'center',
    padding: 8,
  },
  bannerContainer: {
    marginBottom: 16,
  },
  adBanner: {
    width: width - 80,
    height: 150,
    marginRight: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  bottomNav: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;

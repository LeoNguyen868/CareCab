import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Dimensions,
  SafeAreaView,
  Image 
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

const { width, height } = Dimensions.get('window');
const scale = size => (width / 320) * size;

const MainScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const userData = route.params?.userData || {};
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'calendar', title: 'Appointments', focusedIcon: 'calendar', unfocusedIcon: 'calendar-outline' },
    { key: 'chat', title: 'Messages', focusedIcon: 'message', unfocusedIcon: 'message-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' }, // Changed from profile to settings
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => (
      <ScrollView style={styles.scrollView}>
        {/* Upcoming Appointments Section */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title>Upcoming Appointments</Title>
            <Text style={styles.noActivityText}>No upcoming appointments</Text>
          </Card.Content>
        </Card>

        {/* Main Features Grid */}
        <View style={styles.featuresGrid}>
          <Card style={styles.featureCard} onPress={() => navigation.navigate('NewAppointment')}>
            <Card.Content style={styles.featureContent}>
              <IconButton icon="calendar-plus" size={30} />
              <Text>New Appointment</Text>
            </Card.Content>
          </Card>
          <Card style={styles.featureCard} onPress={() => navigation.navigate('MyAppoinments')}>
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
    calendar: () => <CalendarScreen navigation={navigation} />,
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

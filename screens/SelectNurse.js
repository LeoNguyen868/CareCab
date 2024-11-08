import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Appbar, ActivityIndicator } from 'react-native-paper';
import { checkAvailableNurses, getUserProfile } from '../api/apis';

const NurseItem = ({ nurse, onSelect }) => {
  return (
    <TouchableOpacity style={styles.nurseItem} onPress={() => onSelect(nurse)}>
      <Image 
        source={require('../assets/avatar-default.png')}
        style={styles.nurseAvatar}
      />
      <View style={styles.nurseInfo}>
        <Text style={styles.nurseName}>{nurse.fullName}</Text>
        <Text style={styles.nurseSpecialty}>{nurse.bio || nurse.specialization}</Text>
        <Text style={styles.nurseExperience}>Experience: {nurse.experience_years} years</Text>
      </View>
    </TouchableOpacity>
  );
};

const SelectNurse = ({ route, navigation }) => {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { appointmentDateTime } = route.params;

  const fetchNurses = async () => {
    try {
      const availableNurses = await checkAvailableNurses(appointmentDateTime);
      console.log('availableNurses:', availableNurses);
      // Fetch user profiles for each nurse
      const nursesWithProfiles = await Promise.all(
        availableNurses.map(async (nurse) => {
          const userProfile = await getUserProfile(nurse.user_id);
          return {
            ...nurse,
            fullName: userProfile.full_name,
            bio: userProfile.bio
          };
        })
      );
      
      setNurses(nursesWithProfiles);
    } catch (error) {
      console.error('Error fetching nurses:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNurses();
  }, [appointmentDateTime]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNurses();
  }, [appointmentDateTime]);

  const handleNurseSelect = (nurse) => {
    navigation.navigate('NewAppointment', { selectedNurse: nurse });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Select Nurse" />
      </Appbar.Header>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={nurses}
          renderItem={({ item }) => <NurseItem nurse={item} onSelect={handleNurseSelect} />}
          keyExtractor={item => item.nurse_id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nurseExperience: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  }
});

export default SelectNurse;

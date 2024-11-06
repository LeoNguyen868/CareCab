import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Text, Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserProfile,generateEmptyUserProfile } from '../api/apis';
const UserProfileScreen = ({ navigation, route }) => {
  const [userProfile, setUserProfile] = useState(null);
  const userData = route.params?.userData || {};

  // Add focus effect
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserProfile();
    });

    // Clean up the listener
    return unsubscribe;
  }, [navigation]);

  const loadUserProfile = async () => {
    
    try {
      const profile = await getUserProfile(userData.user_id);
      //console.log('Loaded profile:', profile);
      console.log();
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading profile:', error);
      generateEmptyUserProfile(userData.user_id);
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditProfile', { 
      userProfile: {
        user_id: userData.user_id,
        full_name: userProfile?.full_name || '',
        date_of_birth: userProfile?.date_of_birth || '',
        gender: userProfile?.gender || '',
        address: userProfile?.address || '',
        bio: userProfile?.bio || '',
      },
      data: userData
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="pencil" onPress={handleEdit} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={120}
            source={require('../assets/avatar-default.png')}
          />
        </View>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Title style={styles.name}>{userProfile?.full_name || 'No name set'}</Title>
            <View style={styles.basicInfo}>
              {/* Removed gender from here */}
            </View>

            <View style={styles.bioSection}>
              <Title style={styles.sectionTitle}>Bio</Title>
              <Paragraph>{userProfile?.bio || 'No bio available'}</Paragraph>
            </View>
            
            <View style={styles.infoSection}>
              <Title style={styles.sectionTitle}>Personal Information</Title>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Gender:</Text>
                <Text>{userProfile?.gender || 'Not specified'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Date of Birth:</Text>
                <Text>{userProfile?.date_of_birth || 'Not set'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Address:</Text>
                <Text>{userProfile?.address || 'Not set'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone:</Text>
                <Text>{ userData.phone_number || 'Not set'}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  infoCard: {
    margin: 16,
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  basicInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
    width: 100,
  },
  bioSection: {
    marginBottom: 24,
    marginTop: 8,
  },
});

export default UserProfileScreen;

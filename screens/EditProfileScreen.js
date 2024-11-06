import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Appbar, HelperText, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateUserProfile, createUserProfile } from '../api/apis';

const EditProfileScreen = ({ navigation, route }) => {
  const initialProfile = route.params?.userProfile || {};
    const userData = route.params?.data || {};
  const [profile, setProfile] = useState(initialProfile);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const genderOptions = [
    'Male',
    'Female',
    'Other',
    'Prefer not to say'
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors({});

      // Basic validation
      let newErrors = {};
      if (!profile.full_name) newErrors.full_name = 'Name is required';
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        console.log('Updating profile:', profile);
        await updateUserProfile(profile.user_id, profile);
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.log('Profile not found, creating new one...');
          await createUserProfile(profile);
        } else {
          throw error;
        }
      }
      
      // Navigate back and force a refresh of the profile screen
      navigation.navigate('UserProfile', {
        userData
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Profile" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <TextInput
          label="Full Name"
          value={profile.full_name}
          onChangeText={(value) => updateField('full_name', value)}
          style={styles.input}
          error={!!errors.full_name}
        />
        <HelperText type="error" visible={!!errors.full_name}>
          {errors.full_name}
        </HelperText>

        <TextInput
          label="Date of Birth"
          value={profile.date_of_birth}
          onChangeText={(value) => updateField('date_of_birth', value)}
          style={styles.input}
        />

        <List.Accordion
          title="Gender"
          description={profile.gender || 'Select gender'}
          expanded={showGenderDropdown}
          onPress={() => setShowGenderDropdown(!showGenderDropdown)}
          style={styles.input}
        >
          {genderOptions.map((gender) => (
            <List.Item
              key={gender}
              title={gender}
              onPress={() => {
                updateField('gender', gender);
                setShowGenderDropdown(false);
              }}
            />
          ))}
        </List.Accordion>

        <TextInput
          label="Bio"
          value={profile.bio}
          onChangeText={(value) => updateField('bio', value)}
          style={styles.input}
          multiline
          numberOfLines={3}
        />

        <HelperText type="error" visible={!!errors.submit}>
          {errors.submit}
        </HelperText>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Save Changes
        </Button>
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
    padding: 16,
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 16,
    marginBottom: 32,
  },
  dropdown: {
    backgroundColor: 'white',
    marginTop: -8,
    marginBottom: 8,
    elevation: 2,
  },
});

export default EditProfileScreen;

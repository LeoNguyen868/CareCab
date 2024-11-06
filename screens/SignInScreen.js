import React, { useState } from 'react';
import { 
  StyleSheet, 
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { 
  TextInput,
  Button,
  Title,
  Text,
  Surface,
  useTheme,
  ActivityIndicator,
  IconButton,
  Appbar,
  Provider as PaperProvider,
} from 'react-native-paper';
import { registerUser } from '../api/apis';
import { customTheme } from '../theme';

const { width, height } = Dimensions.get("window");
const scale = size => (width / 320) * size;
const verticalScale = size => (height / 720) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState(''); // Add this line
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const theme = useTheme();

  const handleSignIn = async () => {
    if (!email || !password || !confirmPassword || !phone || !username) { // Update validation
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const userData = {
        username,
        email,
        password,
        phone
      };
      
      const response = await registerUser(userData);
      console.log('Registration successful:', response);
      
      Alert.alert(
        'Success',
        'Registration successful!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginFrame')
          }
        ]
      );
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaView style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="" />
        </Appbar.Header>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Surface style={styles.formContainer}>
              <Title style={styles.title}>Sign In</Title>
              
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TextInput
                mode="outlined"
                label="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                style={styles.input}
                left={<TextInput.Icon icon="account" />}
              />

              <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                mode="outlined"
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.input}
                left={<TextInput.Icon icon="phone" />}
              />

              <TextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} 
                       onPress={() => setShowPassword(!showPassword)} />}
              />

              <TextInput
                mode="outlined"
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                left={<TextInput.Icon icon="lock-check" />}
                right={<TextInput.Icon icon={showConfirmPassword ? "eye-off" : "eye"} 
                       onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
              />

              <Button
                mode="contained"
                onPress={handleSignIn}
                loading={loading}
                disabled={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Sign In
              </Button>
            </Surface>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: moderateScale(20),
    margin: moderateScale(16),
    borderRadius: moderateScale(10),
    elevation: 4,
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  input: {
    marginBottom: verticalScale(12),
  },
  button: {
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(6),
  },
  buttonContent: {
    height: verticalScale(40),
  },
  errorText: {
    color: '#B00020',
    marginBottom: verticalScale(12),
    textAlign: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  }
});

export default SignInScreen;

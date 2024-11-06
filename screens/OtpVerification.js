import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { otp } from '../api/apis';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const OtpVerification = () => {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigation = useNavigation();
  const [dat,setData]=useState([]);  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSendOtp = async () => {
    try {
      if (!email) {
        Alert.alert('Lỗi', 'Vui lòng nhập email');
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert('Lỗi', 'Email không hợp lệ');
        return;
      }
      setData(await otp(email.trim()));
        console.log(dat);
      setIsOtpSent(true);
      Alert.alert('Thành công', 'Mã OTP đã được gửi đến email của bạn');
    } catch (error) {
      console.log('OTP Error:', error);
      Alert.alert('Lỗi', error.message || 'Không thể gửi OTP');
    }
  };

  const handleVerifyOtp = () => {
    if (!otpCode) {
      Alert.alert('Error', 'Please enter OTP code');
      return;
    }
    // Here you would verify the OTP with your backend
    // For demonstration, we'll just navigate to ChangePassword
    if(otpCode==dat.OTP){
      console.log('OTP code is correct');
      setData([]);
      navigation.navigate('ChangePassword', { email: email });
      
    }
    else{
        Alert.alert('Error', 'wrong OTP code');
    }
    
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {!isOtpSent ? (
        <>
          <Text style={styles.title}>Xác thực Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập địa chỉ email"
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity 
            style={[
              styles.button,
              !email ? styles.buttonDisabled : null
            ]} 
            onPress={handleSendOtp}
            disabled={!email}
          >
            <Text style={styles.buttonText}>Gửi mã OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP code"
            value={otpCode}
            onChangeText={setOtpCode}
            keyboardType="number-pad"
            maxLength={6}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default OtpVerification;

import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert, Dimensions,SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { TextInput as RNPTextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { RFPercentage } from "react-native-responsive-fontsize"; // For responsive font sizes
import { loginUser } from '../api/apis';
const { width, height } = Dimensions.get("window"); // Get device dimensions

const LoginFrame = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Tài khoản và mật khẩu không được để trống!");
      return;
    }
    setError("");  // Xóa thông báo lỗi nếu có
    try {
      const response = await loginUser(username, password);
      console.log(response)
      navigation.navigate('MainScreen', {userData: response.data});
    } catch (error) {
      setError("Tài khoản hoặc mật khẩu không đúng");
    }
  };
  const handleSignIn = async() => {
    navigation.navigate('SignInScreen');
  }
  const handleForgotPassword = () => {
    navigation.navigate('OtpVerification');
  };
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        contentFit="cover"
        source={require("../assets/hinhnen.png")}
      />
      <Text style={styles.headerText}>Đăng nhập</Text>

      <View style={styles.inputContainer}>
        <RNPTextInput
          style={styles.input}
          label="Tài khoản"
          placeholder="Tài khoản/số điện thoại"
          mode="outlined"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#515050"
          theme={{
            fonts: { regular: { fontFamily: "Inter", fontWeight: "Regular" } },
            colors: { text: "#515050" },
          }}
        />
        <RNPTextInput
          style={styles.input}
          label="Mật khẩu"
          placeholder="Mật khẩu"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#515050"
          theme={{
            fonts: { regular: { fontFamily: "Inter", fontWeight: "Regular" } },
            colors: { text: "#515050" },
          }}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity 
        style={styles.forgotPasswordButton} 
        onPress={handleForgotPassword}
        activeOpacity={0.7}
      >
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </Pressable>

      <View style={styles.signup}>
        <LinearGradient
          style={styles.signupGradient}
          locations={[0, 1]}
          colors={["#0b6efe", "rgba(196, 196, 196, 0)"]}
        />
        <Text style={styles.signupText}>Hoặc đăng Ký </Text>
        <LinearGradient
          style={styles.signupGradient}
          locations={[0, 1]}
          colors={["#0b6efe", "rgba(196, 196, 196, 0)"]}
        />
      </View>

      <View style={styles.socialLogin}>
        <Pressable onPress={handleSignIn}>
        <Image
          style={styles.socialButton}
          contentFit="cover"
          source={require("../assets/googlebutton.png")}
        />
        </Pressable>
        <Pressable onPress={handleSignIn}>
        <Image
          style={styles.socialButton}
          contentFit="cover"
          source={require("../assets/facebookbutton.png")}
        />
        </Pressable>
        
        <Pressable onPress={handleSignIn}>
        <Image
          style={styles.socialButton}
          contentFit="cover"
          source={require("../assets/applebutton.png")}
        />
        </Pressable>
        
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.lightGray0,
  },
  backgroundImage: {
    width: width * 0.9, // 90% of screen width
    height: height * 0.25, // 25% of screen height
    position: "absolute",
    top: 20,
  },
  headerText: {
    fontSize: RFPercentage(3.5), // Responsive font size
    color: Color.lightGray11,
    fontFamily: FontFamily.textXlSemibold,
    marginVertical: height * 0.02, // Adjust margin based on screen height
  },
  inputContainer: {
    width: width * 0.9, // 90% of screen width
    marginVertical: height * 0.02, // 2% of screen height for vertical margins
  },
  input: {
    marginBottom: 15,
    width: "100%", // Full width within the container
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  forgotPasswordButton: {
    marginVertical: height * 0.02, // Adjust margin
    padding: 10, // Add padding to increase touch area
    alignSelf: 'center', // Center the button
  },
  forgotPasswordText: {
    fontSize: RFPercentage(2), // Responsive font size
    color: Color.colorDodgerblue_100,
    fontFamily: FontFamily.textXlSemibold,
    textAlign: 'center', // Center the text
  },
  loginButton: {
    width: width * 0.9, // 90% of screen width
    height: height * 0.07, // 7% of screen height
    backgroundColor: "#0b6efe",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.02, // Adjust margin
  },
  loginButtonText: {
    fontSize: RFPercentage(3), // Responsive font size
    fontFamily: FontFamily.outfit,
    color: Color.lightGray0,
    fontWeight: "700",
  },
  signup: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.02,
  },
  signupGradient: {
    width: width * 0.35, // 35% of screen width
    height: 3,
    backgroundColor: "transparent",
  },
  signupText: {
    fontSize: RFPercentage(2),
    color: Color.colorDimgray_100,
    fontFamily: FontFamily.textXlSemibold,
    marginLeft: 10,
  },
  socialLogin: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.5, // 50% of screen width
  },
  socialButton: {
    width: 52,
    height: 52,
  },
});

export default LoginFrame;

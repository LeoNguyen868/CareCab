import * as React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable,Dimensions ,SafeAreaView} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
const {height, width} = Dimensions.get('window');

const DoctorsDetails = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.doctorsDetails}>
    <View style={styles.doctorsDetails}>
      <ScrollView
        style={styles.scoller}
        indicatorStyle="default"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scollerScrollViewContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.imageParent}>
          <Image
            style={styles.imageIcon}
            contentFit="cover"
            source={require("../assets/image.png")}
          />
          <View style={styles.drBellamyNicholas}>
            <Text style={styles.drBellamyNicholas1}>Nguyễn Văn A</Text>
          </View>
          <View style={styles.viralogist}>
            <Text style={styles.viralogist1}>Điều dưỡng viên</Text>
          </View>
          <View style={[styles.patients, styles.ratingsLayout]}>
            <View style={styles.rectangleShadowBox} />
            <Text style={[styles.patients1, styles.ratings1Typo]}>
              Bệnh nhân
            </Text>
            <Text style={[styles.text, styles.textTypo]}>100+</Text>
            <Image
              style={[styles.groupIcon, styles.groupIconPosition]}
              contentFit="cover"
              source={require("../assets/group.png")}
            />
          </View>
          <View style={[styles.experience, styles.ratingsLayout]}>
            <View style={styles.rectangleShadowBox} />
            <Text style={[styles.experience1, styles.ratings1Typo]}>
              Kinh nghiệm
            </Text>
            <Text style={[styles.yrs, styles.yrsTypo]}>3 Năm</Text>
            <Image
              style={[styles.groupIcon1, styles.groupIconPosition]}
              contentFit="cover"
              source={require("../assets/group1.png")}
            />
          </View>
          <View style={[styles.ratings, styles.ratingsLayout]}>
            <View style={styles.rectangleShadowBox} />
            <Text style={[styles.ratings1, styles.ratings1Typo]}>Đánh giá</Text>
            <Text style={[styles.text1, styles.textTypo]}>{`4.5 `}</Text>
            <Image
              style={[styles.groupIcon2, styles.groupIconPosition]}
              contentFit="cover"
              source={require("../assets/group2.png")}
            />
          </View>
          <Image
            style={styles.backIcon}
            contentFit="cover"
            source={require("../assets/back.png")}
          />
        </View>
        <View style={styles.about}>
          <Text style={[styles.aboutDoctor, styles.aboutDoctorTypo]}>
            Giới thiệu
          </Text>
          <Text
            style={[styles.drBellamyNicholas2, styles.monSatTypo]}
          >{`Điều dưỡng Nguyễn Văn A, có 3 năm kinh nghiệm.
...`}</Text>
        </View>
        <View style={styles.communication}>
          <Text style={[styles.communication1, styles.aboutDoctorTypo]}>
            Liên lạc
          </Text>
          <View style={[styles.message, styles.iconPosition]}>
            <Text style={[styles.chatMeUp, styles.chatMeUpTypo]}>
              Chia sẻ triệu chứng
            </Text>
            <Image
              style={[styles.icon, styles.iconPosition]}
              contentFit="cover"
              source={require("../assets/icon2.png")}
            />
            <Text style={[styles.messaging, styles.callPosition]}>
              Nhắn tin
            </Text>
          </View>
          <View style={[styles.audio, styles.iconPosition]}>
            <Text style={[styles.callYourDoctor, styles.callTypo]}>
              Gọi điện trực tiếp
            </Text>
            <View style={[styles.icon1, styles.iconLayout1]}>
              <Image
                style={[styles.icon2, styles.homePosition]}
                contentFit="cover"
                source={require("../assets/icon3.png")}
              />
            </View>
            <Text style={[styles.audioCall, styles.callTypo]}>Gọi điện</Text>
          </View>
          <View style={[styles.videoCall, styles.icon3Position]}>
            <Text
              style={[styles.seeYourDoctor, styles.videoCall1Typo]}
            >{`Gọi video trực tiếp `}</Text>
            <Image
              style={[styles.icon3, styles.icon3Position]}
              contentFit="cover"
              source={require("../assets/icon4.png")}
            />
            <Text style={[styles.videoCall1, styles.videoCall1Typo]}>
              Gọi Video
            </Text>
          </View>
        </View>
        <View style={[styles.workingTime, styles.buttonLayout]}>
          <Text style={[styles.workingTime1, styles.aboutDoctorTypo]}>
            Thời gian làm việc
          </Text>
          <Text style={[styles.monSat, styles.monSatTypo]}>
            Hai - Bảy (07:30 - 21:00)
          </Text>
        </View>
        <Pressable
          style={[styles.button, styles.buttonLayout]}
          onPress={() => navigation.navigate("NewAppointment")}
        >
          <View style={styles.rectangle3} />
          <Text style={[styles.bookAppointment, styles.yrsTypo]}>
            Đặt lịch hẹn
          </Text>
        </Pressable>
      </ScrollView>
      <View style={[styles.navigation, styles.navigationLayout]}>
        <View style={[styles.navigationChild, styles.navigationLayout]} />
        <Pressable
          style={styles.setting}
          onPress={() => navigation.navigate("Setting")}
        >
          <Image
            style={[styles.icon4, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/setting.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.noti, styles.notiPosition]}
          onPress={() => navigation.navigate("Notification1")}
        >
          <Image
            style={[styles.icon4, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/noti.png")}
          />
        </Pressable>
        <Image
          style={styles.navigationItem}
          contentFit="cover"
          source={require("../assets/line-1.png")}
        />
        <Pressable
          style={[styles.home, styles.homePosition]}
          onPress={() => navigation.navigate("MainFrame")}
        >
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/home.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.schedule, styles.notiPosition]}
          onPress={() => navigation.navigate("MyAppoinments")}
        >
          <Image
            style={[styles.icon4, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/schedule.png")}
          />
        </Pressable>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scollerScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 170,
    paddingTop: 50,
  },
  ratingsLayout: {
    height: 116 * height / 800,
    width: 102 * width / 360,
    top: 241 * height / 800,
    position: "absolute",
  },
  ratings1Typo: {
    fontSize: FontSize.size_xs,
    top: 97 * height / 800,
    fontWeight: "900",
    color: Color.colorSlategray_100,
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    position: "absolute",
  },
  textTypo: {
    letterSpacing: 1,
    top: 73 * height / 800,
    fontWeight: "900",
    textAlign: "center",
    color: Color.colorDarkslategray_500,
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  groupIconPosition: {
    height: 56 * height / 800,
    top: 0,
    position: "absolute",
  },
  yrsTypo: {
    fontSize: FontSize.subHeader3BoldMulish_size,
    fontWeight: "900",
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    position: "absolute",
  },
  aboutDoctorTypo: {
    textAlign: "left",
    color: Color.colorDarkslategray_500,
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  monSatTypo: {
    lineHeight: 20,
    fontSize: FontSize.textSmSemibold_size,
    textAlign: "left",
    fontWeight: "900",
    color: Color.colorSlategray_100,
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    left: 10,
    position: "absolute",
  },
  iconPosition: {
    height: 47 * height / 800,
    left: 0,
    position: "absolute",
  },
  chatMeUpTypo: {
    left: 60 * width / 360,
    textAlign: "left",
    fontWeight: "900",
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    position: "absolute",
  },
  callPosition: {
    top: 5 * height / 800,
    fontSize: FontSize.subHeader3BoldMulish_size,
    color: Color.colorDarkslategray_500,
  },
  callTypo: {
    left: 62 * width / 360,
    textAlign: "left",
    fontWeight: "900",
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    position: "absolute",
  },
  iconLayout1: {
    borderRadius: Border.br_mini,
    top: 0,
  },
  homePosition: {
    top: 14 * height / 800,
    position: "absolute",
  },
  icon3Position: {
    height: 48 * height / 800,
    left: 0,
    position: "absolute",
  },
  videoCall1Typo: {
    left: 63 * width / 360,
    textAlign: "left",
    fontWeight: "900",
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    position: "absolute",
  },
  buttonLayout: {
    width: 309 * width / 360,
    overflow: "hidden",
  },
  navigationLayout: {
    height: 83 * height / 800,
    width: 360 * width / 360,
    left: 0,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  notiPosition: {
    height: "25.9%",
    bottom: "50%",
    top: "24.1%",
    position: "absolute",
  },
  imageIcon: {
    top: 55 * height / 800,
    left: 113,
    width: 112 * width / 360,
    height: 98 * height / 800,
    position: "absolute",
  },
  drBellamyNicholas1: {
    left: 12 * width / 360,
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
    color: Color.colorDarkslategray_500,
    top: 0,
    position: "absolute",
  },
  drBellamyNicholas: {
    top: 173 * height / 800,
    left: 89 * width / 360,
    width: 159 * width / 360,
    height: 22 * height / 800,
    position: "absolute",
  },
  viralogist1: {
    left: 14 * width / 360,
    fontSize: FontSize.size_smi,
    color: Color.colorSlategray_100,
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    top: 0,
    position: "absolute",
  },
  viralogist: {
    top: 203 * height / 800,
    left: 101 * width / 360,
    width: 142 * width / 360,
    height: 15 * height / 800,
    position: "absolute",
  },
  rectangleShadowBox: {
    width: 96 * width / 360,
    borderRadius: Border.br_2xl,
    shadowOpacity: 1,
    elevation: 25,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 10 * height / 800,
    },
    shadowColor: "rgba(107, 119, 154, 0.05)",
    height: 116 * height / 800,
    left: 0,
    top: 0,
    position: "absolute",
    backgroundColor: Color.lightGray0,
  },
  patients1: {
    fontWeight: "900",
    left: 25 * width / 360,
  },
  text: {
    left: 32 * width / 360,
    fontSize: 15,
  },
  groupIcon: {
    width: 55 * width / 360,
    left: 21 * width / 360,
  },
  patients: {
    left: 10 * width / 360,
  },
  experience1: {
    left: 20 * width / 360,
    fontWeight: "900",
  },
  yrs: {
    top: 70 * height / 800,
    left: 28 * width / 360,
    color: Color.colorDarkslategray_500,
    fontSize: FontSize.subHeader3BoldMulish_size,
  },
  groupIcon1: {
    left: 18 * width / 360,
    width: 60 * width / 360,
  },
  experience: {
    left: 110 * width / 360,
  },
  ratings1: {
    left: 30 * width / 360,
    fontWeight: "900",
  },
  text1: {
    left: 40 * width / 360,
    fontSize: 17,
  },
  groupIcon2: {
    width: 51 * width / 360,
    left: 22 * width / 360,
  },
  ratings: {
    left: 216 * width / 360,
  },
  backIcon: {
    width: 63 * width / 360,
    height: 62 * height / 800,
    left: 0,
    top: 0,
    position: "absolute",
  },
  imageParent: {
    width: 318 * width / 360,
    height: 357 * height / 800,
  },
  aboutDoctor: {
    top: 10 * height / 800,
    left: 0,
  },
  drBellamyNicholas2: {
    top: 34 * height / 800,
    height: 38 * height / 800,
    width: 314 * width / 360,
  },
  about: {
    height: 178 * height / 800,
    overflow: "hidden",
    width: 314 * width / 360,
  },
  communication1: {
    top: -4 * height / 800,
    fontWeight: "900",
    left: 0,
  },
  chatMeUp: {
    top: 29 * height / 800,
    fontSize: FontSize.size_xs,
    color: Color.colorSlategray_100,
  },
  icon: {
    width: 50 * width / 360,
    top: 0,
  },
  messaging: {
    left: 60 * width / 360,
    textAlign: "left",
    fontWeight: "900",
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    position: "absolute",
  },
  message: {
    top: 39 * height / 800,
    width: 211 * width / 360,
    height: 47 * height / 800,
    overflow: "hidden",
  },
  callYourDoctor: {
    top: 29 * height / 800,
    fontSize: FontSize.size_xs,
    color: Color.colorSlategray_100,
  },
  icon2: {
    width: 21 * width / 360,
    height: 19 * height / 800,
    left: 16 * width / 360,
  },
  icon1: {
    backgroundColor: "rgba(122, 206, 250, 0.15)",
    width: 52 * width / 360,
    height: 47 * height / 800,
    left: 0,
    position: "absolute",
  },
  audioCall: {
    top: 5 * height / 800,
    fontSize: FontSize.subHeader3BoldMulish_size,
    color: Color.colorDarkslategray_500,
  },
  audio: {
    top: 98 * height / 800,
    width: 211 * width / 360,
    height: 47 * height / 800,
    overflow: "hidden",
  },
  seeYourDoctor: {
    top: 29 * height / 800,
    fontSize: FontSize.size_xs,
    color: Color.colorSlategray_100,
  },
  icon3: {
    width: 53 * width / 360,
    borderRadius: Border.br_mini,
    top: 0,
  },
  videoCall1: {
    top: 5 * height / 800,
    fontSize: FontSize.subHeader3BoldMulish_size,
    color: Color.colorDarkslategray_500,
  },
  videoCall: {
    top: 157 * height / 800,
    width: 189 * width / 360,
    overflow: "hidden",
  },
  communication: {
    width: 282 * width / 360,
    height: 221 * height / 800,
    overflow: "hidden",
  },
  workingTime1: {
    top: -2 * height / 800,
    left: 1 * width / 360,
    fontWeight: "900",
  },
  monSat: {
    top: 31 * height / 800,
  },
  workingTime: {
    top: 10,
    height: 76 * height / 800,
  },
  rectangle3: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorMediumslateblue,
    width: 310 * width / 360,
    height: 55 * height / 800,
    left: 0,
    top: 0,
    position: "absolute",
  },
  bookAppointment: {
    top: 16 * height / 800,
    left: 115 * width / 360,
    color: Color.lightGray0,
  },
  button: {
    top: 10,  
    height: 55 * height / 800,
  scoller: {
    width: '100%',
    flex: 1,
  },flex: 1,
  },
  navigationChild: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
  },
  icon4: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  setting: {
    left: "85.56%",
    top: "22.89%",
    right: "8.89%",
    bottom: "53.01%",
    width: "5.56%",
    height: "24.1%",
    position: "absolute",
  },
  noti: {
    left: "61.94%",
    right: "32.92%",
    width: "5.14%",
  },
  navigationItem: {
    top: 45 * height / 800,
    left: 56 * width / 360,
    width: 6 * width / 360,
    maxHeight: "100%",
    position: "absolute",
  },
  home: {
    left: 45 * width / 360,
    width: 28 * width / 360,
    height: 28 * height / 800,
  },
  schedule: {
    left: "36.11%",
    right: "58.47%",
    width: "5.42%",
  },
  navigation: {
    top: (718/800)*height,
  },
  doctorsDetails: {
    height: 800*height/800,
    width: "100%",
    flex: 1,
    backgroundColor: Color.lightGray0,
  },
});
export default DoctorsDetails;

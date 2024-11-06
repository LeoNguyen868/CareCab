import * as React from "react";
import { ScrollView, StyleSheet, View, Pressable, Text ,Dimensions} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { TextInput } from "react-native-paper";
const {height, width} = Dimensions.get('window');
const NewAppointment = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.newAppointment}>
      <ScrollView
        style={styles.scoller}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scollerScrollViewContent}
      >
        <View style={styles.head}>
          <Pressable
            style={styles.back}
            onPress={() => navigation.navigate("DoctorsDetails")}
          >
            <View style={styles.rectangle} />
            <Image
              style={[styles.icon, styles.iconPosition]}
              contentFit="cover"
              source={require("../assets/icon.png")}
            />
          </Pressable>
          <View style={[styles.newAppointment1, styles.iconPosition]}>
            <Text style={[styles.newAppointment2, styles.appointmentTypo]}>
              Lịch hẹn mới
            </Text>
          </View>
          <View style={styles.july}>
            <View style={styles.date}>
              <View style={[styles.view, styles.viewLayout]}>
                <View style={[styles.rectangle1, styles.rectangleBorder]} />
                <Text style={[styles.mon, styles.monTypo]}>Hai</Text>
                <Text style={[styles.text, styles.textTypo]}>13</Text>
              </View>
              <View style={[styles.view1, styles.viewLayout]}>
                <View style={[styles.rectangle2, styles.rectanglePosition]} />
                <Text style={[styles.tue, styles.monTypo]}>Ba</Text>
                <Text style={[styles.text1, styles.textTypo]}>14</Text>
              </View>
              <View style={[styles.view2, styles.viewLayout]}>
                <View style={[styles.rectangle1, styles.rectangleBorder]} />
                <Text style={[styles.wed, styles.monTypo]}>Tư</Text>
                <Text style={[styles.text, styles.textTypo]}>15</Text>
              </View>
              <View style={[styles.view3, styles.viewLayout]}>
                <View style={[styles.rectangle1, styles.rectangleBorder]} />
                <Text style={[styles.thur, styles.monTypo]}>Năm</Text>
                <Text style={[styles.text, styles.textTypo]}>16</Text>
              </View>
              <View style={[styles.view4, styles.viewLayout]}>
                <View style={[styles.rectangle1, styles.rectangleBorder]} />
                <Text style={[styles.fri, styles.friPosition]}>Sáu</Text>
                <Text style={[styles.text, styles.textTypo]}>17</Text>
              </View>
            </View>
            <Text style={[styles.july2020, styles.writeTypo]}>Thg 9, 2024</Text>
          </View>
        </View>
        <View style={styles.availableTime}>
          <Text style={[styles.availableTime1, styles.gender1Typo]}>
            Thời gian
          </Text>
          <View style={[styles.group, styles.groupLayout]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.am, styles.amTypo]}>09:00</Text>
          </View>
          <View style={[styles.group1, styles.groupLayout]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.am1, styles.amTypo]}>{`09:30 `}</Text>
          </View>
          <View style={[styles.group2, styles.groupLayout]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.am2, styles.amTypo]}>10:00</Text>
          </View>
          <View style={[styles.group3, styles.groupPosition1]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.pm, styles.amTypo]}>{`12:00 `}</Text>
          </View>
          <View style={[styles.group4, styles.groupPosition1]}>
            <View style={[styles.rectangle10, styles.groupLayout]} />
            <Text style={[styles.pm1, styles.amTypo]}>{`12:30 `}</Text>
          </View>
          <View style={[styles.group5, styles.groupPosition1]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.pm, styles.amTypo]}>{`13:30 `}</Text>
          </View>
          <View style={[styles.group6, styles.groupLayout]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.pm, styles.amTypo]}>{`10:30 `}</Text>
          </View>
          <View style={[styles.group7, styles.groupPosition1]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.am4, styles.amTypo]}>{`14:00 `}</Text>
          </View>
          <View style={[styles.group8, styles.groupPosition]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.pm, styles.amTypo]}>{`15:00 `}</Text>
          </View>
          <View style={[styles.group9, styles.groupPosition]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.pm, styles.amTypo]}>16:30</Text>
          </View>
          <View style={[styles.group10, styles.groupPosition]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.pm, styles.amTypo]}>17:00</Text>
          </View>
          <View style={[styles.group11, styles.groupPosition]}>
            <View style={[styles.rectangle6, styles.groupLayout]} />
            <Text style={[styles.am5, styles.amTypo]}>17:30</Text>
          </View>
        </View>
        <View style={styles.infor}>


          <View style={styles.problem}>
            <View style={[styles.textField, styles.textFieldLayout]}>
              <View style={[styles.rectangle19, styles.rectangleBg]} />
              <TextInput
                placeholder="Viết triệu chứng của bạn"
                multiline={true}
                numberOfLines={4}
                backgroundColor={Color.lightGray0}
              />
            </View>
            <Text style={[styles.writeYourProblem1, styles.writeTypo]}>
              Triệu chứng
            </Text>
          </View>
          <View style={styles.patientDetails}>
            <Text style={[styles.patientDetails1, styles.writeTypo]}>
              Thông tin bệnh nhân
            </Text>
          </View>
          <View style={[styles.fullName, styles.fullNameLayout]}>
            <View style={[styles.textField1, styles.textLayout]}>
              <View style={[styles.rectangle20, styles.textLayout]} />
              <Text style={[styles.toluArowoselu, styles.ageTypo]}>
                Nguyễn Văn B
              </Text>
            </View>
            <Text style={[styles.fullName1, styles.ageTypo]}>Tên đầy đủ</Text>
          </View>
          <View style={[styles.textFieldParent, styles.fullNameLayout]}>
            <View style={[styles.textField2, styles.textLayout]}>
              <View style={[styles.rectangle20, styles.textLayout]} />
              <Image
                style={styles.icon1}
                contentFit="cover"
                source={require("../assets/icon1.png")}
              />
              <Text style={[styles.toluArowoselu, styles.ageTypo]}>
                26 - 30
              </Text>
            </View>
            <Text style={[styles.age, styles.ageTypo]}>Tuổi</Text>
          </View>
          <View style={styles.gender}>
            <View style={[styles.male, styles.rectangleLayout]}>
              <View style={[styles.rectangle22, styles.rectangleLayout]} />
              <Text style={[styles.male1, styles.amTypo]}>Nam</Text>
            </View>
            <View style={[styles.female, styles.rectangleLayout]}>
              <View style={[styles.rectangle23, styles.rectangleLayout]} />
              <Text style={[styles.female1, styles.amTypo]}>Nữ</Text>
            </View>
            <Text style={[styles.gender1, styles.gender1Typo]}>Giới tính</Text>
          </View>
        </View>
        <Pressable
            style={[styles.button, styles.buttonLayout]}
            onPress={() => navigation.navigate("Chongoi")}
          >
            <View style={[styles.rectangle18, styles.buttonLayout]} />
            <Text style={[styles.setAppointment, styles.appointmentTypo]}>
              Chọn gói đăng ký
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
            style={[styles.icon2, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/setting.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.noti, styles.notiPosition]}
          onPress={() => navigation.navigate("Notification1")}
        >
          <Image
            style={[styles.icon2, styles.iconLayout]}
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
          style={styles.home}
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
            style={[styles.icon2, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/schedule.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scollerScrollViewContent: {
    flexDirection: "none",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 34,
    paddingTop: 50,
    paddingBottom: 150,

  },
  iconPosition: {
    top: 13 * height / 800,
    position: "absolute",
  },
  appointmentTypo: {
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    fontWeight: "900",
    letterSpacing: 0,
    position: "absolute",
  },
  viewLayout: {
    width: 65 * width / 360,
    overflow: "hidden",
    height: 87 * height / 800,
    top: 0,
    position: "absolute",
  },
  rectangleBorder: {
    borderColor: Color.colorSlategray_300,
    borderWidth: 1,
    borderStyle: "solid",
    left: 0,
    top: 0,
    backgroundColor: Color.lightGray0,
  },
  monTypo: {
    fontSize: FontSize.size_xs,
    top: 59 * height / 800,
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    fontWeight: "900",
    letterSpacing: 0,
    position: "absolute",
  },
  textTypo: {
    fontSize: FontSize.size_5xl,
    top: 17 * height / 800,
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    fontWeight: "900",
    letterSpacing: 0,
    position: "absolute",
  },
  rectanglePosition: {
    backgroundColor: Color.colorMediumslateblue,
    left: 0,
    top: 0,
  },
  friPosition: {
    left: 21 * width / 360,
    color: Color.colorSlategray_100,
  },
  writeTypo: {
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    fontWeight: "900",
    letterSpacing: 0,
    position: "absolute",
  },
  gender1Typo: {
    top: -2 * height / 800,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    fontWeight: "900",
    letterSpacing: 0,
    position: "absolute",
  },
  groupLayout: {
    width: 82 * width / 360,
    height: 39 * height / 800,
    position: "absolute",
  },
  amTypo: {
    top: 12 * height / 800,
    fontSize: FontSize.textSmSemibold_size,
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    fontWeight: "900",
    letterSpacing: 0,
    position: "absolute",
  },
  groupPosition1: {
    top: 90 * height / 800,
    width: 82 * width / 360,
    overflow: "hidden",
    height: 39 * height / 800,
    position: "absolute",
  },
  groupPosition: {
    top: 138 * height / 800,
    width: 82 * width / 360,
    overflow: "hidden",
    height: 39 * height / 800,
    position: "absolute",
  },
  buttonLayout: {
    width: 295 * width / 360,
    position: "absolute",
  },
  textFieldLayout: {
    height: 124 * height / 800,
    width: 332 * width / 360,
    left: 0,
    position: "absolute",
  },
  rectangleBg: {
    backgroundColor: Color.colorSlategray_200,
    borderRadius: Border.br_3xs,
    top: 0,
  },
  fullNameLayout: {
    height: 76 * height / 800,
    width: 332 * width / 360,
    overflow: "hidden",
    position: "absolute",
  },
  textLayout: {
    height: 48 * height / 800,
    width: 295 * width / 360,
    left: 0,
    position: "absolute",
  },
  ageTypo: {
    left: 16 * width / 360,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    fontWeight: "900",
    letterSpacing: 0,
    position: "absolute",
  },
  rectangleLayout: {
    width: 103 * width / 360,
    height: 39 * height / 800,
    position: "absolute",
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
  rectangle: {
    borderColor: "#f1f4f7",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_3xs,
    height: 39 * height / 800,
    width: 51 * width / 360,
    left: 0,
    top: 0,
    position: "absolute",
    backgroundColor: Color.lightGray0,
  },
  icon: {
    width: 20 * width / 360,
    height: 14 * height / 800,
    left: 15 * width / 360,
  },
  back: {
    left: 8 * width / 360,
    height: 39 * height / 800,
    width: 51 * width / 360,
    top: 0,
    position: "absolute",
  },
  newAppointment2: {
    left: 2 * width / 360,
    color: Color.colorDarkslategray_500,
    fontSize: FontSize.size_lg,
    top: 0,
  },
  newAppointment1: {
    left: 117 * width / 360,
    width: 121 * width / 360,
    height: 42 * height / 800,
  },
  rectangle1: {
    borderRadius: Border.br_smi,
    width: 65 * width / 360,
    height: 87 * height / 800,
    position: "absolute",
  },
  mon: {
    left: 23 * width / 360,
    color: Color.colorSlategray_100,
  },
  text: {
    left: 19 * width / 360,
    color: Color.colorSlategray_100,
  },
  view: {
    overflow: "hidden",
    left: 0,
  },
  rectangle2: {
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 10 * height / 800,
    },
    shadowRadius: 60,
    elevation: 60,
    shadowOpacity: 1,
    borderRadius: Border.br_smi,
    width: 65 * width / 360,
    height: 87 * height / 800,
    position: "absolute",
  },
  tue: {
    left: 24 * width / 360,
    color: Color.lightGray0,
  },
  text1: {
    left: 18 * width / 360,
    color: Color.lightGray0,
  },
  view1: {
    left: 74 * width / 360,
    overflow: "hidden",
  },
  wed: {
    left: 25 * width / 360,
    color: Color.colorSlategray_100,
  },
  view2: {
    left: 147 * width / 360,
    overflow: "hidden",
  },
  thur: {
    left: 19 * width / 360,
    color: Color.colorSlategray_100,
  },
  view3: {
    left: 221 * width / 360,
    overflow: "hidden",
  },
  fri: {
    fontSize: FontSize.size_xs,
    top: 59 * height / 800,
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    fontWeight: "900",
    letterSpacing: 0,
    position: "absolute",
  },
  view4: {
    left: 295 * width / 360,
    overflow: "hidden",
  },
  date: {
    height: 87 * height / 800,
    top: 42 * height / 800,
    width: 360 * width / 360,
    left: 0,
    position: "absolute",
  },
  july2020: {
    top: 4 * height / 800,
    left: 20 * width / 360,
    color: Color.colorDarkslategray_500,
    fontSize: FontSize.size_lg,
  },
  july: {
    top: 46 * height / 800,
    height: 129 * height / 800,
    width: 360 * width / 360,
    left: 0,
    position: "absolute",
  },
  head: {
    height: 175 * height / 800,
    width: 360 * width / 360,
  },
  availableTime1: {
    color: Color.colorDarkslategray_500,
    fontSize: FontSize.size_lg,
    left: 15 * width / 360,
  },
  rectangle6: {
    borderColor: Color.colorSlategray_300,
    borderWidth: 1,
    borderStyle: "solid",
    left: 0,
    top: 0,
    backgroundColor: Color.lightGray0,
    borderRadius: Border.br_3xs,
  },
  am: {
    fontSize: FontSize.textSmSemibold_size,
    left: 18 * width / 360,
    color: Color.colorSlategray_100,
  },
  group: {
    overflow: "hidden",
    top: 42 * height / 800,
    width: 82 * width / 360,
    left: 0,
  },
  am1: {
    width: 45 * width / 360,
    fontSize: FontSize.textSmSemibold_size,
    left: 19 * width / 360,
    color: Color.colorSlategray_100,
  },
  group1: {
    left: 90 * width / 360,
    overflow: "hidden",
    top: 42 * height / 800,
    width: 82 * width / 360,
  },
  am2: {
    fontSize: FontSize.textSmSemibold_size,
    left: 19 * width / 360,
    color: Color.colorSlategray_100,
  },
  group2: {
    left: 180 * width / 360,
    overflow: "hidden",
    top: 42 * height / 800,
    width: 82 * width / 360,
  },
  pm: {
    fontSize: FontSize.textSmSemibold_size,
    left: 20 * width / 360,
    color: Color.colorSlategray_100,
  },
  group3: {
    left: 0,
  },
  rectangle10: {
    backgroundColor: Color.colorMediumslateblue,
    left: 0,
    top: 0,
    borderRadius: Border.br_3xs,
  },
  pm1: {
    fontSize: FontSize.textSmSemibold_size,
    left: 20 * width / 360,
    color: Color.lightGray0,
  },
  group4: {
    left: 90 * width / 360,
  },
  group5: {
    left: 180 * width / 360,
  },
  group6: {
    left: 270 * width / 360,
    overflow: "hidden",
    top: 42 * height / 800,
    width: 82 * width / 360,
  },
  am4: {
    fontSize: FontSize.textSmSemibold_size,
    left: 21 * width / 360,
    color: Color.colorSlategray_100,
  },
  group7: {
    left: 270 * width / 360,
  },
  group8: {
    left: 0,
  },
  group9: {
    left: 90 * width / 360,
  },
  group10: {
    left: 180 * width / 360,
  },
  am5: {
    left: 22 * width / 360,
    fontSize: FontSize.textSmSemibold_size,
    color: Color.colorSlategray_100,
  },
  group11: {
    left: 270 * width / 360,
  },
  availableTime: {
    alignSelf: "stretch",
    height: 176 * height / 800,
    overflow: "hidden",
  },
  rectangle18: {
    borderRadius: Border.br_xl,
    height: 58 * height / 800,
    backgroundColor: Color.colorMediumslateblue,
    left: 0,
    top: 0,
  },
  setAppointment: {
    top: 20 * height / 800,
    left: 98 * width / 360,
    fontSize: FontSize.subHeader3BoldMulish_size,
    color: Color.lightGray0,
  },
  button: {
    top:  height+200,
    height: 58 * height / 800,
    left: 40,
    overflow: "hidden",
  },
  rectangle19: {
    height: 124 * height / 800,
    width: 332 * width / 360,
    left: 0,
    position: "absolute",
    borderWidth:0,
  },
  writeYourProblem: {
    top: 8 * height / 800,
    left: 11 * width / 360,
    width: 155 * width / 360,
    fontSize: FontSize.subHeader3BoldMulish_size,
    color: Color.colorSlategray_100,
    borderWidth:0,
  },
  textField: {
    top: 24 * height / 800,
    overflow: "hidden",
    borderWidth:0,
  },
  writeYourProblem1: {
    top: -3 * height / 800,
    fontSize: FontSize.textSmSemibold_size,
    color: Color.colorSlategray_100,
    left: 0,
  },
  problem: {
    top: 321 * height / 800,
    height: 155 * height / 800,
    width: 332 * width / 360,
    left: 1 * width / 360,
    overflow: "hidden",
    position: "absolute",
    borderWidth:0,
  },
  patientDetails1: {
    color: Color.colorDarkslategray_500,
    fontSize: FontSize.size_lg,
    left: 0,
    top: 0,
  },
  patientDetails: {
    width: 233 * width / 360,
    height: 44 * height / 800,
    left: 0,
    top: 0,
    position: "absolute",
  },
  rectangle20: {
    backgroundColor: Color.colorSlategray_200,
    borderRadius: Border.br_3xs,
    top: 0,
  },
  toluArowoselu: {
    top: 15 * height / 800,
    fontSize: FontSize.subHeader3BoldMulish_size,
    color: Color.colorDarkslategray_500,
  },
  textField1: {
    top: 19 * height / 800,
    overflow: "hidden",
  },
  fullName1: {
    top: 10 * height / 800,
    fontSize: FontSize.textSmSemibold_size,
    color: Color.colorSlategray_100,
  },
  fullName: {
    top: 29 * height / 800,
    left: 0,
  },
  icon1: {
    top: 21 * height / 800,
    left: 267 * width / 360,
    width: 11 * width / 360,
    height: 7 * height / 800,
    position: "absolute",
  },
  textField2: {
    top: 24 * height / 800,
    overflow: "hidden",
  },
  age: {
    top: -1 * height / 800,
    fontSize: FontSize.textSmSemibold_size,
    color: Color.colorSlategray_100,
  },
  textFieldParent: {
    top: 124 * height / 800,
    left: 1 * width / 360,
  },
  rectangle22: {
    backgroundColor: Color.colorMediumslateblue,
    left: 0,
    top: 0,
    borderRadius: Border.br_3xs,
  },
  male1: {
    left: 37 * width / 360,
    fontSize: FontSize.textSmSemibold_size,
    color: Color.lightGray0,
  },
  male: {
    top: 24 * height / 800,
    overflow: "hidden",
    left: 0,
  },
  rectangle23: {
    borderColor: Color.colorSlategray_300,
    borderWidth: 1,
    borderStyle: "solid",
    left: 0,
    top: 0,
    backgroundColor: Color.lightGray0,
    borderRadius: Border.br_3xs,
  },
  female1: {
    left: 41 * width / 360,
    fontSize: FontSize.textSmSemibold_size,
    color: Color.colorSlategray_100,
  },
  female: {
    left: 114 * width / 360,
    top: 24 * height / 800,
    overflow: "hidden",
  },
  gender1: {
    fontSize: FontSize.textSmSemibold_size,
    color: Color.colorSlategray_100,
    left: 0,
  },
  gender: {
    top: 220 * height / 800,
    width: 244 * width / 360,
    height: 65 * height / 800,
    left: 1 * width / 360,
    overflow: "hidden",
    position: "absolute",
  },
  infor: {
    width: 333 * width / 360,
    height: 571* height / 800,
  },
  scoller: {
    width: "100%",
    left: 0,
    top: 0,
    flexGrow: 1,
  },
  navigationChild: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
  },
  icon2: {
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
    top: 45* height / 800,
    left: 56* width / 360,
    width: 6* width / 360,
    maxHeight: "100%",
    position: "absolute",
  },
  home: {
    left: 45* width / 360,
    top: 14* height / 800,
    width: 28* width / 360,
    height: 28* height /800,
    position: "absolute",
  },
  schedule: {
    left: "36.11%",
    right: "58.47%",
    width: "5.42%",
  },
  navigation: {
    top: (718/800+0.06)*height,
  },
  newAppointment: {
    height: 799* height / 800,
    width: "100%",
    backgroundColor: Color.lightGray0,
    flex: 1,
  },
});

export default NewAppointment;

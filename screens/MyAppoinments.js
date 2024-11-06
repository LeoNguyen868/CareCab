import * as React from "react";
import { StyleSheet, View, Text, Pressable, Dimensions,SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
const { width, height } = Dimensions.get("window");
const MyAppoinments = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.myAppoinments}>
    <View style={styles.myAppoinments}>
      <View style={styles.daytime}>
        <View style={[styles.rectangleParent, styles.groupLayout1]}>
          <View style={[styles.groupChild, styles.groupLayout]} />
          <Text style={[styles.text, styles.textTypo]}>8</Text>
          <Text style={[styles.tue, styles.tueLayout]}>Ba</Text>
        </View>
        <View style={[styles.rectangleGroup, styles.groupLayout1]}>
          <View style={[styles.groupItem, styles.groupLayout]} />
          <Text style={[styles.text1, styles.wedTypo]}>9</Text>
          <Text style={[styles.wed, styles.wedTypo]}>Tư</Text>
        </View>
        <View style={[styles.rectangleContainer, styles.groupLayout1]}>
          <View style={[styles.groupChild, styles.groupLayout]} />
          <Text style={[styles.text2, styles.textTypo]}>10</Text>
          <Text style={[styles.thus, styles.tueLayout]}>Năm</Text>
        </View>
        <View style={[styles.groupView, styles.groupLayout1]}>
          <View style={[styles.groupChild, styles.groupLayout]} />
          <Text style={[styles.text2, styles.textTypo]}>11</Text>
          <Text style={[styles.fri, styles.tueLayout]}>Sáu</Text>
        </View>
      </View>
      <View style={styles.filter}>
        <View style={styles.rectangleParent1}>
          <View style={[styles.groupChild1, styles.childBg]} />
          <View style={[styles.groupChild2, styles.groupChildLayout]} />
        </View>
        <Text style={[styles.hy, styles.hyTypo]}>Đã hủy</Text>
        <Text style={[styles.honThnh, styles.hyTypo]}>Hoàn thành</Text>
        <Text style={styles.spTi}>Sắp tới</Text>
      </View>
      <View style={styles.header}>
        <Image
          style={styles.iconlylightarrowLeft}
          contentFit="cover"
          source={require("../assets/iconlylightarrow--left.png")}
        />
        <Image
          style={[styles.mingcutesearchLineIcon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/mingcutesearchline.png")}
        />
        <Image
          style={[styles.materialSymbolscalendarMontIcon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/materialsymbolscalendarmonthoutlinerounded.png")}
        />
        <Text style={[styles.lchHnCa, styles.lchTypo]}>Lịch hẹn của tôi</Text>
      </View>
      <View style={styles.lslich}>
        <View style={styles.bs3}>
          <Image
            style={styles.bs3Child}
            contentFit="cover"
            source={require("../assets/frame-172.png")}
          />
          <View style={styles.frameParent}>
            <View style={styles.frameWrapper}>
              <View style={styles.frameWrapper}>
                <Text style={[styles.lchHnVi, styles.lchTypo]}>
                  Lịch hẹn với BS. Nguyễn Thị C
                </Text>
                <View style={[styles.frameGroup, styles.parentLayout]}>
                  <View
                    style={[
                      styles.materialSymbolscalendarMontParent,
                      styles.parentLayout,
                    ]}
                  >
                    <Image
                      style={[
                        styles.materialSymbolscalendarMontIcon1,
                        styles.parentLayout,
                      ]}
                      contentFit="cover"
                      source={require("../assets/materialsymbolscalendarmonthoutlinerounded1.png")}
                    />
                    <Text style={styles.t10Thng}>Tư, 10 tháng 5</Text>
                  </View>
                  <View
                    style={[
                      styles.icroundAccessTimeParent,
                      styles.parentLayout,
                    ]}
                  >
                    <Image
                      style={[
                        styles.materialSymbolscalendarMontIcon1,
                        styles.parentLayout,
                      ]}
                      contentFit="cover"
                      source={require("../assets/icroundaccesstime.png")}
                    />
                    <Text style={styles.t10Thng}>15:00 -16h30</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.hyWrapper, styles.wrapperLayout]}>
              <Text style={[styles.hy1, styles.hy1Typo]}>Hủy</Text>
            </View>
            <View style={[styles.tLiLchWrapper, styles.wrapperLayout]}>
              <Text style={styles.tLiLch}>Đặt lại lịch</Text>
            </View>
          </View>
        </View>
        <View style={[styles.b2, styles.b2Layout]}>
          <Image
            style={styles.bs3Child}
            contentFit="cover"
            source={require("../assets/frame-172.png")}
          />
          <View style={styles.frameParent}>
            <View style={styles.frameWrapper}>
              <View style={styles.frameWrapper}>
                <Text style={[styles.lchHnVi, styles.lchTypo]}>
                  Lịch hẹn với BS. Nguyễn Thị C
                </Text>
                <View style={[styles.frameGroup, styles.parentLayout]}>
                  <View
                    style={[
                      styles.materialSymbolscalendarMontParent,
                      styles.parentLayout,
                    ]}
                  >
                    <Image
                      style={[
                        styles.materialSymbolscalendarMontIcon1,
                        styles.parentLayout,
                      ]}
                      contentFit="cover"
                      source={require("../assets/materialsymbolscalendarmonthoutlinerounded1.png")}
                    />
                    <Text style={styles.t10Thng}>Tư, 10 tháng 5</Text>
                  </View>
                  <View
                    style={[
                      styles.icroundAccessTimeParent,
                      styles.parentLayout,
                    ]}
                  >
                    <Image
                      style={[
                        styles.materialSymbolscalendarMontIcon1,
                        styles.parentLayout,
                      ]}
                      contentFit="cover"
                      source={require("../assets/icroundaccesstime.png")}
                    />
                    <Text style={styles.t10Thng}>15:00 -16h30</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.hyWrapper, styles.wrapperLayout]}>
              <Text style={[styles.hy2, styles.hy1Typo]}>Hủy</Text>
            </View>
            <View style={[styles.tLiLchWrapper, styles.wrapperLayout]}>
              <Text style={styles.tLiLch}>Đặt lại lịch</Text>
            </View>
          </View>
        </View>
        <View style={[styles.bs1, styles.b2Layout]}>
          <Image
            style={styles.bs3Child}
            contentFit="cover"
            source={require("../assets/frame-172.png")}
          />
          <View style={styles.frameParent}>
            <View style={styles.frameWrapper}>
              <View style={styles.frameWrapper}>
                <Text style={[styles.lchHnVi, styles.lchTypo]}>
                  Lịch hẹn với BS. Nguyễn Thị C
                </Text>
                <View style={[styles.frameGroup, styles.parentLayout]}>
                  <View
                    style={[
                      styles.materialSymbolscalendarMontParent,
                      styles.parentLayout,
                    ]}
                  >
                    <Image
                      style={[
                        styles.materialSymbolscalendarMontIcon1,
                        styles.parentLayout,
                      ]}
                      contentFit="cover"
                      source={require("../assets/materialsymbolscalendarmonthoutlinerounded1.png")}
                    />
                    <Text style={styles.t10Thng}>Tư, 10 tháng 5</Text>
                  </View>
                  <View
                    style={[
                      styles.icroundAccessTimeParent,
                      styles.parentLayout,
                    ]}
                  >
                    <Image
                      style={[
                        styles.materialSymbolscalendarMontIcon1,
                        styles.parentLayout,
                      ]}
                      contentFit="cover"
                      source={require("../assets/icroundaccesstime.png")}
                    />
                    <Text style={styles.t10Thng}>15:00 -16h30</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.hyWrapper, styles.wrapperLayout]}>
              <Text style={[styles.hy2, styles.hy1Typo]}>Hủy</Text>
            </View>
            <View style={[styles.tLiLchWrapper, styles.wrapperLayout]}>
              <Text style={styles.tLiLch}>Đặt lại lịch</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.navigation, styles.navigationLayout]}>
        <View style={[styles.navigation1, styles.iconLayout]}>
          <View style={[styles.navigationChild, styles.navigationLayout]} />
          <Pressable
            style={styles.setting}
            onPress={() => navigation.navigate("Setting")}
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/setting.png")}
            />
          </Pressable>
          <Pressable
            style={[styles.noti, styles.notiPosition]}
            onPress={() => navigation.navigate("Notification1")}
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
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
            style={[styles.home, styles.iconLayout1]}
            onPress={() => navigation.navigate("MainFrame")}
          >
            <Image
              style={[styles.icon2, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/home.png")}
            />
          </Pressable>
          <Pressable
            style={[styles.schedule, styles.notiPosition]}
            onPress={() => navigation.navigate("MyAppoinments")}
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/schedule.png")}
            />
          </Pressable>
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  groupLayout1: {
    width: 64 * width / 360,
    top: 0,
    height: 118 * height / 800,
    position: "absolute",
  },
  groupLayout: {
    borderRadius: Border.br_base,
    width: 64 * width / 360,
    left: 0,
    top: 0,
    height: 118 * height / 800,
    position: "absolute",
  },
  textTypo: {
    textAlign: "center",
    color: Color.colorDarkgray,
    fontFamily: FontFamily.raleway,
    fontWeight: "500",
    position: "absolute",
  },
  tueLayout: {
    lineHeight: 14,
    fontSize: FontSize.textSmSemibold_size,
    top: 69 * height / 800,
  },
  wedTypo: {
    color: Color.lightGray0,
    textAlign: "center",
    fontFamily: FontFamily.raleway,
    fontWeight: "500",
    position: "absolute",
  },
  childBg: {
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
  },
  groupChildLayout: {
    borderRadius: Border.br_xl,
    height: 3 * height / 800,
    left: 0,
    position: "absolute",
  },
  hyTypo: {
    textAlign: "left",
    color: Color.colorGray_100,
    fontFamily: FontFamily.textXlSemibold,
    lineHeight: 30,
    fontSize: FontSize.textSmSemibold_size,
    fontWeight: "500",
    top: 0,
    position: "absolute",
  },
  iconLayout1: {
    height: 28 * height / 800,
    width: 28 * width / 360,
    position: "absolute",
  },
  lchTypo: {
    letterSpacing: 0,
    fontFamily: FontFamily.textXlSemibold,
    textAlign: "center",
    position: "absolute",
  },
  parentLayout: {
    height: 22 * height / 800,
    position: "absolute",
  },
  wrapperLayout: {
    height: 30 * height / 800,
    top: 74 * height / 800,
    borderRadius: Border.br_7xs,
    position: "absolute",
  },
  hy1Typo: {
    left: 31 * width / 360,
    top: 9 * height / 800,
    fontSize: FontSize.size_2xs,
    letterSpacing: 0,
    fontWeight: "600",
    fontFamily: FontFamily.textXlSemibold,
    textAlign: "center",
    position: "absolute",
  },
  b2Layout: {
    width: 310 * width / 360,
    height: 137 * height / 800,
    left: 0,
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
    width: "100%",
  },
  notiPosition: {
    height: "25.9%",
    bottom: "50%",
    top: "24.1%",
    position: "absolute",
  },
  groupChild: {
    borderStyle: "solid",
    borderColor: Color.colorAliceblue_100,
    borderWidth: 1,
    backgroundColor: Color.lightGray0,
    borderRadius: Border.br_base,
  },
  text: {
    lineHeight: 25,
    fontSize: FontSize.size_6xl,
    top: 36 * height / 800,
    left: 25 * width / 360,
  },
  tue: {
    left: 25 * width / 360,
    textAlign: "center",
    color: Color.colorDarkgray,
    fontFamily: FontFamily.raleway,
    fontWeight: "500",
    position: "absolute",
  },
  rectangleParent: {
    left: 0,
  },
  groupItem: {
    shadowColor: "rgba(49, 123, 250, 0.08)",
    shadowOffset: {
      width: 0,
      height: 5 * height / 800,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    backgroundColor: "#3da9fc",
  },
  text1: {
    lineHeight: 25,
    fontSize: FontSize.size_6xl,
    top: 36 * height / 800,
    left: 25 * width / 360,
  },
  wed: {
    left: 22 * width / 360,
    lineHeight: 14,
    fontSize: FontSize.textSmSemibold_size,
    top: 69 * height / 800,
  },
  rectangleGroup: {
    left: 80 * width / 360,
  },
  text2: {
    left: 19 * width / 360,
    lineHeight: 25,
    fontSize: FontSize.size_6xl,
    top: 36 * height / 800,
  },
  thus: {
    left: 18 * width / 360,
    textAlign: "center",
    color: Color.colorDarkgray,
    fontFamily: FontFamily.raleway,
    fontWeight: "500",
    position: "absolute",
  },
  rectangleContainer: {
    left: 160 * width / 360,
  },
  fri: {
    textAlign: "center",
    color: Color.colorDarkgray,
    fontFamily: FontFamily.raleway,
    fontWeight: "500",
    position: "absolute",
    left: 20 * width / 360,
  },
  groupView: {
    left: 240 * width / 360,
  },
  daytime: {
    top: 116 * height / 800,
    width: 304 * width / 360,
    height: 118 * height / 800,
    left: 23 * width / 360,
    position: "absolute",
  },
  groupChild1: {
    borderRadius: Border.br_xl,
    height: 3 * height / 800,
    left: 0,
    position: "absolute",
    width: 301 * width / 360,
  },
  groupChild2: {
    width: 61 * width / 360,
    backgroundColor: Color.colorCornflowerblue_100,
    top: 0,
  },
  rectangleParent1: {
    top: 30 * height / 800,
    height: 3 * height / 800,
    width: 301 * width / 360,
    left: 0,
    position: "absolute",
  },
  hy: {
    left: 240 * width / 360,
  },
  honThnh: {
    left: 114 * width / 360,
  },
  spTi: {
    left: 8 * width / 360,
    color: Color.lightGray11,
    fontWeight: "600",
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    lineHeight: 30,
    fontSize: FontSize.textSmSemibold_size,
    top: 0,
    position: "absolute",
  },
  filter: {
    top: 256 * height / 800,
    left: 29 * width / 360,
    height: 33 * height / 800,
    width: 301 * width / 360,
    position: "absolute",
  },
  iconlylightarrowLeft: {
    width: 33 * width / 360,
    height: 35 * height / 800,
    left: 0,
    top: 0,
    position: "absolute",
  },
  mingcutesearchLineIcon: {
    left: 242 * width / 360,
    top: 35 * height / 800,
    width: 28 * width / 360,
    overflow: "hidden",
  },
  materialSymbolscalendarMontIcon: {
    left: 291 * width / 360,
    top: 35 * height / 800,
    width: 28 * width / 360,
    overflow: "hidden",
  },
  lchHnCa: {
    fontSize: FontSize.size_5xl,
    color: "#6e6969",
    left: 1 * width / 360,
    letterSpacing: 0,
    fontWeight: "600",
    top: 36 * height / 800,
  },
  header: {
    top: 29 * height / 800,
    width: 319 * width / 360,
    height: 65 * height / 800,
    left: 23 * width / 360,
    position: "absolute",
  },
  bs3Child: {
    width: 81 * width / 360,
    height: 79 * height / 800,
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  lchHnVi: {
    fontSize: FontSize.size_smi,
    color: Color.lightGray11,
    left: 0,
    top: 0,
  },
  materialSymbolscalendarMontIcon1: {
    width: 22 * width / 360,
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  t10Thng: {
    top: 5 * height / 800,
    fontFamily: FontFamily.urbanist,
    fontSize: FontSize.size_2xs,
    left: 26 * width / 360,
    letterSpacing: 0,
    color: Color.lightGray11,
    textAlign: "center",
    fontWeight: "500",
    position: "absolute",
  },
  materialSymbolscalendarMontParent: {
    width: 92 * width / 360,
    left: 0,
    top: 0,
  },
  icroundAccessTimeParent: {
    left: 107 * width / 360,
    width: 82 * width / 360,
    top: 0,
  },
  frameGroup: {
    top: 32 * height / 800,
    width: 189 * width / 360,
    left: 0,
  },
  frameWrapper: {
    height: 54 * height / 800,
    width: 189 * width / 360,
    left: 0,
    top: 0,
    position: "absolute",
  },
  hy1: {
    color: "#1d1b20",
  },
  hyWrapper: {
    backgroundColor: Color.colorLightblue,
    width: 83 * width / 360,
    left: 0,
  },
  tLiLch: {
    left: 14 * width / 360,
    top: 9 * height / 800,
    fontSize: FontSize.size_2xs,
    letterSpacing: 0,
    fontWeight: "600",
    fontFamily: FontFamily.textXlSemibold,
    color: Color.lightGray0,
    textAlign: "center",
    position: "absolute",
  },
  tLiLchWrapper: {
    left: 91 * width / 360,
    width: 79 * width / 360,
    backgroundColor: Color.colorCornflowerblue_100,
  },
  frameParent: {
    left: 95 * width / 360,
    height: 112 * height / 800,
    width: 189 * width / 360,
    top: 0,
    position: "absolute",
  },
  bs3: {
    width: 321 * width / 360,
    height: 137 * height / 800,
    left: 1 * width / 360,
    top: 0,
    position: "absolute",
  },
  hy2: {
    color: Color.lightGray11,
  },
  b2: {
    top: 287 * height / 800,
  },
  bs1: {
    top: 150 * height / 800,
  },
  lslich: {
    top: 301 * height / 800,
    width: 322 * width / 360,
    height: 424 * height / 800,
    left: 26 * width / 360,
    position: "absolute",
  },
  navigationChild: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
  },
  icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
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
  icon2: {
    overflow: "hidden",
  },
  home: {
    left: 45 * width / 360,
    top: 14 * height / 800,
  },
  schedule: {
    left: "36.11%",
    right: "58.47%",
    width: "5.42%",
  },
  navigation1: {
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
  },
  navigation: {
    top: (718/800)* height,
  },
  myAppoinments: {
    flex: 1,
    height: 800 * height / 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.lightGray0,
  },
});

export default MyAppoinments;

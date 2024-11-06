import * as React from "react";
import { StyleSheet, View, Text, Pressable ,Dimensions,SafeAreaView} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
const {width, height} = Dimensions.get("window");
const Confirm1 = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.confirm}>
    <View style={styles.confirm}>
      <View style={styles.confirmInnerPosition}>
        <View style={[styles.componentChild, styles.confirmInnerPosition]} />
      </View>
      <View style={styles.notiframe}>
        <View style={[styles.accepframe, styles.buttonLayout]}>
          <View style={styles.frame}>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require("../assets/group-110.png")}
            />
            <View style={[styles.tLchThnhCngParent, styles.frameItemBorder]}>
              <Text style={styles.tLchThnh}>Đặt lịch thành công</Text>
              <Text style={styles.thngTinV}>
                Thông tin về lịch hẹn sẽ được gửi về Email của bạn!
              </Text>
            </View>
          </View>
          <View style={[styles.infor, styles.inforLayout]}>
            <View style={[styles.inforInner, styles.inforLayout]}>
              <View style={[styles.inforInner, styles.inforLayout]}>
                <View style={[styles.inforInner, styles.inforLayout]}>
                  <View
                    style={[
                      styles.materialSymbolscalendarMontParent,
                      styles.parentLayout,
                    ]}
                  >
                    <Image
                      style={[
                        styles.materialSymbolscalendarMontIcon,
                        styles.parentLayout,
                      ]}
                      contentFit="cover"
                      source={require("../assets/materialsymbolscalendarmonthoutlinerounded2.png")}
                    />
                    <Text style={[styles.ba14Thg9, styles.textTypo1]}>
                      Ba 14 thg9 2024
                    </Text>
                  </View>
                  <View style={[styles.frameItem, styles.frameItemBorder]} />
                  <View
                    style={[
                      styles.icroundAccessTimeParent,
                      styles.parentLayout,
                    ]}
                  >
                    <Image
                      style={[
                        styles.materialSymbolscalendarMontIcon,
                        styles.parentLayout,
                      ]}
                      contentFit="cover"
                      source={require("../assets/icroundaccesstime1.png")}
                    />
                    <Text
                      style={[styles.text, styles.textTypo]}
                    >{` 12:00 - 14:00 `}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Pressable
            style={[styles.button, styles.buttonLayout]}
            onPress={() => navigation.navigate("MainFrame")}
          >
            <Text style={[styles.honTt, styles.textTypo]}>Hoàn tất</Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.navigation, styles.navigationLayout]}>
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
            style={[styles.icon, styles.iconLayout]}
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
  confirmInnerPosition: {
    height: 800 * height / 800,
    width: 360 * width / 360,
    left: 0,
    top: 0,
    position: "absolute",
  },
  buttonLayout: {
    width: 314 * width / 360,
    position: "absolute",
  },
  frameItemBorder: {
    borderStyle: "solid",
    position: "absolute",
  },
  inforLayout: {
    height: 29 * height / 800,
    width: 265 * width / 360,
    position: "absolute",
  },
  parentLayout: {
    height: 18 * height / 800,
    position: "absolute",
  },
  textTypo1: {
    left: 26 * width / 360,
    top: 1 * height / 800,
    color: Color.colorGray_200,
    fontWeight: "500",
    fontSize: FontSize.textSmSemibold_size,
    textAlign: "center",
    letterSpacing: 0,
  },
  textTypo: {
    fontFamily: FontFamily.urbanist,
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
  componentChild: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  frameChild: {
    left: 124 * width / 360,
    width: 66 * width / 360,
    height: 66 * height / 800,
    top: 0,
    position: "absolute",
  },
  tLchThnh: {
    left: 46 * width / 360,
    fontSize: FontSize.size_5xl,
    color: Color.lightGray11,
    textAlign: "center",
    letterSpacing: 0,
    fontFamily: FontFamily.textXlSemibold,
    fontWeight: "700",
    top: 0,
    position: "absolute",
  },
  thngTinV: {
    top: 41 * height / 800,
    left: 30 * width / 360,
    width: 218 * width / 360,
    color: Color.colorGray_200,
    fontWeight: "500",
    fontSize: FontSize.textSmSemibold_size,
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    letterSpacing: 0,
    position: "absolute",
  },
  tLchThnhCngParent: {
    top: 82 * height / 800,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    height: 99 * height / 800,
    width: 313 * width / 360,
    left: 20* width / 360,
  },
  frame: {
    left: 1 * width / 360,
    height: 181 * height / 800,
    width: 313 * width / 360,
    top: 0,
    position: "absolute",
  },
  materialSymbolscalendarMontIcon: {
    width: 18 * width / 360,
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  ba14Thg9: {
    fontFamily: FontFamily.textXlSemibold,
    top: 1 * height / 800,
    position: "absolute",
  },
  materialSymbolscalendarMontParent: {
    width: 133 * width / 360,
    top: 6 * height / 800,
    height: 18 * height / 800,
    left: 0,
  },
  frameItem: {
    top: -1 * height / 800,
    left: 148 * width / 360,
    borderColor: "#909090",
    borderRightWidth: 1.5,
    width: 2 * width / 360,
    height: 31 * height / 800,
  },
  text: {
    left: 26 * width / 360,
    top: 1 * height / 800,
    color: Color.colorGray_200,
    fontWeight: "500",
    fontSize: FontSize.textSmSemibold_size,
    textAlign: "center",
    letterSpacing: 0,
  },
  icroundAccessTimeParent: {
    left: 165 * width / 360,
    width: 100 * width / 360,
    top: 6 * height / 800,
    height: 18 * height / 800,
  },
  inforInner: {
    left: 0,
    top: 0,
  },
  infor: {
    top: 205 * height / 800,
    left: 25 * width / 360,
  },
  honTt: {
    top: 17 * height / 800,
    left: 118 * width / 360,
    fontSize: FontSize.textXlSemibold_size,
    color: Color.lightGray0,
    textAlign: "left",
    fontWeight: "700",
    fontFamily: FontFamily.urbanist,
  },
  button: {
    top: 258 * height / 800,
    borderRadius: Border.br_7xs,
    backgroundColor: Color.colorCornflowerblue_100,
    height: 58 * height / 800,
    left: 0,
  },
  accepframe: {
    top: 20 * height / 800,
    left: 15 * width / 360,
    height: 316 * height / 800,
  },
  notiframe: {
    top: 227 * height / 800,
    left: 8 * width / 360,
    borderRadius: Border.br_3xs,
    width: 344 * width / 360,
    height: 356 * height / 800,
    position: "absolute",
    backgroundColor: Color.lightGray0,
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
    top: 14 * height / 800,
    width: 28 * width / 360,
    height: 28 * height / 800,
    position: "absolute",
  },
  schedule: {
    left: "36.11%",
    right: "58.47%",
    width: "5.42%",
  },
  navigation: {
    top: (718/800)* height,
  },
  confirm: {
    flex: 1,
    height: 799 * height / 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.lightGray0,
  },
});

export default Confirm1;

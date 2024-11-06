import * as React from "react";
import { StyleSheet, View, Text, Pressable,Dimensions,} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
const { width, height } = Dimensions.get("window");
const Setting = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.setting}>
      <View style={styles.infor}>
        <View style={[styles.maininfo, styles.helpsChildLayout]}>
          <View style={[styles.maininfoChild, styles.childShadowBox]} />
          <View style={[styles.component11, styles.componentLayout]}>
            <Image
              style={[
                styles.linebusinessprofileLineIcon,
                styles.componentLayout,
              ]}
              contentFit="cover"
              source={require("../assets/linebusinessprofileline.png")}
            />
            <Text style={styles.thngTinC}>Thông tin cá nhân</Text>
            <Text style={[styles.english, styles.englishTypo]}>English</Text>
          </View>
          <View style={[styles.component12, styles.componentLayout]}>
            <Image
              style={[
                styles.linebusinessprofileLineIcon,
                styles.componentLayout,
              ]}
              contentFit="cover"
              source={require("../assets/linemedianotification3line.png")}
            />
            <Text style={styles.thngTinC}>Thông báo</Text>
            <Text style={styles.englishTypo}>Bật</Text>
          </View>
          <View style={[styles.component13, styles.componentLayout]}>
            <Image
              style={[
                styles.linebusinessprofileLineIcon,
                styles.componentLayout,
              ]}
              contentFit="cover"
              source={require("../assets/lineeditortranslate2.png")}
            />
            <Text style={styles.thngTinC}>Ngôn ngữ</Text>
            <Text style={styles.englishTypo}>Tiếng Việt</Text>
          </View>
        </View>
        <View style={[styles.helps, styles.helpsChildLayout]}>
          <View style={[styles.helpsChild, styles.childShadowBox]} />
          <View style={[styles.component11, styles.componentLayout]}>
            <Image
              style={[
                styles.linebusinessprofileLineIcon,
                styles.componentLayout,
              ]}
              contentFit="cover"
              source={require("../assets/lineusercontactsline.png")}
            />
            <Text style={styles.thngTinC}>Trợ giúp</Text>
            <Text style={[styles.english, styles.englishTypo]}>English</Text>
          </View>
          <View style={[styles.component12, styles.componentLayout]}>
            <Image
              style={[
                styles.linebusinessprofileLineIcon,
                styles.componentLayout,
              ]}
              contentFit="cover"
              source={require("../assets/linecommunicationchatquoteline.png")}
            />
            <Text style={styles.thngTinC}>Liên hệ với chúng tôi</Text>
            <Text style={[styles.english, styles.englishTypo]}>ON</Text>
          </View>
          <View style={[styles.component13, styles.componentLayout]}>
            <Image
              style={[
                styles.linebusinessprofileLineIcon,
                styles.componentLayout,
              ]}
              contentFit="cover"
              source={require("../assets/linesystemlock2line.png")}
            />
            <Text style={styles.thngTinC}>Chính sách quyền riêng tư</Text>
            <Text style={[styles.english, styles.englishTypo]}>English</Text>
          </View>
        </View>
        <View style={[styles.scrt, styles.scrtLayout]}>
          <View style={[styles.scrtChild, styles.scrtLayout]} />
          <View style={[styles.component11, styles.componentLayout]}>
            <Image
              style={[
                styles.linebusinessprofileLineIcon,
                styles.componentLayout,
              ]}
              contentFit="cover"
              source={require("../assets/linebusinessprojector2line.png")}
            />
            <Text style={styles.thngTinC}>Bảo mật</Text>
            <Text style={[styles.english, styles.englishTypo]}>English</Text>
          </View>
          <View style={[styles.component12, styles.componentLayout]}>
            <Image
              style={[
                styles.linebusinessprofileLineIcon,
                styles.componentLayout,
              ]}
              contentFit="cover"
              source={require("../assets/linehealthmentalhealthline.png")}
            />
            <Text style={styles.thngTinC}>Giao diện</Text>
            <Text style={styles.englishTypo}>Sáng</Text>
          </View>
        </View>
      </View>
      <Image
        style={styles.topIcon}
        contentFit="cover"
        source={require("../assets/top.png")}
      />
      <View style={styles.avt}>
        <Image
          style={styles.avatarIcon}
          contentFit="cover"
          source={require("../assets/avatar1.png")}
        />
        <Text style={[styles.nguynThB, styles.nguynThBFlexBox]}>
          Nguyễn Thị B
        </Text>
        <Text style={[styles.emailgmailcom01, styles.nguynThBFlexBox]}>
          email@gmail.com | +01 234 567 89
        </Text>
      </View>
      <View style={[styles.navigation, styles.navigationLayout]}>
        <View style={[styles.navigationChild, styles.navigationLayout]} />
        <Pressable
          style={styles.setting1}
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
  );
};

const styles = StyleSheet.create({
  helpsChildLayout: {
    height: 121 * height / 800,
    left: 0,
    width: 342 * width / 360,
    position: "absolute",
  },
  childShadowBox: {
    borderRadius: Border.br_5xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    top: 0,
    backgroundColor: Color.lightGray0,
  },
  componentLayout: {
    height: 24 * height / 800,
    position: "absolute",
  },
  englishTypo: {
    textAlign: "right",
    color: Color.lightPrimary,
    left: "22.38%",
    width: "86.64%",
    fontFamily: FontFamily.bodyMedium,
    lineHeight: 20 * height / 800,
    letterSpacing: 0,
    fontSize: FontSize.textSmSemibold_size * width / 360,
    top: "8.33%",
    position: "absolute",
  },
  scrtLayout: {
    height: 86 * height / 800,
    left: 0,
    width: 342 * width / 360,
    position: "absolute",
  },
  nguynThBFlexBox: {
    textAlign: "center",
    color: Color.lightGray11,
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
  maininfoChild: {
    height: 121 * height / 800,
    left: 0,
    width: 342 * width / 360,
    position: "absolute",
  },
  linebusinessprofileLineIcon: {
    width: 24 * width / 360,
    height: 24 * height / 800,
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  thngTinC: {
    left: 37 * width / 360,
    textAlign: "left",
    width: 240 * width / 360,
    color: Color.lightGray11,
    top: "8.33%",
    fontFamily: FontFamily.bodyMedium,
    lineHeight: 20 * height / 800,
    letterSpacing: 0,
    fontSize: FontSize.textSmSemibold_size * width / 360,
    position: "absolute",
  },
  english: {
    display: "none",
  },
  component11: {
    width: 277 * width / 360,
    left: 16 * width / 360,
    height: 24 * height / 800,
    top: 14 * height / 800,
  },
  component12: {
    top: 49 * height / 800,
    width: 277 * width / 360,
    left: 16 * width / 360,
    height: 24 * height / 800,
  },
  component13: {
    top: 86 * height / 800,
    width: 277 * width / 360,
    left: 16 * width / 360,
    height: 24 * height / 800,
  },
  maininfo: {
    top: 0,
  },
  helpsChild: {
    height: 121 * height / 800,
    left: 0,
    width: 342 * width / 360,
    position: "absolute",
  },
  helps: {
    top: 255 * height / 800,
  },
  scrtChild: {
    borderRadius: Border.br_5xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    top: 0,
    backgroundColor: Color.lightGray0,
  },
  scrt: {
    top: 145 * height / 800,
  },
  infor: {
    top: 344 * height / 800,
    left: 9 * width / 360,
    height: 376 * height / 800,
    width: 342 * width / 360,
    position: "absolute",
  },
  topIcon: {
    top: -35 * height / 800,
    left: -15 * width / 360,
    width: 390 * width / 360,
    height: 263 * height / 800,
    position: "absolute",
  },
  avatarIcon: {
    left: 74 * width / 360,
    width: 127 * width / 360,
    height: 130 * height / 800,
    top: 0,
    position: "absolute",
  },
  nguynThB: {
    top: 135 * height / 800,
    left: 69 * width / 360,
    fontSize: FontSize.titlePoppinsLarge_size * width / 360,
    lineHeight: 28 * height / 800,
    fontWeight: "600",
    fontFamily: FontFamily.titlePoppinsLarge,
  },
  emailgmailcom01: {
    top: 164 * height / 800,
    left: 23 * width / 360,
    fontFamily: FontFamily.bodyMedium,
    lineHeight: 20 * height / 800,
    letterSpacing: 0,
    fontSize: FontSize.textSmSemibold_size * width / 360,
    textAlign: "center",
  },
  avt: {
    top: 143 * height / 800,
    left: 43 * width / 360,
    width: 274 * width / 360,
    height: 184 * height / 800,
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
  },
  setting1: {
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
    top: 14 * height / 800,
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
  setting: {
    flex: 1,
    height: 800 * height / 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.lightGray0,
  },
});
export default Setting;

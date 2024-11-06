import * as React from "react";
import { Pressable, StyleSheet, View, Text, ScrollView ,Dimensions,SafeAreaView} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  StyleVariable,
} from "../GlobalStyles";
const { width, height } = Dimensions.get("window");
const SelectHostpital = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.selectHostpital1}>
    <View style={styles.selectHostpital1}>
      <View style={styles.headframe}>
        <View style={[styles.headframeChild, styles.searchframeLayout]} />
        <Text style={[styles.bnhVinH, styles.textTypo]}>Bệnh viện Hà Đông</Text>
        <Image
          style={[styles.arrowBackIcon, styles.iconLayout2]}
          contentFit="cover"
          source={require("../assets/arrow-back.png")}
        />
        <View style={[styles.headder, styles.headderLayout]}>
          <Image
            style={[styles.seletionsIcon, styles.headderLayout]}
            contentFit="cover"
            source={require("../assets/group-9.png")}
          />
          <View style={[styles.searchframe, styles.searchframeLayout]}>
            <Image
              style={[styles.searchIcon, styles.iconLayout2]}
              contentFit="cover"
              source={require("../assets/search.png")}
            />
            <Text style={[styles.tmKim, styles.homePosition]}>Tìm kiếm</Text>
          </View>
        </View>
      </View>
      <View style={[styles.news, styles.boxLayout2]}>
        <View style={[styles.boxFull, styles.boxLayout2]}>
          <View style={[styles.boxFullChild, styles.boxLayout2]} />
          <Text style={[styles.lchHnSp, styles.xemThmTypo]}>
            Lịch hẹn sắp tới
          </Text>
          <Text style={[styles.xemThm, styles.xemThmTypo]}>Xem thêm</Text>
          <Image
            style={[styles.iconlylightarrowDown2, styles.iconLayout1]}
            contentFit="cover"
            source={require("../assets/iconlylightarrowdown22.png")}
          />
        </View>
        <View style={[styles.boxOut, styles.boxLayout1]}>
          <View style={[styles.boxOut1, styles.boxLayout1]} />
          <Text style={[styles.ngyThmKhm, styles.textTypo]}>
            Ngày thăm khám
          </Text>
          <Text style={[styles.thng112024, styles.bnhVinH1Typo]}>
            10 Tháng 11, 2024 - 9:30 sáng
          </Text>
          <Text style={[styles.bnhVinH1, styles.bnhVinH1Position]}>
            Bệnh viện Hà Đông
          </Text>
          <Image
            style={[styles.locationOnIcon, styles.bnhVinH1Position]}
            contentFit="cover"
            source={require("../assets/location-on.png")}
          />
          <View style={[styles.boxSmall, styles.boxLayout]}>
            <View style={[styles.boxIn, styles.boxLayout]} />
            <Text style={[styles.nguynThC, styles.yTTiPosition]}>
              Nguyễn thị C
            </Text>
            <Text style={[styles.yTTi, styles.yTTiPosition]}>
              Y tá tại Bệnh viện Hà đông
            </Text>
            <Image
              style={[styles.avatarIcon, styles.textPosition]}
              contentFit="cover"
              source={require("../assets/avatar.png")}
            />
            <Image
              style={[styles.chatBubbleIcon, styles.iconLayout2]}
              contentFit="cover"
              source={require("../assets/chat-bubble.png")}
            />
          </View>
          <Image
            style={styles.todayIcon}
            contentFit="cover"
            source={require("../assets/today.png")}
          />
        </View>
      </View>
      
      <View style={[styles.filters, styles.iconLayout2]}>
        <View style={[styles.toanbo, styles.toanboLayout]}>
          <View style={[styles.toanboChild, styles.childLayout]} />
          <Text style={[styles.tonB, styles.tonBTypo]}>Tất cả</Text>
        </View>
        <View style={[styles.kinhnghiem, styles.toanboLayout]}>
          <View style={[styles.kinhnghiemChild, styles.childLayout]} />
          <Text style={[styles.kinhNghim, styles.tonBTypo]}>Kinh nghiệm</Text>
        </View>
        <View style={[styles.chuyenmon, styles.toanboLayout]}>
          <View style={[styles.kinhnghiemChild, styles.childLayout]} />
          <Text style={[styles.chuynMn, styles.tonBTypo]}>Chuyên môn</Text>
        </View>
        <View style={[styles.gioitinh, styles.toanboLayout]}>
          <View style={[styles.kinhnghiemChild, styles.childLayout]} />
          <Text style={[styles.giiTnh, styles.tonBTypo]}>Giới tính</Text>
        </View>
      </View>
      <View style={styles.drframe}>
        <ScrollView
          style={styles.drs}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.drsScrollViewContent}
        >
          <Pressable
            style={styles.infor3}
            onPress={() => navigation.navigate("DoctorsDetails")}
          >
            <View style={styles.childShadowBox} />
            <Text style={[styles.namIuDng, styles.dngClr]}>{`Nam
Điều dưỡng viên
3 năm kinh nghiệm`}</Text>
            <Text style={[styles.nguynVnA, styles.nIuDngPosition]}>
              Nguyễn Văn A
            </Text>
            <View style={[styles.infor3Item, styles.boxLayout3]} />
            <View style={styles.ratting}>
              <Image
                style={[
                  styles.iconlylightOutlinestar,
                  styles.iconlylightPosition,
                ]}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar2.png")}
              />
              <Text style={[styles.text, styles.textPosition]}>4.8</Text>
              <View style={[styles.rattingChild, styles.childPosition]} />
            </View>
          </Pressable>
          <View style={styles.infor3}>
            <View style={styles.childShadowBox} />
            <Text style={[styles.nguynThC1, styles.nguynPosition]}>
              Nguyễn Thị C
            </Text>
            <View style={[styles.infor3Item, styles.boxLayout3]} />
            <Text style={[styles.nIuDng, styles.nIuDngPosition]}>{`Nữ
Điều dưỡng viên
4 năm kinh nghiệm`}</Text>
            <View style={styles.ratting}>
              <Image
                style={[
                  styles.iconlylightOutlinestar1,
                  styles.iconlylightLayout,
                ]}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar2.png")}
              />
              <Text style={[styles.text, styles.textPosition]}>4.8</Text>
              <View style={[styles.rattingChild, styles.childPosition]} />
            </View>
          </View>
          <View style={styles.infor3}>
            <View style={styles.childShadowBox} />
            <Text style={[styles.nguynThC1, styles.nguynPosition]}>
              Nguyễn Thị C
            </Text>
            <View style={[styles.infor3Item, styles.boxLayout3]} />
            <Text style={[styles.nIuDng, styles.nIuDngPosition]}>{`Nữ
Điều dưỡng viên
4 năm kinh nghiệm`}</Text>
            <View style={styles.ratting}>
              <Image
                style={[
                  styles.iconlylightOutlinestar2,
                  styles.iconlylightLayout,
                ]}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar2.png")}
              />
              <Text style={[styles.text, styles.textPosition]}>4.8</Text>
              <View style={[styles.rattingChild, styles.childPosition]} />
            </View>
          </View>
        </ScrollView>
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
  drsScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
  },
  searchframeLayout: {
    height: 44 * height / 800,
    width: 243 * width / 360,
    borderRadius: Border.br_xl,
    overflow: "hidden",
    position: "absolute",
    backgroundColor: Color.lightGray0,
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
  },
  iconLayout2: {
    height: 24 * height / 800,
    position: "absolute",
  },
  headderLayout: {
    height: 50 * height / 800,
    position: "absolute",
  },
  homePosition: {
    left: 45 * width / 360,
    top: 14 * height / 800,
    position: "absolute",
  },
  boxLayout2: {
    height: 134 * height / 800,
    width: 347 * width / 360,
    position: "absolute",
  },
  xemThmTypo: {
    color: Color.colorDarkslategray_300,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  iconLayout1: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  boxLayout1: {
    height: 105 * height / 800,
    width: 347 * width / 360,
    left: 0,
    position: "absolute",
  },
  bnhVinH1Typo: {
    left: 35 * width / 360,
    textAlign: "left",
    color: Color.lightGray11,
    fontFamily: FontFamily.textXlSemibold,
  },
  bnhVinH1Position: {
    top: 61 * height / 800,
    position: "absolute",
  },
  boxLayout: {
    height: 100 * height / 800,
    width: 161 * width / 360,
    position: "absolute",
  },
  yTTiPosition: {
    left: 31 * width / 360,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  textPosition: {
    top: 7 * height / 800,
    position: "absolute",
  },
  toanboLayout: {
    width: 74 * width / 360,
    top: 0,
    height: 24 * height / 800,
    position: "absolute",
  },
  childLayout: {
    borderRadius: Border.br_3xs,
    width: 74 * width / 360,
    top: 0,
    height: 24 * height / 800,
    left: 0,
    position: "absolute",
  },
  tonBTypo: {
    fontSize: FontSize.size_2xs,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  dngClr: {
    color: Color.colorGray_500,
    fontSize: FontSize.subHeader3BoldMulish_size,
    top: 245 * height / 800,
  },
  nIuDngPosition: {
    left: 53 * width / 360,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  boxLayout3: {
    borderRadius: Border.br_xl,
    top: 0,
  },
  iconlylightPosition: {
    left: "22.45%",
    right: "58.78%",
  },
  childPosition: {
    borderTopRightRadius: Border.br_xl,
    top: 0,
  },
  nguynPosition: {
    top: 210 * height / 800,
    color: Color.lightGray11,
    fontSize: FontSize.textXlSemibold_size,
  },
  iconlylightLayout: {
    bottom: "35.19%",
    top: "22.22%",
    width: "18.78%",
    height: "42.59%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
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
  headframeChild: {
    left: 110 * width / 360,
    top: 45 * height / 800,
  },
  bnhVinH: {
    top: 52 * height / 800,
    left: 160 * width / 360,
    color: Color.lightGray11,
    fontSize: FontSize.textXlSemibold_size,
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  arrowBackIcon: {
    top: 50 * height / 800,
    left: 21 * width / 360,
    width: 24 * width / 360,
    height: 24 * height / 800,
  },
  seletionsIcon: {
    left: 255 * width / 360,
    width: 50 * width / 360,
    top: 0,
  },
  searchIcon: {
    top: 9 * height / 800,
    left: 9 * width / 360,
    width: 24 * width / 360,
    height: 24 * height / 800,
    overflow: "hidden",
  },
  tmKim: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    color: Color.lightGray11,
  },
  searchframe: {
    top: 1 * height / 800,
    left: 0,
  },
  headder: {
    top: 120 * height / 800,
    left: 25 * width / 360,
    width: 305 * width / 360,
  },
  headframe: {
    top: -10 * height / 800,
    backgroundColor: Color.colorDodgerblue_100,
    height: 300 * height / 800,
    overflow: "hidden",
    width: 360 * width / 360,
    left: 0,
    position: "absolute",
  },
  boxFullChild: {
    top: 0,
    borderRadius: Border.br_xl,
    left: 0,
    backgroundColor: Color.lightGray0,
  },
  lchHnSp: {
    top: 11 * height / 800,
    left: 17 * width / 360,
    fontSize: FontSize.size_xs,
  },
  xemThm: {
    left: 265 * width / 360,
    fontSize: FontSize.size_4xs,
    top: 14 * height / 800,
  },
  iconlylightarrowDown2: {
    height: "2.99%",
    width: "3.29%",
    top: "13.43%",
    right: "5.27%",
    bottom: "83.58%",
    left: "91.44%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  boxFull: {
    top: 0,
    left: 0,
  },
  boxOut1: {
    backgroundColor: Color.colorLightskyblue_100,
    top: 0,
    borderRadius: Border.br_xl,
  },
  ngyThmKhm: {
    left: 16 * width / 360,
    fontSize: FontSize.size_xs,
    color: Color.lightGray11,
    top: 14 * height / 800,
    position: "absolute",
  },
  thng112024: {
    top: 44 * height / 800,
    fontSize: FontSize.size_4xs,
    position: "absolute",
  },
  bnhVinH1: {
    left: 35 * width / 360,
    textAlign: "left",
    color: Color.lightGray11,
    fontFamily: FontFamily.textXlSemibold,
    fontSize: FontSize.size_xs,
  },
  locationOnIcon: {
    width: 17 * width / 360,
    height: 15 * height / 800,
    left: 15 * width / 360,
    overflow: "hidden",
  },
  boxIn: {
    backgroundColor: Color.colorWhitesmoke_100,
    top: 0,
    borderRadius: Border.br_xl,
    left: 0,
  },
  nguynThC: {
    top: 19 * height / 800,
    fontSize: FontSize.size_xs,
    color: Color.lightGray11,
  },
  yTTi: {
    top: 40 * height / 800,
    color: Color.colorDarkslategray_200,
    width: 79 * width / 360,
    fontSize: FontSize.size_4xs,
  },
  avatarIcon: {
    left: 121 * width / 360,
    borderRadius: StyleVariable.radiusFull,
    width: StyleVariable.iconLarge,
    height: StyleVariable.iconLarge,
    overflow: "hidden",
  },
  chatBubbleIcon: {
    top: 62 * height / 800,
    left: 128 * width / 360,
    width: 24 * width / 360,
    height: 24 * height / 800,
  },
  boxSmall: {
    left: 174 * width / 360,
    top: 2 * height / 800,
  },
  todayIcon: {
    top: 43 * height / 800,
    width: 14 * width / 360,
    height: 13 * height / 800,
    left: 17 * width / 360,
    position: "absolute",
  },
  boxOut: {
    top: 29 * height / 800,
  },
  news: {
    top: 166 * height / 800,
    left: 6 * width / 360,
  },
  toanboChild: {
    backgroundColor: Color.colorDodgerblue_200,
  },
  tonB: {
    left: 19 * width / 360,
    color: Color.lightGray0,
    top: 5 * height / 800,
    fontSize: FontSize.size_2xs,
  },
  toanbo: {
    left: 0,
  },
  kinhnghiemChild: {
    backgroundColor: Color.colorGainsboro_100,
  },
  kinhNghim: {
    top: 6 * height / 800,
    left: 7 * width / 360,
    color: Color.lightGray11,
  },
  kinhnghiem: {
    left: 261 * width / 360,
  },
  chuynMn: {
    left: 5 * width / 360,
    top: 5 * height / 800,
    fontSize: FontSize.size_2xs,
    color: Color.lightGray11,
  },
  chuyenmon: {
    left: 174 * width / 360,
  },
  giiTnh: {
    top: 5 * height / 800,
    fontSize: FontSize.size_2xs,
    left: 15 * width / 360,
    color: Color.lightGray11,
  },
  gioitinh: {
    left: 87 * width / 360,
  },
  filters: {
    top: 330 * height / 800,
    left: 10 * width / 360,
    width: 335 * width / 360,
  },
  childShadowBox: {
    height: 270 * height / 800,
    borderRadius: Border.br_11xl,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    top: 54 * height / 800,
    width: 220 * width / 360,
    left: 0,
    position: "absolute",
    backgroundColor: Color.lightGray0,
  },
  namIuDng: {
    left: 51 * width / 360,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  nguynVnA: {
    top: 210 * height / 800,
    color: Color.lightGray11,
    fontSize: FontSize.textXlSemibold_size,
  },
  infor3Item: {
    left: 26 * width / 360,
    width: 168 * width / 360,
    height: 189 * height / 800,
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
    position: "absolute",
  },
  iconlylightOutlinestar: {
    top: "25.93%",
    bottom: "31.48%",
    width: "18.78%",
    height: "42.59%",
    left: "22.45%",
    right: "58.78%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  text: {
    left: 23 * width / 360,
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    color: Color.lightGray11,
  },
  rattingChild: {
    borderBottomLeftRadius: Border.br_xl,
    backgroundColor: Color.colorGray_400,
    width: 49 * width / 360,
    height: 27 * height / 800,
    left: 0,
    position: "absolute",
  },
  ratting: {
    height: "8.33%",
    width: "22.27%",
    top: "0%",
    right: "11.82%",
    bottom: "91.67%",
    left: "65.91%",
    position: "absolute",
  },
  infor3: {
    width: 220 * width / 360,
    height: 324 * height / 800,
  },
  nguynThC1: {
    left: 59 * width / 360,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  nIuDng: {
    color: Color.colorGray_500,
    fontSize: FontSize.subHeader3BoldMulish_size,
    top: 245 * height / 800,
  },
  iconlylightOutlinestar1: {
    left: "22.45%",
    right: "58.78%",
  },
  iconlylightOutlinestar2: {
    right: "60.82%",
    left: "20.41%",
  },
  drs: {
    top: 0,
    left: 0,
    position: "absolute",
    width: "100%",
  },
  drframe: {
    top: 374 * height / 800,
    height: 324 * height / 800,
    width: 360 * width / 360,
    left: 0,
    position: "absolute",
  },
  navigationChild: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    top: 0,
    backgroundColor: Color.colorGainsboro_100,
  },
  icon: {
    maxHeight: "100%",
    maxWidth: "100%",
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
  selectHostpital1: {
    flex: 1,  
    height: 800 * height / 800,
    width: "100%",
    backgroundColor: Color.lightGray0,
  },
});

export default SelectHostpital;

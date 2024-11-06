import * as React from "react";
import { ScrollView, Pressable, StyleSheet, View, Text,Dimensions,SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import {
  Color,
  Border,
  FontFamily,
  FontSize,
  StyleVariable,
} from "../GlobalStyles";
const { width, height } = Dimensions.get("window");

const MainFrame = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainframe}>
    <View style={styles.mainframe}>
      <View style={[styles.hostpi, styles.hostpiPosition]}>
        <ScrollView
          style={styles.autolay}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          contentContainerStyle={styles.autolayScrollViewContent}
        >
          <View style={styles.groupParent}>
            <Pressable style={[styles.rectangleParent, styles.groupLayout]}
              onPress={() => navigation.navigate("SelectHostpital")}
            >
              <View style={[styles.groupChild, styles.childPosition]} />
              <View style={styles.groupItem} />
              <Text style={[styles.bnhVinH, styles.bnhTypo]}>
                Bệnh viện Hà Đông
              </Text>
              <View style={[styles.groupInner, styles.filtersLayout]} />
              <Text style={styles.text}>4.5</Text>
              <Text style={[styles.hNgH, styles.hNgHTypo]}>
                Hà Đông, Hà Nội
              </Text>
              <Image
                style={[
                  styles.iconlylightOutlinestar,
                  styles.iconlylightarrowLayout,
                ]}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar.png")}
              />
            </Pressable>
            <Pressable style={[styles.rectangleGroup, styles.groupLayout]}>
              <View style={[styles.groupChild, styles.childPosition]} />
              <View style={styles.groupItem} />
              <Text style={[styles.bnhVinQun, styles.bnhTypo]}>
                Bệnh viện Quân Y
              </Text>
              <View style={[styles.groupInner, styles.filtersLayout]} />
              <Text style={styles.text}>4.8</Text>
              <Text style={[styles.hNgH1, styles.hNgHTypo]}>
                Hà Đông, Hà Nội
              </Text>
              <Image
                style={[
                  styles.iconlylightOutlinestar1,
                  styles.iconlylightarrowLayout,
                ]}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar1.png")}
              />
            </Pressable>
          </View>
          <View style={styles.groupParent}>
            <Pressable style={[styles.rectangleParent, styles.groupLayout]}
              onPress={() => navigation.navigate("SelectHostpital")}
            >
              <View style={[styles.groupChild, styles.childPosition]} />
              <View style={styles.groupItem} />
              <Text style={[styles.bnhVinH, styles.bnhTypo]}>
                Bệnh viện Hà Đông
              </Text>
              <View style={[styles.groupInner, styles.filtersLayout]} />
              <Text style={styles.text}>4.5</Text>
              <Text style={[styles.hNgH, styles.hNgHTypo]}>
                Hà Đông, Hà Nội
              </Text>
              <Image
                style={[
                  styles.iconlylightOutlinestar,
                  styles.iconlylightarrowLayout,
                ]}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar.png")}
              />
            </Pressable>
            <Pressable
              style={[styles.rectangleGroup, styles.groupLayout]}
              onPress={() => navigation.navigate("SelectHostpital")}
            >
              <View style={[styles.groupChild, styles.childPosition]} />
              <View style={styles.groupItem} />
              <Text style={[styles.bnhVinH, styles.bnhTypo]}>
                Bệnh viện Hà Đông
              </Text>
              <View style={[styles.groupInner, styles.filtersLayout]} />
              <Text style={styles.text}>4.5</Text>
              <Text style={[styles.hNgH, styles.hNgHTypo]}>
                Hà Đông, Hà Nội
              </Text>
              <Image
                style={[
                  styles.iconlylightOutlinestar,
                  styles.iconlylightarrowLayout,
                ]}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar.png")}
              />
            </Pressable>
            
          </View>
          <View style={styles.groupParent}>
            <Pressable style={[styles.rectangleParent, styles.groupLayout]}
              onPress={() => navigation.navigate("SelectHostpital")}
            >
              <View style={[styles.groupChild, styles.childPosition]} />
              <View style={styles.groupItem} />
              <Text style={[styles.bnhVinH, styles.bnhTypo]}>
                Bệnh viện Hà Đông
              </Text>
              <View style={[styles.groupInner, styles.filtersLayout]} />
              <Text style={styles.text}>4.5</Text>
              <Text style={[styles.hNgH, styles.hNgHTypo]}>
                Hà Đông, Hà Nội
              </Text>
              <Image
                style={[
                  styles.iconlylightOutlinestar,
                  styles.iconlylightarrowLayout,
                ]}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar.png")}
              />
            </Pressable>
            <Pressable
              style={[styles.rectangleGroup, styles.groupLayout]}
              onPress={() => navigation.navigate("SelectHostpital")}
            >
              <View style={[styles.groupChild, styles.childPosition]} />
              <View style={styles.groupItem} />
              <Text style={[styles.bnhVinH, styles.bnhTypo]}>
                Bệnh viện Hà Đông
              </Text>
              <View style={[styles.groupInner, styles.filtersLayout]} />
              <Text style={styles.text}>4.5</Text>
              <Text style={[styles.hNgH, styles.hNgHTypo]}>
                Hà Đông, Hà Nội
              </Text>
              <Image
                style={[
                  styles.iconlylightOutlinestar,
                  styles.iconlylightarrowLayout,
                ]}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar.png")}
              />
            </Pressable>
          </View>
          
        </ScrollView>
      </View>
      <View style={[styles.mainframeChild, styles.hostpiPosition]} />
      <View style={[styles.vTrParent, styles.hostpiPosition]}>
        <Text style={[styles.vTr, styles.vTrTypo]}>Vị trí</Text>
        <Text style={[styles.hNgH4, styles.vTrTypo]}>Hà Đông, Hà Nội</Text>
        <Image
          style={[styles.iconlylightarrowDown2, styles.iconlylightarrowLayout]}
          contentFit="cover"
          source={require("../assets/iconlylightarrowdown2.png")}
        />
      </View>
      <View style={[styles.news, styles.boxLayout2]}>
        <View style={[styles.boxFull, styles.boxLayout2]}>
          <View style={[styles.boxFullChild, styles.boxLayout2]} />
          <Text style={[styles.lchHnSp, styles.lchHnSpPosition]}>
            Lịch hẹn sắp tới
          </Text>
          <Text style={[styles.xemThm, styles.thmPosition]}>Xem thêm</Text>
          <Image
            style={[
              styles.iconlylightarrowDown21,
              styles.iconlylightarrowLayout,
            ]}
            contentFit="cover"
            source={require("../assets/iconlylightarrowdown21.png")}
          />
        </View>
        <View style={[styles.boxOut, styles.boxLayout1]}>
          <View style={[styles.boxOut1, styles.boxLayout1]} />
          <Text style={[styles.ngyThmKhm, styles.thmPosition]}>
            Ngày thăm khám
          </Text>
          <Text style={[styles.thng112024, styles.bnhVinH3Typo]}>
            10 Tháng 11, 2024 - 9:30 sáng
          </Text>
          <Text style={[styles.bnhVinH3, styles.bnhVinH3Position]}>
            Bệnh viện Hà Đông
          </Text>
          <Image
            style={[styles.locationOnIcon, styles.bnhVinH3Position]}
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
              style={styles.avatarIcon}
              contentFit="cover"
              source={require("../assets/avatar.png")}
            />
            <Image
              style={[styles.chatBubbleIcon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/chat-bubble.png")}
            />
          </View>
          <Image
            style={[styles.todayIcon, styles.lchHnSpPosition]}
            contentFit="cover"
            source={require("../assets/today.png")}
          />
        </View>
      </View>
      <View style={[styles.filters, styles.filtersLayout]}>
        <View style={[styles.tatca, styles.tatcaChildLayout]}>
          <View style={[styles.tatcaChild, styles.tatcaChildLayout]} />
          <Text style={[styles.ttC, styles.vTrTypo]}>Tất cả</Text>
        </View>
        <View style={[styles.vitri, styles.tatcaChildLayout]}>
          <View style={[styles.vitriChild, styles.childBg]} />
          <Text style={[styles.vTr1, styles.vTr1Typo]}>Vị trí</Text>
        </View>
        <View style={[styles.xephang, styles.tatcaChildLayout]}>
          <View style={[styles.vitriChild, styles.childBg]} />
          <Text style={[styles.xpHng, styles.vTr1Typo]}>Xếp hạng</Text>
        </View>
        <View style={[styles.chuyenkhoa, styles.tatcaChildLayout]}>
          <View style={[styles.vitriChild, styles.childBg]} />
          <Text style={[styles.chuynKhoa, styles.vTr1Typo]}>Chuyên khoa</Text>
        </View>
      </View>
      <View style={[styles.searching, styles.searchingLayout]}>
        <Image
          style={[styles.searchingChild, styles.searchingLayout]}
          contentFit="cover"
          source={require("../assets/group-9.png")}
        />
        <View style={styles.searchParent}>
          <Image
            style={[styles.searchIcon, styles.iconLayout1]}
            contentFit="cover"
            source={require("../assets/search.png")}
          />
          <Text style={[styles.tmKimBnh, styles.homePosition]}>
            Tìm kiếm bệnh viện
          </Text>
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
  autolayScrollViewContent: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexGrow: 1,
    gap: 320,
  },

  hostpiPosition: {
    width: height,
    left: 0,
    position: "absolute",
  },
  groupLayout: {
    width: 132*width/360,
    height: 207*height/800,
    position: "absolute",
  },
  childPosition: {
    backgroundColor: Color.colorDodgerblue_200,
    borderRadius: Border.br_3xs,
    top: 0,
    left: 0,
  },
  bnhTypo: {
    textAlign: "center",
    fontFamily: FontFamily.textXlSemibold,
    fontSize: 17,
  },
  filtersLayout: {
    height: 24*height/800,
    position: "absolute",
  },
  hNgHTypo: {
    color: Color.colorGray_500,
    top: 300*height/800,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  iconlylightarrowLayout: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  vTrTypo: {
    color: Color.lightGray0,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  boxLayout2: {
    height: 134*height/800,
    width: 347*width/360,
    position: "absolute",
  },
  lchHnSpPosition: {
    left: 17*width/360,
    position: "absolute",
  },
  thmPosition: {
    top: 14*height/800,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  boxLayout1: {
    height: 105*height/800,
    width: 347*width/360,
    left: 0,
    position: "absolute",
  },
  bnhVinH3Typo: {
    left: 35*width/360,
    textAlign: "left",
    color: Color.lightGray11,
    fontFamily: FontFamily.textXlSemibold,
  },
  bnhVinH3Position: {
    top: 61*height/800,
    position: "absolute",
  },
  boxLayout: {
    height: 100*height/800,
    width: 161*width/360,
    position: "absolute",
  },
  yTTiPosition: {
    left: 31*width/360,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  iconLayout1: {
    width: 24*width/360,
    height: 24*height/800,
    position: "absolute",
  },
  tatcaChildLayout: {
    width: 74*width/360,
    height: 24*height/800,
    position: "absolute",
  },
  childBg: {
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
  },
  vTr1Typo: {
    fontSize: FontSize.size_2xs,
    textAlign: "center",
    color: Color.lightGray11,
    fontFamily: FontFamily.textXlSemibold,
    top: 5,
    position: "absolute",
  },
  searchingLayout: {
    height: 50*height/800,
    position: "absolute",
  },
  homePosition: {
    left: 45*width/360,
    top: 14*height/800,
    position: "absolute",
  },
  navigationLayout: {
    height: 83*height/800,
    width: 360*width/360,
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
  groupChild: {
    width: 250*width/360,
    height: 350,
    position: "absolute",
  },
  groupItem: {
    width: 200*width/360,
    height: 250*  height/800,
    left: 25*width/360,
    top: 5*height/800,
    borderRadius: Border.br_3xs,
    position: "absolute",
    backgroundColor: Color.lightGray0,
  },
  bnhVinH: {
    left: 65*width/360,
    color: Color.lightGray11,
    top: 280*height/800,
    fontFamily: FontFamily.textXlSemibold,
    fontSize: 10,
    position: "absolute",
  },
  groupInner: {
    left: 135*width/360,
    borderTopRightRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro_200,
    width: 90*width/360,
    top: 5,
  },
  text: {
    top: 5,
    left: 150*width/360,
    fontSize: 15,
    textAlign: "left",
    color: Color.lightGray11,
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  hNgH: {
    left: 80*width/360,
  },
  iconlylightOutlinestar: {
    right: "23.26%",
    left: "145.2%",
    maxHeight: "100%",
    overflow: "hidden",
    bottom: "89.61%",
    top: "4.83%",
    width: "9.55%",
    height: "5.56%",
    maxWidth: "100%",
    position: "absolute",
  },
  rectangleParent: {
    top: 0,
    left: 0,
  },
  bnhVinQun: {
    left: 65*width/360,
    color: Color.lightGray11,
    top: 280*height/800,
    fontFamily: FontFamily.textXlSemibold,
    position: "absolute",
  },
  hNgH1: {
    left: 80*width/360,
  },
  iconlylightOutlinestar1: {
    right: "22.65%",
    left: "145.8%",
    maxHeight: "100%",
    overflow: "hidden",
    bottom: "89.61%",
    top: "4.83%",
    width: "9.55%",
    height: "5.56%",
    maxWidth: "100%",
    position: "absolute",
  },
  rectangleGroup: {
    left: 290*width/360,
    top: 0,
  },
  groupParent: {
    height: 350*height/800,
    width: 304*width/360,
  },
  autolay: {
    maxWidth: 304*width/360,
    width: 304*width/360,
    left: 27*width/360,
    top: 30,
    position: "absolute",
    flex: 1,
  },
  hostpi: {
    top: 342*height/800,
    height: 354*height/800,
    flex:1,
  },
  mainframeChild: {
    height: 342*height/800,
    top: 0,
    backgroundColor: Color.lightGray0,
  },
  vTr: {
    top: 35*height/800,
    left: 28*width/360,
    color: Color.lightGray0,
  },
  hNgH4: {
    top: 55*height/800,
    left: 28*width/360,
    color: Color.lightGray0,
  },
  iconlylightarrowDown2: {
    height: "1.85%",
    width: "2.78%",
    top: "28.7%",
    right: "61.94%",
    bottom: "69.44%",
    left: "15.28%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  vTrParent: {
    backgroundColor: Color.colorDodgerblue_100,
    height: 216*height/800,
    overflow: "hidden",
    top: 0,
  },
  boxFullChild: {
    borderRadius: Border.br_xl,
    top: 0,
    left: 0,
    backgroundColor: Color.lightGray0,
  },
  lchHnSp: {
    top: 11*height/800,
    color: Color.colorDarkslategray_300,
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    fontSize: FontSize.size_xs,
  },
  xemThm: {
    left: 265*width/360,
    fontSize: FontSize.size_4xs,
    color: Color.colorDarkslategray_300,
  },
  iconlylightarrowDown21: {
    height: "3.13%",
    width: "3.29%",
    top: "20.67%",
    right: "5.27%",
    bottom: "76.19%",
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
    borderRadius: Border.br_xl,
    top: 0,
  },
  ngyThmKhm: {
    left: 16,
    color: Color.lightGray11,
    fontSize: FontSize.size_xs,
  },
  thng112024: {
    top: 44,
    fontSize: FontSize.size_4xs,
    position: "absolute",
  },
  bnhVinH3: {
    left: 35,
    textAlign: "left",
    color: Color.lightGray11,
    fontFamily: FontFamily.textXlSemibold,
    fontSize: FontSize.size_xs,
  },
  locationOnIcon: {
    width: 17,
    height: 15,
    left: 15,
    overflow: "hidden",
  },
  boxIn: {
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: Border.br_xl,
    top: 0,
    left: 0,
  },
  nguynThC: {
    top: 19,
    color: Color.lightGray11,
    fontSize: FontSize.size_xs,
  },
  yTTi: {
    top: 40,
    color: Color.colorDarkslategray_200,
    width: 79,
    fontSize: FontSize.size_4xs,
  },
  avatarIcon: {
    top: 7,
    left: 121,
    borderRadius: StyleVariable.radiusFull,
    width: StyleVariable.iconLarge,
    height: StyleVariable.iconLarge,
    overflow: "hidden",
    position: "absolute",
  },
  chatBubbleIcon: {
    top: 62,
    left: 128,
  },
  boxSmall: {
    left: 174,
    top: 2,
  },
  todayIcon: {
    top: 43,
    width: 14,
    height: 13,
  },
  boxOut: {
    top: 29,
  },
  news: {
    top: 149,
    left: 6,
  },
  tatcaChild: {
    backgroundColor: Color.colorDodgerblue_200,
    borderRadius: Border.br_3xs,
    top: 0,
    left: -15,
  },
  ttC: {
    left: 7*width/360,
    top: 5,
  },
  tatca: {
    top: 0,
    left: 0,
  },
  vitriChild: {
    width: 74,
    height: 24,
    position: "absolute",
    borderRadius: Border.br_3xs,
    left: 0,
  },
  vTr1: {
    left: 23,
  },
  vitri: {
    left: 88,
    top: 0,
  },
  xpHng: {
    left: 16,
  },
  xephang: {
    left: 176,
    top: 0,
  },
  chuynKhoa: {
    left: 5,
  },
  chuyenkhoa: {
    left: 260,
    top: 0,
  },
  filters: {
    top: 302,
    left: 40,
    width: 334*width/360,
  },
  searchingChild: {
    left: 255*width/360,
    width: 50*width/360,
    top: 0,
  },
  searchIcon: {
    top: 9,
    left: 9,
    overflow: "hidden",
  },
  tmKimBnh: {
    textAlign: "left",
    fontFamily: FontFamily.textXlSemibold,
    fontSize: FontSize.size_xs,
    color: Color.lightGray11,
  },
  searchParent: {
    width: 243*width/360,
    height: 44*height/800,
    top: 2,
    borderRadius: Border.br_xl,
    overflow: "hidden",
    left: 0,
    position: "absolute",
    backgroundColor: Color.lightGray0,
  },
  searching: {
    top: 80*height/800,
    left: 25*width/360,
    width: 305*width/360,
  },
  navigationChild: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
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
    top: 45,
    left: 56,
    width: 6,
    maxHeight: "100%",
    position: "absolute",
  },
  home: {
    width: 28,
    height: 28,
  },
  schedule: {
    left: "36.11%",
    right: "58.47%",
    width: "5.42%",
  },
  navigation: {
    top: (718/800)*height,
  },
  mainframe: {
    height: 800*height/800,
    width: "100%",
    flex: 1,
    backgroundColor: Color.lightGray0,
  },
});

export default MainFrame;

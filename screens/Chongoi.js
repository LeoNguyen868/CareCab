import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable,Dimensions } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
const {height,width}=Dimensions.get('window');
const Chongoi = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.chongoi}>
      <View style={[styles.headframe, styles.drframePosition]}>
        <View style={[styles.hostNameTWrapper, styles.searchframeLayout]}>
          <Text style={[styles.hostNameT, styles.textTypo]}>
            Chọn gói khám bệnh
          </Text>
        </View>
        <Image
          style={[styles.arrowBackIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/arrow-back.png")}
        />
        <View style={styles.headder}>
          <Image
            style={[styles.seletionsIcon, styles.childPosition]}
            contentFit="cover"
            source={require("../assets/group-9.png")}
          />
          <View style={[styles.searchframe, styles.searchframeLayout]}>
            <Image
              style={[styles.searchIcon, styles.textPosition]}
              contentFit="cover"
              source={require("../assets/search.png")}
            />
            <Text style={[styles.searchT, styles.textTypo]}>Tìm kiếm</Text>
          </View>
        </View>
      </View>
      <View style={styles.filters}>
        <View style={[styles.toanbo, styles.gioitinhLayout]}>
          <View style={[styles.toanboChild, styles.childLayout]} />
          <Text style={[styles.allT, styles.cBnTypo]}>Tất cả</Text>
        </View>
        <View style={[styles.gioitinh, styles.gioitinhLayout]}>
          <View style={[styles.gioitinhChild, styles.infor1ItemPosition]} />
          <Text style={[styles.nngCao, styles.cBnTypo]}>Nâng cao</Text>
        </View>
        <View style={[styles.gioitinh1, styles.gioitinhLayout]}>
          <View style={[styles.gioitinhChild, styles.infor1ItemPosition]} />
          <Text style={[styles.cBn, styles.cBnTypo]}>Cơ bản</Text>
        </View>
      </View>
      <View style={[styles.drframe, styles.drframePosition]}>
        <ScrollView
          style={[styles.drs, styles.childPosition]}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.drsScrollViewContent}
        >
          <Pressable
            style={styles.infor1}
            onPress={() => navigation.navigate("BasicOneTime")}
          >
            <View style={styles.childShadowBox} />
            <Text style={[styles.prices, styles.textTypo]}>{`Giá dịch vụ:
50.000VNĐ/Giờ`}</Text>
            <Text style={styles.basic}>Gói Khám cơ bản</Text>
            <View style={[styles.infor1Item, styles.infor1ItemPosition]} />
            <View style={styles.ratting}>
              <Image
                style={styles.iconlylightOutlinestar}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar2.png")}
              />
              <Text style={[styles.text, styles.textPosition]}>4.8</Text>
              <View style={[styles.rattingChild, styles.childPosition]} />
            </View>
          </Pressable>
          <Pressable
            style={styles.infor1}
            onPress={() => navigation.navigate("AdvanceOneTime")}
          >
            <View style={styles.childShadowBox} />
            <Text style={[styles.prices, styles.textTypo]}>{`Giá dịch vụ:
100.000VNĐ/Giờ`}</Text>
            <Text style={[styles.advances, styles.advancesTypo]}>
              Gói khám nâng cao
            </Text>
            <View style={[styles.infor1Item, styles.infor1ItemPosition]} />
            <View style={styles.ratting}>
              <Image
                style={styles.iconlylightOutlinestar}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar2.png")}
              />
              <Text style={[styles.text, styles.textPosition]}>4.8</Text>
              <View style={[styles.rattingChild, styles.childPosition]} />
            </View>
          </Pressable>
          <Pressable
            style={styles.infor1}
            onPress={() => navigation.navigate("BasicMonth")}
          >
            <View style={styles.childShadowBox} />
            <Text style={[styles.prices, styles.textTypo]}>{`Giá dịch vụ:
45.000VNĐ/Giờ`}</Text>
            <Text style={[styles.advances1, styles.advancesTypo]}>
              Gói khám tháng cơ bản
            </Text>
            <View style={[styles.infor1Item, styles.infor1ItemPosition]} />
            <View style={styles.ratting}>
              <Image
                style={styles.iconlylightOutlinestar}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar2.png")}
              />
              <Text style={[styles.text, styles.textPosition]}>4.8</Text>
              <View style={[styles.rattingChild, styles.childPosition]} />
            </View>
          </Pressable>
          <Pressable
            style={styles.infor1}
            onPress={() => navigation.navigate("AdvanceMonth")}
          >
            <View style={styles.childShadowBox} />
            <Text style={[styles.prices, styles.textTypo]}>{`Giá dịch vụ:
90.000VNĐ/Giờ`}</Text>
            <Text style={[styles.advances2, styles.advancesTypo]}>
              Gói khám tháng nâng cao
            </Text>
            <View style={[styles.infor1Item, styles.infor1ItemPosition]} />
            <View style={styles.ratting}>
              <Image
                style={styles.iconlylightOutlinestar}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar2.png")}
              />
              <Text style={[styles.text, styles.textPosition]}>4.8</Text>
              <View style={[styles.rattingChild, styles.childPosition]} />
            </View>
          </Pressable>
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
  drsScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
  },
  drframePosition: {
    width: 360 * width / 360,
    left: 0 * width / 360,
    position: "absolute",
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
    fontFamily: FontFamily.interRegular,
  },
  iconLayout: {
    width: 24 * width / 360,
    height: 24 * height / 800,
  },
  childPosition: {
    top: 0 * height / 800,
    position: "absolute",
  },
  textPosition: {
    top: 9 * height / 800,
    position: "absolute",
  },
  gioitinhLayout: {
    width: 74 * width / 360,
    top: 0 * height / 800,
    height: 24 * height / 800,
    position: "absolute",
  },
  childLayout: {
    borderRadius: Border.br_3xs,
    width: 74 * width / 360,
    height: 24 * height / 800,
    left: 0 * width / 360,
  },
  cBnTypo: {
    fontSize: FontSize.size_2xs,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  infor1ItemPosition: {
    backgroundColor: Color.colorGainsboro_100,
    top: 0 * height / 800,
    position: "absolute",
  },
  advancesTypo: {
    top: 274 * height / 800,
    height: 31 * height / 800,
    textAlign: "left",
    color: Color.lightGray11,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.textXlSemibold_size,
    position: "absolute",
  },
  hostNameT: {
    top: 10 * height / 800,
    left: 24 * width / 360,
    color: Color.lightGray11,
    fontSize: FontSize.textXlSemibold_size,
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  hostNameTWrapper: {
    top: 18 * height / 800,
    left: 53 * width / 360,
  },
  arrowBackIcon: {
    top: 28 * height / 800,
    left: 21 * width / 360,
    height: 24 * height / 800,
    position: "absolute",
  },
  seletionsIcon: {
    left: 255 * width / 360,
    width: 50 * width / 360,
    height: 50 * height / 800,
  },
  searchIcon: {
    left: 9 * width / 360,
    height: 24 * height / 800,
    width: 24 * width / 360,
    overflow: "hidden",
  },
  searchT: {
    top: 14 * height / 800,
    left: 45 * width / 360,
    fontSize: FontSize.size_xs,
    color: Color.lightGray11,
    position: "absolute",
  },
  searchframe: {
    top: 2 * height / 800,
    left: 0 * width / 360,
  },
  headder: {
    top: 131 * height / 800,
    left: 33 * width / 360,
    width: 305 * width / 360,
    height: 50 * height / 800,
    position: "absolute",
  },
  headframe: {
    top: -2 * height / 800,
    backgroundColor: Color.colorDodgerblue_100,
    height: 220 * height / 800,
    overflow: "hidden",
  },
  toanboChild: {
    backgroundColor: Color.colorDodgerblue_200,
    top: 0 * height / 800,
    position: "absolute",
  },
  allT: {
    left: 20 * width / 360,
    color: Color.lightGray0,
    top: 5 * height / 800,
    fontSize: FontSize.size_2xs,
  },
  toanbo: {
    left: 0 * width / 360,
  },
  gioitinhChild: {
    borderRadius: Border.br_3xs,
    width: 74 * width / 360,
    height: 24 * height / 800,
    left: 0 * width / 360,
  },
  nngCao: {
    marginLeft: -25 * width / 360,
    top: 4 * height / 800,
    left: "50%",
    color: Color.lightGray11,
  },
  gioitinh: {
    left: 180 * width / 360,
  },
  cBn: {
    marginLeft: -19 * width / 360,
    left: "50%",
    top: 5 * height / 800,
    fontSize: FontSize.size_2xs,
    color: Color.lightGray11,
  },
  gioitinh1: {
    left: 87 * width / 360,
  },
  filters: {
    top: 232 * height / 800,
    left: 11 * width / 360,
    width: 254 * width / 360,
    height: 24 * height / 800,
    position: "absolute",
  },
  childShadowBox: {
    height: 352 * height / 800,
    borderRadius: Border.br_11xl,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    top: 70 * height / 800,
    width: 304 * width / 360,
    left: 0 * width / 360,
    position: "absolute",
    backgroundColor: Color.colorAliceblue_200,
  },
  prices: {
    top: 319 * height / 800,
    left: 71 * width / 360,
    fontSize: FontSize.size_base,
    color: Color.colorGray_700,
    width: 198 * width / 360,
    height: 74 * height / 800,
    position: "absolute",
  },
  basic: {
    top: 275 * height / 800,
    height: 31 * height / 800,
    width: 185 * width / 360,
    left: 73 * width / 360,
    textAlign: "left",
    color: Color.lightGray11,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.textXlSemibold_size,
    position: "absolute",
  },
  infor1Item: {
    left: 36 * width / 360,
    width: 232 * width / 360,
    height: 246 * height / 800,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro_100,
  },
  iconlylightOutlinestar: {
    height: "42.61%",
    width: "18.76%",
    top: "25.85%",
    right: "58.79%",
    bottom: "31.53%",
    left: "22.45%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  text: {
    left: 32 * width / 360,
    fontSize: FontSize.size_3xs,
    width: 21 * width / 360,
    height: 16 * height / 800,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    color: Color.lightGray11,
  },
  rattingChild: {
    borderTopRightRadius: Border.br_xl,
    borderBottomLeftRadius: Border.br_xl,
    backgroundColor: Color.colorGray_600,
    width: 68 * width / 360,
    height: 35 * height / 800,
    left: 0 * width / 360,
  },
  ratting: {
    height: "8.34%",
    width: "22.27%",
    top: "0%",
    right: "11.81%",
    bottom: "91.66%",
    left: "65.92%",
    position: "absolute",
  },
  infor1: {
    height: 422 * height / 800,
    width: 304 * width / 360,

  },
  advances: {
    width: 185 * width / 360,
    left: 73 * width / 360,
    top: 274 * height / 800,
  },
  advances1: {
    marginLeft: -109 * width / 360,
    width: 219 * width / 360,
    left: "50%",
  },
  advances2: {
    marginLeft: -115 * width / 360,
    width: 246 * width / 360,
    left: "50%",
  },
  drs: {
    left: 0 * width / 360,
    width: "100%",
  },
  drframe: {
    top: 307 * height / 800,
    height: 391 * height / 800,
  },
  navigationLayout: {
    height: 83 * height / 800,
    width: 360 * width / 360,
    left: 0,
    position: "absolute",
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
  chongoi: {
    flex: 1,
    height: 800 * height / 800,
    width: "100%",
    backgroundColor: Color.lightGray0,
  },
  
});

export default Chongoi;

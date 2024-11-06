import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable,Dimensions } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
const {height, width} = Dimensions.get('window');
const AdvanceMonth = () => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.AdvanceMonth}>
      <View style={[styles.headframe, styles.headframePosition]}>
        <View style={[styles.headframeChild, styles.headframePosition]} />
        <Text style={[styles.hostNameT, styles.text1FlexBox]}>
          Gói khám tháng nâng cao
        </Text>
        <Image
          style={[styles.arrowBackIcon, styles.filtersLayout]}
          contentFit="cover"
          source={require("../assets/arrow-back.png")}
        />
      </View>
      <View style={[styles.filters, styles.filtersLayout]}>
        <View style={[styles.toanbo, styles.toanboLayout]}>
          <View style={[styles.toanboChild, styles.childLayout]} />
          <Text style={[styles.allT, styles.allTTypo]}>Tất cả</Text>
        </View>
        <View style={[styles.kinhnghiem, styles.toanboLayout]}>
          <View style={[styles.kinhnghiemChild, styles.infor3ItemPosition]} />
          <Text style={[styles.kinhNghim, styles.allTTypo]}>Kinh nghiệm</Text>
        </View>
        <View style={[styles.chuyenmon, styles.toanboLayout]}>
          <View style={[styles.kinhnghiemChild, styles.infor3ItemPosition]} />
          <Text style={[styles.chuynMn, styles.allTTypo]}>Chuyên môn</Text>
        </View>
        <View style={[styles.gioitinh, styles.toanboLayout]}>
          <View style={[styles.kinhnghiemChild, styles.infor3ItemPosition]} />
          <Text style={[styles.text, styles.allTTypo]}>Giới tính</Text>
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
          <Pressable style={styles.infor3} onPress={() => navigation.navigate("CTVDetails")}>
            <View style={styles.childShadowBox} />
            <Text style={[styles.namIuDng, styles.dngClr]}>{`Nam
Điều dưỡng viên
3 năm kinh nghiệm`}</Text>
            <Text style={[styles.nguynVnA, styles.nIuDngPosition]}>
              Nguyễn Văn A
            </Text>
            <View style={[styles.infor3Item, styles.infor3ItemPosition]} />
            <View style={styles.ratting}>
              <Image
                style={styles.iconlylightOutlinestar}
                contentFit="cover"
                source={require("../assets/iconlylightoutlinestar1.png")}
              />
              <Text style={[styles.text1, styles.text1FlexBox]}>4.8</Text>
              <View style={styles.rattingChild} />
            </View>
          </Pressable>
          <View style={styles.infor3}>
            <View style={styles.childShadowBox} />
            <Text style={[styles.nguynThC, styles.nguynPosition]}>
              Nguyễn Thị C
            </Text>
            <View style={[styles.infor3Item, styles.infor3ItemPosition]} />
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
                source={require("../assets/iconlylightoutlinestar1.png")}
              />
              <Text style={[styles.text1, styles.text1FlexBox]}>4.8</Text>
              <View style={styles.rattingChild} />
            </View>
          </View>
          <View style={styles.infor3}>
            <View style={styles.childShadowBox} />
            <Text style={[styles.nguynThC, styles.nguynPosition]}>
              Nguyễn Thị C
            </Text>
            <View style={[styles.infor3Item, styles.infor3ItemPosition]} />
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
                source={require("../assets/iconlylightoutlinestar1.png")}
              />
              <Text style={[styles.text1, styles.text1FlexBox]}>4.8</Text>
              <View style={styles.rattingChild} />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={[styles.boxOutParent, styles.boxLayout1]}>
        <View style={[styles.boxOut, styles.boxLayout1]} />
        <Text
          style={[styles.chnNhnVin, styles.aNTiTypo]}
        >{`Chọn nhân viên hỗ trợ `}</Text>
      </View>
      <View style={[styles.boxOut1, styles.boxLayout]}>
        <View style={[styles.boxOut2, styles.boxLayout]} />
        <Text style={[styles.infor, styles.inforTypo]}>
        <Text style={styles.aNTiTypo}>Đưa đón tại nhà:</Text>
          <Text style={styles.dchVA}>{` Dịch vụ đưa đón khách bằng xe máy bán kính 5km, nếu đón bằng ô tô cần thêm 10,000VNĐ/1km.
`}</Text>
          <Text style={styles.aNTiTypo}>Hỗ trợ chung khi khám bệnh:</Text>
          <Text style={styles.dchVA}>
            {" "}
            Cung cấp người hỗ trợ trong quá trình khám bệnh.{"\n"}
          </Text>
          <Text style={styles.aNTiTypo}>Hỗ trợ riêng khi khám bệnh:</Text>
          <Text style={styles.dchVA}>
            {" "}
            Dịch vụ hỗ trợ cá nhân cho những người cần sự trợ giúp đặc biệt{"\n"}
          </Text>
          <Text style={styles.dchVA}>Dành cho những khách hàng có nhu cầu sử dụng dịch vụ trung bình 7 ngày/tháng</Text>
        </Text>
        <Text style={[styles.price, styles.inforTypo]}>
          <Text style={styles.aNTiTypo}>Giá dịch vụ:</Text>
          <Text style={styles.dchVA}> 90.000VNĐ/Giờ</Text>
        </Text>
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
    </Pressable>
    
    
  );
};

const styles = StyleSheet.create({
  drsScrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
  },
  headframePosition: {
    overflow: "hidden",
    position: "absolute",
  },
  text1FlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  filtersLayout: {
    height: 24*height/800,
    position: "absolute",
  },
  toanboLayout: {
    width: 74*height/800,
    top: 0,
    height: 24*height/800,
    position: "absolute",
  },
  childLayout: {
    borderRadius: Border.br_3xs,
    width: 74*height/800,
    height: 24*height/800,
    left: 0,
  },
  allTTypo: {
    fontSize: FontSize.size_2xs,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  infor3ItemPosition: {
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
    position: "absolute",
  },
  dngClr: {
    color: Color.colorGray_700,
    fontSize: FontSize.size_base,
    top: 245*height/800,
  },
  nIuDngPosition: {
    left: 53*width/360,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  nguynPosition: {
    top: 210*height/800,
    color: Color.lightGray11,
    fontSize: FontSize.textXlSemibold_size,
  },
  iconlylightLayout: {
    bottom: "35.19%",
    top: "22.22%",
    maxHeight: "100%",
    maxWidth: "100%",
    width: "18.78%",
    height: "42.59%",
    overflow: "hidden",
    position: "absolute",
  },
  boxLayout1: {
    height: 51*height/800,
    width: 347*width/360,
    position: "absolute",
  },
  aNTiTypo: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  boxLayout: {
    height: 157*height/800,
    width: 347*width/360,
    position: "absolute",
  },
  inforTypo: {
    color: Color.colorDarkslategray_600,
    fontSize: FontSize.textSmSemibold_size,
    left: 9*width/360,
    textAlign: "left",
    position: "absolute",
  },
  headframeChild: {
    top: 14 * height / 800,
    left: 132 * width / 360,
    width: 243 * width / 360,
    height: 44 * height / 800,
    borderRadius: Border.br_xl,
    backgroundColor: Color.lightGray0,
  },
  hostNameT: {
    top: 24 * height / 800,
    left: 150 * width / 360,
    color: Color.lightGray11,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.textXlSemibold_size,
    textAlign: "left",
  },
  arrowBackIcon: {
    top: 28 * height / 800,
    left: 21 * width / 360,
    width: 24 * width / 360,
  },
  headframe: {
    top: -2 * height / 800,
    backgroundColor: "#67aefc",
    height: 247 * height / 800,
    width: 360 * width / 360,
    overflow: "hidden",
    left: 0,
  },
  toanboChild: {
    backgroundColor: Color.colorDodgerblue_200,
    top: 0,
    position: "absolute",
  },
  allT: {
    left: 20 * width / 360,
    color: Color.lightGray0,
    top: 5 * height / 800,
    fontSize: FontSize.size_2xs,
  },
  toanbo: {
    left: 0,
  },
  kinhnghiemChild: {
    borderRadius: Border.br_3xs,
    width: 74 * width / 360,
    height: 24 * height / 800,
    left: 0,
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
  text: {
    left: 16 * width / 360,
    top: 5 * height / 800,
    fontSize: FontSize.size_2xs,
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
    position: "absolute",
    fontFamily: FontFamily.interRegular,
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
    borderRadius: Border.br_xl,
  },
  iconlylightOutlinestar: {
    top: "25.93%",
    bottom: "31.48%",
    maxHeight: "100%",
    maxWidth: "100%",
    width: "18.78%",
    height: "42.59%",
    left: "22.45%",
    right: "58.78%",
    overflow: "hidden",
    position: "absolute",
  },
  text1: {
    top: 7 * height / 800,
    left: 23 * width / 360,
    fontSize: FontSize.size_3xs,
    color: Color.lightGray11,
    fontFamily: FontFamily.interRegular,
  },
  rattingChild: {
    borderTopRightRadius: Border.br_xl,
    borderBottomLeftRadius: Border.br_xl,
    backgroundColor: Color.colorGray_600,
    width: 49 * width / 360,
    height: 27 * height / 800,
    top: 0,
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
  nguynThC: {
    left: 59 * width / 360,
    textAlign: "left",
    position: "absolute",
    fontFamily: FontFamily.interRegular,
  },
  nIuDng: {
    color: Color.colorGray_700,
    fontSize: FontSize.size_base,
    top: 245 * height / 800,
  },
  iconlylightOutlinestar1: {
    left: "22.45%",
    right: "58.78%",
    bottom: "35.19%",
    top: "22.22%",
  },
  iconlylightOutlinestar2: {
    right: "60.82%",
    left: "20.41%",
  },
  iconLayout: {
    width: 24 * width / 360,
    height: 24 * height / 800,
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
  boxOut: {
    backgroundColor: "#dee8ff",
    top: 0,
    borderRadius: Border.br_xl,
    left: 0,
  },
  chnNhnVin: {
    top: 13 * height / 800,
    left: 80 * width / 360,
    color: "#777",
    width: 226 * width / 360,
    textAlign: "left",
    position: "absolute",
    fontSize: FontSize.textXlSemibold_size,
  },
  boxOutParent: {
    top: 264 * height / 800,
    left: 6 * width / 360,
  },
  boxOut2: {
    top: 0,
    borderRadius: Border.br_xl,
    left: 0,
    backgroundColor: Color.lightGray0,
  },
  dchVA: {
    fontFamily: FontFamily.interRegular,
  },
  infor: {
    top: 20 * height / 800,
    width: 337 * width / 360,
    height: 150 * height / 800,
  },
  price: {
    top: 4 * height / 800,
    width: 193 * width / 360,
    height: 20 * height / 800,
  },
  boxOut1: {
    top: 68 * height / 800,
    left: 6 * width / 360,
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
  AdvanceMonth: {
    flex: 1,
    height: 802 * height / 800,
    width: "100%",
    backgroundColor: Color.lightGray0,
  },
});

export default AdvanceMonth;

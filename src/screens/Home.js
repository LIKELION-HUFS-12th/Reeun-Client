import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/kor_logo.png')}
          style={styles.logo}
        />
        <Image 
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.noticeBanner}>
        <Image 
          source={require('../../assets/notice.png')}
          style={styles.noticeIcon}
        />
        <Text style={styles.noticeText}>
          학년, 반을 선택하고 학급 게시판에 참여해보세요!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.communityTitleText}>
        <Text style={styles.highlight}>아기사자</Text> 님의 {"\n"}<Text style={styles.bold}>학교 커뮤니티</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.schoolCommunity}>
        <View style={styles.schoolCard}>
          <Image 
            source={require('../../assets/school.png')}
            style={styles.schoolIcon}
          />
          <Text style={styles.schoolName}>리운초</Text>
          <Text style={styles.schoolYear}>2014 년</Text>
          <Text style={styles.schoolSubtitle}>입학생</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.classCommunity}>
        <Text style={styles.communityTitleText}>
        <Text style={styles.highlight}>아기사자</Text> 님의 {"\n"}<Text style={styles.bold}>학급 커뮤니티</Text>
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Array.from({ length: 6 }).map((_, index) => (
            <TouchableOpacity key={index} style={styles.classButton}>
              <View style={styles.classButtonInner}>
                <View style={styles.numberCircle}>
                  <Text style={styles.classButtonText}>{index + 1}</Text>
                </View>
              </View>
              <Text style={styles.classButtonSubText}>{index + 1}학년 {index + 1}반</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 50,
  },
  noticeIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  noticeText: {
    fontSize: 13,
    color: '#6c6c6c',
  },
  section: {
    marginHorizontal: 20,
  },
  communityTitleText: {
    fontSize: 17,
    color: '#000',
    textAlign: 'left',
    marginBottom: 15,
  },
  highlight: {
    color: '#FB5E3D',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  schoolCommunity: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  schoolCard: {
    flexDirection: 'column',
    alignItems: 'left',
    padding: 20,
    width: 130,
    height: 200,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 10,
  },
  schoolIcon: {
    width: 32,
    height: 32,
    marginBottom: 20,
  },
  schoolName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6C6C6C',
    textAlign: 'left',
    marginBottom: 5,
  },
  schoolYear: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#898989',
    textAlign: 'left',
  },
  schoolSubtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#898989',
    textAlign: 'left',
  },
  classCommunity: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  classButton: {
    backgroundColor: '#F4F4F4',
    padding: 15,
    borderRadius: 10,
    width: 120,
    height: 110,
    alignItems: 'left',
    marginRight: 15,
  },
  classButtonInner: {
    alignItems: 'left',
  },
  numberCircle: {
    backgroundColor: '#FB5E3D',
    borderRadius: 10,
    width: 32,
    height: 32,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  classButtonSubText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#898989',
  },
});

import React, { useRef, useState } from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import CustomText from '../../common/atom/CustomText';
import CustomImage from '../../common/atom/CustomImage';
import CustomBtn from '../../common/atom/CustomBtn';
import { moderateScale, verticalScale, width } from '../../../utils/Scale';
import { styled } from 'nativewind';
import Container from '../../common/atom/Container';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Slide = styled(View);
const CustomContainer = styled(Container);

const slides = [
  { source: require('../../../assets/Images/Tutorial1.png'), text: "음성과 카메라 접근에 허용해주세요!" },
  { source: require('../../../assets/Images/Tutorial2.png'), text: "똑똑이와 스무고개를 시작해보세요!" },
  { source: require('../../../assets/Images/Tutorial3.png'), text: "원하는 순서와 주제를 고를 땐 아래의 버튼을 클릭해요" },
  { source: require('../../../assets/Images/Tutorial4.png'), text: "게임을 할 땐 마이크 버튼을 꾹 누르고 이야기 해보세요!" },
  { source: require('../../../assets/Images/Tutorial5.png'), text: "똑똑이와 눈을 마주치면서 대화해보세요!" },
  { source: require('../../../assets/Images/Tutorial6.png'), text: "질문 횟수 설명 정답이면 버튼을 눌러주세요!" }
];

const ImageSlide = ({ navigation }) => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateToMain = () => {
    navigation.navigate('main');
  };

  const scrollToIndex = (index) => {
    scrollViewRef.current.scrollTo({ x: width * index, animated: true });
    setCurrentIndex(index);
  };

  const handleScrollEndDrag = (event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / viewSize);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
    scrollToIndex(newIndex);
  };

  return (
    <>
    <CustomContainer>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <CustomContainer key={index}>
            <Slide style={{ width: width, paddingRight: 20 }} className="items-center">
              <CustomImage source={slide.source} width={moderateScale(350, 0.3)} height={verticalScale(400, 0.3)} />
              <CustomText size="lg" color="headline" numberOfLines={3}>{slide.text}</CustomText>
            </Slide>
          </CustomContainer>
        ))}
      </ScrollView>
        <View style={{flexDirection:'row', justifyContent:'space-between', width: '100%', paddingHorizontal: 20, paddingTop: 20}}>
        <Icon name='arrow-circle-left' size={50} color='#FFA8BA' onPress={() => scrollToIndex(Math.max(0, currentIndex - 1))}  />  
        
          {currentIndex === slides.length - 1 ? (
          <CustomBtn size='sm' rounded={'true'} color='buttonpink' title={'메인'} onPress={navigateToMain}/>
          ) : (
          <Icon name='arrow-circle-right' size={50} color='#FFA8BA' onPress={() => scrollToIndex(currentIndex + 1)} /> 
          )}
        </View>
      </CustomContainer>
    </>
  );
};

export default ImageSlide;
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { scale } from '../../../utils/Scale';
import { styled } from 'nativewind';
import CustomText from '../../common/atom/CustomText';
import CustomTitle from '../../common/atom/CustomTitle';
import ProfileImage from '../../feat_mina/molecules/ProfileImage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GameResultText from '../atom/GameResultText';
import CustomBtn from '../../common/atom/CustomBtn';
import GameReport from './GameReport';
import FocusReport from './FocusReport';

const Box = styled(View);

const ReportProfile = ({ navigation, data, onSubmit, renderItem }) => {
    // const moveGameReportScreen = () => {
    //     navigation.push('gamereport');
    //   };
     // const moveFocusReportScreen = () => {
    //     navigation.push('focusreport');
    //   };


  return (
    <Box className="flex-col space-y-4" style={{ paddingLeft: scale(20) }}>
      <CustomTitle>발전 상황 리포트</CustomTitle>
      <Box className="flex flex-row w-full">
        <ProfileImage size="xl" />
        <Box className="flex-col space-y-2" style={{ paddingLeft: scale(20) }}>
          <CustomText size="lg">마음이</CustomText>
          <CustomText size="sm" color="darkgray">6, 여자아이</CustomText>
            <CustomText size="sm" color="darkgray">2024.3.27 기준</CustomText>
            <Icon name="ios-share" size={30} color="#000000" />
        </Box>
      </Box>
      {/* 점선 */}
      <Box style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#E0E1E9', width: '95%', marginVertical: scale(10) }}/>
      <Box className="flex flex-row w-full space-x-24" style={{ paddingLeft: scale(40) }}>
        <TouchableOpacity >
      <CustomText size="md">게임 기록</CustomText>
      </TouchableOpacity>
      <TouchableOpacity >
      <CustomText size="md">집중도</CustomText>
      </TouchableOpacity>
      </Box>
      {/* <GameReport/> */}
      <FocusReport/>
    </Box>
  );
};

export default ReportProfile;

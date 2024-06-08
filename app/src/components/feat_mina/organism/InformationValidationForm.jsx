import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import InputContainer from '../../common/molecules/InputContainer';
import InformationForm from '../molecules/InformationForm';
import CustomText from '../../common/atom/CustomText';
import RadioButton from '../../common/atom/RadioButton';
import { scale, moderateScale } from '../../../utils/Scale';
import ModalDatePicker from '../../common/atom/ModalDatePicker';

const InformationValidationForm = ({
  navigation,
  data,
  onSubmit,
  validationList,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const [date, setDate] = useState(new Date());

  const getValidationRule = (key) => {
    switch (key) {
      case '성':
        return kidInfoValidation.find(rule => rule.key === 'child_last_name');
      case '이름':
        return kidInfoValidation.find(rule => rule.key === 'child_first_name');
      case '이메일':
        return guardianInfoValidation.find(rule => rule.key === 'email');
      case '연락처':
        return guardianInfoValidation.find(rule => rule.key === 'phone_number');
      default:
        return null;
    }
  };

  
  useEffect(() => {
    if (data) {
      const initialGender = data.response.kidInformationData.find(
        item => item.key === '성별',
      )?.data;
      setValue('성별', initialGender);
    }
  }, [data, setValue]);

  if (!data) {
    return <View><CustomText>Loading...</CustomText></View>;
  }

  return (
    <InformationForm
      navigation={navigation}
      data={data}
      moveScreen={handleSubmit(onSubmit)}
      isFix={false}
      renderItem={({ item, index }) => {
        if (index === 0 || index === 6) {
          return (
            <View
              className="w-full flex-row"
              style={{
                padding: scale(12),
                marginBottom: scale(6),
                backgroundColor: item.color,
              }}>
              <CustomText>{item.key}</CustomText>
            </View>
          );
        } else if (item.key === '성별') {
          return (
            <View
              className="w-full flex-row justify-center items-center"
              style={{
                padding: scale(12),
                marginBottom: scale(6),
                backgroundColor: item.color,
              }}>
              <RadioButton
                options={['남', '여']}
                onChange={selectedOption => {
                  setValue('성별', selectedOption);
                }}
                initialValue={item.data}
              />
            </View>
          );
        } else if (item.key === '생년월일') {
          return (
            <View
              className="w-full flex-row justify-between items-center"
              style={{
                padding: scale(12),
                marginBottom: scale(6),
                backgroundColor: item.color,
              }}>
              <CustomText>{date.toISOString().split('T')[0]}</CustomText>
              <ModalDatePicker 
                title="생년월일" 
                date={date} 
                setDate={(selectedDate) => {
                  setDate(selectedDate);
                  setValue('생년월일', selectedDate.toISOString().split('T')[0]);
                }} 
              />
            </View>
          );
        } else {
          const informationItem = validationList.find(v => v.key === item.key);
          return (
            <View
              className="w-full flex-col justify-center items-center"
              style={{marginBottom: scale(10)}}>
              <InputContainer
                inputs={[
                  {
                    name: item.key,
                    rules: {
                      required: {
                        value: true,
                        message: informationItem?.errormsg,
                      },
                      pattern: {
                        value: informationItem?.Regex,
                        message: informationItem?.errormsg,
                      },
                    },
                    placeholder: item.key,
                    autoFocus: index === 1,
                    defaultValue: item.data,
                  },
                ]}
                control={control}
                register={register}
              />
              {errors[item.key] && (
                <View
                  className="flex-row"
                  style={{width: moderateScale(327, 0.3)}}>
                  <CustomText size="xs" color="red">
                    {errors[item.key].message ||
                      '올바른 값을 입력해주세요.'}
                  </CustomText>
                </View>
              )}
            </View>
          );
        }
      }}
    />
  );
};

export default InformationValidationForm;

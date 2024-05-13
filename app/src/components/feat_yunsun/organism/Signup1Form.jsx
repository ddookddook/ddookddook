import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import InputContainer from '../../common/molecules/InputContainer';
import CustomText from '../../common/atom/CustomText';
import CustomBtn from '../../common/atom/CustomBtn';
import { scale, moderateScale } from '../../../utils/Scale';

const Signup1Form = ({ navigation, data, onSubmit, renderItem }) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      register,
      setValue,
    } = useForm();

  const informationItem = data.InformationList;

  return (
    <>
      <View >
        {informationItem.slice(5, 7).map((item, index) => (
          <React.Fragment key={index}>
            <InputContainer
              inputs={[
                {
                  name: item.key,
                  rules: {
                    required: { value: true, message: item.errormsg },
                    pattern: { value: item.Regex, message: item.errormsg }
                  },
                  placeholder: item.key,
                }
              ]}
              control={control}
              register={register}
            />
            {errors[item.key] && (
              <View style={{ marginBottom: scale(10), width: moderateScale(327, 0.3) }}>
                <CustomText size="xs" color="red">{errors[item.key].message}</CustomText>
              </View>
            )}
          </React.Fragment>
        ))}
         <CustomBtn 
            size='lg'
            color='buttonyellow'
            rounded= {true}
            title="다음"
            onPress={handleSubmit(onSubmit)} 
      />
      </View>
    </>
  );
  
};

export default Signup1Form;
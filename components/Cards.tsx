import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';

interface Props {
    onPress: ()=> void;
}
export const Card = ({onPress}:Props) => {
  return (
    <TouchableOpacity className='border flex-1 w-full mt-2 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100 relative' onPress={onPress}>
        <View className='border flex flex-row items-center absolute z-50 rounded-full p-1 bg-white/90 top-5 right-5'>
            <Image source={icons.star} className='size-2.5'/>
            <Text>4.4</Text>
        </View>
        <Image source={images.newYork} className='w-full h-40 rounded-lg'/>
        <View className='border flex flex-col mt-2'>
            <Text className='text-base font-rubik-bold text-balck-300'>
                Cozy Studio
            </Text>
            <Text className='text-xs font-rubik text-black' numberOfLines={1}>
                7004 Southwark ter, md
            </Text>
            <View className='border-white flex flex-row items-center justify-between mt-2'>
                <Text className='text-base font-rubik-bold text-primary-300'>
                    $25000
                </Text>
                <Image source={icons.heart} className='w-5 h-5 mr-2' tintColor="#191d31"/>
            </View>
        </View>
    </TouchableOpacity>
  )
}
export const FeatureCard = ({onPress}:Props) => {
    return (
      <TouchableOpacity className='border flex flex-col items-start w-60 h-80 relative'>
        <Image source={images.japan} className='size-full rounded-2xl'/>
        <Image source={images.cardGradient} className='size-full rounded-2xl absolute bottom-0'/>
        <View className='border flex flex-row absolute bg-white/90 items-center px-3 py-1.5 rounded-full top-5 right-5'>
            <Image source={icons.star} className='size-3.5'/>
            <Text>4.4</Text>
        </View>
        <View className='border-yellow-300 flex flex-col items-start absolute bottom-5 inset-x-5'>
            <Text className='text-xl text-white font-rubik-extrabold'>
                Modern Apertment
            </Text>
            <Text className='text-base font-rubik text-white'>
                7004 Southwark ter, md
            </Text>
            <View className='border-white flex flex-row items-center justify-between w-full'>
                <Text className='text-xl font-extrabold text-white'>
                    $25000
                </Text>
                <Image source={icons.heart} className='size-5'/>
            </View>
        </View>
      </TouchableOpacity>
    )
  }


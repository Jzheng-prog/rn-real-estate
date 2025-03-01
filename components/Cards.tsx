import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';
import { Models } from 'react-native-appwrite';

interface Props {
    onPress: ()=> void;
    item: Models.Document;
}
export const Card = ({onPress, item}:Props) => {
  return (
    <TouchableOpacity className='flex-1 w-full mt-2 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100 relative' onPress={onPress}>
        <View className='flex flex-row items-center absolute z-50 rounded-full p-1 px-2 bg-white/90 top-5 right-5'>
            <Image source={icons.star} className='size-2.5'/>
            <Text className='text-sm font-rubik-bold text-primary-300 ml-0.5'>{item.rating}</Text>
        </View>
        <Image source={{uri:item.image}} className='w-full h-40 rounded-lg'/>
        <View className='flex flex-col mt-2'>
            <Text className='text-base font-rubik-bold text-balck-300'>
                {item.name}
            </Text>
            <Text className='text-xs font-rubik text-black' numberOfLines={1}>
                {item.address}
            </Text>
            <View className='border-white flex flex-row items-center justify-between mt-2'>
                <Text className='text-base font-rubik-bold text-primary-300'>
                    ${item.price}
                </Text>
                <Image source={icons.heart} className='w-5 h-5 mr-2' tintColor="#191d31"/>
            </View>
        </View>
    </TouchableOpacity>
  )
}
export const FeatureCard = ({onPress,item}:Props) => {
    return (
      <TouchableOpacity className='flex flex-col items-start w-60 h-80 relative'>
        <Image source={{uri:item.image}} className='size-full rounded-2xl'/>
        <Image source={images.cardGradient} className='size-full rounded-2xl absolute bottom-0'/>
        <View className='flex flex-row absolute bg-white/90 items-center px-3 py-1.5 rounded-full top-5 right-5'>
            <Image source={icons.star} className='size-3.5'/>
            <Text>{item.rating}</Text>
        </View>
        <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
            <Text className='text-xl text-white font-rubik-extrabold'>
                {item.name}
            </Text>
            <Text className='text-base font-rubik text-white'>
                {item.address}
            </Text>
            <View className='flex flex-row items-center justify-between w-full'>
                <Text className='text-xl font-extrabold text-white'>
                    ${item.price}
                </Text>
                <Image source={icons.heart} className='size-5'/>
            </View>
        </View>
      </TouchableOpacity>
    )
  }


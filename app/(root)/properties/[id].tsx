import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '@/lib/useAppwrite'
import { getPropertyByID } from '@/lib/appwrite'
import icons from '@/constants/icons'

const Property = () => {

  const {id} = useLocalSearchParams<{id?:string}>()
  const {data:property} = useAppwrite({fn:getPropertyByID, params:{id:id!}})
  const windowHeight = Dimensions.get('window').height
  return (
    <View>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerClassName='pb-32 bg-white'
        >
        <View className='flex flex-row z-50 absolute mt-16 w-full justify-between'>
          <TouchableOpacity onPress={()=>router.back()}>
            <Image source={icons.backArrow} className='mx-2'/>

          </TouchableOpacity>
          <View className='items-center justify-center flex flex-row'>
            <Image source={icons.heart} className='size-9 mx-2'/>
            <Image source={icons.send} className='size-9 mr-3'/>
          </View>
        </View>
        <View className='relative w-full' style={{height:windowHeight/2}}>
          <Image source={{uri:property?.image}} className='size-full' resizeMode='cover'/>
        </View>

        <View className='h-full'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='m-3 font-rubik-extrabold text-2xl'>{property?.name}</Text>
            <View className='flex flex-row mx-5'>
              <Image source={icons.star} className='size-7 mx-1'/>
              <Text className='font-rubik-extrabold text-lg'>{property?.rating}</Text>
            </View>
          </View>

          <View className='flex flex-row ml-4 justify-start'>
            <Text className='mx-2 bg-primary-200 font-rubik-bold text-primary-300 rounded-full p-2 '>{property?.type}</Text>
            
          </View>
          <View className='flex flex-row items-center my-1 justify-center p-3'>
            <Image source={icons.bed} className='size-10 rounded-full bg-primary-200 p-2'/>
            <Text className='font-rubik-light mx-2'>{property?.bedrooms} bedrooms</Text>
            <Image source={icons.bath} className='size-10 rounded-full bg-primary-200 p-2'/>
            <Text className='font-rubik-light mx-2'>{property?.bathrooms} bath</Text>
            <Image source={icons.area} className='size-10 rounded-full bg-primary-200 p-2'/>
            <Text className='font-rubik-light mx-2'>{property?.area} sqft</Text>
          </View>

          
          <View className='my-4'>
            <Text className='m-3 font-rubik-medium text-2xl'>Agent</Text>
            <View className='flex flex-row items-center mx-5 justify-between'> 
              <View className='mx-1 flex flex-row'>
                <Image source={{uri:property?.agent?.avatar}} className='size-14 rounded-full'/>
                <View className='mx-3'>
                  <Text className='text-lg font-rubik-bold'>{property?.agent.name}</Text>
                  <Text className='text-sm'>{property?.agent.email}</Text>
                </View>
                
              </View>
              <View className='flex flex-row'>
                <Image source={icons.chat} className='size-6 mx-3'/>
                <Image source={icons.phone} className='size-6'/>
              </View>
            </View>
          </View>


          <View>
            <Text className='m-3 font-rubik-medium text-2xl'>Facilities</Text>
            <View className='flex flex-row items-center justify-center'> 
              {property?.facilities.map((item,index)=>(
                  <Text key={index} className='mx-1 border-primary-200 m-1 p-2 rounded-full bg-primary-200'>{item}</Text>
              ))}
            </View>
          </View>

          {/* <View>
            <Text className='m-3 my-4 font-rubik-medium text-2xl'>Gallery</Text>
            <FlatList
              contentContainerClassName='flex gap-4 mt-3'
              contentContainerStyle={{paddingRight:20}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={property?.gallery}
              renderItem={({item})=>(
                <View className='border'>
                  <Image source={{uri:item?.image}} className='size-40 rounded-xl'/>
                </View>
              )}
            />
            <Text>{property?.gallery.length}</Text>
          </View> */}


          <View>
            <Text className='m-3 font-rubik-medium text-2xl'>Location</Text>
            <View className='flex flex-row items-center justify-start mx-3'> 
              <Image source={icons.location} className='size-6'/>
              <Text>{property?.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Property
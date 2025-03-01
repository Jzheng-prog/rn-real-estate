import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import "../../globals.css"
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/search";
import { Card, FeatureCard } from "@/components/Cards";
import icons from "@/constants/icons";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResult from "@/components/NoResult";

export default function Index() {
  
  const {user} = useGlobalContext()
  const params = useLocalSearchParams<{query?:string;filter?:string}>();

  const handleCardPress = (id:string)=>router.push(`/properties/${id}`)
  const {data:lastestProperties, loading: latestPropertiesLoading} = useAppwrite({fn:getLatestProperties})
  const {data:properties, loading, refetch} = 
    useAppwrite(
      {fn:getProperties, params:
        {filter:params.filter!, query:params.query!, limit:6},skip:true})

  useEffect(()=>{
    refetch({
      filter:params.filter!,
      query:params.query!,
      limit:6
    })
  },[params.filter, params.query])

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        // data={[]}
        renderItem={({item})=><Card item={item} onPress={()=>handleCardPress(item.$id)}/>}
        keyExtractor={(item)=>item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading? (<ActivityIndicator size='large' className="text-primary-300 mt-3"/>)
          : <NoResult/>
        }
        ListHeaderComponent={
          <View className="px-5">

            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image source={{uri:user?.avatar}} className="size-12 rounded-full"/>

                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>

                </View>
              </View>
              <Image source={icons.bell} className="size-6" />

            </View>
            <Search/>
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Feature
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">Sell All</Text>
                </TouchableOpacity>
              </View>

              {
                latestPropertiesLoading? <ActivityIndicator size="large" className="text-primary-300"/>
                : !lastestProperties || lastestProperties.length ===0 ? <NoResult/>:
                <FlatList
                  data={lastestProperties}
                  // data={[]}
                  renderItem={({item})=><FeatureCard item={item} onPress={()=>handleCardPress(item.$id)}/>}
                  keyExtractor={item=>item.$id}
                  horizontal
                  contentContainerClassName="flex gap-5 mt-5"
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
              />
              }
              
            </View>
            <View className="my-2 ">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recomendations
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">Sell All</Text>
                </TouchableOpacity>
              </View>
              <Filters/>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

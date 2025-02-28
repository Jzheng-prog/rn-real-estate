import { Link } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import "../../globals.css"
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import Search from "@/components/search";
import { Card, FeatureCard } from "@/components/Cards";
import icons from "@/constants/icons";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";

export default function Index() {
  
  const {user} = useGlobalContext()
  return (
    <SafeAreaView className="bg-white h-full">

      <FlatList
        data={[0,1,2,3]}
        renderItem={({item})=><Card onPress={()=>{{}}}/>}
        keyExtractor={(item)=>item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="border px-5">

            <View className="border flex flex-row items-center justify-between mt-5">
              <View className="border flex flex-row items-center">
                <Image source={{uri:user?.avatar}} className="size-12 rounded-full"/>

                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>

                </View>
              </View>
              <Image source={icons.bell} className="size-6" />

            </View>


            <Search/>

            <View className="my-5 border-red-800">
              <View className="border flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Feature
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">Sell All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                  data={[0,1,2,3]}
                  renderItem={()=><FeatureCard onPress={()=>{}}/>}  
                  keyExtractor={item=>item.toString()}
                  horizontal
                  contentContainerClassName="flex gap-5 mt-5"
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                />
            </View>
            <View className="my-2 border-red-800 border">
              <View className="border flex flex-row items-center justify-between">
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

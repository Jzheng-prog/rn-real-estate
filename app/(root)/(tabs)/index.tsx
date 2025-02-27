import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../../globals.css"

export default function Index() {
  return (
    <View className="flex justify-center items-center h-full">
      <Text className="font-bold my-10 font-rubik text-3xl">Welcome to RealState</Text>
    </View>
  );
}

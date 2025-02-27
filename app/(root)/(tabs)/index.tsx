import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../../globals.css"

export default function Index() {
  return (
    <View className="border p-4">
      <Link href='/sign-in' className="font-rubik-extrabold">sign-in</Link>
      <Link href='/explore'>explore</Link>
      <Link href='/profile'>profile</Link>
      <Link href='/properties/1'>property</Link>
    </View>
  );
}

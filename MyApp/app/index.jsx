import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { fontScale } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../constants/index.js";
import 'react-native-url-polyfill/auto'

const Index = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ImageBackground 
        source={images.login_page} 
        style={{ flex: 1 }} 
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className={`w-full justify-center items-center h-full px-4 relative ${keyboardVisible ? 'mt-[-100px]' : ''}`}>
              <Text className='text-5xl text-white text-center mt-5 font-rbold'>HAPPY TAILS</Text>

              <View className="relative mt-auto mb-28">
                <Text className='text-2xl text-black font-rmedium text-center'>
                  For all the needs your pet needs.
                </Text> 
                <Text className="text-2xl text-black font-rmedium text-center">A service you can trust.</Text>
                <Text className='text-secondary-200 font-rblack text-center text-3xl mt-5'>USING AS A :</Text>

                {/* TouchableOpacity for User */}
                <View className="w-full px-4 bg-black-100 border-2 border-black-200 rounded-2xl mt-6 w-[40vh] justify-center items-center">
                  <TouchableOpacity 
                    className="w-full py-4 justify-center items-center"
                    onPress={() => router.push('/(user)/sign-in')}
                  >
                    <Text className="text-3xl text-center text-white">Pet Parent</Text>
                  </TouchableOpacity>
                </View>

                {/* TouchableOpacity for Vet */}
                <View className="w-full px-4 bg-black-100 border-2 border-black-200 rounded-2xl mt-3 w-[40vh] justify-center items-center">
                  <TouchableOpacity 
                    className="w-full py-3.5 justify-center items-center"
                    onPress={() => router.push('/(vet)/sign-in')}
                  >
                    <Text className="text-3xl text-center text-white">Veterinarian</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <StatusBar backgroundColor='#161622' style='light' />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Index;

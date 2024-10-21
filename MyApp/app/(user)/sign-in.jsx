import { View, Text, Image, ImageBackground, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import CustomButton from '../../components/CustomButton.jsx';
import FormField from '../../components/FormField.jsx';
import { images } from "../../constants/index.js";
import { signIN } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { login, isLogged } = useGlobalContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (isLogged) {
      router.push('/Home');
    }
  }, [isLogged]);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please enter all the field values');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIN(form.email, form.password);
      router.push('/Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  // const submit = () => {
  //   setIsSubmitting(true);
  //   // Simulating form submission delay
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     router.push("/home");
  //   }, 1000);
  // };


  return (
    <SafeAreaView className="bg-primary h-full">
      <ImageBackground 
        source={images.cat} 
        style={{ flex: 1 }} 
        resizeMode="cover"
      >

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className={`w-full justify-center min-h-[120vh] px-4 my-6 ${keyboardVisible ? 'mt-[-150px]' : ''}`}>
            <Image source={images.logo} resizeMode="contain" className='w-[115px] h-[35px]' />

            <Text className="text-semibold text-2xl text-white mt-22 font-psemibold">
              User Sign in
            </Text>

            <FormField 
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyle="mt-4"
              keyboardType="email-address"
            />

            <FormField 
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyle="mt-3"
              secureTextEntry
            />

            <CustomButton 
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-6"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>
                Sign-up
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;

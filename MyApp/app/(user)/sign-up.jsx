import { View, Text, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    petName: '',
    petAge: '',
    petWeight: '',
    petType: '',
    petBreed: '',
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const submit = async () => {
    if(!form.username || !form.password || !form.email ){
      Alert.alert('Error', 'Please enter all the field values');
      return;
    }
    setIsSubmitting(true);

    try{
      
      const formData = {
        ...form,
        petAge: parseInt(form.petAge, 10),
        petWeight: parseFloat(form.petWeight), // Ensure petAge is an integer
      };

      const result = await createUser(formData.email, formData.password, formData.username, formData);

      //set global state.....

      router.push({
        pathname: '/Home',
        params: form,
      });
    }catch(error){
      Alert.alert('Error',error.message);
    }finally{
      setIsSubmitting(false);
    }
    createUser();
  }


    // router.push({
    //   pathname: '/home',
    //   params: form,
    // });
    // setIsSubmitting(false);
  // };


  return (
    <SafeAreaView className="bg-primary h-full">
      <ImageBackground 
        source={images.upcat} 
        style={{ flex: 1 }} 
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center min-h-[90vh] px-4 my-6">
            <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />

            <Text className="text-semibold text-2xl text-white mt-10 font-psemibold">
              User Sign Up
            </Text>

            {step === 1 ? (
              <View>
                {/* Step 1 Fields */}
                <FormField
                  title="Username"
                  value={form.username}
                  handleChangeText={(e) => setForm({ ...form, username: e })}
                  otherStyle="mt-10"
                  cellStyle="bg-black/60 backdrop-blur-md border-black/10"
                />

                <FormField
                  title="Email"
                  value={form.email}
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                  otherStyle="mt-7"
                  cellStyle="bg-black/60 backdrop-blur-md border-black/10"
                  keyboardType="email-address"
                />

                <FormField
                  title="Password"
                  value={form.password}
                  handleChangeText={(e) => setForm({ ...form, password: e })}
                  otherStyle="mt-7"
                  cellStyle="bg-black/60 backdrop-blur-md border-black/10"
                  secureTextEntry
                />

                <CustomButton
                  title="Next"
                  handlePress={handleNext}
                  containerStyles="mt-7"
                />
              </View>
            ) : (
              <View>
                {/* Step 2 Fields */}
                <FormField
                  title="Pet Name"
                  value={form.petName}
                  handleChangeText={(e) => setForm({ ...form, petName: e })}
                  otherStyle="mt-7"
                  cellStyle="bg-black/60 backdrop-blur-md border-black/10"
                />

                <FormField
                  title="Pet Age"
                  value={form.petAge}
                  handleChangeText={(e) => setForm({ ...form, petAge: e })}
                  otherStyle="mt-7"
                  keyboardType="numeric"
                  cellStyle="bg-black/60 backdrop-blur-md border-black/10"

                />

                <FormField
                  title="Pet Weight"
                  value={form.petWeight}
                  handleChangeText={(e) => setForm({ ...form, petWeight: e })}
                  otherStyle="mt-7"
                  keyboardType="numeric"
                  cellStyle="bg-black/60 backdrop-blur-md border-black/10"

                />

                <FormField
                  title="Pet Type (e.g., Dog, Cat)"
                  value={form.petType}
                  handleChangeText={(e) => setForm({ ...form, petType: e })}
                  otherStyle="mt-7"
                  cellStyle="bg-black/60 backdrop-blur-md border-black/10"

                />

                <FormField
                  title="Pet Breed"
                  value={form.petBreed}
                  handleChangeText={(e) => setForm({ ...form, petBreed: e })}
                  otherStyle="mt-7"
                  cellStyle="bg-black/60 backdrop-blur-md border-black/10"

                />

                <CustomButton
                  title="Submit"
                  handlePress={submit}
                  containerStyles="mt-7"
                  isLoading={isSubmitting}
                />

                <CustomButton
                  title="Previous"
                  handlePress={handlePrevious}
                  containerStyles="mt-7"
                />
              </View>
            )}

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
                Sign-In
              </Link>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}


export default SignUp;

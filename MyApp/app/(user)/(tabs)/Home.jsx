import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const AnimatedView = styled(Animated.View);

const HomePage = () => {
  const router = useRouter();
  const [petProfileImage, setPetProfileImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [mealTime, setMealTime] = useState(''); // Input state for meal time
  const [foodType, setFoodType] = useState(''); // Input state for food type
  const [quantity, setQuantity] = useState(''); // Input state for quantity
  const [dietPlan, setDietPlan] = useState([
    { time: 'Morning', food: 'Dry Kibble', quantity: '200g' },
    { time: 'Afternoon', food: 'Wet Food', quantity: '150g' },
    { time: 'Evening', food: 'Chicken Breast', quantity: '100g' },
  ]); // Default diet plan

  const sidebarWidth = Dimensions.get('window').width * 0.75;
  const sidebarAnim = useRef(new Animated.Value(-sidebarWidth)).current;

  const handleChangePetProfileImage = () => {
    Alert.alert('Change Pet Profile Image', 'Functionality not implemented.');
  };

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      Animated.timing(sidebarAnim, {
        toValue: -sidebarWidth,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsSidebarOpen(false));
    } else {
      setIsSidebarOpen(true);
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); // Toggle modal visibility
  };

  const handleAddMeal = () => {
    if (mealTime && foodType && quantity) {
      setDietPlan((prevDietPlan) => [
        ...prevDietPlan,
        { time: mealTime, food: foodType, quantity },
      ]);
      // Clear input fields
      setMealTime('');
      setFoodType('');
      setQuantity('');
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <View className="flex-1 bg-white mt-[5vh]">
      <View className="flex-row items-center justify-between px-4 py-2 bg-white shadow">
        <TouchableOpacity onPress={toggleSidebar}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">Home</Text>
        <View className="w-6 h-6" />
      </View>

      <ScrollView>
        <View className="items-center mt-6">
          <TouchableOpacity onPress={handleChangePetProfileImage}>
            <View className="w-28 h-28 rounded-full bg-gray-300 items-center justify-center">
              <Text className="text-xl text-white">Pet Image</Text>
            </View>
          </TouchableOpacity>
          <Text className="mt-2 text-base">Tap to change pet profile image</Text>
        </View>

        <View className="flex-row justify-around mt-4">
          <View className="items-center">
            <Text className="text-lg font-semibold">Buddy</Text>
            <Text className="text-base">Owner: John Doe</Text>
          </View>

          <View className="items-center">
            <Text className="text-lg font-semibold">Golden Retriever</Text>
            <Text className="text-base">Height: 60 cm</Text>
            <Text className="text-base">Weight: 30 kg</Text>
            <Text className="text-base">Age: 5 years</Text>
          </View>

          <View className="items-center">
            <Text className="text-lg font-semibold">Appointments</Text>
            <Text className="text-base">Next: Nov 10, 2024</Text>
          </View>
        </View>

        <View className="flex-row justify-around mt-6">
          <TouchableOpacity
            className="w-20 h-20 bg-red-500 rounded-full items-center justify-center"
            onPress={toggleModal} // Trigger modal on SOS button press
          >
            <Text className="text-white font-semibold">SOS</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center">
            <Text className="text-white font-semibold text-center">
              Tracking{'\n'}Pet
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8 mx-4">
          <Text className="text-xl font-semibold mb-4">Diet Planning</Text>
          <View className="flex-row bg-gray-200 py-2">
            <Text className="flex-1 text-center font-semibold">Meal Time</Text>
            <Text className="flex-1 text-center font-semibold">Food Type</Text>
            <Text className="flex-1 text-center font-semibold">Quantity</Text>
          </View>
          {dietPlan.map((item, index) => (
            <View
              key={index}
              className="flex-row border-b border-gray-300 py-2"
            >
              <Text className="flex-1 text-center">{item.time}</Text>
              <Text className="flex-1 text-center">{item.food}</Text>
              <Text className="flex-1 text-center">{item.quantity}</Text>
            </View>
          ))}

          {/* Input fields for adding new meals */}
          <View className="mt-4">
            <TextInput
              placeholder="Meal Time"
              value={mealTime}
              onChangeText={setMealTime}
              className="border border-gray-300 rounded p-2 mb-2"
            />
            <TextInput
              placeholder="Food Type"
              value={foodType}
              onChangeText={setFoodType}
              className="border border-gray-300 rounded p-2 mb-2"
            />
            <TextInput
              placeholder="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              className="border border-gray-300 rounded p-2 mb-2"
            />
            <TouchableOpacity
              className="bg-green-500 p-3 rounded items-center"
              onPress={handleAddMeal}
            >
              <Text className="text-white font-semibold">Add Meal</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-8 mx-4">
          <Text className="text-xl font-semibold mb-4">Medication Schedule</Text>
          <View className="flex-row bg-gray-200 py-2">
            <Text className="flex-1 text-center font-semibold">Day</Text>
            <Text className="flex-1 text-center font-semibold">Morning</Text>
            <Text className="flex-1 text-center font-semibold">Afternoon</Text>
            <Text className="flex-1 text-center font-semibold">Night</Text>
          </View>
          {[
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ].map((day, index) => (
            <View
              key={index}
              className="flex-row border-b border-gray-300 py-2"
            >
              <Text className="flex-1 text-center">{day}</Text>
              <Text className="flex-1 text-center">Med A</Text>
              <Text className="flex-1 text-center">
                {day === 'Wednesday' ? 'Med B' : '-'}
              </Text>
              <Text className="flex-1 text-center">Med C</Text>
            </View>
          ))}
        </View>

        <View className="mt-8 mx-4 mb-8">
          <Text className="text-xl font-semibold mb-4">
            Visual Meeting Schedule
          </Text>
          <View className="border border-gray-300 p-4">
            <Text className="text-base mb-2">
              <Text className="font-semibold">Dr. Emily Clark</Text> - Nov 15,
              2024 at 3:00 PM
            </Text>
            <Text className="text-base">
              <Text className="font-semibold">Dr. Michael Lee</Text> - Dec 1,
               2024 at 11:00 AM
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal for SOS information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-4/5 bg-white p-5 rounded-lg">
            <Text className="text-xl font-semibold text-center mb-4">
              Emergency Contacts for Pets
            </Text>
              <Text className="text-base mb-2">Animal Ambulance: 080- 28603986, 28604767, 22733350</Text>
              <Text className="text-base mb-2">Veterinary Helpline: 1962 </Text>
              <Text className="text-base mb-2">Pet Poison Control: (888)-426-4435</Text>
              <Text className="text-base mb-2">Animal Rescue: 01372569753</Text>
            <TouchableOpacity
              onPress={toggleModal}
              className="bg-red-500 mt-4 p-3 rounded-full items-center"
            >
              <Text className="text-white font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isSidebarOpen && (
        <TouchableOpacity
          className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10"
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}

      <AnimatedView
        style={{ transform: [{ translateX: sidebarAnim }] }}
        className="absolute top-0 bottom-0 left-0 w-3/4 bg-white z-20 pt-10"
      >
        <TouchableOpacity onPress={toggleSidebar} className="absolute top-3 right-3">
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View className="flex-row items-center px-5 mb-5 mt-10">
            <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center mr-3">
              <Text className="text-sm text-white">Profile</Text>
            </View>
            <Text className="text-lg font-semibold">My Profile</Text>
          </View>

          <View className="h-px bg-gray-300 my-2 mx-5" />

          {/* Switch Account with navigation */}
          <TouchableOpacity className="py-4 px-5" onPress={() => router.replace('/')}>
            <Text className="text-base">Switch Account</Text>
            <Text className="text-sm text-gray-600">Veterinarian</Text>
          </TouchableOpacity>

          <View className="h-px bg-gray-300 my-2 mx-5" />

          <TouchableOpacity className="py-4 px-5">
            <Text className="text-base">Your Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-4 px-5">
            <Text className="text-base">Help and Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-4 px-5">
            <Text className="text-base">Medical Records</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-4 px-5">
            <Text className="text-base">Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-4 px-5">
            <Text className="text-base">Privacy Policy</Text>
          </TouchableOpacity>
        </ScrollView>
      </AnimatedView>
    </View>
  );
};

export default HomePage;
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const AnimatedView = styled(Animated.View);

const VetHomePage = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [vetProfileImage, setVetProfileImage] = useState(null);
  const sidebarWidth = Dimensions.get('window').width * 0.75;
  const sidebarAnim = useRef(new Animated.Value(-sidebarWidth)).current;

  // Sample data
  const vetName = 'Dr. Alex Thompson';
  const experience = '10 years';
  const hospitalsWorked = 'City Animal Hospital, PetCare Clinic';
  const nextAppointment = {
    date: 'October 20, 2024',
    time: '10:30 AM',
  };
  const weeklyAppointments = [
    { day: 'Monday', time: '10:00 AM', patient: 'Buddy (Dog)' },
    { day: 'Tuesday', time: '12:00 PM', patient: 'Whiskers (Cat)' },
    { day: 'Wednesday', time: '2:00 PM', patient: 'Chirpy (Bird)' },
    { day: 'Thursday', time: '4:00 PM', patient: 'Rex (Dog)' },
    { day: 'Friday', time: '11:30 AM', patient: 'Goldie (Fish)' },
  ];
  const achievements = [
    'Veterinarian of the Year 2022',
    'Top Animal Care Award 2021',
    'Community Service Award 2020',
  ];

  // Placeholder function for changing vet profile image
  const handleChangeVetProfileImage = () => {
    Alert.alert('Change Vet Profile Image', 'Functionality not implemented.');
  };

  const toggleSidebar = () => {
    console.log('Toggling sidebar'); // Debugging line
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

  return (
    <View className="flex-1 bg-white mt-12">
      {/* Header with Hamburger Icon */}
      <View className="flex-row items-center justify-between px-4 py-2 bg-white shadow">
        <TouchableOpacity onPress={toggleSidebar}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View className="w-6 h-6" />
      </View>

      <ScrollView>
        {/* Vet Profile Image Section */}
        <View className="items-center mt-6">
          <TouchableOpacity onPress={handleChangeVetProfileImage}>
            <View className="w-28 h-28 rounded-full bg-gray-300 items-center justify-center">
              {vetProfileImage ? (
                <Image
                  source={{ uri: vetProfileImage }}
                  className="w-28 h-28 rounded-full"
                />
              ) : (
                <Text className="text-xl text-white">Vet Image</Text>
              )}
            </View>
          </TouchableOpacity>
          <Text className="mt-2 text-base">Tap to change vet profile image</Text>
        </View>

        {/* Vet Details */}
        <View className="items-center mt-4">
          <Text className="text-xl font-bold">Name: {vetName}</Text>
          <Text className="text-base text-gray-700">Experience: {experience}</Text>
          <Text className="text-base text-gray-700">Hospitals: {hospitalsWorked}</Text>
          <View className="mt-4">
            <Text className="text-lg font-bold">Next Appointment</Text>
            <Text className="text-base text-gray-700">
              {nextAppointment.date} at {nextAppointment.time}
            </Text>
          </View>
        </View>

        {/* Weekly Appointments Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold mb-2">Weekly Appointments</Text>
          <View className="border-t border-b border-gray-300">
            {weeklyAppointments.map((appointment, index) => (
              <View
                key={index}
                className="flex-row justify-between p-2 border-b border-gray-200"
              >
                <Text className="text-base">{appointment.day}</Text>
                <Text className="text-base">{appointment.time}</Text>
                <Text className="text-base">{appointment.patient}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements Section */}
        <View>
          <Text className="text-xl font-bold mb-2">Achievements</Text>
          {achievements.map((achievement, index) => (
            <Text key={index} className="text-base text-gray-700 mb-1">
              - {achievement}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Sidebar Overlay */}
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
            <Text className="text-sm text-gray-600">Pet Parent</Text>
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

export default VetHomePage;
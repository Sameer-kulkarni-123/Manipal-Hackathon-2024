import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { icons } from '../../../constants'; // Update the path if necessary
import ServicesDropUp from '../../../components/ServicesDropUp'; 

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color, width: 24, height: 24 }}
      />
      <Text style={{ color, fontWeight: focused ? 'bold' : 'normal', fontSize: 12 }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const [isDropUpVisible, setIsDropUpVisible] = useState(false);

  const handleServicesPress = () => {
    setIsDropUpVisible(true);
  };

  const handleCloseDropUp = () => {
    setIsDropUpVisible(false);
  };

  return (
    <>
      <ServicesDropUp visible={isDropUpVisible} onClose={handleCloseDropUp} />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 70,
          }
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.Home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="CommunityForum"
          options={{
            title: 'Community Forum',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.CommunityForum}
                color={color}
                name="Community Forum"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Services"
          options={{
            title: 'Services',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TouchableOpacity onPress={handleServicesPress}>
                <TabIcon
                  icon={icons.Services}
                  color={color}
                  name="Services"
                  focused={focused}
                />
              </TouchableOpacity>
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} onPress={handleServicesPress} />,
          }}
        />

        <Tabs.Screen
          name="ECommerce"
          options={{
            title: 'E-Commerce',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.ECommerce}
                color={color}
                name="E-Commerce"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Rescue"
          options={{
            title: 'Adoption',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.Rescue}
                color={color}
                name="Adoption"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

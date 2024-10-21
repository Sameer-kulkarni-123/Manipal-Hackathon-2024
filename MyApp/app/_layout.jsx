import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import GlobalProvider from '../context/GlobalProvider'
const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "RobotoBlack": require("../assets/fonts/RobotoBlack-Powx.ttf"),
    "RobotoBlackItalic": require("../assets/fonts/RobotoBlackItalic-LmMD.ttf"),
    "RobotoBold": require("../assets/fonts/RobotoBold-Xdoj.ttf"),
    "RobotoBoldCondensed": require("../assets/fonts/RobotoBoldCondensed-gmVP.ttf"),
    "RobotoBoldCondensedItalic": require("../assets/fonts/RobotoBoldCondensedItalic-o38a.ttf"),
    "RobotoBoldItalic": require("../assets/fonts/RobotoBoldItalic-4e0x.ttf"),
    "RobotoCondensed": require("../assets/fonts/RobotoCondensed-0GXR.ttf"),
    "RobotoCondensedItalic": require("../assets/fonts/RobotoCondensedItalic-e5A6.ttf"),
    "RobotoItalic": require("../assets/fonts/RobotoItalic-W0gE.ttf"),
    "RobotoLight": require("../assets/fonts/RobotoLight-aW3R.ttf"),
    "RobotoLightItalic": require("../assets/fonts/RobotoLightItalic-E9nn.ttf"),
    "RobotoMedium": require("../assets/fonts/RobotoMedium-Owv4.ttf"),
    "RobotoMediumItalic": require("../assets/fonts/RobotoMediumItalic-ZW0m.ttf"),
    "RobotoRegular": require("../assets/fonts/RobotoRegular-3m4L.ttf"),
    "RobotoThin": require("../assets/fonts/RobotoThin-xjmK.ttf"),
    "RobotoThinItalic": require("../assets/fonts/RobotoThinItalic-pqYK.ttf"),
});



  useEffect(() =>{
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null;

  return(
    
        <Stack>
          <Stack.Screen name = "index" options={{ headerShown: false}} />
          <Stack.Screen name = "(user)" options={{ headerShown: false}} />
          <Stack.Screen name = "(vet)" options={{ headerShown: false}} />
      </Stack>
    
    
  );
}

export default RootLayout;
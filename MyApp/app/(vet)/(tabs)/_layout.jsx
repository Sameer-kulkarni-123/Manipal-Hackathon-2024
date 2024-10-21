import { Text, View , Image} from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import React from 'react'
import { icons } from '../../../constants'

const TabIcon = ({icon, color, name, focused}) => {
    return(
        <View className = "items-center justify-center gap-2">
        

        <Image
            source={icon}
            resizeMode="contain"
            style={{ tintColor: color, width: 24, height: 24 }}
        />
        <Text className={`${focused ? 'font-psemiblod' : 'font-pregular'} text-xs`} style={{color:color}}>
            {name}

        </Text>
        </View>
    )
}

const tabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor:"#FFA001",
                tabBarInactiveTintColor:"#CDCDE0",
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1, 
                    borderTopColor: '#232533',
                    height:70,
                }
            }}
        >


            <Tabs.Screen 
            name="HomeVet" 
            options = {{
                title: 'Home' ,
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 

                        icon={icons.Home}

                        color={color}
                        name = "Home"
                        focused = {focused}
                    />
                )
            }}
            />

            <Tabs.Screen 
            name="CommunityForumVet" 
            options = {{
                title: 'Community Forum' ,
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.CommunityForum}
                        color={color}
                        name = "Community Forum"
                        focused = {focused}
                    />
                )
            }}
            />


        



        <Tabs.Screen 
            name="MedicalRecords" 
            options = {{
                title: 'Medical Records' ,
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.MedicalRecords}
                        color={color}
                        name = "Medical Records"
                        focused = {focused}
                    />
                )
            }}
            />



        <Tabs.Screen 
            name="Meeting" 
            options = {{
                title: 'Meeting' ,
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.VirtualMeeting}
                        color={color}
                        name = "Meeting"
                        focused = {focused}
                    />
                )
            }}
            />

        </Tabs>
    </>
  )
}

export default tabsLayout


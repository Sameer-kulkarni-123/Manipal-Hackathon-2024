import { StyleSheet, Text, View, TextInput, Touchable, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {icons} from '../constants'

const FormField = ({title,value, handleChangeText, otherStyle, cellStyle, keyboardType, placeholder, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className ={`space-y-2 ${otherStyle}`}>
      <Text className="text-base text-secondary text-pmedium">{title}</Text>

      <View className={`w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row ${cellStyle}`}>
        <TextInput 
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.Eye : icons.EyeHide } className="w-6 h-6 resizeMode=contain"/>

            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({})
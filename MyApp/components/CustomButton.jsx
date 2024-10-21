import { TouchableOpacity, Text, StyleSheet} from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isloading}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-[#212224] rounded-xl h-[50px] justify-center item-center ${containerStyles} ${isloading ? 'opacity-50' :''}`}
        disabled={isloading}>
        
    
        <Text className={`text-primary text-lg text-center ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})
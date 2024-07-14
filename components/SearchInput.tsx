import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

interface SearchInputProps {
  title: string
  value: string
  handleChangeText: (event: string) => void
  otherStyles: string
  keyboardType?: string
  props?: unknown
}

const SearchInput = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  ...props
}: SearchInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        placeholder="Search for a video topic"
        value={value}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
      ></TextInput>
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput

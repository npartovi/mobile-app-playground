import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Models } from 'react-native-appwrite'

interface TrendingProps {
  posts: Models.Document[]
}

const Trending = ({ posts }: TrendingProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
      horizontal
    />
  )
}

export default Trending

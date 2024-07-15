import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { searchPosts } from '@/lib/appwrite'
import { Models } from 'react-native-appwrite'
import useAppWrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

type Video = {
  title: string
  thumbnail: string
  video: string
  users: {
    username: string
    avatar: string
  }
} & Models.Document

const Search = () => {
  const { query } = useLocalSearchParams()

  const [refreshing, setRefreshing] = useState(false)

  const { data: posts, refetch } = useAppWrite({
    fn: () => searchPosts(query as string),
  })

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item as Video} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query as string} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No Videos for this search query"
          />
        )}
      ></FlatList>
    </SafeAreaView>
  )
}

export default Search

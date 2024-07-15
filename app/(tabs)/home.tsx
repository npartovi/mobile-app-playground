import { View, Text, SafeAreaView, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { images } from '../../constants'
import SearchInput from '@/components/SearchInput'
import TrendingTest from '@/components/TrendingTest'
import EmptyState from '@/components/EmptyState'
import { RefreshControl } from 'react-native-gesture-handler'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import { Models } from 'react-native-appwrite'
import useAppWrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'

type Video = {
  title: string
  thumbnail: string
  video: string
  users: {
    username: string
    avatar: string
  }
} & Models.Document

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetch } = useAppWrite({ fn: getAllPosts })
  const { data: latestPosts } = useAppWrite({ fn: getLatestPosts })

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item as Video} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Nima Partovi
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <TrendingTest posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      ></FlatList>
    </SafeAreaView>
  )
}

export default Home

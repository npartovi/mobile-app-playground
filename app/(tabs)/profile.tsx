import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { getUserPosts, signOut } from '@/lib/appwrite'
import { Models } from 'react-native-appwrite'
import useAppWrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'
import { router } from 'expo-router'

type Video = {
  title: string
  thumbnail: string
  video: string
  users: {
    username: string
    avatar: string
  }
} & Models.Document

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()

  const { data: posts, refetch } = useAppWrite({
    fn: () => getUserPosts(user?.$id || ''),
  })

  const logOut = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item as Video} />}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logOut}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
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

export default Profile

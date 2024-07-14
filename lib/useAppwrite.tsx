import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { Models } from 'react-native-appwrite'
import { getAllPosts } from './appwrite'

interface UseAppwriteProps {
  fn: () => Promise<Models.Document[]>
}

const useAppWrite = ({ fn }: UseAppwriteProps) => {
  const [data, setData] = useState<Models.Document[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await fn()
      setData(response)
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()

  return { data, refetch }
}

export default useAppWrite

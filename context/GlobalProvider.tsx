import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '../lib/appwrite'
import { Models } from 'react-native-appwrite'

type GlobalContextProps = {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  user: Models.Document | null
  setUser: React.Dispatch<React.SetStateAction<Models.Document | null>>
  isLoading: boolean
}

const GlobalContext = createContext<GlobalContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
})

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<Models.Document | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser()
        if (res) {
          setIsLoggedIn(true)
          setUser(res)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider

import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Link, Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import 'react-native-reanimated'
import { ActivityIndicator, View } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { publishableKey } from '@/constants/Keys'
import { UserInactivityProvider } from '@/contexts/UserInactivity'

const queryClient = new QueryClient()

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  )
}

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  const router = useRouter()
  const segments = useSegments()
  const { isLoaded, isSignedIn } = useAuth()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    if (!isLoaded) return
    console.log('isSignedIn: ', isSignedIn)

    const inAuthGroup = segments[0] === '(authenticated)'

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home')
    } else if (!isSignedIn) {
      router.replace('/')
    }
  }, [isSignedIn])

  useEffect(() => {
    if (!isLoaded) return

    const inAuthGroup = segments[0] === '(authenticated)'

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home')
      // router.replace('/(authenticated)/(modals)/lock')
    } else if (!isSignedIn) {
      router.replace('/')
    }
  }, [isSignedIn])

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  const BackBtn = () => {
    return (
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={36} color={Colors.dark} />
      </TouchableOpacity>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(screens)/help"
          options={{ title: 'Help', presentation: 'modal' }}
        />
        <Stack.Screen
          name="(screens)/signup"
          options={{
            headerShown: true,
            title: 'Sign Up',
            headerBackTitle: 'Login',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => BackBtn(),
          }}
        />
        <Stack.Screen
          name="(screens)/login"
          options={{
            headerShown: true,
            title: 'Sign In',
            headerBackTitle: 'Login',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => BackBtn(),
            headerRight: () => (
              <Link href="/(screens)/help" asChild>
                <Ionicons
                  name="help-circle-outline"
                  size={36}
                  color={Colors.dark}
                />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="(screens)/verify/[phone]"
          options={{
            headerShown: true,
            title: 'Verify Phone',
            headerBackTitle: 'Sign Up',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => BackBtn(),
          }}
        />
        <Stack.Screen
          name="(authenticated)/(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(authenticated)/crypto/[id]"
          options={{
            title: '',
            headerLargeTitle: true,
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={34} color={Colors.dark} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity>
                  <Ionicons
                    name="notifications-outline"
                    size={34}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="star-outline" size={34} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="(authenticated)/(modals)/lock"
          options={{ headerShown: false, animation: 'none' }}
        />
        <Stack.Screen
          name="(authenticated)/(modals)/account"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            title: 'Your account',
            headerTransparent: true,
            headerRight: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="close-circle" size={36} color={Colors.dark} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(authenticated)/(modals)/addTransaction"
          options={{
            presentation: 'transparentModal',
            animation: 'slide_from_bottom',
            title: 'Add Transaction',
            headerTransparent: true,
            headerRight: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name="close-circle" size={36} color={Colors.dark} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  )
}

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <UserInactivityProvider>
          <StatusBar style="dark" />
          <InitialLayout />
        </UserInactivityProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default RootLayoutNav

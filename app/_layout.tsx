import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Link, Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'

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

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
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
      </Stack>
    </GestureHandlerRootView>
  )
}

const RootLayoutNav = () => {
  return (
    <>
      <StatusBar style="dark" />
      <InitialLayout />
    </>
  )
}

export default RootLayoutNav

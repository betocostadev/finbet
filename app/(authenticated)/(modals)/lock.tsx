import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import * as LocalAuthentication from 'expo-local-authentication'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const LockScreen = () => {
  const { user } = useUser()
  const router = useRouter()
  const [firstName] = useState(user?.firstName)
  const [code, setCode] = useState<number[]>([])
  const codeLength = Array(6).fill(0)

  const offset = useSharedValue(0)

  const OFFSET = 20
  const TIME = 80

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    }
  })

  const onNumberPress = (num: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setCode([...code, num])
  }

  const onNumberBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setCode(code.slice(0, -1))
  }

  const onBioMetricAuthPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync()
    if (success) {
      router.replace('/(authenticated)/(tabs)/home')
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
  }

  useEffect(() => {
    if (code.length === 6) {
      if (code.join('') === '111111') {
        router.replace('/(authenticated)/(tabs)/home')
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        )
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        setCode([])
      }
    }
  }, [code])

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome back, {firstName}</Text>

      <Animated.View style={[styles.codeView, animStyle]}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[
              styles.codeEmpty,
              {
                backgroundColor:
                  code[index] || code[index] === 0
                    ? Colors.primary
                    : Colors.lightGray,
              },
            ]}
          ></View>
        ))}
      </Animated.View>

      <View style={styles.numbersView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[1, 2, 3].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberBackground}
              onPress={() => onNumberPress(num)}
            >
              <Text style={styles.numberSign}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[4, 5, 6].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberBackground}
              onPress={() => onNumberPress(num)}
            >
              <Text style={styles.numberSign}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberBackground}
              onPress={() => onNumberPress(num)}
            >
              <Text style={styles.numberSign}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.numberBackground}
            onPress={onBioMetricAuthPress}
          >
            <MaterialCommunityIcons
              name="face-recognition"
              size={22}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.numberBackground}
            onPress={() => onNumberPress(0)}
          >
            <Text style={styles.numberSign}>{0}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.numberBackground,
              {
                backgroundColor: code.length ? Colors.lightGray : 'transparent',
              },
            ]}
            onPress={onNumberBackspace}
          >
            <Text style={styles.numberSign}>
              <MaterialCommunityIcons
                name="backspace-outline"
                size={26}
                color={code.length ? 'black' : 'transparent'}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            color: Colors.primary,
            fontWeight: '500',
            fontSize: 18,
          }}
        >
          Use your passcode to unlock Finbet
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    alignSelf: 'center',
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 60,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numbersView: {
    marginHorizontal: 60,
    gap: 50,
  },
  numberSign: {
    fontSize: 30,
  },
  numberBackground: {
    borderRadius: 40,
    width: 56,
    height: 56,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LockScreen

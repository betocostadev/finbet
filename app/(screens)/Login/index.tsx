import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useState } from 'react'

import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { styles } from './styles'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'
import { ScrollView } from 'react-native-gesture-handler'

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const LoginScreen = () => {
  const [countryCode, setCountryCode] = useState('+55')
  const [phoneNumber, setPhoneNumber] = useState('')
  const keyboardOffset = Platform.OS === 'ios' ? 86 : 20
  const router = useRouter()
  const { signIn } = useSignIn()

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        })

        const firstPhoneFactor: any = supportedFirstFactors?.find(
          (factor: any) => factor.strategy === 'phone_code'
        )

        const { phoneNumberId } = firstPhoneFactor

        await signIn!.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId,
        })

        router.push({
          pathname: '/(screens)/verify/[phone]',
          params: { phone: fullPhoneNumber, signin: 'true' },
        })
      } catch (error) {
        console.log('error', JSON.stringify(error, null, 2))
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === 'form_identifier_not_found') {
            Alert.alert('Error', error.errors[0].message)
          }
        }
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardOffset}
    >
      <ScrollView>
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>Welcome back!</Text>
          <Text style={defaultStyles.descriptionText}>
            Enter the phone number associated with your account
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Country Code"
              placeholderTextColor={Colors.gray}
              value={countryCode}
              onChangeText={setCountryCode}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Mobile number"
              placeholderTextColor={Colors.gray}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                { marginVertical: 20 },
                phoneNumber !== '' ? styles.enabled : styles.disabled,
              ]}
              onPress={() => onSignIn(SignInType.Phone)}
            >
              <Text style={defaultStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
              <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
              <View style={styles.separator} />
            </View>
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                {
                  flexDirection: 'row',
                  gap: 16,
                  marginTop: 20,
                  backgroundColor: '#fff',
                },
              ]}
              onPress={() => onSignIn(SignInType.Email)}
            >
              <Ionicons name="mail" size={24} color={'#000'} />
              <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
                Continue with email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                {
                  flexDirection: 'row',
                  gap: 16,
                  marginTop: 20,
                  backgroundColor: '#fff',
                },
              ]}
              onPress={() => onSignIn(SignInType.Google)}
            >
              <Ionicons name="logo-google" size={24} color={'#000'} />
              <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
                Continue with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                {
                  flexDirection: 'row',
                  gap: 16,
                  marginTop: 20,
                  backgroundColor: '#fff',
                },
              ]}
              onPress={() => onSignIn(SignInType.Apple)}
            >
              <Ionicons name="logo-apple" size={24} color={'#000'} />
              <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
                Continue with Apple
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
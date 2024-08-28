import {
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
import { Link } from 'expo-router'

const SignupScreen = () => {
  const onSignup = async () => {}
  const [countryCode, setCountryCode] = useState('+55')
  const [phoneNumber, setPhoneNumber] = useState('')
  const keyboardOffset = Platform.OS === 'ios' ? 86 : 20

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code
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
        <Link href={'/help'} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              { marginVertical: 20 },
              phoneNumber !== '' ? styles.enabled : styles.disabled,
            ]}
            onPress={onSignup}
          >
            <Text style={defaultStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignupScreen

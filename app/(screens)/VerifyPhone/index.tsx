import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'
import { Fragment, useEffect, useState } from 'react'
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo'
import { defaultStyles } from '@/constants/Styles'

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { styles } from './styles'

const CELL_COUNT = 6

const VerifyPhoneScreen = () => {
  // Verify if it is a signin or signup
  const { phone, signin } = useLocalSearchParams<{
    phone: string
    signin?: string
  }>()
  const [code, setCode] = useState('')
  const { signIn } = useSignIn()
  const { signUp, setActive } = useSignUp()

  // Code Field
  const ref = useBlurOnFulfill({ value: phone, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  })

  console.log(phone)
  console.log(signin)

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      })
      await setActive!({ session: signUp!.createdSessionId })
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2))
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].message)
      }
    }
  }

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      })
      await setActive!({ session: signIn!.createdSessionId })
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2))
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].message)
      }
    }
  }

  useEffect(() => {
    if (code.length === 6) {
      if (signin === 'true') {
        verifySignIn()
      } else {
        verifyCode()
      }
    }
  }, [code])

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>Code sent to {phone}.</Text>
      <Text style={[defaultStyles.descriptionText, { fontStyle: 'italic' }]}>
        The code will not be sent if you already have an account.
      </Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select<'sms-otp' | 'one-time-code'>({
          android: 'sms-otp',
          default: 'one-time-code',
        })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />

      <Link href={'/login'} replace asChild>
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Text style={defaultStyles.textLink}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default VerifyPhoneScreen

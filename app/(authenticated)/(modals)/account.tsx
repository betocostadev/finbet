import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native'
import React, { useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'

const Account = () => {
  const { user } = useUser()
  const { signOut } = useAuth()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [edit, setEdit] = useState(false)

  const onSaveUser = async () => {
    try {
      if (firstName?.length && lastName?.length) {
        await user?.update({ firstName, lastName })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setEdit(false)
    }
  }

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    })

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      try {
        user?.setProfileImage({
          file: base64,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (!user) {
    return (
      <BlurView intensity={80} style={styles.container}>
        <Text>
          Sorry, there was an error loading your data, please try again.
        </Text>
      </BlurView>
    )
  }

  return (
    <BlurView intensity={80} style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <TouchableOpacity style={styles.captureBtn} onPress={onCaptureImage}>
          {user.imageUrl && (
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {!edit ? (
          <View style={styles.editRow}>
            <Text style={{ fontSize: 26 }}>
              {firstName} {lastName}
            </Text>
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Ionicons name="pencil-outline" size={24} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.editRow}>
            <TextInput
              style={styles.inputField}
              placeholder="First Name"
              value={firstName || ''}
              onChangeText={setFirstName}
            />

            <TextInput
              style={styles.inputField}
              placeholder="Last Name"
              value={lastName || ''}
              onChangeText={setLastName}
            />

            <TouchableOpacity onPress={onSaveUser}>
              <Ionicons name="checkmark-outline" size={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  captureBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  inputField: {
    fontSize: 20,
    width: 120,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 10,
    padding: 8,
  },
})

export default Account

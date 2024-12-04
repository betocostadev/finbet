import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon'

const ICONS = [
  {
    name: 'Default',
    icon: require('@/assets/images/icon.png'),
  },
  {
    name: 'Dark',
    icon: require('@/assets/images/icon-dark.png'),
  },
  {
    name: 'Vivid',
    icon: require('@/assets/images/icon-vivid.png'),
  },
]

const Account = () => {
  const { user } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [edit, setEdit] = useState(false)

  const [activeIcon, setActiveIcon] = useState('Default')

  useEffect(() => {
    const loadCurrentIconPref = async () => {
      const icon = await getAppIcon()
      console.log('Icon is: ', icon)
      setActiveIcon(icon)
    }
    loadCurrentIconPref()
  }, [])

  const handleSignOut = () => {
    signOut()
    router.replace('/')
  }

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

  const onChangeAppIcon = async (icon: string) => {
    await setAppIcon(icon.toLowerCase())
    setActiveIcon(icon)
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
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={handleSignOut}>
          <Ionicons name="person" size={24} color={Colors.dark} />
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="person" size={24} color={Colors.dark} />
          <Text style={styles.btnText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="bulb" size={24} color={Colors.dark} />
          <Text style={styles.btnText}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="megaphone" size={24} color={Colors.dark} />
          <Text style={[styles.btnText, { flex: 1 }]}>Inbox</Text>
          <View style={styles.inboxView}>
            <Text style={{ color: '#fff', fontSize: 12 }}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        {ICONS.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            style={styles.btn}
            onPress={() => onChangeAppIcon(icon.name)}
          >
            <Image source={icon.icon} style={styles.iconImage} />
            <Text style={styles.btnText}>{icon.name}</Text>
            {activeIcon.toLowerCase() === icon.name.toLowerCase() && (
              <Ionicons name="checkmark" size={24} color={Colors.dark} />
            )}
          </TouchableOpacity>
        ))}
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
  actions: {
    backgroundColor: 'rgba(256,256,256, 0.3)',
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  btn: {
    padding: 14,
    flexDirection: 'row',
    gap: 20,
  },
  btnText: {
    color: Colors.dark,
    fontSize: 18,
  },
  inboxView: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
})

export default Account

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { useAssets } from 'expo-asset'
import { ResizeMode, Video } from 'expo-av'
import { Link } from 'expo-router'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'

const HomeScreen = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')])
  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to control your finances?</Text>
      </View>
      <View style={styles.buttons}>
        <Link
          href="/login"
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.darkBlue },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.loginLabel}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href="/signup"
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.loginLabel}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    fontSize: 36,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 60,
    paddingHorizontal: 18,
  },
  loginLabel: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
})

export default HomeScreen

import { View, Text, StyleSheet, TextInput } from 'react-native'
import { BlurView } from 'expo-blur'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

const CustomHeader = () => {
  const { top } = useSafeAreaInsets()
  return (
    <BlurView intensity={75} tint="extraLight" style={{ paddingTop: top }}>
      <View style={styles.container}>
        <Link href="/(authenticated)/(modals)/account" asChild>
          <TouchableOpacity style={styles.roundBtn}>
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
              SG
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="search"
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View style={styles.circle}>
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name="card" size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    height: 60,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    color: Colors.dark,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CustomHeader

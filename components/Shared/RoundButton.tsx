import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type RoundButtonProps = {
  title: string
  icon: typeof Ionicons.defaultProps
  onPress?: () => void
}

const RoundButton = ({ title, icon, onPress }: RoundButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={30} color={Colors.dark} />
      </View>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark,
  },
})

export default RoundButton

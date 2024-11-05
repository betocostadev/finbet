import Colors from '@/constants/Colors'
import { Button, ScrollView, StyleSheet } from 'react-native'

import { Text, View } from 'react-native'

const HomeTabScreen = () => {
  const balance = 2590

  return (
    <ScrollView style={styles.container}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.currency}>R$</Text>
          <Text style={styles.balance}>{balance}</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <Button title="Send" />
        <Button title="Request" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  account: {
    margin: 80,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 24,
    marginRight: 5,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
})

export default HomeTabScreen

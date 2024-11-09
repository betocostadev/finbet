import Dropdown from '@/components/Shared/Dropdown'
import RoundButton from '@/components/Shared/RoundButton'
import Colors from '@/constants/Colors'
import { useBalanceStore } from '@/store/balanceStore'
import { ScrollView, StyleSheet } from 'react-native'

import { Text, View } from 'react-native'

const HomeTabScreen = () => {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore()

  const onAddMoney = () => 0

  return (
    <ScrollView style={styles.container}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.currency}>R$</Text>
          <Text style={styles.balance}>{balance()}</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton icon="add" title="Add money" onPress={onAddMoney} />
        <RoundButton icon="refresh" title="Exchange" />
        <RoundButton icon="list" title="Details" />
        <Dropdown />
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
    fontSize: 44,
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

import Dropdown from '@/components/Shared/Dropdown'
import RoundButton from '@/components/Shared/RoundButton'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { useBalanceStore } from '@/store/balanceStore'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, StyleSheet } from 'react-native'

import { Text, View } from 'react-native'

const HomeTabScreen = () => {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore()

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: -29,
      date: new Date(),
      title: 'Lost money again',
    })
  }

  console.log(transactions)

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
        <RoundButton
          icon="refresh"
          title="Exchange"
          onPress={clearTransactions}
        />
        <RoundButton icon="list" title="Details" />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>

      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No transactions yet.
          </Text>
        )}

        {transactions.map((transaction) => (
          <View
            key={transaction.id}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}
          >
            <View style={styles.circle}>
              <Ionicons
                name={transaction.amount > 0 ? 'add' : 'remove'}
                size={24}
                color={transaction.amount > 0 ? 'green' : 'red'}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {new Date(transaction.date).toLocaleDateString()}
              </Text>
            </View>
            <Text>R$ {transaction.amount}</Text>
          </View>
        ))}
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
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeTabScreen

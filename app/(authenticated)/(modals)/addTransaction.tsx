import {
  View,
  Text,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useBalanceStore } from '@/store/balanceStore'
import { defaultStyles } from '@/constants/Styles'
import { formatCurrency } from '@/utils/currency'

type Transaction = 'income' | 'expense'

const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState<Transaction>('income')
  const { runTransaction } = useBalanceStore()
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  const [hasErrorTitle, setHasErrorTitle] = useState(true)

  useEffect(() => {
    setAmount(formatCurrency('0'))
  }, [])

  const handleTransactionType = (type: Transaction) => {
    setTransactionType(type)
  }

  const handleAmountChange = (
    e: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    const value = e.nativeEvent.text
    if (!isNaN(Number(value))) {
      setAmount(formatCurrency(value))
    }
  }

  // const sanitizeData = (amount: string) => {
  //   if (amount.includes(',')) {
  //     amount = amount.split(',').join('.')
  //     console.log(amount)
  //     console.log(isNaN(Number(amount)))
  //     console.log(Number(amount).toLocaleString())
  //   }
  // }

  const handleAddTransaction = () => {
    console.log('title: ', title)
    console.log('amount: ', amount)

    // runTransaction({
    //   id: Math.random().toString(),
    //   amount: Number(amount),
    //   date: new Date(),
    //   title,
    // })
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.left,
              transactionType === 'expense' ? styles.activeExpense : null,
            ]}
            onPress={() => {
              handleTransactionType('expense')
            }}
          >
            <Ionicons name="remove-circle" size={24} color="#f5f4f4" />
            <Text style={styles.buttonText}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.right,
              transactionType === 'income' ? styles.activeIncome : null,
            ]}
            onPress={() => {
              handleTransactionType('income')
            }}
          >
            <Ionicons name="add-circle" size={24} color="#f5f4f4" />
            <Text style={styles.buttonText}>Income</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Transaction name"
            keyboardType="default"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Value"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            onBlur={handleAmountChange}
          />
        </View>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 12,
              borderRadius: 10,
            }}
            onPress={handleAddTransaction}
          >
            <Text style={defaultStyles.buttonText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'rgb(240, 240, 240)',
  },
  formContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  left: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#f09999',
  },
  right: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#8bec95',
  },
  buttonText: {
    fontWeight: 'bold',
    paddingHorizontal: 8,
    color: 'white',
  },
  activeExpense: {
    backgroundColor: '#ff2f2f',
    borderRightColor: '#da1717',
    borderRightWidth: 2,
  },
  activeIncome: {
    backgroundColor: '#16d729',
    borderLeftColor: '#0e981c',
    borderLeftWidth: 2,
  },
  inputsContainer: {
    alignItems: 'stretch',
    paddingHorizontal: 30,
  },
  inputField: {
    marginVertical: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 10,
    padding: 8,
  },
})

export default AddTransaction

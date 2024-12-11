import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useBalanceStore } from '@/store/balanceStore'
import { defaultStyles } from '@/constants/Styles'
import {
  formatCurrencyBRLString,
  parseBRLCurrencyToFloat,
} from '@/utils/currency'
import LastTransaction from '@/components/Shared/LastTransaction'

type Transaction = 'income' | 'expense'

const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState<Transaction>('income')
  const { runTransaction } = useBalanceStore()
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  const [hasErrorTitle, setHasErrorTitle] = useState(false)
  const [hasErrorAmount, setHasErrorAmount] = useState(false)

  const handleTransactionType = (type: Transaction) => {
    setTransactionType(type)
  }

  const handleTitleChange = (value: string) => {
    setHasErrorTitle(false)
    setTitle(value)
  }

  const handleAmountChange = (value: string) => {
    setHasErrorAmount(false)
    setAmount(formatCurrencyBRLString(value))
  }

  const handleAddTransaction = () => {
    if (!title.length) {
      setHasErrorTitle(true)
      return
    }

    if (!amount.length) {
      setHasErrorAmount(true)
      return
    }

    const numAmount = parseBRLCurrencyToFloat(amount)
    if (numAmount <= 0) {
      setHasErrorAmount(true)
      return
    }

    runTransaction({
      id: Math.random().toString(),
      amount: transactionType === 'income' ? numAmount : numAmount * -1,
      date: new Date(),
      title,
    })
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
            placeholder="Transaction title"
            keyboardType="default"
            value={title}
            onChangeText={handleTitleChange}
          />
          {hasErrorTitle && (
            <Text style={styles.textError}>
              Please input a transaction title
            </Text>
          )}
          <TextInput
            style={styles.inputField}
            placeholder="Value"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={handleAmountChange}
          />
          {hasErrorAmount && (
            <Text style={styles.textError}>Please input a valid number</Text>
          )}
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
        <View style={{ marginTop: 50 }}>
          <LastTransaction />
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
    paddingHorizontal: 22,
    paddingVertical: 14,
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
  textError: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#d22f2f',
  },
})

export default AddTransaction

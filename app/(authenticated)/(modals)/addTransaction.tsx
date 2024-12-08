import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

type Transaction = 'income' | 'expense'

const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState<Transaction>('income')

  const handleTransactionType = (type: Transaction) => {
    setTransactionType(type)
  }

  return (
    <View style={styles.container}>
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
          <Ionicons name="remove-circle" size={24} color={Colors.dark} />
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
          <Ionicons name="add-circle" size={24} color={Colors.dark} />
          <Text style={styles.buttonText}>Income</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  buttonsContainer: {
    margin: 10,
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
    backgroundColor: '#a6feaf',
  },
  buttonText: {
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  activeExpense: {
    backgroundColor: '#ff2f2f',
    borderRightColor: '#da1717',
    borderRightWidth: 2,
  },
  activeIncome: {
    backgroundColor: '#1bff32',
    // borderBottomColor: '#0be121',
    // borderBottomWidth: 2,
    borderLeftColor: '#0be121',
    borderLeftWidth: 2,
  },
})

export default AddTransaction

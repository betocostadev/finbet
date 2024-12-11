import { StyleSheet, Text, View } from 'react-native'

const LastTransaction = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Last transaction</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={{ fontWeight: 'bold' }}>Type</Text>
          </View>
          <View style={styles.cell}>
            <Text style={{ fontWeight: 'bold' }}>Name</Text>
          </View>
          <View style={styles.cell}>
            <Text style={{ fontWeight: 'bold' }}>Value</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text>Income</Text>
          </View>
          <View style={styles.cell}>
            <Text>Bolas</Text>
          </View>
          <View style={styles.cell}>
            <Text>R$550,00</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  table: {
    minWidth: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LastTransaction

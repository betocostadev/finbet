import { Currency } from '@/types/crypto'
import { useQuery } from '@tanstack/react-query'
import { StyleSheet } from 'react-native'

import { Text, View } from 'react-native'

const CryptoTabScreen = () => {
  const {
    isPending,
    error,
    data: currencies,
  } = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
  })

  // const ids = currencies?.map((currency: Currency) => currency.id).join(',')

  if (error) {
    return (
      <View style={styles.container}>
        <Text>An error has occurred: {error.message}</Text>
      </View>
    )
  }

  console.log(currencies)

  return (
    <View style={styles.container}>
      {isPending && <Text>Loading Crypto...</Text>}
      <Text style={styles.title}>Crypto</Text>
      <View style={styles.separator} />
      <View>
        {currencies?.map((currency: Currency) => (
          <Text key={currency.id}>{currency.name}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})

export default CryptoTabScreen

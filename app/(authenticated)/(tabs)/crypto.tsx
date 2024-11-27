import Colors from '@/constants/Colors'
import useCryptoCurrencies from '@/hooks/useCryptoCurrencies'
import useLogos from '@/hooks/useLogos'
import { Currency } from '@/types/crypto'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet } from 'react-native'

import { Text, View } from 'react-native'

const CryptoTabScreen = () => {
  const { isPending, error, currencies } = useCryptoCurrencies()

  const ids = currencies?.map((currency: Currency) => currency.id).join(',')

  const logos = useLogos(ids)

  if (error) {
    return (
      <View style={styles.container}>
        <Text>An error has occurred: {error.message}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {isPending && <Text>Loading Crypto...</Text>}
      <Text style={styles.title}>Crypto</Text>
      <View style={styles.separator} />
      <View>
        {currencies?.map((currency: Currency) => (
          <View style={{ flexDirection: 'row' }} key={currency.id}>
            {!logos ? (
              <Ionicons name="alert-circle" size={36} color={Colors.dark} />
            ) : (
              <Image
                source={{ uri: logos?.[currency.id].logo }}
                style={{ width: 32, height: 32 }}
              />
            )}
            <Text>{currency.name}</Text>
          </View>
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

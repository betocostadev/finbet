import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Currency } from '@/types/crypto'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import Colors from '@/constants/Colors'
import useCryptoCurrencies from '@/hooks/useCryptoCurrencies'
import useLogos from '@/hooks/useLogos'

import { Text, View } from 'react-native'
import { defaultStyles } from '@/constants/Styles'

const CryptoPrice = ({ quote, change }: { quote: string; change: number }) => {
  return (
    <View style={{ gap: 6, alignItems: 'flex-end' }}>
      <Text>R${quote}</Text>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        <Ionicons
          name={change > 0 ? 'caret-up' : 'caret-down'}
          size={16}
          color={change > 0 ? 'green' : 'red'}
        />
        <Text style={{ color: change > 0 ? 'green' : 'red' }}>
          {change.toFixed(2)}%
        </Text>
      </View>
    </View>
  )
}

const CryptoTabScreen = () => {
  const headerHeight = useHeaderHeight()
  const { isPending, error, currencies } = useCryptoCurrencies()

  const ids = currencies?.map((currency: Currency) => currency.id).join(',')
  const logos = useLogos(ids)

  if (error) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: headerHeight }}
      >
        <View style={styles.container}>
          <Text style={defaultStyles.sectionHeader}>Crypto currencies</Text>
          <View style={defaultStyles.block}>
            <Text>An error has occurred: {error.message}</Text>
            <Text>Please, check again later.</Text>
          </View>
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      {isPending && <Text>Loading Crypto...</Text>}
      <Text style={defaultStyles.sectionHeader}>Latest Crypto currencies</Text>
      <View style={defaultStyles.block}>
        {currencies?.map((currency: Currency) => (
          <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
            <TouchableOpacity style={styles.currencyBtn}>
              {!logos ? (
                <Ionicons name="alert-circle" size={36} color={Colors.dark} />
              ) : (
                <>
                  <Image
                    source={{ uri: logos?.[currency.id].logo }}
                    style={{ width: 40, height: 40 }}
                  />
                  <View style={{ flex: 1, gap: 6 }}>
                    <Text style={styles.currencyName}>{currency.name}</Text>
                    <Text style={{ color: Colors.gray }}>
                      {currency.symbol}
                    </Text>
                  </View>
                  <CryptoPrice
                    quote={currency.quote.BRL.price.toFixed(2)}
                    change={currency.quote.BRL.percent_change_1h}
                  />
                </>
              )}
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  currencyBtn: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  currencyName: {
    fontWeight: '600',
    color: Colors.dark,
  },
})

export default CryptoTabScreen

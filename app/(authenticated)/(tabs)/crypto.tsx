import { CryptoData } from '@/types/crypto'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'

import { Text, View } from 'react-native'

const CryptoTabScreen = () => {
  // const [data, setData] = useEffect(undefined)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/listings')
      const data: CryptoData = await res.json()
      console.log('data is: ', data)
    }
    getData()
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto</Text>
      <View style={styles.separator} />
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

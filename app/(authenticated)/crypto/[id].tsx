import { View, Text, SectionList, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { CryptoCurrency } from '@/types/crypto'

const CryptoScreen = () => {
  const { id } = useLocalSearchParams()
  console.log('Local search id: ', id)
  const headerHeight = useHeaderHeight()
  const { data } = useQuery<CryptoCurrency>({
    queryKey: ['info', 'id'],
    queryFn: async () => {
      const info = await fetch(`/api/info?id=${id}`).then((res) => res.json())
      // const logo = info[+id].logo
      return info[+id]
    },
  })

  if (!data) {
    return <Text>Error loading Crypto Currency</Text>
  }

  return (
    <>
      <Stack.Screen options={{ title: data?.name }} />
      <SectionList
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(i) => i.title}
        sections={[{ data: [{ title: 'Chart' }] }]}
        ListHeaderComponent={() => (
          <View style={styles.listHeaderContainer}>
            <Text style={defaultStyles.subtitle}>{data.symbol}</Text>
            <Image
              source={{ uri: data.logo }}
              style={{ width: 60, height: 60 }}
            />
          </View>
        )}
        renderItem={({ item }) => (
          // TODO: Implement the Chart
          <View style={[defaultStyles.block, { marginTop: 20 }]}>
            <Text style={defaultStyles.subtitle}>Overview</Text>
            <Text style={{ color: Colors.gray }}>{data.description}</Text>
            <Text>Render item</Text>
          </View>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
})

export default CryptoScreen

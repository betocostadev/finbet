import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { CryptoCurrency } from '@/types/crypto'
import { Ionicons } from '@expo/vector-icons'

const categories = ['Overview', 'News', 'Orders', 'Transactions']

const CryptoScreen = () => {
  const { id } = useLocalSearchParams()
  const headerHeight = useHeaderHeight()
  const [activeIndex, setActiveIndex] = useState(0)

  const { data } = useQuery<CryptoCurrency>({
    queryKey: ['info', 'id'],
    queryFn: async () => {
      const info = await fetch(`/api/info?id=${id}`).then((res) => res.json())
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
        renderSectionHeader={() => (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveIndex(index)}
                style={
                  activeIndex === index
                    ? styles.categoriesBtnActive
                    : styles.categoriesBtn
                }
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.listHeaderContainer}>
              <Text style={defaultStyles.subtitle}>{data.symbol}</Text>
              <Image
                source={{ uri: data.logo }}
                style={{ width: 60, height: 60 }}
              />
            </View>
            <View style={styles.listHeaderButtons}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: 'row',
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="add" size={24} color={'#fff'} />
                <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: 'row',
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.primary }]}
                >
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          // TODO: Implement the Chart
          <>
            {/* <View style={{ height: 500, backgroundColor: 'green' }}></View> */}
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={defaultStyles.subtitle}>Overview</Text>
              <Text style={{ color: Colors.gray }}>{data.description}</Text>
              <Text>Render item</Text>
            </View>
          </>
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
  listHeaderButtons: {
    flexDirection: 'row',
    gap: 10,
    margin: 12,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
})

export default CryptoScreen

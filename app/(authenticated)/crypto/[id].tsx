import {
  View,
  Text,
  TextInput,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { CryptoCurrency, Ticker } from '@/types/crypto'
import { Ionicons } from '@expo/vector-icons'
import { CartesianChart, Line, useChartPressState } from 'victory-native'
import { Circle, useFont } from '@shopify/react-native-skia'
import * as Haptics from 'expo-haptics'
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated'

// Fix in case the animated text for date isn't working
// Animated.addWhitelistedNativeProps({ text: true })
const categories = ['Overview', 'News', 'Orders', 'Transactions']

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const ToolTip = ({
  x,
  y,
}: {
  x: SharedValue<number>
  y: SharedValue<number>
}) => {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />
}

const CryptoScreen = () => {
  const { id } = useLocalSearchParams()
  const headerHeight = useHeaderHeight()
  const [activeIndex, setActiveIndex] = useState(0)
  const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12)
  const { state, isActive } = useChartPressState({ x: '0', y: { price: 0 } })

  useEffect(() => {
    console.log(state, isActive)
    if (isActive) Haptics.selectionAsync()
  }, [isActive])

  const { data } = useQuery<CryptoCurrency>({
    queryKey: ['info', 'id'],
    queryFn: async () => {
      const info = await fetch(`/api/info?id=${id}`).then((res) => res.json())
      return info[+id]
    },
  })

  const { data: tickers } = useQuery<Ticker[]>({
    queryKey: ['tickers'],
    queryFn: () => fetch('/api/tickers').then((res) => res.json()),
  })

  const animatedText = useAnimatedProps(() => {
    return {
      text: `R$${state.y.price.value.value.toFixed(2)}`,
      defaultValue: '',
    }
  })

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value)
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: '',
    }
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
        renderItem={({}) => (
          <>
            <View style={[defaultStyles.block, { height: 500 }]}>
              {tickers && (
                <>
                  {!isActive ? (
                    <View>
                      <Text
                        style={{
                          fontSize: 28,
                          fontWeight: 'bold',
                          color: Colors.dark,
                        }}
                      >
                        R${tickers[tickers.length - 1].price.toFixed(2)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Colors.gray,
                        }}
                      >
                        Today
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={'transparent'}
                        style={{
                          fontSize: 28,
                          fontWeight: 'bold',
                          color: Colors.dark,
                        }}
                        animatedProps={animatedText}
                      />

                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={'transparent'}
                        style={{
                          fontSize: 18,
                          color: Colors.gray,
                        }}
                        animatedProps={animatedDateText}
                      />
                    </View>
                  )}
                  <CartesianChart
                    chartPressState={state}
                    axisOptions={{
                      font,
                      tickCount: 5,
                      labelOffset: { x: -2, y: 0 },
                      labelColor: Colors.gray,
                      formatYLabel: (v) => `R$${v}`,
                      formatXLabel: (ms) => {
                        const date = new Date(ms)
                        const display = date.toLocaleString('default', {
                          month: 'short',
                          year: '2-digit',
                        })
                        return display
                      },
                    }}
                    data={tickers.map((ticker) => ({ ...ticker }))}
                    xKey="timestamp"
                    yKeys={['price']}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          points={points.price}
                          color={Colors.primary}
                          strokeWidth={3}
                        />
                        {isActive && (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                      </>
                    )}
                  </CartesianChart>
                </>
              )}
            </View>
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

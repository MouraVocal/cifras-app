import { useRef, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import { useInterval } from '../../hooks/useInterval'
import { IChordsPage } from './types'

export const ChordsPage = ({ music }: IChordsPage) => {
  const { artist, chords, title, id, startTime, speed } = music

  const [isScrolling, setIsScrolling] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [delay, setDelay] = useState(speed)
  const [counter, setCounter] = useState(startTime)

  const webViewRef = useRef<WebView>(null)

  const scroll = async () => {
    webViewRef.current.injectJavaScript(`
      window.scrollBy(0, 10)
    `)
  }

  useInterval(scroll, isScrolling ? delay : null)

  const webViewScroll = () => {
    if (counter > 0) {
      setIsCounting(true)
      const counterInterval = setInterval(() => {
        setCounter(counter => counter - 1)
      }, 1000)

      if (isScrolling) {
        clearInterval(counterInterval)
        setDelay(null)
        setIsScrolling(false)
        return
      }

      const countdown = setTimeout(() => {
        clearInterval(counterInterval)
        setDelay(speed)
        setIsCounting(false)
        setIsScrolling(true)
      }, (counter + 1) * 1000)
      return
    }

    setIsCounting(false)

    if (isScrolling) {
      setDelay(null)
      setIsScrolling(false)
      return
    }

    setDelay(speed)
    setIsScrolling(true)
  }

  const resetMusic = () => {
    setCounter(startTime)
    setIsCounting(false)
    webViewRef.current.injectJavaScript(`
      window.scrollTo(0, 0)
    `)
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: chords }}
        showsVerticalScrollIndicator={false}
        originWhitelist={['*']}
      />

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.rollButton}
          onPress={webViewScroll}
          disabled={isCounting}
        >
          <Text>
            {isScrolling ? 'stop' : isCounting ? counter.toFixed(0) : 'scroll'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rollButton}
          onPress={resetMusic}
          disabled={isCounting || isScrolling}
        >
          <Text>Reinício</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  controlsContainer: {
    position: 'absolute',
    top: 50,
    right: 50,
    zIndex: 1
  },
  rollButton: {
    padding: 10,
    backgroundColor: '#a4ffff',
    elevation: 5
  }
})

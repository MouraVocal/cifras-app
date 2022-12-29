import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { malandragem } from './chords/malandragem'
import { ChordsPage } from './components/chordsPage'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent />
      <ChordsPage music={malandragem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 25
  },
  rollButton: {
    position: 'absolute',
    top: 50,
    right: 50,
    elevation: 5,
    zIndex: 1,
    padding: 10,
    backgroundColor: '#a4ffff'
  }
})

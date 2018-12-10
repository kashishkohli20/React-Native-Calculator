import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.operations = ['/', '*', '-', '+', '=']
  }

  state = {
    resultText: '',
    calculatedText: ''
  }

  validate = () => {
    const { resultText } = this.state
    if (resultText.slice(-1) === '+' || resultText.slice(-1) === '-' || resultText.slice(-1) === '*' || resultText.slice(-1) === '/')
      return false
    return true
  }

  calculateResult = () => {
    const { resultText } = this.state
    const calculatedText = eval(resultText)
    this.setState(() => ({ calculatedText }))
  }

  onButtonPressed = (text) => {
    if (text === 'DEL') {
      let newText = this.state.resultText.split('')
      newText.pop()
      this.setState(() => ({ resultText: newText.join('') }))
    }
    else
      this.setState((prevState) => ({ resultText: prevState.resultText + text }))
  }

  operationsPressed = (operation) => {
    const lastChar = this.state.resultText.split('').pop()
    
    if (operation === '=')
      return this.validate() && this.calculateResult()
    else if (this.operations.indexOf(lastChar) != -1) return
    else if (this.state.resultText === "") return
    this.setState((prevState) => ({ resultText: prevState.resultText + operation }))
  }
  
  render() {
	let rows = []
    let nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, 'DEL']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={nums[i][j]} style={styles.btn} onPress={() => this.onButtonPressed(nums[i][j])}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for (let i = 0; i < 5; i++) {
      ops.push(<TouchableOpacity key={i} style={styles.btn} onPress={() => this.operationsPressed(this.operations[i])} onLongPress={() => this.longPress(this.operations[i])}>
        <Text style={styles.btnText}>{this.operations[i]}</Text>
      </TouchableOpacity>)
    }
	
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculatedText}>{this.state.calculatedText}</Text>
        </View>
        <View style={styles.TouchableOpacitys}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
  },
  result: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10
  },
  resultText: {
    fontSize: 35,
    color: '#000'
  },
  calculatedText: {
    fontSize: 30,
    color: '#636363'
  },
  calculation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10
  },
  TouchableOpacitys: {
    flexDirection: 'row',
    flex: 7,
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  operations: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#636363'
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  }
});

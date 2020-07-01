import React from 'react';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from "@react-native-community/netinfo";

import Home from './Src/Home/Home';
import Disconnected from './Src/Disconnected/Disconnected';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      activeTheme: "dark",
    }
  }

  async componentDidMount() {
    try {
      const netInfo = await NetInfo.fetch();
      const activeTheme = await AsyncStorage.getItem('theme');
      activeTheme != null ? this.setState({ activeTheme: activeTheme }) : await AsyncStorage.setItem('theme', 'dark')
      this.setState({ isConnected: netInfo.isConnected })
      SplashScreen.hide();
    } catch (error) {
      Alert.alert("Bir hata oluştu. Hata kodu: #2")
    }
  }

  changeBackGround = async () => {
    try {
      await AsyncStorage.setItem('theme', this.state.activeTheme === "dark" ? "light" : "dark")
      this.setState({ activeTheme: this.state.activeTheme === "dark" ? "light" : "dark" })
    } catch (error) {
      Alert.alert("Bir hata oluştu. Hata kodu: #1")
    }
  }

  reloadApp = async () => {
    await new Promise(resolve => {
      this.setState({}, () => resolve())
    })
  }

  reTryConnect = async () => {
    try {
      const netInfo = await NetInfo.fetch();
      this.setState({ isConnected: netInfo.isConnected })
      return netInfo.isConnected ? true : false;
    } catch (error) {
      Alert.alert("Bir hata oluştu. Hata kodu: #3")
    }
  }

  render() {
    let themeColor = this.state.activeTheme === 'light' ? DefaultTheme : DarkTheme;
    let theme = {
      ...themeColor,
      theme: this.state.activeTheme,
      colors: {
        ...themeColor.colors,
        ...(this.state.activeTheme === 'light' ? this.lightColor : this.darkColor),
      },
    };
    return (
      <>
        <PaperProvider theme={theme}>
          {this.state.isConnected
            ? <>
              <Home
                screenProps={{
                  reloadApp: async () => await this.reloadApp(),
                  changeBackGround: this.changeBackGround,
                  activeTheme: this.state.activeTheme,
                  reTryConnect: this.reTryConnect,
                }}
              />
            </>
            : <>
              <Disconnected
                screenProps={{
                  reloadApp: async () => await this.reloadApp(),
                  activeTheme: this.state.activeTheme,
                  reTryConnect: this.reTryConnect,
                }} />
            </>}
        </PaperProvider>
      </>
    )
  }

}

export default App;
import React from 'react';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from "@react-native-community/netinfo";
import Constants from './Src/Common/Constants';

import Main from './Src/Main';
import Disconnected from './Src/Screens/Disconnected/Disconnected';

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
      Constants.SqlService.query(
        'CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, wanted TEXT, process_type TEXT, time TEXT)',
      );
      const netInfo = await NetInfo.fetch();
      const activeTheme = await AsyncStorage.getItem('theme');
      activeTheme != null ? this.setState({ activeTheme: activeTheme }) : await AsyncStorage.setItem('theme', 'dark')
      this.setState({ isConnected: netInfo.isConnected })
      SplashScreen.hide();
    } catch (error) {
      Alert.alert("Bir hata oluştu. Hata kodu: #1")
    }
  }

  changeBackGround = async () => {
    try {
      await AsyncStorage.setItem('theme', this.state.activeTheme === "dark" ? "light" : "dark")
      this.setState({ activeTheme: this.state.activeTheme === "dark" ? "light" : "dark" })
    } catch (error) {
      Alert.alert("Bir hata oluştu. Hata kodu: #2")
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
              <Main
                theme={this.state.activeTheme}
                ref={ref => this.navigator = ref}
                screenProps={{
                  reloadApp: async () => await this.reloadApp(),
                  changeBackGround: this.changeBackGround,
                  activeTheme: this.state.activeTheme,
                  reTryConnect: this.reTryConnect,
                  ...this.state
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
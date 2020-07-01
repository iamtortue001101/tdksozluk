import React from 'react';
import {
    SafeAreaView,
    View,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Style from './Style';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const SP = this.props.screenProps;
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={[Style.container]}>
                <Text style={Style.caption}>MIUI TÜRKİYE - TORTUE</Text>
                <View style={Style.formGroup}>
                    <Text style={Style.caption2}>TDK Sözlük Uygulaması</Text>
                    <Button mode="outlined" onPress={() => navigate('Name')} color={SP.activeTheme == "dark" ? "white" : "black"} style={[Style.qButton, { backgroundColor: SP.activeTheme == "dark" ? "black" : "white", color: SP.activeTheme == "dark" ? "black" : "white" }]}><Text style={{ color: SP.activeTheme == "dark" ? "white" : "black" }}>İsim</Text></Button>
                    <Button mode="outlined" onPress={() => navigate('Word')} color={SP.activeTheme == "dark" ? "white" : "black"} style={[Style.qButton, { backgroundColor: SP.activeTheme == "dark" ? "black" : "white", color: SP.activeTheme == "dark" ? "black" : "white" }]}><Text style={{ color: SP.activeTheme == "dark" ? "white" : "black" }}>Sözcük</Text></Button>
                </View>
                <View style={[Style.formThemeBtn]}>
                    <Button icon="theme-light-dark" mode="outlined" onPress={() => (SP.changeBackGround(), SP.reloadApp())} color={SP.activeTheme == "dark" ? "white" : "black"} style={[Style.themeBtn, { backgroundColor: SP.activeTheme == "dark" ? "black" : "white" }]}><Text>{SP.activeTheme == "dark" ? "Beyaz Tema" : "Siyah Tema"}</Text></Button>
                </View>
            </SafeAreaView>
        )
    }
}

export default Home;
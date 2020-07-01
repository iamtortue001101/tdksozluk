import React from 'react';
import {
    SafeAreaView,
    View,
    Alert,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/dist/Feather';
import Constants from '../Common/Constants';
import Style from './Style';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            result: [],
            showPlaceHolder: false,
        }
    }

    sQuery = async (value) => {
        try {
            this.setState({ showPlaceHolder: true })
            const netInfo = await NetInfo.fetch();
            const SP = this.props.screenProps;
            netInfo.isConnected
                ? value.length != 0 ? this.setState({ result: await Constants.sQuery(value), showPlaceHolder: false }) : (Alert.alert("Lütfen bir sözcük yazınız."), this.setState({ showPlaceHolder: false, qEmpty: true }))
                : (Alert.alert("Lütfen internet bağlantınızı kontrol edin."), SP.reTryConnect())
        } catch (error) {
            Alert.alert("Bir hata oluştu. Hata kodu: #4")
        }
    }

    render() {
        const SP = this.props.screenProps;
        return (
            <SafeAreaView style={[Style.container, { backgroundColor: SP.activeTheme == "dark" ? "black" : "white" }]}>
                    <Text style={Style.caption}>MIUI TÜRKİYE - TORTUE</Text>
                    <View style={Style.formGroup}>
                    <Text style={Style.caption2}>TDK Sözlük Uygulaması</Text>
                        <TextInput
                            label='Sözcüğü yazın...'
                            value={this.state.query}
                            onChangeText={query => this.setState({ query })}
                            mode="outlined"
                            selectionColor={SP.activeTheme == "dark" ? "white" : "black"}
                            error={true}
                        />
                        <Button icon="database-search" mode="outlined" loading={this.state.showPlaceHolder} onPress={() => this.sQuery(this.state.query)} color={SP.activeTheme == "dark" ? "white" : "black"} style={[Style.qButton, { backgroundColor: SP.activeTheme == "dark" ? "black" : "white", color: SP.activeTheme == "dark" ? "black" : "white" }]}><Text style={{ color: SP.activeTheme == "dark" ? "white" : "black" }}>Sorgula</Text></Button>
                    </View>
                    {Array.isArray(this.state.result)
                        ? this.state.result.map((item, i) => {
                        return (<Text key={i} style={Style.description}>"{item.sozu}" doğru bir kullanımdır. <Icon name="thumbs-up" size={40} color={SP.activeTheme == "dark" ? "white" : "black"} /></Text>)
                        })
                        : <Text style={Style.description}>Sözcük yanlış ya da bulunamadı. <Icon name="thumbs-down" size={40} color={SP.activeTheme == "dark" ? "white" : "black"} /></Text>}
                <View style={[Style.formThemeBtn, { backgroundColor: SP.activeTheme == "dark" ? "black" : "white" }]}>
                    <Button icon="theme-light-dark" mode="outlined" onPress={() => (SP.changeBackGround(), SP.reloadApp())} color={SP.activeTheme == "dark" ? "white" : "black"} style={[Style.themeBtn, { backgroundColor: SP.activeTheme == "dark" ? "black" : "white" }]}><Text>{SP.activeTheme == "dark" ? "Beyaz Tema" : "Siyah Tema"}</Text></Button>
                </View>
            </SafeAreaView>
        )
    }
}

export default Home;
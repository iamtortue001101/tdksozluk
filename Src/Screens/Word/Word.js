import React from 'react';
import {
    SafeAreaView,
    View,
    Alert,
    ToastAndroid,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/dist/Feather';
import Constants from '../../Common/Constants';
import Style from './Style';

class Word extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            result: [],
            showLoader: false,
        }
    }

    wQuery = async (value) => {
        try {
            const getDate = () => {
                var date = new Date().getDate();
                var month = new Date().getMonth() + 1;
                var year = new Date().getFullYear();
                var hours = new Date().getHours();
                var min = new Date().getMinutes();
                return hours + ':' + min + ' | ' + date + '/' + month + '/' + year;
              }              
            this.setState({ showLoader: true })
            const netInfo = await NetInfo.fetch();
            const SP = this.props.screenProps;
            netInfo.isConnected
                ? value.length != 0 
                    ? (this.setState({ result: await Constants.wQuery(value), showLoader: false }), 
                    Constants.SqlService.insert(
                        'history',
                        [
                        'wanted',
                        'process_type',
                        'time',
                        ],
                        [
                        value,
                        "word",
                        getDate(),
                        ])) 
                    : (ToastAndroid.show("Lütfen bir sözcük yazınız.", ToastAndroid.SHORT), this.setState({ showLoader: false, qEmpty: true }))
                : (ToastAndroid.show("Lütfen internet bağlantınızı kontrol edin!", ToastAndroid.SHORT), SP.reTryConnect())
        } catch (error) {
            ToastAndroid.show("Bir hata oluştu. Hata kodu: #7", ToastAndroid.SHORT)
        }
    }

    render() {        
        const SP = this.props.screenProps;
        return (
            <SafeAreaView style={Style.container}>
                    <Text style={Style.caption}>MIUI TÜRKİYE - TORTUE</Text>
                    <View style={Style.formGroup}>
                        <TextInput
                            label='Sözcüğü yazın...'
                            value={this.state.query}
                            onChangeText={query => this.setState({ query })}
                            mode="outlined"
                            selectionColor={SP.activeTheme == "dark" ? "white" : "black"}
                            error={true}
                        />
                        <Button icon="database-search" mode="outlined" loading={this.state.showLoader} onPress={() => this.wQuery(this.state.query)} color={SP.activeTheme == "dark" ? "white" : "black"} style={[Style.qButton, { backgroundColor: SP.activeTheme == "dark" ? "black" : "white", color: SP.activeTheme == "dark" ? "black" : "white" }]}><Text style={{ color: SP.activeTheme == "dark" ? "white" : "black" }}>Sorgula</Text></Button>
                    </View>       
                <View>
                {Array.isArray(this.state.result)
                        ? this.state.result.map((item, i) => {
                        return (<Text key={i} style={Style.description}>"{item.sozu}" doğru bir kullanımdır. <Icon name="check" size={20} color={SP.activeTheme == "dark" ? "white" : "black"} /></Text>)
                        })
                        : <Text style={Style.description}>Sözcük yanlış ya da bulunamadı. <Icon name="x" size={20} color={SP.activeTheme == "dark" ? "white" : "black"} /></Text>}
                </View>
            </SafeAreaView>
        )
    }
}

export default Word;
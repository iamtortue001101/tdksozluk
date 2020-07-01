import React from 'react';
import {
    SafeAreaView,
    View,
    ScrollView,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import { Text, Button, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/Feather';
import Constants from '../../Common/Constants';
import Style from './Style';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        }
    }

    componentDidMount() {
        try {
            Constants.SqlService.select('history', '*').then(res => {
                this.setState({
                    history: res,
                });
            });
        } catch (error) {
            ToastAndroid.show("Bir hata oluştu. Hata kodu: #5", ToastAndroid.SHORT)
        }
    }

    truncateTable() {
        try {
            Constants.SqlService.select('history', '*').then(res => {
                res.length != 0
                    ? (Constants.SqlService.delete('history', '*'), this.componentDidMount(), ToastAndroid.show("Kayıtlar başarıyla silindi.", ToastAndroid.SHORT))
                    : ToastAndroid.show("Silinebilir kayıt yok.", ToastAndroid.SHORT)
            });
        } catch (error) {
            ToastAndroid.show("Bir hata oluştu. Hata kodu: #8", ToastAndroid.SHORT)
        }
    }

    render() {
        const process_arr = { "name": "İsim", "word": "Sözcük" };
        const SP = this.props.screenProps;
        return (
            <SafeAreaView style={Style.container}>
                <Text style={Style.caption}>MIUI TÜRKİYE - TORTUE</Text>
                <View style={Style.formGroup}>
                    <Text style={Style.caption2}>Sorgu Geçmişi</Text>
                </View>
                <TouchableOpacity onPress={() => (this.componentDidMount(), ToastAndroid.show("Başarıyla yenilendi.", ToastAndroid.SHORT))} style={Style.refresh}><Icon name="refresh-ccw" size={25} color={SP.activeTheme == "dark" ? "white" : "black"} /></TouchableOpacity>
                <TouchableOpacity onPress={() => this.truncateTable()} style={Style.refresh}><Icon name="trash-2" size={25} color={SP.activeTheme == "dark" ? "white" : "black"} /></TouchableOpacity>

                <View style={Style.historyList}>
                    <ScrollView style={Style.scrollView}>
                        {this.state.history.length != 0
                            ? this.state.history.map((data, i) => {
                                return (<List.Item
                                    key={i}
                                    title={"(" + (data.wanted) + ") " + process_arr[data.process_type] + " Sorgusu"}
                                    description={data.time}
                                    left={props => <List.Icon {...props} icon="search-web" />}
                                />)
                            }).reverse()
                            : <Text style={Style.noRecord}>Kayıt bulunamadı.</Text>}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default History;
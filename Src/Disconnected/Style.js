import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    caption: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 17
    },
    formGroup: {
        width: '70%',
        padding: '2%',
        alignSelf: 'center',
    },
    reTryConnectionBtn: {
        width: '80%',
        alignSelf: 'center',
        marginTop: '10%'
    },
    description: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: '10%',
    },
    wifiIcon: {
        marginTop: '10%',
        alignSelf: 'center'
    }
})
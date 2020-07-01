import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    caption: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 17
    },
    caption2: {
        alignSelf: 'center',
        fontSize: 19,
        marginBottom: '5%'
    },
    formGroup: {
        width: '70%',
        padding: '2%',
        alignSelf: 'center',
        marginTop: '-10%'
    },
    historyList: {
        flex: .7,
    },
    refresh: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '8%',
    },
    noRecord: {
        alignSelf: 'center',
        alignItems: 'center',
    }
})
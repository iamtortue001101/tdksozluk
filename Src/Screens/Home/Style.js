import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
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
    qButton: {
        width: '50%',
        marginTop: '5%',
        alignSelf: 'center'
    },
    formThemeBtn: {
        flex: .1,
    },
    themeBtn: {
        width: '50%',
        alignSelf: 'center',
    }
})
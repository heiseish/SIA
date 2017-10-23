import { StyleSheet } from 'react-native';

export default const styles = StyleSheet.create({
    incompleteCard: {
        height: 125,
        width: screen_width - 30,
        borderRadius: 20,
        backgroundColor: 'lightpink',
        borderWidth: 1,
        borderColor: 'crimson',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    completeCard: {
        height: 125,
        width: screen_width - 30,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: 'lightgreen',
        borderColor: 'forestgreen',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    incompleteCardText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'darkred'
    },
    completeCardText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'darkgreen'
    }
});

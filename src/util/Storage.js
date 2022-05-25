import AsyncStorage from '@react-native-async-storage/async-storage';

export async function guardarToken(value) {
    try {
        await AsyncStorage.setItem('@Token_User_key', value)
    } catch (e) {

    }
}

export async function recuperarToken(){
    try {
        return await AsyncStorage.getItem('@Token_User_key')
    } catch (e) {
        return null;
    }
}
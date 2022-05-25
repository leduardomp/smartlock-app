import React, { useState, useRef, useEffect } from 'react';
import {
    Button,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    Image,
    Modal,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView
} from 'react-native';

import MyStatusBar from '../component/MyStatusBar'

import logoSmart from '../img/smart.png'
import * as Storage from '../util/Storage';
import * as Security from '../services/SecurityService'

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [verModal, setVerModal] = useState(false)

    const usuarioRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        async function hayToken() {
            if (await Storage.recuperarToken()) {
                if (await Security.refreshToken())
                    navigation.replace('principalScreen');
            }
        }
        hayToken()
    }, [])

    async function validaAcceso() {
        setVerModal(true)
        let resp = await Security.acceso(username, password)
        if (resp) {
            resp.code == 0 ? login(resp) : errorLogin()
        } else {
            errorLogin()
        }
    }

    function login(resp) {
        //salvar token
        const token = String(resp.token)
        Storage.guardarToken(token)

        //mandar a pagina principal
        setVerModal(false)
        navigation.replace('principalScreen');
    }

    function errorLogin() {
        setError(true);
        setVerModal(false)
        alert("Usuario y/o contraseña incorrectas");
    }


    return (
        <SafeAreaView style={style.containerSuper}>
            <MyStatusBar />
            <Modal
                animationType='fade'
                transparent={true}
                visible={verModal}
            >
                <View style={style.containerModal}>
                    <ActivityIndicator size='large' color='#63FF66' />
                </View>
            </Modal>
            <ScrollView style={style.container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "padding"}>
                    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                        <View style={style.inner}>
                            <View style={style.containerImg}>
                                <Image source={logoSmart} style={style.logo} />
                            </View>
                            <View style={style.containerInput}>
                                <TextInput style={error ? style.inputTextError : style.inputText}
                                    ref={usuarioRef}
                                    placeholder="Email"
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    returnKeyType='next'
                                    onSubmitEditing={() => {
                                        passwordRef.current.focus();
                                    }}
                                    blurOnSubmit={false}
                                    value={username}
                                    onChangeText={setUsername} />

                                <TextInput style={error ? style.inputTextError : style.inputText}
                                    ref={passwordRef}
                                    placeholder='Contraseña'
                                    returnKeyType='join'
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={setPassword}
                                    onSubmitEditing={() => {
                                        validaAcceso()
                                    }} />

                                <Button style={style.btnAceptar}
                                    title='Acceder'
                                    onPress={validaAcceso} color='#67BCE0' />
                            </View>
                            <View style={style.containerBtn}>
                                <Button
                                    title='Crear cuenta'
                                    onPress={() => navigation.navigate('registroScreen')} color='#BBC0E0' />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView >
    )
}

const style = StyleSheet.create({
    containerSuper:{
        backgroundColor: "#fff",
        height: "100%",
        width: "100%"
    },
    container: {
        backgroundColor: "#fff",
        height: "100%",
        width: "100%"
    },
    inner: {
        paddingTop: "3%"
    },
    containerInput: {
        paddingLeft: 30,
        paddingRight: 30
    },
    containerModal: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    inputText: {
        marginTop: 10,
        padding: 10,
        borderColor: "#BBCBC7",
        borderWidth: 1,
        borderRadius: 5
    },
    inputTextError: {
        marginTop: 10,
        padding: 10,
        borderColor: "#FB0E15",
        borderWidth: 1,
        borderRadius: 5
    },
    containerBtn: {
        marginTop: "40%"
    },
    containerImg: {
        alignItems: 'center'
    },
    logo: {
        width: 330,
        height: 110,
        marginTop: "30%",
        marginBottom: "15%"
    },
    btnAceptar: {
        marginTop: '100%'
    }
});

export default LoginScreen;
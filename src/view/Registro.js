import * as React from 'react';
import {
    Button,
    TextInput,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import logoSmart from '../img/smart.png'

const isIOS = Platform.OS === 'ios';

const repara = () => {
    const statusBarHeight = isIOS ? ifIphoneX(44, 20) : 0;
    const navBarHeight = isIOS ? 44 : 56;
    const headerHeight = statusBarHeight + navBarHeight;
    return {
        offset: headerHeight,
        behavior: isIOS ? 'padding' : ''
    };
}

const RegistroScreen = ({ navigation }) => {

    const apPaternoRef = React.useRef();
    const apMaternoRef = React.useRef();
    const emailRef = React.useRef();
    const emailConRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConRef = React.useRef();

    return (
        <SafeAreaView style={style.containerSuper}>
            <ScrollView style={style.containerSuper}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "padding"}>
                    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                        <View style={style.container}>
                            <View style={style.containerImg}>
                                <Image source={logoSmart} style={style.logo} />
                            </View>

                            <View style={style.containerInput}>
                                <TextInput style={style.inputText}
                                    placeholder="Nombre(s)"
                                    keyboardType='default'
                                    returnKeyType='next'
                                    onSubmitEditing={() => {
                                        apPaternoRef.current.focus();
                                    }}
                                    blurOnSubmit={false} />
                                <TextInput style={style.inputText}
                                    ref={apPaternoRef}
                                    placeholder="Apellido Paterno"
                                    keyboardType='default'
                                    returnKeyType='next'
                                    onSubmitEditing={() => {
                                        apMaternoRef.current.focus();
                                    }}
                                    blurOnSubmit={false} />
                                <TextInput style={style.inputText}
                                    ref={apMaternoRef}
                                    placeholder="Apellido Materno"
                                    keyboardType='default'
                                    returnKeyType='next'
                                    onSubmitEditing={() => {
                                        emailRef.current.focus();
                                    }}
                                    blurOnSubmit={false} />
                                <TextInput style={style.inputText}
                                    ref={emailRef}
                                    placeholder="Email"
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    onSubmitEditing={() => {
                                        emailConRef.current.focus();
                                    }}
                                    blurOnSubmit={false} />
                                <TextInput style={style.inputText}
                                    ref={emailConRef}
                                    placeholder="Confirmar Email"
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    onSubmitEditing={() => {
                                        passwordRef.current.focus();
                                    }}
                                    blurOnSubmit={false} />
                                <TextInput style={style.inputText}
                                    ref={passwordRef}
                                    placeholder='Contraseña'
                                    returnKeyType='next'
                                    secureTextEntry={true}
                                    onSubmitEditing={() => {
                                        passwordConRef.current.focus();
                                    }}
                                    blurOnSubmit={false} />
                                <TextInput style={style.inputText}
                                    ref={passwordConRef}
                                    placeholder='Confirmar Contraseña'
                                    returnKeyType='done'
                                    secureTextEntry={true} />
                            </View>

                            <View style={style.containerBtn}>
                                <Button title='Crear cuenta' color='#5FCF48' />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    containerSuper: {
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
    },
    container: {
        padding: 10,
        backgroundColor: "#fff",
        height: "100%"
    },
    containerInput: {
        paddingLeft: 30,
        paddingRight: 30
    },
    inputText: {
        marginTop: 10,
        padding: 10,
        borderColor: "#BBCBC7",
        borderWidth: 1,
        borderRadius: 5
    },
    containerBtn: {
        marginTop: "15%"
    },
    containerImg: {
        alignItems: 'center'
    },
    logo: {
        width: 200,
        resizeMode: 'contain',
        marginTop: 20,
        marginBottom: 20
    },
});

export default RegistroScreen;
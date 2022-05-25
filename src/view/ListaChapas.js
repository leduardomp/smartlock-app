import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar, Modal, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faKey, faLock, faPlus } from '@fortawesome/free-solid-svg-icons'
import MyStatusBar from '../component/MyStatusBar'

import * as ChapasServices from '../services/ChapasService'

const listaChapasScreen = ({ navigation }) => {

    const [data, setData] = React.useState([])
    const [modalVisible, setModalVisible] = React.useState(false);
    const [numSerie, setNumSerie] = React.useState('')
    const [alias, setAlias] = React.useState('')
    const [actualizaLista, setActualizaLista] = React.useState(0)

    const aliasRef = React.useRef();
    const sizeIcon = 22;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faPlus} color='#67BCE0' size={20} style={style.iconDer} />
                </TouchableOpacity>),
        })
    }, [navigation, setModalVisible])

    React.useEffect(() => {
        getChapas()
    }, [actualizaLista])

    async function getChapas() {
        let valores = await ChapasServices.getChapas()
        setData(valores)
    }

    async function abrirChapa(title, idChapa){
        const resp = await ChapasServices.abrirChapas(idChapa); 
        if(!resp.error){
            alert(`se mando la indicacion de apertura a la chapa ${title}`)
        }else{
            alert(`Error: ${resp.message}`)
        }
    }

    async function agregarChapa(){
        const resp = await ChapasServices.agregarChapa(numSerie, alias)
        if(!resp.error){
            setModalVisible(false)
            setActualizaLista(actualizaLista+1)
            setAlias('')
            setNumSerie('')
            alert(`Se agrego correctamente la chapa ${alias}`)
        }else{
            alert(`Error: ${resp.message}`)
        }
    }

    const Item = ({ title, idChapa }) => (
        <View style={style.row}>
            <View style={style.boxA}>
                <FontAwesomeIcon icon={faKey} size={sizeIcon} />
            </View>
            <View style={style.boxB}>
                <Text style={style.title} >{title}</Text>
            </View>
            <View style={style.boxC} >
                <TouchableOpacity onPress={() => { abrirChapa(title, idChapa) }}>
                    <FontAwesomeIcon icon={faLock} size={sizeIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.alias} idChapa={item.num_serie} />
    );

    return (
        <SafeAreaView style={style.container}>
            <MyStatusBar/>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.num_serie}
            />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <View style={style.centerView}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}

                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                            <View style={style.centerViewB}>
                                <View style={style.modalView}>
                                    <TextInput style={style.inputText}
                                        placeholder="Número de serie"
                                        keyboardType='default'
                                        returnKeyType='next'
                                        onSubmitEditing={() => {
                                            aliasRef.current.focus();
                                        }}
                                        blurOnSubmit={false}
                                        value={numSerie}
                                        onChangeText={setNumSerie}
                                    />

                                    <TextInput style={style.inputText}
                                        ref={aliasRef}
                                        placeholder="Alias"
                                        keyboardType='default'
                                        returnKeyType='done'
                                        blurOnSubmit={false}
                                        value={alias}
                                        onChangeText={setAlias}
                                    />

                                    <View style={style.fileBtn}>
                                        <Button title='Agregar' onPress={agregarChapa} />
                                        <Button title='Cancelar' onPress={() => { setModalVisible(false) }} />
                                    </View>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#FFFFFF'
    },
    row: {
        backgroundColor: '#D4EDFF',
        marginTop: 8,
        marginHorizontal: 5,
        padding: 15,
        borderRadius: 5,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    boxA: {
        width: '10%',
        textAlignVertical: "center",

    },
    boxC: {
        width: '10%',
        textAlignVertical: "center",
        alignItems: 'flex-end'
    },
    boxB: {
        width: '80%',
        textAlignVertical: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: 'normal',

    },
    inputText: {
        marginTop: 10,
        padding: 10,
        borderColor: "#BBCBC7",
        borderWidth: 1,
        borderRadius: 5,
        width: '95%',
        backgroundColor: 'white'
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
    },
    centerViewB: {
        flex: 1,
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#E2F5FF",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    iconDer: {
        marginRight: 17
    },
    fileBtn: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'space-around',
        marginTop: 15
    }
});

export default listaChapasScreen;
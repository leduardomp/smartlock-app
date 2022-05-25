import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar, Modal, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt, faUser, faPlus, faLockOpen } from '@fortawesome/free-solid-svg-icons'



const listaUsuariosScreen = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<FontAwesomeIcon icon={faPlus} color='#67BCE0' size={20} style={style.iconDer} onPress={() => setModalVisible(true)} />),
        })
    }, [navigation, setModalVisible])

    const [data, setData] = React.useState([{ id: '1', title: 'Pedro' }, { id: '2', title: 'Hija' }])
    const [modalVisible, setModalVisible] = React.useState(false);

    const aliasRef = React.useRef();

    const sizeIcon = 22;

    const Item = ({ title }) => (
        <View style={style.row}>

            <View style={style.boxA}>
                <FontAwesomeIcon icon={faUser} style={style.icon} size={sizeIcon}/>
            </View>

            <View style={style.boxB}>
                <Text style={style.title} adjustsFontSizeToFit={true} numberOfLines={1}>{title}</Text>
            </View>

            <View style={style.boxA}>
                <FontAwesomeIcon icon={faLockOpen}  style={style.icon} size={sizeIcon}/>
            </View>

            <View style={style.boxA}>
                <FontAwesomeIcon icon={faTrashAlt}  style={style.icon} size={sizeIcon}/>
            </View>

        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <SafeAreaView style={style.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
                                    />

                                    <TextInput style={style.inputText}
                                        ref={aliasRef}
                                        placeholder="Alias"
                                        keyboardType='default'
                                        returnKeyType='done'
                                        blurOnSubmit={false}
                                    />

                                    <View style={style.fileBtn}>
                                        <Button title='Agregar' onPress={() => { setModalVisible(false) }} />
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
        backgroundColor: '#E1FFEB',
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
    boxB: {
        width: '70%',
        textAlignVertical: "center",
    },
    icon:{
    },
    title: {
        fontSize:20,
        fontWeight: 'normal',
        textAlignVertical:'center'
    },
    inputText: {
        marginTop: 10,
        padding: 10,
        borderColor: "#BBCBC7",
        borderWidth: 1,
        borderRadius: 5,
        width: '95%'
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
        backgroundColor: "white",
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

export default listaUsuariosScreen;
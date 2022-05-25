import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar, Modal, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faEdit } from '@fortawesome/free-solid-svg-icons'



const AjustesScreen = ({ navigation }) => {

    const [data, setData] = React.useState([{ id: '1', title: 'Contraseña' }, { id: '2', title: 'Token Siri' }])
    const [modalVisible, setModalVisible] = React.useState(false);

    const sizeIcon = 22;

    const Item = ({ title }) => (

        <View style={style.row}>
            <View style={style.boxA}>
                <FontAwesomeIcon icon={faCog} size={sizeIcon}/>
            </View>
            <View style={style.boxB}>
                <Text style={style.title} >{title}</Text>
            </View>
            <View style={style.boxA}>
                <FontAwesomeIcon icon={faEdit} size={sizeIcon}/>
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
        backgroundColor: '#CCE3E3',
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

export default AjustesScreen;
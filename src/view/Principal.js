import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt, faUserLock, faUserAlt, faDoorClosed, faDoorOpen, faCog, faCogs } from '@fortawesome/free-solid-svg-icons';

import ListaChapasScreen from './ListaChapas'
import ListaUsuariosScreen from './ListaUsuarios';
import AjustesScreen from './Ajustes';

import * as Storage from './../util/Storage'

const PrincipalScreen = ({ navigation }) => {

    const Tab = createBottomTabNavigator();

    async function logout() {
        await Storage.guardarToken('');
        navigation.replace('loginScreen');
    }

    function botonSalir() {
        return (
            <TouchableOpacity onPress={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} color='#67BCE0' size={20} style={style.iconIzq} />
            </TouchableOpacity>
        )
    }

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'listaChapas') {
                        iconName = focused ? faDoorOpen : faDoorClosed;

                    } else if (route.name === 'listaUsuarios') {
                        iconName = focused ? faUserAlt : faUserLock;

                    } else if (route.name === 'ajustes') {
                        iconName = focused ? faCog : faCogs;
                    }

                    return <FontAwesomeIcon icon={iconName} color={color} size={size} />;
                },
                tabBarActiveTintColor: '#67BCE0',
                tabBarInactiveTintColor: 'gray'
            })}
        >

            <Tab.Screen name="listaChapas" component={ListaChapasScreen}
                options={{
                    title: 'Chapas',
                    headerLeft: () => (botonSalir())
                }}
            />
            <Tab.Screen name="listaUsuarios" component={ListaUsuariosScreen}
                options={{
                    title: 'Usuarios',
                    headerLeft: () => (botonSalir())
                }}
            />
            <Tab.Screen name="ajustes" component={AjustesScreen}
                options={{
                    title: 'Ajustes',
                    headerLeft: () => (botonSalir())
                }}
            />

        </Tab.Navigator>
    );
}

const style = StyleSheet.create({
    iconDer: {
        marginRight: 17
    },
    iconIzq: {
        marginLeft: 17
    }
});


export default PrincipalScreen;
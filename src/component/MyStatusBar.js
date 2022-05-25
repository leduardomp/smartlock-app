import React from "react"
import { StatusBar } from "react-native"

export default function MyStatusBar(){
    return (
        <StatusBar
                animated = {true}
                backgroundColor = "#61dafb"
                barStyle = "dark-content" />
    )
}
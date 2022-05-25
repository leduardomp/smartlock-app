import API from "../util/BaseAPI";

export async function acceso(username, password) {
    let response
    await API.post('/acceso',{username,password})
        .then(res => {
            response = res.data
        })
        .catch(function (err) {
            console.log(err)
            response = null
        })
    return response
}

export async function refreshToken() {
    let response
    await API.post('/acceso/refreshToken')
        .then(res => {
            response = res.data
        })
        .catch(function (err) {
            console.log(err)
            response = null
        })
    return response
}
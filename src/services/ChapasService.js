import API from "../util/BaseAPI";

export async function getChapas() {
    let response
    await API.get('/app/chapas').then(res => {
        response = res.data
    }).catch(function (err) {
        console.log(`jajajaj 2 : ${err}`)
        response = []
    })
    return response
}

export async function abrirChapas(idChapa) {
    let response
    await API.post('/app/apertura', { 'num_serie': idChapa })
        .then(res => {
            response = res.data
        })
        .catch(function (err) {
            console.log(`jajajaj : ${err}`)
            response = JSON.encode("{'message':err, 'error':true}");
        })
    return response
}

export async function agregarChapa(numSerie, alias) {
    let response
    await API.post('/app/chapas', { 'num_serie':numSerie, 'alias':alias })
        .then(res => {
            response = res.data
        })
        .catch(function (err) {
            console.log(`jajajaj : ${err}`)
            response = JSON.encode("{'message':err, 'error':true}");
        })
    return response
}
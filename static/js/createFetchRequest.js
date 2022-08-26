import { URL } from "./config.js"

export function checkCepInApi(cep) {
    return fetch(`${URL}/${cep}/json`, {
        mode: 'cors'
    }).then(res => res.json())
                //retorna o json da resposta, caso o fetch não der erro de requisição.
}
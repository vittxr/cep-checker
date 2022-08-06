import { checkCepInApi } from "./createFetchRequest.js"
import { closeAlertAfterTimer } from "./closeAlert.js"

//Inputs de dados de localização: 
var cep = document.getElementById("cep")
var logradouro = document.getElementById("logradouro")
var bairro = document.getElementById("bairro")
var cidade = document.getElementById("cidade")
var estado = document.getElementById("estado")

//alert-box: 
var alert = document.querySelector(".alert")

//close alert button: 
var dismissAlertButton = document.querySelector(".btn-close").addEventListener("click", () => {
    alert.classList.replace("alert--visible", "alert--hidden")
})

//input animation element: 
var loader = document.querySelector(".input-loading")

//Chama a função main(), sempre que haver o evento de clique na tecla. 
cep.addEventListener("keyup", main)

//main coloca o "-" no cep input e retorna o valor do cep, sem o hífen, para fazer a requisição na API, para verificar o cep.
function main() {
    if (cep.value.length >= 8 & cep.value.match("-") == null) { 
        //cep.value é formatado para ter o "-". Isso para melhorar a experiência do usuário.
        cep.value = cep.value.substring(0, 5) + "-" + cep.value.substring(5, 9)
    } 

    checkCep() //retorna os dados do cep, caso exista.

    return putCepInfoInHTML(undefined); //coloca os dados dentro do input
}

function checkCep() {
    if (cep.value.length == 9) {
        loader.style.display = "block"
        return checkCepInApi(cep.value.replace("-", ""))
        .then(res => {
            if (res.erro) {
                //exibe o alert e fecha ele depois do setTimeOut ou caso o usuário clique no botão de fechar.
                alert.classList.replace("alert--hidden", "alert--visible")
                closeAlertAfterTimer(alert)
            
                loader.style.display = "none"
                throw Error("The cep does'nt exist") 
            }
            loader.style.display = "none"
            return res 
        })
        .then(res => putCepInfoInHTML(res)) 
                              
    }
}

function putCepInfoInHTML(cepInfo) {
    logradouro.value = cepInfo != undefined ? cepInfo.logradouro : ""
    bairro.value = cepInfo != undefined ? cepInfo.bairro : ""
    cidade.value = cepInfo != undefined ? cepInfo.localidade : ""
    estado.value = cepInfo != undefined ? cepInfo.uf : ""
} 






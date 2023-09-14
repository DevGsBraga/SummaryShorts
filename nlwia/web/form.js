import {server} from "./server.js"


const form = document.querySelector('#form');
const input = document.querySelector('#url');
const paragrafo = document.querySelector('#paragrafo');

form.addEventListener('submit', async (event) => {

    event.preventDefault(); // PREVINE QUE A PÁGINA RECARREGUE

    paragrafo.classList.add("placeholder")


    const videoURL = input.value;

    // A condição abaixo define que se o video NÂO for do tipo Shorts, apresentará a mensagem.

    if(!videoURL.includes("shorts")) {
        return (paragrafo.textContent = "Por favor, insira uma URL de video tipo Shorts");
    }


    const [_,params] = videoURL.split("/shorts/"); // Separa a URL e aparece apenas o ID do video

    const [videoID] = params.split("?si"); // Caso a URL adiciona venha com mais informaçoes, ela será ocultada

    paragrafo.textContent = "Obtendo o texto do áudio.." // O parametro textContente altera o texto aprensentado.

    const transformaTexto = await server.get("/summary/" + videoID); // A palavra "await" faz com que a funcção aguarde para exurtar essa.

    // OBS: lembrando que a função tem que ser "async" - Assincrona.

    paragrafo.textContent = "Realizando o resumo...";

    const summary = await server.post("/summary", {
        text: transformaTexto.data.result,
    })

    paragrafo.textContent = summary.data.result
    paragrafo.classList.remove("placeholder")
})




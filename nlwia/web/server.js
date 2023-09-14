import axios from "axios"


export const server = axios.create({
    baseURL: "http://localhost:3333" // Aqui informa a porta para o Back-End.
})

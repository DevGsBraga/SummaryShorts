// FUNÇÃO PARA CONVERTE O VIDEO EM AUDIO MP3

import fs from 'fs'
import wav from 'node-wav'
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"


const filePath = "./tmp/audio"
const ouputPath = filePath.replace(".mp4", ".wav")


export const convert = () => new Promise((resolve, reject) => {

    console.log("Convertendo o video...")

    ffmpeg.setFfmpegPath(ffmpegStatic) // comando para usar a biblioteca

    ffmpeg()
    .input(filePath) // IDENTIFICA A ENTRADA QUE SERÁ CONVERTIDA
    .audioFrequency(16000) // FREQUENCIA DO ÁUDIO
    .audioChannels(1) // Quatidade de canal
    .format("wav") // FORMATO QUE SERÁ CONVERTIDO
    .on("end", () => {
        const file = fs.readFileSync(ouputPath)
        const fileDecoded = wav.decode(file)

        const audioData = fileDecoded.channelData[0]
        const floatArray = new Float32Array(audioData)

        console.log("Video convertido com sucesso")

        resolve(floatArray)
        fs.unlinkSync(ouputPath)

    })
    .on("error", (error) => {
        console.log("Erro ao converter o video", error);
        reject(error);
    })
    .save(ouputPath); // SUBSTITUI O FORMATO MP4 EM WAV

})


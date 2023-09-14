import ytdl from 'ytdl-core'
import fs from 'fs'


export const download = (videoId) => new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })

    .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
            throw new Error("A duração do video é maior que 60 segundos")
        }
    })
    .on("end", () => {
        console.log("Download do video finalizado.")
        resolve();
    })
    .on("error", (error) => {
        console.log("Não foi possivel fazer o download do video")
        reject(Error);
    })
    .pipe(fs.createWriteStream("./tmp/audio")) // o pipe recupera a informação e salva
})

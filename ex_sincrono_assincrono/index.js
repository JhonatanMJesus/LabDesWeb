import {readFile, readFileSync} from "fs";
import {readFile as readFilePromise} from "fs/promises";

console.log("Iniciando leitura síncrona");
const sincro = readFileSync("dados.txt", "utf-8");
console.log("Síncrona terminou: " + sincro);

console.log("Iniciando leitura callback");
readFile("dados.txt", "utf-8", (err, data) => {
    if(err){
        console.error("Erro ao ler o arquivo (callback): err" + err);
        return
    }
    console.log("Callback terminou: " + data);
});

console.log("Iniciando leitura promises");
readFilePromise("dados.txt", "utf-8")
.then(conteudo => console.log("Promise terminou", conteudo))
.catch(Erro => console.log("Erro no promise", Erro));

console.log("Iniciando leitura async/await");
async function ler(){
    try{
        const conteudo = await readFilePromise("dados.txt", "utf-8");
        console.log("Terminou async/await", conteudo);
    }
    catch(error) {
        console.error("Erro no async/await", error);
    }
}

ler();
console.log("Terminou tudo");

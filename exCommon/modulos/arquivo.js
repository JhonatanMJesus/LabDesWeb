import fs from "fs";
import chalk from "chalk";
export default function arquivo(){
    fs.readFile("dados.txt", "utf-8", (err, data) =>{
        if(err){
            console.log("Erro ao ler o arquivo", err);
            return;
        }
        console.log("Dados do arquivo:", chalk.bgBlue(data));
    });
}

import {soma} from './math.js'
import subtracao from './math.js'
import arquivo from './arquivo.js';
import chalk from 'chalk';

const result1 = soma(2, 4);
console.log(chalk.magentaBright.bold(`A soma é ${result1}`));

const result2 = subtracao(4, 2);
console.log(`A subtração é ${result2}`);

arquivo();


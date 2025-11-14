// src/strategies/IEstrategiaAtividade.ts

export interface ResultadoValidacao {
    viavel: boolean;
    mensagem: string;
}

export interface IEstrategiaAtividade {
    validar(temperatura: number, umidade: number): ResultadoValidacao;
}
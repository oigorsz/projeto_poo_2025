// src/strategies/EstrategiasConcretas.ts
import { IEstrategiaAtividade, ResultadoValidacao } from "./IEstrategiaAtividade";

// Regra: Bom para correr se estiver fresco (entre 10 e 25 graus) e não muito úmido.
export class EstrategiaCorrer implements IEstrategiaAtividade {
    validar(temp: number, umidade: number): ResultadoValidacao {
        if (temp >= 10 && temp <= 25 && umidade < 80) {
            return { viavel: true, mensagem: "Clima perfeito para sua corrida! 🏃‍♂️" };
        }
        return { viavel: false, mensagem: "Melhor evitar. Muito quente, muito frio ou muito úmido." };
    }
}

// Regra: Piquenique exige clima agradável (entre 18 e 28) e sem risco de chuva (umidade baixa).
export class EstrategiaPiquenique implements IEstrategiaAtividade {
    validar(temp: number, umidade: number): ResultadoValidacao {
        if (temp >= 18 && temp <= 28 && umidade < 60) {
            return { viavel: true, mensagem: "Pode preparar a cesta! O dia está lindo. 🧺" };
        }
        return { viavel: false, mensagem: "Risco de desconforto ou chuva. Melhor adiar." };
    }
}

// Regra: Praia precisa de calor! (> 25 graus).
export class EstrategiaPraia implements IEstrategiaAtividade {
    validar(temp: number, umidade: number): ResultadoValidacao {
        if (temp > 25) {
            return { viavel: true, mensagem: "Pega o protetor solar e vai! 🏖️" };
        }
        return { viavel: false, mensagem: "Está meio frio para entrar na água..." };
    }
}

// Adicione ao final de src/strategies/EstrategiasConcretas.ts

export class ContextoClima {
    static selecionarEstrategia(atividade: string): IEstrategiaAtividade {
        switch (atividade.toLowerCase()) {
            case 'correr':
                return new EstrategiaCorrer();
            case 'piquenique':
                return new EstrategiaPiquenique();
            case 'praia':
                return new EstrategiaPraia();
            default:
                throw new Error("Atividade não reconhecida pelo sistema.");
        }
    }
}
import { WeatherService } from './src/services/WeatherService';
import { ContextoClima } from './src/strategies/EstrategiasConcretas';

async function teste() {
    console.log("--- TESTANDO LÓGICA ---");
    
    // 1. Testar API
    const service = new WeatherService();
    const cidade = "Rio de Janeiro"; 
    console.log(`Buscando clima em ${cidade}...`);
    
    try {
        const dadosClima = await service.buscarClima(cidade);
        console.log("Dados recebidos:", dadosClima);

        // 2. Testar Strategy (Praia)
        const atividade = "Praia";
        console.log(`\nVerificando viabilidade para: ${atividade}`);
        
        const estrategia = ContextoClima.selecionarEstrategia(atividade);
        const resultado = estrategia.validar(dadosClima.temp, dadosClima.umidade);
        
        console.log("RESULTADO FINAL:", resultado);

    } catch (error) {
        console.error("Deu erro:", error);
    }
}

teste();
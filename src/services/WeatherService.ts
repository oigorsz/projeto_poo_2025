// src/services/WeatherService.ts
import axios from 'axios';

const API_KEY = '0565bd65834ef38169ab1ce2bfe1485d'; // Key do enunciado
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export class WeatherService {
    async buscarClima(cidade: string) {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    q: cidade,
                    appid: API_KEY,
                    units: 'metric', // Para vir em Celsius
                    lang: 'pt_br'
                }
            });

            // Retornamos apenas o que nos interessa
            return {
                temp: response.data.main.temp,
                umidade: response.data.main.humidity,     // NOVO
                vento: response.data.wind.speed,          // NOVO
                descricao: response.data.weather[0].description, // JÁ TINHA, MAS AGORA VAMOS USAR
                cidade: response.data.name
            };
        } catch (error) {
            console.error("Erro na API de Clima:", error);
            throw new Error("Cidade não encontrada ou erro na API.");
        }
    }
}
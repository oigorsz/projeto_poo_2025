// src/controllers/CardController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { WeatherService } from '../services/WeatherService';
import { ContextoClima } from '../strategies/EstrategiasConcretas';

const prisma = new PrismaClient();
const weatherService = new WeatherService();

export class CardController {

    // 1. CREATE: Cria um novo Card e valida o clima
    async create(req: Request, res: Response) {
        try {
            const { cidade, atividade } = req.body;

            // Passo A: Buscar dados reais
            const dadosClima = await weatherService.buscarClima(cidade);

            // Passo B: Aplicar a Estratégia
            const estrategia = ContextoClima.selecionarEstrategia(atividade);
            const validacao = estrategia.validar(dadosClima.temp, dadosClima.umidade);

            // Passo C: Salvar no Banco
            const novoCard = await prisma.card.create({
                data: {
                    cidade: dadosClima.cidade, // Usa o nome oficial da API
                    atividade,
                    temp: dadosClima.temp,
                    umidade: dadosClima.umidade,
                    vento: dadosClima.vento,
                    descricao: dadosClima.descricao,
                    status: validacao.viavel,
                    mensagem: validacao.mensagem
                }
            });

            // Passo D: Logar no Histórico (Requisito Obrigatório)
            await prisma.historico.create({
                data: {
                    acao: "CRIAR",
                    detalhe: `Card ID ${novoCard.id} criado para ${cidade} - ${atividade}`
                }
            });

            return res.json(novoCard);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // 2. READ: Lista todos os cards
    async index(req: Request, res: Response) {
        const cards = await prisma.card.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return res.json(cards);
    }

    // 3. UPDATE: Revalida o clima e atualiza o card
    async update(req: Request, res: Response) {
        const { id } = req.params;
        
        try {
            // Busca o card original para saber a cidade e atividade
            const cardExistente = await prisma.card.findUnique({ where: { id: Number(id) } });
            if (!cardExistente) return res.status(404).json({ error: "Card não encontrado" });

            // Refaz a busca do clima (Tempo Real)
            const dadosClima = await weatherService.buscarClima(cardExistente.cidade);
            const estrategia = ContextoClima.selecionarEstrategia(cardExistente.atividade);
            const validacao = estrategia.validar(dadosClima.temp, dadosClima.umidade);

            // Atualiza o Card
            const cardAtualizado = await prisma.card.update({
                where: { id: Number(id) },
                data: {
                    temp: dadosClima.temp,
                    umidade: dadosClima.umidade,
                    vento: dadosClima.vento,
                    descricao: dadosClima.descricao,
                    status: validacao.viavel,
                    mensagem: validacao.mensagem
                }
            });

            // Log no Histórico
            await prisma.historico.create({
                data: {
                    acao: "ATUALIZAR",
                    detalhe: `Card ID ${id} atualizado com nova temp: ${dadosClima.temp}°C`
                }
            });

            return res.json(cardAtualizado);

        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // 4. DELETE: Remove o card
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await prisma.card.delete({ where: { id: Number(id) } });

            // Log no Histórico
            await prisma.historico.create({
                data: {
                    acao: "DELETAR",
                    detalhe: `Card ID ${id} removido permanentemente.`
                }
            });

            return res.json({ message: "Card removido com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar card" });
        }
    }
}
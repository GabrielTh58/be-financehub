import { Request, Response } from "express";
import TransactionServices from "../services/TransactionServices";
import { TransactionType } from "@prisma/client";

export default class TransactionController {
    private transactionService: TransactionServices;

    constructor() {
        this.transactionService = new TransactionServices();
    }

    async create(req: Request, res: Response) {
        try {
            const { description, type, amount, category, userId } = req.body;

            if (!description || !type || !amount || !userId || !category) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" });
            }

            const newTransaction = await this.transactionService.create(description, type, +amount, category, +userId);
            return res.status(201).json(newTransaction);
        } catch (e: any) {
            console.error("Erro ao criar transação:", e);
            return res.status(500).json({ error: "Erro interno do servidor ao criar transação" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const userId = Number(req.query.userId);
    
            if (!userId || isNaN(userId) || userId <= 0) {
                return res.status(400).json({ error: "ID do usuário inválido" });
            }
    
            const transactions = await this.transactionService.findAll(userId);
    
            return res.status(200).json(transactions);
        } catch (e: any) {
            console.error("Erro ao buscar transações:", e);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    
    async findById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (!id || isNaN(id) || id <= 0) {
                return res.status(400).json({ error: "ID inválido" });
            }

            const transaction = await this.transactionService.findById(id);

            if (!transaction) {
                return res.status(404).json({ error: "Transação não encontrada" });
            }

            return res.status(200).json(transaction);
        } catch (e: any) {
            console.error("Erro ao buscar transação por ID:", e);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async findByType(req: Request, res: Response) {
        try {
            const type = req.params.type as TransactionType;

            if (!type) {
                return res.status(400).json({ error: "O tipo da transação é obrigatório" });
            }

            if (!Object.values(TransactionType).includes(type)) {
                return res.status(400).json({ error: "Tipo de transação inválido. Os tipos válidos são: " + Object.values(TransactionType).join(", ") });
            }

            const transactions = await this.transactionService.findByType(type);

            if (!transactions || transactions.length === 0) {
                return res.status(404).json({ error: "Nenhuma transação encontrada para esse tipo" });
            }

            return res.status(200).json(transactions);
        } catch (e: any) {
            console.error("Erro ao buscar transações por tipo:", e);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { description, type, amount, userId } = req.body;

            if (!id || isNaN(id) || id <= 0) {
                return res.status(400).json({ error: "ID inválido" });
            }

            const amountNumber = Number(amount); 
            if (isNaN(amountNumber) || amountNumber <= 0) {
                return res.status(400).json({ error: "Amount deve ser um número positivo válido" });
            }

            const userIdNumber = Number(userId);
            if (isNaN(userIdNumber) || userIdNumber <= 0) {
                return res.status(400).json({ error: "userId deve ser um número válido e maior que 0" });
            }

            const updatedTransaction = await this.transactionService.update(id, { description, type, amount: amountNumber, userId: userIdNumber });

            if (!updatedTransaction) {
                return res.status(404).json({ error: "Transação não encontrada" });
            }

            return res.status(200).json({ message: "Transação atualizada com sucesso", updatedTransaction });
        } catch (e: any) {
            console.error("Erro ao atualizar transação:", e);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (!id || isNaN(id) || id <= 0) {
                return res.status(400).json({ error: "ID inválido" });
            }

            const deletedTransaction = await this.transactionService.delete(id);

            if (!deletedTransaction) {
                return res.status(404).json({ error: "Transação não encontrada" });
            }

            return res.status(200).json({ message: "Transação excluída com sucesso" });
        } catch (e: any) {
            console.error("Erro ao excluir transação:", e);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

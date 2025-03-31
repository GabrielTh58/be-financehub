import { PrismaClient, TransactionCategory, TransactionType } from "@prisma/client";
import { Transaction } from "../core/transactions/Transaction";

export class TransactionModel {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: Omit<Transaction, "id">): Promise<Transaction> {
        
        return await this.prisma.transaction.create({
            data: {
                description: data.description,
                type: data.type,
                amount: data.amount,
                category: data.category,
                userId: data.userId
            }
        })
    }

    async findAll(userId: number) {
        return await this.prisma.transaction.findMany({
            where: { userId },
        })
    }    

    async findByType(type: TransactionType): Promise<Transaction[]> {
        return await this.prisma.transaction.findMany({
            where: { type }
        })
    }

    async findById(id: number): Promise<Transaction | null> {
        return await this.prisma.transaction.findUnique({
            where: { id }
        })
    }

    findByCategory(category: TransactionCategory): Promise<Transaction[]> {
        return this.prisma.transaction.findMany({
            where: { category }
        })
    }

    async update(id: number, data: Partial<Transaction>): Promise<Transaction> {
        return await this.prisma.transaction.update({
            where: { id },
            data: {
                ...data
            }
        })
    }
    async delete(id: number): Promise<Transaction> {
        return await this.prisma.transaction.delete({
            where: { id }
        })
    }
}
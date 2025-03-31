import { TransactionCategory, TransactionType } from "@prisma/client";

export class Transaction {
    id: number;
    amount: number;
    type: TransactionType;
    description: string;
    category: TransactionCategory;
    createdAt: Date;
    userId: number

    constructor(id: number, amount: number, type: TransactionType, description: string,category: TransactionCategory, createdAt: Date, userId: number) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.category = category;
        this.createdAt = createdAt;
        this.userId = userId
    }
}
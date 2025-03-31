import { PrismaClient } from "@prisma/client";
import { User } from "../core/users/User";

export class UserModel {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(user: Omit<User, "id">): Promise<User> {
        return await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        })
    }

    async findById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id }
        })
    }

    async findByEmail(email:string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        return await this.prisma.user.update({
           where: { id },
           data: {
               ...data
           }
        })
    }

    async deleteUser(id: number): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new Error("User not found.");
        }

        return await this.prisma.user.delete({
            where: { id }
        })
    }

}
import { User } from "../core/users/User";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt";
export default class UserServices {
    private user: UserModel

    constructor() {
        this.user = new UserModel();
    }

    async create(email: string, password: string, name: string) {
        const existingUser = await this.user.findByEmail(email);

        if (existingUser) {
            throw new Error("Usuário ja cadastrado.");
        }

        if(password.length < 6){
            throw new Error("Senha deve ter pelo menos 6 caracteres.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.user.create({
            email,
            password: hashedPassword,
            name,
            createdAt: new Date(),
        })

        if (!newUser.id) {
            throw new Error("Falha ao criar o usuário. Id não fornecido.");
        }

        return { id: newUser.id, email: newUser.email, name: newUser.name };
        
    }

    async findById(id: number) {
        return this.user.findById(id);
    }

    async findByEmail(email: string) {
        return this.user.findByEmail(email);
    }
    
    async deleteUser(id:number){
        return this.user.deleteUser(id);
    }

    async updateUser(id: number, data: Partial<User>) {
        if (data.password) {
            if (data.password.length < 6) {
                throw new Error("Senha deve ter pelo menos 6 caracteres.");
            }
            data.password = await bcrypt.hash(data.password, 10);
        }
    
        return await this.user.update(id, data);
    }

    async resetPassword(email: string, currentPassword: string, newPassword: string) {
        const user = await this.user.findByEmail(email);
        
        if (!user) return null; 
        
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        
        if (!isPasswordCorrect) {
            throw new Error("Usuário ou senha inválidos")
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        const updatedUser = await this.user.update(user.id, { password: hashedPassword });
    
        return updatedUser ? true : false
    }
    
}
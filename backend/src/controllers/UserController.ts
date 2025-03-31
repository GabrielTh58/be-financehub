import { Request, Response } from "express"
import UserServices from "../services/UserServices"

export default class UserController {
    private userService: UserServices
    
    constructor() {
        this.userService = new UserServices()
    }

    async create(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body

            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" })
            }

            const newUser = await this.userService.create(email, password, name)           

            return res.status(201).json(newUser)
        } catch (e: any) {
            console.error("Erro ao criar usuário:", e)
            return res.status(400).json({ error: e.message })
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)

            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" })
            }

            const findUser = await this.userService.findById(id)

            if (!findUser) {
                return res.status(404).json({ error: "Usuário não encontrado" })
            }

            return res.status(200).json(findUser)
        } catch (e) {
            console.error("Erro ao buscar usuário:", e)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }

    async findByEmail(req: Request, res: Response) {        
        try {
            const { email } = req.query as { email: string }

            if (!email) {
                return res.status(400).json({ error: "Email é obrigatório" })
            }

            const findUser = await this.userService.findByEmail(email)

            if (!findUser) {
                return res.status(404).json({ error: "Usuário não encontrado" })
            }

            return res.status(200).json(findUser)
        } catch (e) {
            console.error("Erro ao buscar usuário por email:", e)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const { email, password, name } = req.body

            if (isNaN(id) || (!email && !password && !name)) {
                return res.status(400).json({ error: "ID inválido ou nenhum campo fornecido para atualização" })
            }

            const updatedUser = await this.userService.updateUser(id, { email, password, name })

            if (!updatedUser) {
                return res.status(404).json({ error: "Usuário não encontrado" })
            }

            return res.status(200).json({ message: "Usuário atualizado com sucesso", user: updatedUser })
        } catch (e) {
            console.error("Erro ao atualizar usuário:", e)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)

            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" })
            }

            const deletedUser = await this.userService.deleteUser(id)

            if (!deletedUser) {
                return res.status(404).json({ error: "Usuário não encontrado" })
            }

            return res.status(200).json({ message: "Usuário deletado com sucesso" })
        } catch (e) {
            console.error("Erro ao deletar usuário:", e)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { email, currentPassword, newPassword } = req.body

            if (!email || !currentPassword || !newPassword) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" })
            }

            const resetPassword = await this.userService.resetPassword(email, currentPassword, newPassword)

            if (!resetPassword) {
                return res.status(404).json({ error: "Usuário não encontrado" })
            }

            return res.status(200).json({ message: "Senha redefinida com sucesso" })
        } catch (e) {
            console.error("Erro ao redefinir senha:", e)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }
}

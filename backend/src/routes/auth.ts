import { Router } from "express"
import UserController from "../controllers/UserController"
import AuthController from "../controllers/AuthController"

const router = Router()
const userController = new UserController()
const authController = new AuthController()

router.post("/register", async (req, res) => {
    try {
        await userController.create(req, res)
    } catch (error) {
        console.error("Erro ao registrar usuário:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

router.post("/login", async (req, res) => {
    try {
        await authController.login(req, res)
    } catch (error) {
        console.error("Erro ao realizar login:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

export default router;

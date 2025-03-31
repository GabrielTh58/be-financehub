import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.get("/:id", async (req, res) => {
    try {
        await userController.findById(req, res);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.get("/email", async (req, res) => {
    try {
        await userController.findByEmail(req, res);
    } catch (error) {
        console.error("Erro ao buscar usuário por e-mail:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await userController.updateUser(req, res);
    } catch (e) {
        console.error("Erro ao atualizar usuário:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await userController.deleteUser(req, res);
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.post("/reset-password", async (req, res) => {
    try{
        await userController.resetPassword(req, res);
    }catch(error){
        console.error("Erro ao redefinir senha:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
})

export default router;

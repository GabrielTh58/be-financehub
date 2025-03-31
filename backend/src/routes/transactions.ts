import { Router } from "express";
import TransactionController from "../controllers/TransactionController";

const router = Router();
const transactionController = new TransactionController();

router.post("/", async (req, res) => {
    try {
        await transactionController.create(req, res);
    } catch (e) {
        console.error("Erro ao criar transação:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.get("/", async (req, res) => {
    try {
        await transactionController.findAll(req, res);
    } catch (e) {
        console.error("Erro ao buscar transações:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
})

router.get("/type/:type", async (req, res) => {
    try {
        await transactionController.findByType(req, res);
    } catch (e) {
        console.error("Erro ao buscar transações por tipo:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        await transactionController.findById(req, res);
    } catch (e) {
        console.error("Erro ao buscar transação por ID:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await transactionController.update(req, res);
    } catch (e) {
        console.error("Erro ao atualizar transação:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await transactionController.delete(req, res);
    } catch (e) {
        console.error("Erro ao excluir transação:", e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

export default router;

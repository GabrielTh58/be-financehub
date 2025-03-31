import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";

export default class AuthController {
    private authService: AuthServices
    constructor(){
        this.authService = new AuthServices();
    }

    async login(req: Request, res: Response) {
        try{
            const { email, password } = req.body;

            if(!email || !password){
                return res.status(400).json({error: "Todos os campos sao obrigatorio"});
            }

            const token = await this.authService.login(email, password);

            if(!token){
                return res.status(401).json({error: "Credenciais invalidas"});
            }

            return res.status(200).json({token})
        }catch(e: any) {
            console.error("Erro ao realizar login:", e);
            return res.status(500).json({ error: e.message || "Erro interno do servidor" });    
        }
    }
}
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';
import bcrypt from 'bcrypt';

export default class AuthServices {
    private user: UserModel;

    constructor() {
        this.user = new UserModel();
    }

    async login(email: string, password: string) {
        const userExists = await this.user.findByEmail(email);
        if (!userExists) throw new Error('Usuário nao encontrado');

        const loginCorrect = await bcrypt.compare(password, userExists.password);
        if (!loginCorrect) throw new Error('Credenciais incorretas');

              
        const token = jwt.sign({ id: userExists.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' });


        return token;
    }
}

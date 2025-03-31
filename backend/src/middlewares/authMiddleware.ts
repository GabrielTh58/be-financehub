import jwt from "jsonwebtoken"

export default function authenticateToken(req: any, res: any, next: any){
    const token = req.headers("authorization")?.split(" ")[1] 

    if(!token){
        res.status(401).json({error: "Access denied"})
    }

    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
        req.user = decoded
        next()
    }catch(e){
        res.status(403).json({error: "Invalid token"})
    }

}

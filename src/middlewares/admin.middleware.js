import jwt from "jsonwebtoken";

async function authAdmin(req,res,next){
    const token = req.headeres.token ;
    if(!token){
        return res.status(403).send({message: "Token required"});
    }
    try {
        const decodedInformation = await jwt.verify(token,process.env.JWT_USERSECRET);
        req.admin = {
            id: decodedInformation.id ,
            email: decodedInformation.email
        };
        next();
    } catch (error) {
        return res.status(403).send({ message: "Invalid or expired token" });
    }
}

export default authAdmin ;
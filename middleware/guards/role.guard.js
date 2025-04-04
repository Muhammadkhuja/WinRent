const ApiError = require("../../helpers/api.error");

module.exports = (allowRole)=>{
    return (req, res, next)=>{
        const user = req.user

        if(!user){
            return res.status(403).send({ message: "Unathorixed" });
        }
        if(!allowRole.include(user.role)){
            throw ApiError.forbidden({message: "Acces dan"})
        }
        next()
    }
}
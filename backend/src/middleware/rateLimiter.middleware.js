import ratelimit from "../config/upstash.config.js";

const rateLimiter = async(req, res, next) =>{
    try {
        const {success} = await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({message:"Too many messages"});
        }
        next();
    } catch (error) {
        console.log("Rate Limit Error", error);
        next(error);
    }
}

export default rateLimiter;
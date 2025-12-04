import ngrok from "ngrok";

let domain = null;

export const ngrokURL = async(req, res, next) => {
    try{
        if (!domain){
          domain = await ngrok.connect({
            addr: process.env.PORT || 3000,
            authtoken: process.env.NGROK_AUTH_TOKEN
        });
        }
        req.domain = domain;
        next()

    } catch (e) {
        console.error("NGROK ERROR: ", e);
        res.status(500).json({
            success: false,
            message: "NGROK Failed"
        })
    }
}
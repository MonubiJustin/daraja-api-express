export const callbackHandler = (req, res) => {
     const result = req.body;
    const data = JSON.stringify(result, null, 2);
    // console.log("Safaricom Callback Received:", data);

    res.status(200).json({
        message: "Callback received successfully",
        success: true
    })
}
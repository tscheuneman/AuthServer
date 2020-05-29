export default function JSONResponse(res, payload:Object) {
    return res.status(200).json({
        status: 200,
        success: true,
        payload: payload
    });
}
export const validateUser = (Schema) => ((req, res, next) => {
    const result = Schema.safeParse(req.body);
    //result.error.issues[0].message
    if (!result.success) {
        return res.status(400).json({
            message: result.error || "VALIDATION FAILED"
        });
    }
    next();
});
//# sourceMappingURL=validate.js.map
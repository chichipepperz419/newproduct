import type { Request, Response, NextFunction } from "express"

export const validateUser = (Schema: any) => (
    (req: Request, res: Response, next: NextFunction) => {
        
        const result = Schema.safeParse(req.body)
        //result.error.issues[0].message

        if(!result.success){
            return res.status(400).json({
                message: result.error || "VALIDATION FAILED"
            })
        }
        next()
    }
)
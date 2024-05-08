const express = require('express');
const z = require("zod");
const { User, Account } = require('../db');
const {JWT_SECRET} = require('../config');
const jwt = require("jsonwebtoken");
const { authMiddleware } = require('../middleware');
const router = express.Router();

const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
});

router.post("/signup", async (req, res) => {
    const {success, error} = signupSchema.safeParse(req.body);

    if(!success){
        return res.json({
            message: "Email already in use/ Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username
    })
    if(user){
        return res.json({
            message: "User already exists",
        });
    }
    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    const userId = dbUser._id;
    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })
    
    const token = jwt.sign({userId}, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token
    });
});

const signinSchema = z.object({
    username: z.string(),
    password: z.string(),
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.json({
            message: "Incorrect Inputs"
        })
    }
    
    const user = await User.findOne({
        username: body.username,
        password: body.password
    })
    if(user){
        const token = jwt.sign({userId: user._id}, JWT_SECRET);
        res.json({
            token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
});

const updateSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put("/", authMiddleware, async (req,res)=>{
    const {success} = updateSchema.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated Successfully"
    })
})

router.get("/bulk", async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]  
    })
    res.json({
        user: users.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;
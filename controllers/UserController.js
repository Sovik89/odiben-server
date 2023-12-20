const userModel = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.postRegister = async (request, response) => {
    console.log("Request---->", request.body);
    const userExists = await userModel.findOne({
        where:{
            email: request.body.email,
        }
        
    });

    if (userExists) {
        return response.status(403).send({
            success: false,
            message: "User already exists"
        });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    request.body.password = hashedPassword;
    console.log(request.body);
    try {
        await userModel.create({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
            address: request.body.address,
            phoneNumber:request.body.phoneNumber,
            isAdmin:request.body.isAdmin
        });

        response.status(200).send({
            success: true,
            message: "Registration Successful. Please login"
        });
    } catch (err) {
        console.log(err);
        response.status(500).send({
            success: false,
            message: "Something went wrong. Please, check logs",
        });
    }
};

exports.postLogin=async (request,response)=>{
    const userExists = await userModel.findOne({
        where:{
            email: request.body.email
        }
    });

    if (!userExists){
        response.status(401).send({
            success:false,
            message:"Invalid Credentials"
        })

        return;
    }

    const validPassword=await bcrypt.compare(request.body.password,userExists.password)
    if(!validPassword){
        
        response.status(401).send({
            success:false,
            message:"Invalid Credentials"

        });
        return;
    }

    const token=jwt.sign({userId:userExists.id,email:userExists.email},process.env.SECRET,{expiresIn:"1d"});

    response.status(200).send({
        success:true,
        message:"Login successful",
        data:token

    });
};

exports.getCurrentUser=async (request,response)=>{
    console.log("User Controller:===",request.body.userId);
    try{
        
        const userExists = await userModel.findByPk(request.body.userId, {
            attributes: { exclude: ['password'] }, // Exclude the 'password' field
        });
        
        console.log(userExists);
        console
        response.status(200).send({
            success:true,
            message:"User details fetched successfully",
            data:userExists
    
        });
    }catch(err){
        response.status(500).send({
            success:false,
            message:err.message
        })
    }
};

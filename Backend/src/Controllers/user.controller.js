

export const userRegister = async()=>{
    const {name,mobile,email,password,role}=req.body
    if(!name || !mobile || !email || !password || !role){
        throw new Error("All Fields are Required")
    }
    
}
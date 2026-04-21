const User = require("../models/user")
async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const id = Number(req.params.id);
    const user = await users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "user not found" })
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    // Edit user with id
    let id = Number(req.params.id);
    let userToUpdate = await users.find(el => el.id === id);
    if (!userToUpdate) {
        res.json({
            status: "fail",
            message: 'No user is found with ID ' + id
        })
    }
    let index = users.indexOf(userToUpdate);

    Object.assign(userToUpdate, req.body);
    users[index] = userToUpdate

    fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        res.json({
            status: "success",
            data: {
                user: userToUpdate
            }
        })
    })
}

async function handleDeleteUserById(req, res){
    //Delete user with id
        let id = Number(req.params.id);
        let userToDelete = users.find(el => el.id === id);

        if(!userToDelete){
            return res.json({
                status:'fail',
                message:'No user is found with ID '+ id + ' is found'
            })
        }
        let index = users.indexOf(userToDelete);

        users.splice(index,1);

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
            return res.status(204).json({           //204 stands for no content
                status:"success",
                data:{
                    user: null
                }
            })
        })    
}

async function handleCreateNewUser(req,res){
    const body = req.body;
        if(
            !body.firstName || 
            !body.lastName || 
            !body.email || 
            !body.gender ||
            !body.job_title
        ){
            return res.status(400).json({msg: "All fields are req..."})
        }

        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title
        })

        console.log("result: ", result);

        return res.status(201).json({msg: 'success', id: result._id});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}
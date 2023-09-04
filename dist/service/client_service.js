const Client = require("../model/client")
const createClient = async(data) => {
    let result = await Client.create(data)
    return result
}
const updateClient = async(data) => {
    let result = await Client.updateOne({_id: data.id}, {...data})
    return result
}
const deleteClient = async(id) => {
    try{
        let result = await Client.deleteById(id)
        return result
    }catch(err) {
        console.log(err)
        return null
    }
}
module.exports = {
    createClient,
    updateClient,
    deleteClient
}
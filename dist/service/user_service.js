const User = require('../model/user')
const apq = require('api-query-params')

const getUserService = async(queryString) => {
    const page = queryString.page
    const {filter, limit, population} = apq(queryString)
    delete filter.page
    let offset = (page - 1) * limit
    result = await User.find(filter).populate(population).skip(offset).limit(limit).exec()
    return result
}
const createCustomerService = async (userData) => {
    try {
        if(userData.type === 'EMPTY-USER') {
            let result = await User.create(userData)
            return result
        }
        if (userData.type === 'ADD-BRANCH') {
            let user = await User.findById(userData.userID).exec()
            for(let i = 0; i < userData.usersArr.length; i++) {
                user.branch.push(userData.usersArr[i])
            }
            
            let Newresult = await user.save()
            return Newresult
        }
    } catch (err) {
        console.log(err);
        return null
    }

}

module.exports = {
    createCustomerService,
    getUserService
}

var isValidAddress = (address) => {
    if (!address.streetNumber || !address.streeName || !address.city || !address.postalCode || 
       !address.department || !address.country) {
           return false
    }
    return true
}

var isValidBasic = (user) => {
    if (!user.mail || !user.password || !user.address || !isValidAddress(user.address)) {
           return false
    }
    return true
}

exports.isValidCitizen = (citizen) => {
    return !isValidBasic(citizen) || !citizen.firstName || !citizen.lastName || !citizen.birthDate        
}

exports.isValidOrganisation = (organisation) => {
    if (!isValidBasic(organisation) || !organisation.name) {
        return "kikoo"
    } else if (!organisation.isPublic && !organisation.SIRET){
        return "lol"
    } 
    return true
}




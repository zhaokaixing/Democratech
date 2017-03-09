
let isValidAddress = (address) => {
    return !(!address.streetNumber || !address.streetName || !address.city || !address.postalCode || !address.department || !address.country);

}

let isValidBasic = (user) => {
    return !(!user.mail || !user.password || !user.address || !isValidAddress(user.address));

};

exports.isValidCitizen = (citizen) => {
    return (!isValidBasic(citizen) || !citizen.firstName || !citizen.lastName || !citizen.birthDate)
};

exports.isValidOrganisation = (organisation) => {
    if (!isValidBasic(organisation) || !organisation.name || !(organisation.isPublic + '')) {
        return false
    } else if (!organisation.isPublic && !organisation.SIRET){
        return false
    } 
    return true
}




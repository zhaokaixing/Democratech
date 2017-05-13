
let isValidAddress = (address) => {
    return !(!address.streetNumber || !address.streetName || !address.city || !address.postalCode || !address.department || !address.country);
}

let isValidBasic = (user) => {
    return !(!user.mail || !user.password || !user.address);
};

let isValidCitizen = (citizen) => {
    return (!isValidBasic(citizen) || !citizen.firstName || !citizen.lastName || !citizen.birthDate)
};

let isValidOrganisation = (organisation) => {
    if (!isValidBasic(organisation) || !organisation.name || !(organisation.isPublic + '')) {
        return false
    }
    // else if (!organisation.isPublic && !organisation.SIRET){
    //     return false
    // }
    return true
}

exports.isValidOrganisation;
exports.isValidCitizen;

exports.isValidUser = (user) => {
    return user.isPhysic ? isValidCitizen(user) : isValidOrganisation(user);
}

exports.isValidProject = (project) => {
    return (!isValidBasic(project) || !project.title || !project.latitude || !project.longitude||!project.address)
};


import { Model } from './user.model';

export const userFindByEmail = async(emailAddress) => {
    return Model.findOne({ emailAddress }); 
}

export const userFindById = async(userId) => {
    return Model.findOne({ _id: userId }); 
}

export const userRegister = async(name, emailAddress, password) => {
    const user = new Model({
        name,
        emailAddress,
        password
    });

    return user.save();
}

export const userUpdatePassword = async(emailAddress, password) => {
    return Model.findOneAndUpdate(
        { emailAddress },
        { password },
    );
}

export const userUpdateVerificationCode = async(emailAddress, verificationCode) => {
    return Model.findOneAndUpdate(
        { emailAddress },
        { verificationCode },
    );
}

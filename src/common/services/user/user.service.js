import { Model } from './user.model';

export const UserFindByEmail = async(emailAddress) => {
    return Model.findOne({ emailAddress }); 
}

export const UserRegister = async(emailAddress, password) => {
    const user = new Model({
        emailAddress,
        password
    });

    return user.save();
}

export const UserUpdatePassword = async(emailAddress, password) => {
    return Model.findOneAndUpdate(
        { emailAddress },
        { password },
    );
}

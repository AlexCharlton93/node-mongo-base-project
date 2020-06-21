import { Model } from './user.model';

export const UserFindByEmail = async(emailAddress) => {
    return Model.findOne({ emailAddress }); 
}

export const Register = async(emailAddress, password) => {
    const user = new Model({
        emailAddress,
        password
    });

    return user.save();
}

import { Model } from './user.model';

export const UserFindByEmail = async(emailAddress) => {
    return Model.findOne({ emailAddress }); 
}

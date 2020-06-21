import { Model } from './user.model';

export const UserFindByEmail = async() => {
    return Model.findOne({ emailAddress }); 
}

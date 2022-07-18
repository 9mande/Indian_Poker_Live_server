import userModel from '../models/user.js';
import Logger from '../loaders/logger.js';

export default {
    SignUp : async ({ id, profileImg, win, lose, chip, money, name }) => {
        try {
            if (userModel.getUserByKakaoID(id).message == "success") {
                throw new Error('User cannot be created');
            }
            else{
                console.log("adding user : " + (await userModel.addUserByKakaoID( id, profileImg, win, lose, chip, money, name )).message);
            }
        } catch (e){
            Logger.error(e);
            throw e;
        }
    },

    SignIn : async ({ id }) => {
        try{
            const res = await userModel.getUserByKakaoID(id)
            if (res.message == "fail") {
                throw new Error('User not registered');
            }
            return res.result;
        } catch (e) {
            Logger.error(e);
            throw new Error('Invalid');
        }
        
    },
}

import Logger from '../loaders/logger.js';
import getConnection from "../loaders/mysql.js"

export default {
    getUserByKakaoID : async(id) => {
        try{
            const result = await getConnection(
                `select id, profileImg, win, lose, chip, money, name from user where id = ?`,
                [id]
            );
            

            return {
                message : "success",
                result : result[0][0],
            };
        } catch (err) {
            Logger.error(err);
            return {
                message: "fail",
            };
        }
    },

    addUserByKakaoID : async( id, profileImg, win, lose, chip, money, name ) => {
        try{
            await getConnection(
                `insert into user (id, profileImg, win, lose, chip, money, name) values (?, ?, ?, ?, ?, ?, ?);`,
                [id, profileImg, win, lose, chip, money, name]
            );
            return {
                message: "success",
            };
        } catch (err) {
            Logger.error(err);
            return {
                message: "fail",
            };
        }
    },

    signInByKakaoId : async (id) => {
        try{
            const user = await getUserByKakaoID(id);
            const jwtToken = await jwt.sign(user);

            return {
                token: jwtToken.token
            };
        } catch (err) {
            Logger.error(err);
            return {
                message: "fail",
            };
        }
    },

    updateNickName: async (id, newNickname) => {
        try {
            await getConnection(
                `UPDATE user SET name = ? WHERE id = ?`, 
                [newNickname, id]);

            return {
                message: "success",
            };
        } catch (e) {
            Logger.error(err);

            return {
                message: "fail",
            };
        }
    },
}


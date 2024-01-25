import  fs  from 'fs';
import { userSchema, bcryptPassword, comparePassword } from '../models/user.js';

 
export const getAllUsers = function(req, res, next) {
    fs.readFile('./users.json', (err, data) => {
        if (err) {
            req.status(500).send('cannot read the file');
        } 

        const users = JSON.parse(data);
        res.status(200).json(users);
    })
   
}

export const login = async function(req, res, next) {
    fs.readFile('./users.json', async (err, data) => {
        if (err) {
            req.status(500).send('cannot read the file');
        } 

        const user = req.body;

        const result = userSchema.validate(user);
        if (result.error)  {
            res.status(401).send(result.error);
        }
        
        //ליצירת סיסמא מוצפנת בלבד, לא קשור לפונקצית לוגין, רק ליצירת משתמש חדש
        //const  passsword =  await bcryptPassword(user.password, res);

        const users = JSON.parse(data);
        const findUser = users.find(u => u.username == user.username);
        if (findUser) {
            const isEqual = await comparePassword(user.password, findUser.password);
            if (isEqual) {
                res.status(200).send('login');
            } else {
            res.status(401).send('unauthorized');

            }

        } else {
            res.status(401).send('username not found');
        }
    })
   
}


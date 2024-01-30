import Joi from 'joi';

import bcrypt from 'bcrypt';
const saltRounds = 10;


// https://github.com/nikitapryymak/basic-joi-validator/blob/develop/validator.js

// ספרית joi מאפשרת לנו להגדיר ולידציות על שדה קלט מהמשתמש
// אפשר לראות את הסוגים השונים 
export const userSchema = Joi.object({
  username: Joi.string()
    .alphanum() // רק אותיות
    .min(3)  // לפחות 3 תווים 
    .max(30) // מקסימום 30 תוים 
    .required(), // שדה חובה 

  password: Joi.string() 
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  
    email: Joi.string().email().required().trim(),


  confirmPassword: Joi.ref('password'),
  address: {
    state: Joi.string(),
    city: Joi.valid(Joi.in('Jerusalem')),
  }, 
  DOB: Joi.date().greater(new Date("2006-0-01")),
  hobbies: Joi.array(),
  isParent: Joi.boolean(),
  children: Joi.when('isParent', {
    is: true, 
    then: Joi.number().min(1).required(),
    otherwise: Joi.valid(0).optional()
  })

});


// פונקציה להצפנת סיסמא על ידי  bcrypt
export const bcryptPassword = async function (password, res) {
  // פונקציה הזו מטרתה ליצר את ה salt - מילת המפתח שאנחנו מוסיפים להצפנה
  // saltRounds - מייצג את מספר סיבובי ההצפנה
  const salt = await bcrypt.genSalt(saltRounds);
  // הצפנת הסיסמא באמצעות ה salt
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log(hashedPassword);
  return hashedPassword;
}


// פונקציה להשוואת סיסמא מוצפנת  (מטבלת הנתונים) לבין הסיסמא שנוצרה על ידי המשתמש
// שימו לב ל await 
// נסביר על זה שיעור הבא
export const comparePassword = async function (password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
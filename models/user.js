import Joi from 'joi';

import bcrypt from 'bcrypt';
const saltRounds = 10;


// ספרית joi מאפשרת לנו להגדיר ולידציות על שדה קלט מהמשתמש
// אפשר לראות את הסוגים השונים 
export const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
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
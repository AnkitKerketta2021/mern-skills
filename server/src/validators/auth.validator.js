export function signupErrors({name,email,password,confirmPassword}){
 const errors={};
 if(!name||name.trim().length<2)errors.name="Name must contain at least 2 characters.";
 if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))errors.email="Enter a valid email.";
 if(!password||password.length<8||!/[A-Z]/.test(password)||!/[a-z]/.test(password)||!/\d/.test(password))errors.password="Use 8+ characters with upper/lowercase letters and a number.";
 if(password!==confirmPassword)errors.confirmPassword="Passwords do not match.";
 return errors;
}
export function loginErrors({email,password}){const errors={};if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))errors.email="Enter a valid email.";if(!password)errors.password="Password is required.";return errors;}

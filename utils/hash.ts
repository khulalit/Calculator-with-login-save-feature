import bcrypt from 'bcrypt';

export async function hashPassword(password:string | Buffer) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function verifyPassword(password : string | undefined, hashedPassword : string | undefined) {
    if(!password ||  !hashedPassword) return false 
    
    const isValid = await bcrypt.compare(password, hashedPassword); 
    return isValid;
}
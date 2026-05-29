//object to return two funcionts hash(password: string)

import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export const encriptAdapter = {
  hash: (password: string) => {
    //salt how many times a password will be encripted
    const salt = genSaltSync(12);
    //we're returning a hashSync(password we want to encrypt, how many jumps)
    return hashSync(password, salt)
  },
};



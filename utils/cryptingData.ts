import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);

export interface dataHashedPassword {
  salt: string;
  password: string;
}

export class CryptingData {
  static async generateHashedPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  static async testHashedPassword(data: dataHashedPassword) {
    const salt = data.salt;
    const hash = (await scrypt(data.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  static generateRandomPassword(length: number) {
    if (typeof length === 'undefined') {
      var length = 8;
    }
    var c = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679',
      n = c.length,
      /* p : chaîne de caractères spéciaux */
      p = '!@#$+-*&_',
      o = p.length,
      r = '',
      n = c.length,
      /* s : determine la position du caractère spécial dans le mdp */
      s = Math.floor(Math.random() * (p.length - 1));

    for (var i = 0; i < length; ++i) {
      if (s == i) {
        /* on insère à la position donnée un caractère spécial aléatoire */
        r += p.charAt(Math.floor(Math.random() * o));
      } else {
        /* on insère un caractère alphanumérique aléatoire */
        r += c.charAt(Math.floor(Math.random() * n));
      }
    }
    return r;
  }
  static generateRandomToken(length: number) {
    if (typeof length === 'undefined') {
      var length = 8;
    }
    var c = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679',
      n = c.length,
      r = '',
      n = c.length;

    for (var i = 0; i < length; ++i) {
      /* on insère un caractère alphanumérique aléatoire */
      r += c.charAt(Math.floor(Math.random() * n));
    }
    return r;
  }
}

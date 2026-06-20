import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class HashService {

    public async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    public async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compareSync(password, hashedPassword);
    }

}

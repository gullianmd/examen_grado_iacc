import { EntitySchema } from 'typeorm';

export interface User {
  id?: number;
  name: string;
  mail: string;
  pwd: string;
}

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'int',
      generated: true,
      primary: true,
    },
    name: {
      type: 'varchar',
      length: 250,
    },
    mail: {
      type: 'varchar',
      length: 250,
      unique: true,
    },
    pwd: {
      type: 'varchar',
      length: 250,
      unique: true,
    },
  },
});

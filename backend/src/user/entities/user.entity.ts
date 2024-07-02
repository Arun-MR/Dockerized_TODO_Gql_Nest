import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('mydb')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}

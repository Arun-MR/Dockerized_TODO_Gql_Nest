import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'todos'})
@ObjectType()
export class Todo {

@PrimaryGeneratedColumn()
@Field()
id:number

@Column()
@Field({ nullable: true })
 title:string
}




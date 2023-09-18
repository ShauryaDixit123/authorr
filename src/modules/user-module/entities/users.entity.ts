import { Media } from 'src/modules/media-module/entites/media.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
  })
  name: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
  })
  name: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    nullable: false,
  })
  first_name: string;
  @Column({
    nullable: false,
  })
  last_name: string;
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;
  @Column({
    nullable: false,
    unique: true,
  })
  mobile: string;
  @Column({
    nullable: false,
  })
  password: string;
  @Column({
    default: false,
  })
  is_author: boolean;
  @Column({
    default: false,
  })
  is_verified: boolean;
  @Column()
  book_url: string;
  @OneToMany(() => Role, (role) => role.id)
  role_id: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class UserSubs {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.id)
  sub_id: string;
  @ManyToOne(() => User, (user) => user.id)
  sub_to: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class UserMedia {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  caption: string;
  @Column()
  type: string;
  @Column()
  s3path: string;
  @ManyToOne(() => User, (user) => user.id)
  user: string;
  @ManyToOne(() => Media, (media) => media.id)
  media: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

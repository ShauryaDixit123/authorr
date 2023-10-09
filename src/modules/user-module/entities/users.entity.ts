import { Media } from 'src/modules/media-module/entites/media.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Index({ unique: true })
  email: string;
  @Column({
    nullable: false,
  })
  @Index()
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
  @Column({
    default: false,
  })
  is_active: boolean;
  @Column()
  user_name: string;
  @ManyToOne(() => Role, (role) => role.userRole)
  @JoinTable()
  role: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;

  // constructor(partial: Partial<User>) {
  //   Object.assign(this, partial);
  // }
}

@Entity()
export class AuthorDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
    default: false,
  })
  is_author_book: boolean;
  @Column({
    default: false,
  })
  website_published: boolean;
  @Column({
    default: false,
  })
  blog_published: boolean;
  @OneToOne(() => User)
  @JoinColumn()
  author: User;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;

  constructor(partial?: Partial<AuthorDetail>) {
    Object.assign(this, partial);
  }
}
@Entity()
export class AuthorDetailsBook {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => AuthorDetail, (author) => author.id)
  @JoinColumn()
  author_detail: string;
  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn()
  book: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    nullable: false,
  })
  title: string;
  @Column({
    nullable: true,
  })
  description: string;
  @Column({
    nullable: false,
  })
  hosted_url: string;
  @Column({
    nullable: false,
    unique: true,
  })
  isbn: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

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
  @OneToMany(() => User, (user) => user.id, { cascade: true })
  userRole: User[];
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

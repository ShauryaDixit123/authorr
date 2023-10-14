import { Media } from 'src/modules/media-module/entites/media.entity';
import { Tag, User } from 'src/modules/user-module/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    nullable: false,
  })
  title: string;
  @Column({
    default: null,
  })
  description: string;
  @ManyToOne(() => User, (user) => user.id)
  posted_by: User;
  @Column({
    default: true,
  })
  is_active: boolean;
  @Column({
    default: 0,
  })
  likes: number;
  @Column({
    default: false,
  })
  is_published: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class ContentType {
  // id will be combination of name and type saperated by . or '-'
  @PrimaryColumn({
    unique: true,
  })
  id: string;
  @Column({
    nullable: false,
  })
  name: string;
  @Column({
    nullable: false,
    default: 'BLOG',
  })
  type: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class BlogContent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: null,
  })
  content: string;
  @ManyToOne(() => Blog, (blog) => blog.id)
  blog: string;
  @ManyToOne(() => ContentType, (cont) => cont.name)
  type: string;
  @Column()
  slug: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class BlogLike {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Blog, (blog) => blog.id)
  blog: string;
  @ManyToOne(() => User, (user) => user.id)
  user: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Blog, (blog) => blog.id)
  blog: string;
  @ManyToOne(() => User, (user) => user.id)
  user: string;
  @Column({
    nullable: false,
  })
  comment: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class BlogTag {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Blog, (blog) => blog.id)
  blog: string;
  @ManyToOne(() => Tag, (tag) => tag.id)
  tag: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class BlogMedia {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
  })
  title: string;
  @Column()
  caption: string;
  @ManyToOne(() => Media, (media) => media.id)
  media: number;
  @ManyToOne(() => Blog, (blog) => blog.id)
  blog: string;
  @ManyToOne(() => BlogContent, (blog) => blog.id)
  blogContent: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

@Entity()
export class BlogHeirarchy {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Blog, (blog) => blog.id)
  blog: string;
  @ManyToOne(() => BlogContent, (blog) => blog.id)
  parent: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

import { Blog } from 'src/modules/blog-module/entites/blog.entity';
import { User } from 'src/modules/user-module/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
  })
  type: string; // image or video
  @Column()
  sub_type: string; // profile pic, blog post etc
  @Column()
  slug: string;
  @Column()
  s3path: string;
  @Column({
    default: true,
  })
  is_active: boolean;
  @ManyToOne(() => User, (user) => user.id)
  uploadedby: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;

  userMedia: UserMedia;
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
  uploaded_by: string;
  @ManyToOne(() => Media, (media) => media.id)
  media: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

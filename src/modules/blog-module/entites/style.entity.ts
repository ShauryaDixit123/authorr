import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogContent } from './blog.entity';

@Entity()
export class Style {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
  })
  style: string;
  @Column({
    nullable: false,
  })
  display_name: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}
@Entity()
export class StyleContent {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Style, (style) => style.id)
  style: string;
  @ManyToOne(() => BlogContent, (blogContent) => blogContent.id)
  blogContent: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}

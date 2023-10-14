import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogContent, ContentType } from './blog.entity';

@Entity()
export class Style {
  @Index('STYLE_PK_index', { unique: true })
  @PrimaryColumn({
    unique: true,
  })
  id: string; // id will be comnination of style and type saperated by . or '-'
  @Column({
    nullable: false,
  })
  style: string;
  @ManyToOne(() => ContentType, (cont) => cont.id)
  type: string;
  @Column({
    default: null,
  })
  display_name: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
}
@Entity()
export class StyleBlogContent {
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

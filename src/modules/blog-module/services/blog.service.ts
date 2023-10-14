import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  Blog,
  BlogContent,
  BlogHeirarchy,
  BlogMedia,
  ContentType,
} from '../entites/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BlogContentDTO,
  BlogHeirarchyDTO,
  BlogMediaDTO,
  ContentTypeDTO,
  CreateBlogRequestDTO,
  StyleBlogContentDTO,
} from '../dto/blog';
import { Style, StyleBlogContent } from '../entites/style.entity';
import { User } from 'aws-sdk/clients/budgets';
import { UserModuleService } from 'src/modules/user-module/services/users.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
    @InjectRepository(ContentType)
    private readonly contentTypeRepo: Repository<ContentType>,
    @InjectRepository(BlogContent)
    private readonly blogContentRepo: Repository<BlogContent>,
    @InjectRepository(BlogMedia)
    private readonly blogMediaRepo: Repository<BlogMedia>,
    @InjectRepository(Style)
    private readonly styleRepo: Repository<Style>,
    @InjectRepository(StyleBlogContent)
    private readonly styleBlogContentRepo: Repository<StyleBlogContent>,
    @InjectRepository(BlogHeirarchy)
    private readonly blogHeirarchyRepo: Repository<BlogHeirarchy>,
    private readonly userService: UserModuleService,
  ) {}
  async createBlog(body: CreateBlogRequestDTO): Promise<Blog> {
    const user = await this.userService.findUserById(body.posted_by);
    return await this.blogRepo.save({ ...body, posted_by: user });
  }
  async createContentType(body: ContentTypeDTO): Promise<ContentType> {
    return await this.contentTypeRepo.save({
      ...body,
      id: `${body.name}.${body.type}`,
    });
  }
  async createBlogContent(body: BlogContentDTO): Promise<BlogContent> {
    return await this.blogContentRepo.save(body);
  }
  async createBlogMedia(body: BlogMediaDTO): Promise<BlogMedia> {
    return await this.blogMediaRepo.save(body);
  }
  async createStyle(body: { style: string; type: string }): Promise<Style> {
    return await this.styleRepo.save({
      ...body,
      id: `${body.style}.${body.type}`,
    });
  }
  async createStyleBlogContent(
    body: StyleBlogContentDTO,
  ): Promise<StyleBlogContent> {
    return await this.styleBlogContentRepo.save(body);
  }
  async createBlogHeirarchy(body: BlogHeirarchyDTO): Promise<BlogHeirarchy> {
    return await this.blogHeirarchyRepo.save(body);
  }
}

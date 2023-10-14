import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { AuthorCanActivateGuard } from 'src/modules/user-module/services/auth/auth.gaurd';
import { BlogContentDTO, CreateBlogRequestDTO } from '../dto/blog';
import { ServerError } from 'src/common/exceptions/error';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Post('/init')
  @UseGuards(AuthorCanActivateGuard)
  async initBlog(@Body() body: CreateBlogRequestDTO) {
    if (!body.posted_by) throw new ServerError('User not found');
    try {
      const blog = await this.blogService.createBlog(body);
      return {
        status: 200,
        blog_id: blog.id,
      };
    } catch (e) {
      throw new ServerError(e.message);
    }
  }
  @Post('/blog_content')
  @UseGuards(AuthorCanActivateGuard)
  async createBlogContent(@Body() body: BlogContentDTO) {
    try {
      return await this.blogService.createBlogContent(body);
    } catch (er) {
      throw new ServerError(er.message);
    }
  }
  // @Post('')
}

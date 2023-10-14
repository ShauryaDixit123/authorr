import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  AuthorDetail,
  AuthorDetailsBook,
  Book,
  Role,
  User,
} from '../entities/users.entity';
import { BookDTO, User as UserDTO } from '../dtos/user.type';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Media,
  UserMedia,
} from 'src/modules/media-module/entites/media.entity';
import { AUTHOR_ROLE } from '../constants/user.constant';

@Injectable()
export class UserModuleService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(AuthorDetail)
    private readonly authorDetailRepo: Repository<AuthorDetail>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(AuthorDetailsBook)
    private readonly authorDetailsBookRepo: Repository<AuthorDetailsBook>,
    @InjectRepository(UserMedia)
    private readonly userMediaRepo: Repository<UserMedia>,
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
  ) {}

  async getRoleByName(name: string): Promise<Role> {
    return await this.roleRepo.findOne({
      where: {
        name,
      },
    });
  }

  async createUser(user: UserDTO): Promise<User> {
    let userDetails: User;
    const role = await this.getRoleByName(user.role);
    try {
      userDetails = await this.userRepo.save({ ...user, role: role });
    } catch (e) {
      console.log(e);
    }
    return userDetails;
  }
  async createAuthor(body: UserDTO): Promise<User> {
    const user = new User();
    const userDetails = { ...user, ...body };
    const role = await this.getRoleByName(AUTHOR_ROLE);
    const authorDetails = await this.userRepo.save({
      ...userDetails,
      role: role,
    });
    await this.authorDetailRepo.save({
      author: authorDetails,
    });
    return authorDetails;
  }
  async createBook(body: BookDTO): Promise<Book> {
    let book: Book;
    if (body.id) {
      book = await this.bookRepo.findOne({
        where: {
          id: body.id,
        },
      });
    } else {
      book = await this.bookRepo.save({ ...body });
    }
    return book;
  }
  async getBookById(id: string): Promise<Book> {
    return await this.bookRepo.findOne({
      where: {
        id,
      },
    });
  }
  async createAuthorDetailsBook(body: {
    book_id: string;
    author_id: string;
  }): Promise<AuthorDetailsBook> {
    const book = await this.getBookById(body.book_id);
    return await this.authorDetailsBookRepo.save({
      author_detail: body.author_id,
      book: book,
    });
  }

  async findBookByISBN(isbn: string): Promise<Book | null> {
    return this.bookRepo.findOne({
      where: {
        isbn: isbn,
      },
    });
  }
  async findUserById(id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: {
        id: id,
      },
    });
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email })
      .getOne();
  }

  async createRole(role: string): Promise<Role> {
    return await this.roleRepo.save({
      name: role,
    });
  }

  async findRoleIdByName(role: string): Promise<Role> {
    return this.roleRepo.findOne({
      where: {
        name: role,
      },
    });
  }

  async findRoleById(name: string) {
    return await this.roleRepo.findOne({
      where: {
        name,
      },
    });
  }
  async findUserRole(id: string): Promise<{ role: string }[]> {
    return await this.userRepo
      .createQueryBuilder('user')
      .select('user.roleId', 'roleId')
      .innerJoin(Role, 'role', 'user.roleId = role.id')
      .where('user.id = :userId', { userId: id })
      .select('role.name', 'role')
      .execute();

    // console.log(q.getSql());
    // return await q.getOne();
  }
  async findUserDetails(userId: string): Promise<AuthorDetail> {
    return await this.authorDetailRepo
      .createQueryBuilder('author_detail')
      .leftJoinAndSelect('author_detail.author', 'user')
      .where('author_detail.authorId = :userId', { userId })
      // .innerJoin(UserMedia, 'user_media', 'user_media.uploaded_by = user.id')
      // .innerJoin(Media, 'media', 'media.id = user_media.media')
      .getOne();
    // .innerJoinAndSelect('user.media', 'media');
  }
}

// {
//     "first_name":"Shaurya",
//     "last_name":  "Dixit",
//     "email" : "shaurd224@gmail.com",
//     "mobile": "87870000",
//     "password": "shauryad224",
//     "is_author": false
// }

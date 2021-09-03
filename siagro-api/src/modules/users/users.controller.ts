
import { Controller, Get,Post,NotFoundException, Param,Request  } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
      
      const post = await this.usersService.findOneById(id);

      if (!post) {
          throw new NotFoundException('This Post doesn\'t exist');
      }

      return post;
  }

  
  @Post()
  async create(@Body() user: User): Promise<User> {
     
      return await this.usersService.create(user);
  }
  
 

}

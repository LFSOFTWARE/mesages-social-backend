import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { RequestFriendDto } from './dto/request-frien.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/amizade')
  async requestFriend(@Body() requestFriendDto: RequestFriendDto) {
    await this.usersService.requestFriend(requestFriendDto);
  }

  @Post('/amizade/:idUser')
  async acceptFriend(
    @Param('idUser') idUser: string,
    @Query('friend') friend: string,
  ) {
    await this.usersService.acceptFriend(idUser, friend);
  }

  @Get()
  async findAll(@Query('name') name: string) {
    if (name) {
      return await this.usersService.searchUser(name);
    }
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Get('/search/user')
  async search(@Query('name') name: string) {
    return await this.usersService.searchUser(name);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

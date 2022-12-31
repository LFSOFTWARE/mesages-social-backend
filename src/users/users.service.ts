import { RequestFriendDto } from './dto/request-frien.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existUser = await this.userModel.findOne({ email });

    if (existUser) {
      throw new BadRequestException(`Email ${email} já existe`);
    }
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFind = await this.userModel.findOne({ _id: id });

    if (!userFind) {
      throw new BadRequestException(`User ${id} não Existe`);
    }

    userFind.socketId = updateUserDto.socketId;
    await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
    );
  }

  async searchUser(name: string) {
    return await this.userModel.find({ name: { $regex: name } });
  }

  async requestFriend(requestFriendDto: RequestFriendDto) {
    const { solicitante, alvo } = requestFriendDto;

    const existUser = await this.userModel.findOne({ _id: solicitante });

    if (solicitante == alvo) {
      throw new BadRequestException(`User equals`);
    }

    if (!existUser) {
      throw new BadRequestException(`User ${solicitante} não Existe`);
    }

    const existFriendAtList = existUser.friends.find(
      (friend) => friend._id == alvo,
    );

    if (!existFriendAtList) {
      existUser.friends.push({ friend: alvo });
      await this.userModel.findByIdAndUpdate(
        { _id: solicitante },
        { $set: existUser },
      );
    }
  }
  async acceptFriend(_id: string, friend: string) {
    const existUser = await this.userModel.findOne({ _id: friend });

    if (!existUser) {
      throw new BadRequestException(`User ${_id} não Existe`);
    }
    const indexOfFriend = existUser.friends.findIndex(
      (obj) => obj.friend == _id,
    );
    existUser.friends[indexOfFriend].status = true;

    await this.userModel.findByIdAndUpdate(
      { _id: friend },
      { $set: existUser },
    );

    const existThatAccept = await this.userModel.findOne({ _id });

    existThatAccept.friends.push({
      status: true,
      friend,
    });
    await this.userModel.findByIdAndUpdate({ _id }, { $set: existThatAccept });
  }
  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

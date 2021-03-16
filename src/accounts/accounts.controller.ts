import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { PatchAccountDTO } from './dto/patch-account.dto';
import { Account } from './schema/account.schema';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAll() {
    return this.accountsService.getAll();
  }

  @Get('details')
  getOne(@Query('id') id: string) {
    return this.accountsService.getOne(id);
  }

  @Post()
  create(@Body() createAccountDTO: CreateAccountDTO) {
    return this.accountsService.create(createAccountDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {}

  @Patch(':id')
  patch(@Param('id') id: string, @Body() patchUserDTO: PatchAccountDTO) {
    return this.accountsService.patch(id, patchUserDTO);
  }
}

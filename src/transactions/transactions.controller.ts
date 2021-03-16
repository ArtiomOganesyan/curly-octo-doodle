import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('accounts')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Get('transactions')
  getAll() {
    return this.transactionService.getAll();
  }

  @Post('payment')
  createPayment(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.transactionService.createPayment(createTransactionDTO);
  }

  @Post('transfer')
  createTransfer(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.transactionService.createTransfer(createTransactionDTO);
  }
  //   @Get(':id')
  //   getOne(@Param('id') id: string) {}

  //   @Post()
  //   create(@Body() createAccountDTO: CreateAccountDTO) {}

  //   @Delete(':id')
  //   delete(@Param('id') id: string) {}

  //   @Patch(':id')
  //   patch(@Param('id') id: string, @Body() patchUserDTO: PatchAccountDTO) {}
}

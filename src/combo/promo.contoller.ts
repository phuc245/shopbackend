import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ComboService } from './promo.service';
import { CreateComboDTO } from './dto/combo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleAuthGuard } from 'src/auth/guards/role-jwt.gaurd';
import { Role } from 'src/auth/decorator/role.enum';
import { Roles } from 'src/auth/decorator/role.decorator';

@Controller('combos')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  // Tạo combo mới
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCombo(@Body() createComboDTO: CreateComboDTO) {
    if (!createComboDTO.name || typeof createComboDTO.name !== 'string') {
      throw new Error('Combo name is required and must be a string.');
    }

    try {
      return await this.comboService.createCombo(createComboDTO);
    } catch (error) {
      console.error('Error in ComboController.createCombo:', error.message);
      throw new Error(`Error creating combo: ${error.message}`);
    }
  }

  // Lấy tất cả combo
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCombos() {
    try {
      return await this.comboService.getAllCombos();
    } catch (error) {
      console.error('Error in ComboController.getAllCombos:', error.message);
      throw new Error(`Error fetching combos: ${error.message}`);
    }
  }

  // Xóa combo theo ID
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCombo(@Param('id') id: string) {
    try {
      const result = await this.comboService.deleteCombo(id);
      if (!result) {
        throw new Error('Combo not found');
      }
      return { message: 'Combo deleted successfully', result };
    } catch (error) {
      console.error('Error in ComboController.deleteCombo:', error.message);
      throw new Error(`Error deleting combo: ${error.message}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteCombos(@Body() ids: string[]) {
    try {
      // Xóa nhiều combo
      const results = await this.comboService.deleteCombos(ids);
      if (!results || results.length === 0) {
        throw new Error('No combos found for deletion');
      }

      // Log kết quả
      console.log('Combos deleted:', results);
      return { message: 'Combos deleted successfully', results };
    } catch (error) {
      console.error('Error in ComboController.deleteCombos:', error.message);
      throw new Error(`Error deleting combos: ${error.message}`);
    }
  }
}

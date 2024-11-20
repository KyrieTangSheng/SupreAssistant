import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';
import { Companion } from './companion.model';

export class Message extends Model {
  public id!: string;
  public companionId!: string;
  public content!: string;
  public role!: 'user' | 'assistant' | 'system';
  public readonly createdAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    companionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Companion,
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'assistant', 'system'),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'messages'
  }
); 
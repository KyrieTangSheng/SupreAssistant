import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';

export class Companion extends Model {
  public id!: string;
  public userId!: string;
  public name!: string;
  public model!: string;
  public systemPrompt!: string;
  public lastInteractionAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Companion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: 'users',
      //   key: 'id'
      // },
      // onDelete: 'CASCADE',
      // onUpdate: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'AI Assistant'
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: process.env.OPENAI_MODEL_NAME || 'gpt-4o'
    },
    systemPrompt: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: process.env.COMPANION_SYSTEM_PROMPT_PATH ? require('fs').readFileSync(process.env.COMPANION_SYSTEM_PROMPT_PATH, 'utf8') : 'You are a helpful assistant.'
    },
    lastInteractionAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'companions',
  }
); 
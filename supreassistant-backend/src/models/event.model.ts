import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';

export class Event extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public startTime!: Date;
  public endTime!: Date;
  public location?: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    sequelize,
    tableName: 'events',
    indexes: [
      { fields: ['userId'], name: 'events_user_id_index' }
    ]
  }
); 
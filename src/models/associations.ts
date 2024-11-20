import { User } from './user.model';
import { Companion } from './companion.model';
import { Message } from './message.model';
import { Event } from './event.model';

export const initializeAssociations = () => {
  // Define associations after ensuring all models are loaded
  User.hasOne(Companion, { 
    foreignKey: 'userId',
    onDelete: 'CASCADE' 
  });

  Companion.belongsTo(User, { 
    foreignKey: 'userId',
    onDelete: 'CASCADE' 
  });

//   Companion.hasMany(Message, { 
//     foreignKey: 'companionId',
//     onDelete: 'CASCADE' 
//   });

//   Message.belongsTo(Companion, { 
//     foreignKey: 'companionId',
//     onDelete: 'CASCADE' 
//   });

  User.hasMany(Event, { 
    foreignKey: 'userId',
    onDelete: 'CASCADE' 
  });

  Event.belongsTo(User, { 
    foreignKey: 'userId',
    onDelete: 'CASCADE' 
  });
}; 
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserModel = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserModel.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// UserModel.methods.comparePassword = async function(attempt: string) {
//   return await bcrypt.compare(attempt, this.password);
// };

export { UserModel };

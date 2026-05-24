import mongoose, { mongo } from 'mongoose'
import departmentModel from '@/models/department'
import subdepartmentModel from '@/models/subdepartment'
import ticketModel from '@/models/ticket'
const Schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    file: {
      type: String,
      required: false
    },

    mainTicket: {
      type: mongoose.Types.ObjectId,
      ref: 'Ticket',
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

const model = mongoose.models.Ticket || mongoose.model('Ticket', Schema)
export default model

const ScheduleModel = require('../models/ScheduleModel');
const UserModel = require('../models/UserModel');
const SubjectModel = require('../models/SubjectModel');
const mongoose = require('mongoose');

class ScheduleController { 
    async createSchedule(req, res) {
        try {
          const { userId, subjects } = req.body;
          
          const userObjectId = new mongoose.Types.ObjectId(userId);
          const user = await UserModel.findById(userObjectId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          const schedule = new ScheduleModel({
            user: userObjectId,
            subjects: subjects.map(subject => ({
              subject: subject._id,
              selectedSectionIndex: subject.selectedSectionIndex
            }))
          });
    
          await schedule.save();
    
          user.schedule = user.schedule || [];
          user.schedule.push(schedule._id);
          await user.save();
    
          res.status(201).json({ message: 'Schedule created successfully', schedule });
        } catch (error) {
          console.error('Error creating schedule:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }

    async getSchedule(req, res) {
        try {
            const { userId } = req.params;
            
            const user = await UserModel.findById(userId).populate('schedule');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!user.schedule || user.schedule.length === 0) {
                return res.status(404).json({ message: 'No schedule found for this user' });
            }

            // Assuming we're getting the latest schedule
            const latestSchedule = user.schedule[user.schedule.length - 1];
            
            // Populate the subjects in the schedule
            await latestSchedule.populate('subjects');

            res.status(200).json(latestSchedule);
        } catch (error) {
            console.error('Error fetching schedule:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateSchedule(req, res) {
        try {
          const { userId } = req.params;
          const { subjects } = req.body;
    
          const user = await UserModel.findById(userId).populate('schedule');
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          if (!user.schedule || user.schedule.length === 0) {
            return res.status(404).json({ message: 'No schedule found for this user' });
          }
    
          const latestSchedule = user.schedule[user.schedule.length - 1];
          latestSchedule.subjects = subjects.map(subject => ({
            subject: subject._id,
            selectedSectionIndex: subject.selectedSectionIndex
          }));
          await latestSchedule.save();
    
          res.status(200).json({ message: 'Schedule updated successfully', schedule: latestSchedule });
        } catch (error) {
          console.error('Error updating schedule:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }

    async deleteSchedule(req, res) {
        try {
            const { userId, scheduleId } = req.params;

            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const schedule = await ScheduleModel.findById(scheduleId);
            if (!schedule) {
                return res.status(404).json({ message: 'Schedule not found' });
            }

            // Remove the schedule from the user's schedules
            user.schedule = user.schedule.filter(id => id.toString() !== scheduleId);
            await user.save();

            // Delete the schedule
            await ScheduleModel.findByIdAndDelete(scheduleId);

            res.status(200).json({ message: 'Schedule deleted successfully' });
        } catch (error) {
            console.error('Error deleting schedule:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new ScheduleController();
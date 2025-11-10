import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'

const DailyExercise = sequelize.define(
    'DailyExercise',
    {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
        },
        exercises: {
            type: DataTypes.JSON,
            defaultValue: [
                { name: 'push_ups', value: 0, display_name: 'Push ups' },
                { name: 'sit_ups', value: 0, display_name: 'Sit ups' },
                { name: 'squats', value: 0, display_name: 'Squats' },
                { name: 'running', value: 0, display_name: 'Running' },
            ]
        }
    },
    {
        tableName: 'daily_exercise',
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
)

export default DailyExercise
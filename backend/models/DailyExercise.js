import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'

const DailyExercise = sequelize.define(
    'DailyExercise',
    {
        push_ups: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        squats: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        sit_ups: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        running: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
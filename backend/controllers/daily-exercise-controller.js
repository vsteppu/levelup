// controllers/login-controller.js
import DailyExercise from "../models/DailyExercise.js";
import User from "../models/User.js"

const loginController = async(data) => {
/*     const { id, push_ups, sit_ups, squats, running } = data;

    const updateExercises = [
        { name: 'push_ups', value: push_ups },
        { name: 'sit_ups', value: sit_ups },
        { name: 'squats', value: squats },
        { name: 'running', value: running },
    ]; */
    const id = "e3141635-2ae4-43f7-902b-5373f2581e1d"

    try {
        const existingUser = await User.findOne({ where: { id } });
        console.log('existingUser: ', existingUser.createdAt);
        if (!existingUser) {
            res.status(404).json({ success: false, message: "User Not found" });
            return;
        }

        //existingUser.daily_exercise = updateExercises

        await existingUser.save()
        return existingUser
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

loginController()

export default loginController;
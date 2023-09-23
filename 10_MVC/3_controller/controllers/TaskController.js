const Task = requiere('../models/Task')

module.exports = class TaskController {
    static createTask(req, res) {
        res.render('tasks/create')
    }
}
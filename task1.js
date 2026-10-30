const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json()); 
let tasks = [
    { id: 1, title: "Complete Webora Task 2" },
    { id: 2, title: "Take a break" }
];
app.get('/tasks', (req, res) => {
    res.json(tasks);
});
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1, // Simple ID generation
        title: req.body.title
    };
    if (!newTask.title) {
        return res.status(400).json({ error: "Please provide a 'title' for the task." });
    }

    tasks.push(newTask);
    res.status(201).json({ message: "Task added successfully", task: newTask });
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    // Helpful response if task is not found
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted", task: deletedTask[0] });
});
app.listen(PORT, () => {
    console.log(`Task 2 Server running on http://localhost:${PORT}`);
});
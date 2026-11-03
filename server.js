const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); 

// --- TASK 2: To-Do API ---
let tasks = [
    { id:1, title: "Webora Task" },
];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
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

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted", task: deletedTask[0] });
});

// --- TASK 3: Contact Form Backend ---
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ 
            error: "Missing required fields. Please provide name, email, and message." 
        });
    }

    res.status(200).json({
        message: "Contact form submitted successfully!",
        data: { name, email, message }
    });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
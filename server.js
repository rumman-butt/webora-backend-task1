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

// ==========================================
// TASK 4: Simple Login Validation API
// ==========================================
app.post('/login', (req, res) => {
    // 1. Read username and password from the request body
    const { username, password } = req.body;

    // 2. Define sample demo credentials (DO NOT use real passwords!)
    const DEMO_USER = "admin";
    const DEMO_PASS = "password123";

    // 3. Check if fields are missing
    if (!username || !password) {
        return res.status(400).json({ 
            error: "Please provide both username and password." 
        });
    }

    // 4. Check if credentials match the demo values
    if (username === DEMO_USER && password === DEMO_PASS) {
        res.status(200).json({ 
            message: "Login successful! Welcome, admin." 
        });
    } else {
        // Return a clear error for incorrect details
        res.status(401).json({ 
            error: "Invalid credentials. Please check your username and password." 
        });
    }
});
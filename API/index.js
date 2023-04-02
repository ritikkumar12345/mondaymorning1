const express = require("express");
const student = require("./student");
const app = express();
app.use(express.json());
app.listen(4000, () => {
    console.log("request to 4000");
});
// ==============================================
app.get("/student", (req, res) => {
    res.send(student);
});
// ===============================================
app.get("/get", (req, res) => {
    res.send("Welcome to my API 4000");
});
// ===============================================
app.post("/get", (req, res) => {
    if (!req.body.email) {
        res.status(400);
        return res.json({ error: "email is required..." });
    }
    const user = {
        id: student.length,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        ip_address: req.body.ip_address,
    };
    student.push(user);
    res.json(user);
});
// =====================================================
app.put("/put/:id", (req, res) => {
    let id = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let index = student.findIndex((student) => {
        return student.id == Number.parseInt(id);
    });
    console.log(id, req.body, index);
    if (index >= 0) {
        let std = student[index];
        std.first_name = first_name;
        std.last_name = last_name;
        std.email = email;
        res.json(std);
    } else {
        res.status(404);
        res.end();
    }
});
// ============================================
app.delete("/delete/:id", (req, res) => {
    let id = req.params.id;
    let index = student.findIndex((student) => {
        return student.id == Number.parseInt(id);
    });
    if (index >= 0) {
        let std = student[index];
        student.splice(index, 1);
        res.json(std);
    } else {
        res.status(404);
    }
});

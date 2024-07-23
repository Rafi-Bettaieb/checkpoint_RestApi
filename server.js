const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/user');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const PORT = 3000;

const app = express();
app.use(express.json());
const uri = process.env.MONGO_URI;

//connecting to mongodb
mongoose.connect(uri, {})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error(err));


//getting all users
app.get('/users', async (req, res) => {
    try {
        const users = await user.find();
        console.log("all found users", users)
        res.status(200).json(users);
    }
    catch (error) {
        console.log("error occured when getting all users")
        res.status(500).json({ error: error.message });
    }
});

//adding a new user
app.post('/users', async (req, res) => {
    try {
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        age = req.body.age;
        email = req.body.email;
        const newUser = new user({ firstName,lastName,age,email });
        await newUser.save();
        console.log("user saved successfully");
        res.status(201).json(newUser);
    } catch (error) {
        console.log("error occured when adding a user")
        res.status(400).json({ error: error.message });
    }
});



//updating an existing user
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        age = req.body.age;
        email = req.body.email;
        const updatedUser = await user.findByIdAndUpdate(id, { firstName,lastName,email,age }, { new: true });

        if (!updatedUser) {
            console.log("user not found")
            return res.status(404).json({ error: 'User not found' });
        }
        console.log("user updated successfully");
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log("error occured when updating the user")
    }
});

//deleting an existing user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await user.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

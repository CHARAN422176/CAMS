const axios = require('axios');

// IMPORTANT: Use your live Render API URL here
const API_URL = 'https://cams-nf34.onrender.com/api/auth/register';

// Add the new students you want to create to this array
const studentsToAdd = [
    {
        name: "Rahul Singh",
        rollNo: "TDP2526",
        password: "password123",
        role: "Student"
    },
    {
        name: "Anjali Gupta",
        rollNo: "TDP2527",
        password: "password123",
        role: "Student"
    },
    {
        name: "Vikram Bose",
        rollNo: "TDP2528",
        password: "password123",
        role: "Student"
    },
    {
        name: "Sneha Iyer",
        rollNo: "TDP2529",
        password: "password123",
        role: "Student"
    }
];

const registerStudents = async () => {
    console.log(`Starting to register ${studentsToAdd.length} students to the live database...`);
    for (const student of studentsToAdd) {
        try {
            await axios.post(API_URL, student);
            console.log(`✅ Successfully registered ${student.name} (${student.rollNo})`);
        } catch (error) {
            const errorMessage = error.response?.data?.msg || error.message;
            console.error(`❌ Failed to register ${student.name}: ${errorMessage}`);
        }
    }
    console.log("\nScript finished.");
};

registerStudents();
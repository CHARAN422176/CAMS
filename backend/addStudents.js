const axios = require('axios');

// Add as many student objects as you want to this array
const studentsToAdd = [
    {
        name: "Ravi Kumar",
        rollNo: "TDP2522",
        password: "password123",
        role: "Student"
    },
    {
        name: "Sunita Reddy",
        rollNo: "TDP2523",
        password: "password123",
        role: "Student"
    },
    {
        name: "Anil Verma",
        rollNo: "TDP2524",
        password: "password123",
        role: "Student"
    },
    {
        name: "Meena Patel",
        rollNo: "TDP2525",
        password: "password123",
        role: "Student"
    }
];

const registerStudents = async () => {
    console.log(`Starting to register ${studentsToAdd.length} students...`);
    for (const student of studentsToAdd) {
        try {
            await axios.post('http://localhost:5001/api/auth/register', student);
            console.log(`✅ Successfully registered ${student.name} (${student.rollNo})`);
        } catch (error) {
            // Check if the error response exists and has a message
            const errorMessage = error.response?.data?.msg || error.message;
            console.error(`❌ Failed to register ${student.name}: ${errorMessage}`);
        }
    }
    console.log("\nScript finished.");
};

registerStudents();
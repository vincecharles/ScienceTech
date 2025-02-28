// Student data
const students = [
    { id: "1001", name: "Emma Watson", present: false },
    { id: "1002", name: "Daniel Johnson", present: false },
    { id: "1003", name: "Olivia Smith", present: false },
    { id: "1004", name: "James Brown", present: false },
    { id: "1005", name: "Sophia Davis", present: false },
    { id: "1006", name: "Noah Wilson", present: false },
    { id: "1007", name: "Isabella Martinez", present: false },
    { id: "1008", name: "Liam Anderson", present: false },
    { id: "1009", name: "Ava Thompson", present: false },
    { id: "1010", name: "Mason Garcia", present: false },
    { id: "1011", name: "Mia Rodriguez", present: false },
    { id: "1012", name: "Ethan Lee", present: false }
];

// DOM Elements
const studentIdInput = document.getElementById('student-id-input');
const simulateTapBtn = document.getElementById('simulate-tap');
const tapMessage = document.getElementById('tap-message');
const studentList = document.getElementById('student-list');
const presentCountEl = document.getElementById('present-count');
const absentCountEl = document.getElementById('absent-count');
const currentDateEl = document.getElementById('current-date');

// Initialize the attendance table with student data
function initializeAttendanceTable() {
    studentList.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.id = `student-${student.id}`;
        
        if (student.present) {
            row.style.backgroundColor = '#f0fdf4'; // light green
        }
        
        // Add hover effect
        row.onmouseenter = function() { 
            if (!student.present) this.style.backgroundColor = '#f9fafb';
        };
        row.onmouseleave = function() { 
            if (!student.present) this.style.backgroundColor = '';
        };
        
        row.innerHTML = `
            <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb;">
                <span style="font-weight: 600;">${student.id}</span>
            </td>
            <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb;">
                ${student.name}
            </td>
            <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <!-- Status Light -->
                    <div style="width: 12px; height: 12px; border-radius: 50%; 
                         background-color: ${student.present ? '#22c55e' : '#ef4444'}; 
                         box-shadow: 0 0 5px ${student.present ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}">
                    </div>
                    <!-- Status Text -->
                    <span style="font-weight: 600; font-size: 0.875rem; color: ${student.present ? '#16a34a' : '#dc2626'}">
                        ${student.present ? 'Present' : 'Absent'}
                    </span>
                </div>
            </td>
        `;
        
        studentList.appendChild(row);
    });
    
    updateAttendanceStats();
}

// Handle student card tap
function handleTap() {
    const id = studentIdInput.value.trim();
    
    if (id === '') {
        showTapMessage('Please enter a student ID', 'error');
        return;
    }
    
    const student = students.find(s => s.id === id);
    
    if (student) {
        if (student.present) {
            showTapMessage(`${student.name} is already marked present`, 'warning');
        } else {
           
            student.present = true;
            
    
            updateStudentStatus(student);
            updateAttendanceStats();
            showTapMessage(`${student.name} marked present`, 'success');
            
        
            simulateTapBtn.style.backgroundColor = '#22c55e';
            simulateTapBtn.style.color = 'white';
            setTimeout(() => {
                simulateTapBtn.style.backgroundColor = 'white';
                simulateTapBtn.style.color = '#4f46e5';
            }, 500);
        }
    } else {
        showTapMessage('Student ID not found', 'error');
    }
    
    // Clear input field
    studentIdInput.value = '';
    studentIdInput.focus();
}

// the status of a student in the table
function updateStudentStatus(student) {
    const row = document.getElementById(`student-${student.id}`);
    
    if (row) {
        
        row.style.backgroundColor = '#f0fdf4';  // light green
        
       
        const statusCell = row.cells[2];
        
        statusCell.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <!-- Status Light -->
                <div style="width: 12px; height: 12px; border-radius: 50%; 
                     background-color: #22c55e; 
                     box-shadow: 0 0 5px rgba(34, 197, 94, 0.5)">
                </div>
                <!-- Status Text -->
                <span style="font-weight: 600; font-size: 0.875rem; color: #16a34a">
                    Present
                </span>
            </div>
        `;
        
    
        row.style.animation = 'none';
        void row.offsetWidth; // Force reflow
        row.style.animation = 'highlightFade 2s';
    }
}

// attendance statistics
function updateAttendanceStats() {
    const presentCount = students.filter(student => student.present).length;
    const absentCount = students.length - presentCount;
    
    presentCountEl.textContent = presentCount;
    absentCountEl.textContent = absentCount;
}

// Show tap result message
function showTapMessage(message, status) {
    tapMessage.textContent = message;
    
    // Set color based on status
    if (status === 'success') {
        tapMessage.style.color = '#4ade80';
    } else if (status === 'error') {
        tapMessage.style.color = '#f87171';
    } else if (status === 'warning') {
        tapMessage.style.color = '#fbbf24';
    }
    
    // Clear message after 3 seconds
    setTimeout(() => {
        tapMessage.textContent = '';
    }, 3000);
}

// Display current date
function showCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateEl.textContent = `Today's Class: ${now.toLocaleDateString('en-US', options)}`;
}

// Keyframe animation for highlight effect
const style = document.createElement('style');
style.textContent = `
@keyframes highlightFade {
    0% { background-color: rgba(34, 197, 94, 0.4); }
    100% { background-color: rgba(34, 197, 94, 0.1); }
}

@keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
}

@keyframes glow {
    0% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
    50% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.8); }
    100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
}
`;
document.head.appendChild(style);

// Event listeners
simulateTapBtn.addEventListener('click', handleTap);

studentIdInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleTap();
    }
});

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeAttendanceTable();
    showCurrentDate();
    studentIdInput.focus();
});
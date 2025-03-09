// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authSection = document.getElementById('authSection');
const patientDashboard = document.getElementById('patientDashboard');
const doctorDashboard = document.getElementById('doctorDashboard');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const signupSubmitBtn = document.getElementById('signupSubmitBtn');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const roleOptions = document.querySelectorAll('.role-option');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const doctorUploadArea = document.getElementById('doctorUploadArea');
const doctorFileInput = document.getElementById('doctorFileInput');
const doctorPredictionResult = document.getElementById('doctorPredictionResult');
const patientItems = document.querySelectorAll('.patient-item');
const patientRecordModal = document.getElementById('patientRecordModal');
const closePatientRecordModal = document.getElementById('closePatientRecordModal');
const uploadSuccessModal = document.getElementById('uploadSuccessModal');
const closeUploadSuccessModal = document.getElementById('closeUploadSuccessModal');
const uploadAnotherBtn = document.getElementById('uploadAnotherBtn');
const viewRecordBtn = document.getElementById('viewRecordBtn');

// Current user state
let currentUser = null;
let currentRole = 'patient';

// Event Listeners
loginBtn.addEventListener('click', () => {
    authSection.style.display = 'flex';
    patientDashboard.classList.remove('active');
    doctorDashboard.classList.remove('active');
    document.querySelector('[data-tab="login"]').click();
});

signupBtn.addEventListener('click', () => {
    authSection.style.display = 'flex';
    patientDashboard.classList.remove('active');
    doctorDashboard.classList.remove('active');
    document.querySelector('[data-tab="signup"]').click();
});

logoutBtn.addEventListener('click', () => {
    currentUser = null;
    authSection.style.display = 'flex';
    patientDashboard.classList.remove('active');
    doctorDashboard.classList.remove('active');
    loginBtn.style.display = 'block';
    signupBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
});

// Auth tabs
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Update active tab
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding form
        authForms.forEach(form => form.classList.remove('active'));
        document.getElementById(`${tabName}Form`).classList.add('active');
    });
});

// Role selection
roleOptions.forEach(option => {
    option.addEventListener('click', () => {
        const role = option.getAttribute('data-role');
        currentRole = role;
        
        // Update active role
        const parentForm = option.closest('.auth-form');
        parentForm.querySelectorAll('.role-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');
    });
});

// Login submission
loginSubmitBtn.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    // Simulate login (in a real app, this would be an API call)
    currentUser = {
        name: currentRole === 'patient' ? 'John Doe' : 'Sarah Johnson',
        email: email,
        role: currentRole
    };
    
    // Show appropriate dashboard
    authSection.style.display = 'none';
    if (currentRole === 'patient') {
        patientDashboard.classList.add('active');
        document.getElementById('patientName').textContent = currentUser.name;
    } else {
        doctorDashboard.classList.add('active');
        document.getElementById('doctorName').textContent = currentUser.name;
    }
    
    // Update nav buttons
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
});

// Signup submission
signupSubmitBtn.addEventListener('click', () => {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const termsAgree = document.getElementById('termsAgree').checked;
    
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (!termsAgree) {
        alert('Please agree to the terms and conditions');
        return;
    }
    
    // Simulate signup (in a real app, this would be an API call)
    currentUser = {
        name: name,
        email: email,
        role: currentRole
    };
    
    // Show appropriate dashboard
    authSection.style.display = 'none';
    if (currentRole === 'patient') {
        patientDashboard.classList.add('active');
        document.getElementById('patientName').textContent = currentUser.name;
    } else {
        doctorDashboard.classList.add('active');
        document.getElementById('doctorName').textContent = currentUser.name;
    }
    
    // Update nav buttons
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
});

// File upload for patient
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        document.getElementById('uploadedFileName').textContent = file.name;
        document.getElementById('uploadedFileSize').textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
        
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        document.getElementById('uploadedFileDate').textContent = dateString;
        
        uploadSuccessModal.classList.add('active');
    }
});

// File upload for doctor
doctorUploadArea.addEventListener('click', () => {
    doctorFileInput.click();
});

doctorFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        // Simulate AI analysis
        setTimeout(() => {
            doctorPredictionResult.style.display = 'block';
            doctorUploadArea.style.display = 'none';
        }, 1500);
    }
});

// Patient record modal
patientItems.forEach(item => {
    item.addEventListener('click', () => {
        patientRecordModal.classList.add('active');
    });
});

closePatientRecordModal.addEventListener('click', () => {
    patientRecordModal.classList.remove('active');
});

// Upload success modal
closeUploadSuccessModal.addEventListener('click', () => {
    uploadSuccessModal.classList.remove('active');
});

uploadAnotherBtn.addEventListener('click', () => {
    uploadSuccessModal.classList.remove('active');
    fileInput.value = '';
    fileInput.click();
});

viewRecordBtn.addEventListener('click', () => {
    uploadSuccessModal.classList.remove('active');
    // In a real app, this would navigate to the record view
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// Drag and drop for file uploads
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
    doctorUploadArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, highlight, false);
    doctorUploadArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, unhighlight, false);
    doctorUploadArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    e.currentTarget.classList.add('bg-blue-50');
}

function unhighlight(e) {
    e.currentTarget.classList.remove('bg-blue-50');
}

uploadArea.addEventListener('drop', handleDrop, false);
doctorUploadArea.addEventListener('drop', handleDoctorDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        const file = files[0];
        document.getElementById('uploadedFileName').textContent = file.name;
        document.getElementById('uploadedFileSize').textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
        
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        document.getElementById('uploadedFileDate').textContent = dateString;
        
        uploadSuccessModal.classList.add('active');
    }
}

function handleDoctorDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        // Simulate AI analysis
        setTimeout(() => {
            doctorPredictionResult.style.display = 'block';
            doctorUploadArea.style.display = 'none';
        }, 1500);
    }
}
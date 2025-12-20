// Modern Evidence Management System
let web3, userAccount;

const roleNames = {
    0: 'None', 1: 'Public Viewer', 2: 'Investigator', 3: 'Forensic Analyst',
    4: 'Legal Professional', 5: 'Court Official', 6: 'Evidence Manager',
    7: 'Auditor', 8: 'Administrator'
};

const roleDashboards = {
    1: 'dashboard-public-viewer.html', 2: 'dashboard-public-viewer.html',
    3: 'dashboard-public-viewer.html', 4: 'dashboard-public-viewer.html',
    5: 'dashboard-public-viewer.html', 6: 'dashboard-public-viewer.html',
    7: 'dashboard-public-viewer.html', 8: 'dashboard-public-viewer.html'
};

// Debug function
function debugInfo() {
    console.log('Debug Info:');
    console.log('userAccount:', userAccount);
    console.log('localStorage key:', 'evidUser_' + userAccount);
    console.log('saved user:', localStorage.getItem('evidUser_' + userAccount));
}

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        document.getElementById('connectWallet').addEventListener('click', connectWallet);
        document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
        document.getElementById('goToDashboard').addEventListener('click', goToDashboard);

        const accounts = await window.ethereum?.request({ method: 'eth_accounts' }) || [];
        if (accounts.length > 0) {
            await connectWallet();
        }
    } catch (error) {
        console.error('App initialization error:', error);
    }
}

async function connectWallet() {
    try {
        showLoading(true);
        
        if (config.DEMO_MODE) {
            userAccount = '0x1234567890123456789012345678901234567890';
            document.getElementById('walletAddress').textContent = userAccount;
            document.getElementById('walletStatus').classList.remove('hidden');
            document.getElementById('connectWallet').textContent = 'Connected (Demo)';
            document.getElementById('connectWallet').disabled = true;
            await checkRegistrationStatus();
            showLoading(false);
            return;
        }
        
        if (!window.ethereum) {
            showAlert('MetaMask not detected. Please install MetaMask.', 'error');
            showLoading(false);
            return;
        }
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            showAlert('No accounts found. Please unlock MetaMask.', 'error');
            showLoading(false);
            return;
        }
        
        userAccount = accounts[0];
        web3 = new Web3(window.ethereum);

        document.getElementById('walletAddress').textContent = userAccount;
        document.getElementById('walletStatus').classList.remove('hidden');
        document.getElementById('connectWallet').textContent = 'Connected';
        document.getElementById('connectWallet').disabled = true;

        await checkRegistrationStatus();
        showLoading(false);
    } catch (error) {
        showLoading(false);
        console.error('Wallet connection error:', error);
        showAlert('Failed to connect wallet: ' + error.message, 'error');
    }
}

async function checkRegistrationStatus() {
    try {
        if (!userAccount) {
            showAlert('Please connect your wallet first.', 'error');
            return;
        }
        
        const savedUser = localStorage.getItem('evidUser_' + userAccount);
        
        if (savedUser) {
            const userInfo = JSON.parse(savedUser);
            document.getElementById('userName').textContent = userInfo.fullName;
            document.getElementById('userRoleName').textContent = roleNames[userInfo.role];
            document.getElementById('userRoleName').className = `badge badge-${getRoleClass(userInfo.role)}`;
            document.getElementById('userDepartment').textContent = userInfo.department || 'Public';
            
            document.getElementById('walletSection').classList.add('hidden');
            document.getElementById('alreadyRegisteredSection').classList.remove('hidden');
            return;
        }
        
        document.getElementById('walletSection').classList.add('hidden');
        document.getElementById('registrationSection').classList.remove('hidden');
    } catch (error) {
        console.error('Registration check error:', error);
        showAlert('Error checking registration: ' + error.message, 'error');
        document.getElementById('walletSection').classList.add('hidden');
        document.getElementById('registrationSection').classList.remove('hidden');
    }
}

async function handleRegistration(event) {
    event.preventDefault();
    
    try {
        showLoading(true);
        
        if (!userAccount) {
            showAlert('Please connect your wallet first.', 'error');
            showLoading(false);
            return;
        }
        
        const fullName = document.getElementById('fullName').value;
        const role = parseInt(document.getElementById('userRole').value);
        
        if (!fullName || !role) {
            showAlert('Please fill in all required fields and select a role.', 'error');
            showLoading(false);
            return;
        }
        
        const userData = {
            fullName: fullName,
            role: role,
            department: role === 1 ? 'Public' : document.getElementById('department').value,
            badgeNumber: role === 1 ? '' : document.getElementById('badgeNumber').value,
            jurisdiction: role === 1 ? 'Public' : document.getElementById('jurisdiction').value,
            registrationDate: Date.now(),
            isRegistered: true,
            isActive: true
        };
        
        localStorage.setItem('evidUser_' + userAccount, JSON.stringify(userData));
        
        showLoading(false);
        showAlert('Registration successful! Redirecting to dashboard...', 'success');
        
        setTimeout(() => {
            const dashboardUrl = roleDashboards[role] || 'dashboard-public-viewer.html';
            window.location.href = dashboardUrl;
        }, 2000);
        
    } catch (error) {
        showLoading(false);
        console.error('Registration error:', error);
        showAlert('Registration failed: ' + error.message, 'error');
    }
}

async function goToDashboard() {
    try {
        const savedUser = localStorage.getItem('evidUser_' + userAccount);
        if (savedUser) {
            const userInfo = JSON.parse(savedUser);
            const dashboardUrl = roleDashboards[userInfo.role];
            if (dashboardUrl) {
                window.location.href = dashboardUrl;
            } else {
                showAlert('Dashboard not available for your role yet. Using default dashboard.', 'info');
                window.location.href = 'dashboard-public-viewer.html';
            }
        } else {
            showAlert('User data not found. Please register again.', 'error');
        }
    } catch (error) {
        console.error('Dashboard navigation error:', error);
        showAlert('Error navigating to dashboard: ' + error.message, 'error');
    }
}

function getRoleClass(role) {
    const roleClasses = {
        1: 'public', 2: 'investigator', 3: 'forensic', 4: 'legal',
        5: 'court', 6: 'manager', 7: 'auditor', 8: 'admin'
    };
    return roleClasses[role] || 'public';
}

function showLoading(show) {
    const modal = document.getElementById('loadingModal');
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}

function showAlert(message, type) {
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
        location.reload();
    });
    window.ethereum.on('chainChanged', function (chainId) {
        location.reload();
    });
}
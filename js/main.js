import { checkAuthState, logout, auth } from './auth-manager.js';
// @ts-ignore
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const database = getDatabase();

async function updateAuthUI() {
    const user = await checkAuthState();
    const authBtn = document.getElementById('auth-btn');
    const userGreeting = document.getElementById('user-greeting');
    const accountLink = document.getElementById('account-link');

    if (user) {
        authBtn.textContent = 'Выйти';
        authBtn.onclick = handleLogout;

        // Берем имя из localStorage или из email
        // const name = localStorage.getItem('userName') || user.email.split('@')[0];
        // userGreeting.textContent = `Привет, ${name}!`;
        userGreeting.textContent = '';
        userGreeting.style.display = 'none';
        accountLink.style.display = 'inline';

        // console.log('Показываем имя:', name);

    } else {
        authBtn.textContent = 'Вход';
        authBtn.onclick = handleLogin;
        userGreeting.style.display = 'none';
        accountLink.style.display = 'none';
    }
}

function handleLogin(e) {
    e.preventDefault();
    window.location.href = 'pages/login.html';
}

async function handleLogout(e) {
    e.preventDefault();
    await logout();
    window.location.reload();
}

// Проверяем при загрузке
document.addEventListener('DOMContentLoaded', updateAuthUI);

// И при изменении авторизации
auth.onAuthStateChanged(updateAuthUI);

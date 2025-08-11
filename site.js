// --- Centralized scroll management functions ---
const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
};

const enableBodyScroll = () => {
    document.body.style.overflow = 'auto';
};

// New function for smooth scrolling to sections
const scrollToSection = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Add event listeners to the Products and Socials links
document.querySelectorAll('.navbar .nav-link').forEach(link => {
    if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', scrollToSection);
    }
});

// **Status Overlay Functionality**
const statusOverlay = document.getElementById('statusOverlay');
const closeStatusOverlayBtn = document.getElementById('closeStatusOverlayBtn');
const statusList = document.getElementById('statusList');

const productStatuses = [
    { name: 'Roblox Executor', status: 'Online' },
    { name: 'One Armed Robber Menu', status: 'Online' },
    { name: 'Spoofers', status: 'Online' },
    { name: 'Cracked Clients', status: 'Online' },
    { name: 'Bypassed Methods', status: 'Online' },
    { name: 'Fortnite Cheat', status: 'Offline' },
];

const showStatusOverlay = () => {
    statusList.innerHTML = '';
    productStatuses.forEach(item => {
        const statusItem = document.createElement('li');
        statusItem.classList.add('status-item');

        const statusIndicator = document.createElement('span');
        statusIndicator.classList.add('status-indicator');

        const statusName = document.createElement('span');
        statusName.classList.add('status-name');
        statusName.textContent = item.name;

        const statusText = document.createElement('span');
        statusText.classList.add('status-text');
        statusText.textContent = item.status;

        if (item.status === 'Offline') {
            statusIndicator.classList.add('offline');
            statusText.classList.add('offline');
        }

        statusItem.appendChild(statusIndicator);
        statusItem.appendChild(statusName);
        statusItem.appendChild(statusText);
        statusList.appendChild(statusItem);
    });

    statusOverlay.style.display = 'flex';
    disableBodyScroll();
};

const hideStatusOverlay = () => {
    statusOverlay.style.display = 'none';
    enableBodyScroll();
};

document.getElementById('statusBtn').addEventListener('click', showStatusOverlay);
closeStatusOverlayBtn.addEventListener('click', hideStatusOverlay);
statusOverlay.addEventListener('click', (event) => {
    if (event.target === statusOverlay) {
        hideStatusOverlay();
    }
});


// FAQ dropdowns
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('.dropdown-icon');

        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.textContent = '-';
        } else {
            answer.style.maxHeight = '0';
            icon.textContent = '+';
        }
    });
});

// Custom Search Popup functionality
const searchPopup = document.getElementById('searchPopup');
const searchPopupText = document.getElementById('searchPopupText');
const closeSearchPopupBtn = document.getElementById('closeSearchPopupBtn');

const showSearchPopup = (message) => {
    searchPopupText.textContent = message;
    searchPopup.style.display = 'flex';
    disableBodyScroll();
};

const hideSearchPopup = () => {
    searchPopup.style.display = 'none';
    enableBodyScroll();
};

closeSearchPopupBtn.addEventListener('click', hideSearchPopup);
searchPopup.addEventListener('click', (event) => {
    if (event.target === searchPopup) {
        hideSearchPopup();
    }
});

// Search bar functionality
document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const searchValue = event.target.value.trim().toLowerCase();
        const productBoxes = document.querySelectorAll('.product-box');
        let found = false;

        if (searchValue === '') {
            showSearchPopup('Please enter a product name to search.');
            return;
        }

        productBoxes.forEach(box => {
            const productTitle = box.getAttribute('data-product-title').toLowerCase();
            if (productTitle.includes(searchValue)) {
                box.scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
            }
        });

        if (!found) {
            showSearchPopup(`No products found with the name "${searchValue}".`);
        }
    }
});

// Product Overlay functionality
const productOverlay = document.getElementById('productOverlay');
const closeOverlayBtn = document.getElementById('closeOverlayBtn');

const showProductOverlay = (title, price, imageSrc) => {
    document.getElementById('overlayProductTitle').textContent = title;
    document.getElementById('overlayProductPrice').innerHTML = `Price: <span style="color: #00ff00;">${price}</span>`;
    document.getElementById('overlayProductImage').src = imageSrc;

    productOverlay.style.display = 'flex';
    disableBodyScroll();
};

const hideProductOverlay = () => {
    productOverlay.style.display = 'none';
    enableBodyScroll();
};

closeOverlayBtn.addEventListener('click', hideProductOverlay);
productOverlay.addEventListener('click', (event) => {
    if (event.target === productOverlay) {
        hideProductOverlay();
    }
});

document.querySelectorAll('.product-box').forEach(box => {
    box.addEventListener('click', () => {
        const title = box.getAttribute('data-product-title');
        const price = box.getAttribute('data-product-price');
        const imageSrc = box.getAttribute('data-product-image');
        showProductOverlay(title, price, imageSrc);
    });
});

// Starfield generation script
const starfield = document.querySelector('.starfield');
const starCount = 100;
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    // Random size class
    const sizeRand = Math.random();
    if (sizeRand < 0.4) star.classList.add('small');
    else if (sizeRand < 0.75) star.classList.add('medium');
    else star.classList.add('large');
    // Random position
    star.style.left = `${randomRange(0, 100)}vw`;
    star.style.top = `${randomRange(0, 100)}vh`;
    // Random animation duration (slightly randomized)
    const animDuration = randomRange(30, 90);
    star.style.animationDuration = `${animDuration}s`;
    starfield.appendChild(star);
}
for(let i = 0; i < starCount; i++) {
    createStar();
}

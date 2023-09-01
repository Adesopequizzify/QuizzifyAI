const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.header');
const toggleButton = document.getElementById('sidebarToggle');

// Function to open the sidebar
function openSidebar() {
    sidebar.style.left = '0';
    content.style.marginLeft = '250px'; // Adjust this value based on your sidebar's width
}

// Function to close the sidebar
function closeSidebar() {
    sidebar.style.left = '-250px'; // Hides the sidebar to the left
    content.style.marginLeft = '0';
}

// Toggle sidebar when the button is clicked
toggleButton.addEventListener('click', () => {
    if (sidebar.style.left === '0px') {
        closeSidebar();
    } else {
        openSidebar();
    }
});
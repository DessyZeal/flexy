const monthYearElement = document.getElementById('month-year');
const datesElement = document.getElementById('dates');

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const defaultImageUrl = 'https://example.com/default-image.jpg';

const monthImages = {
  January: 'https://img.freepik.com/free-vector/snowy-christmas-landscape_1048-9040.jpg?w=740&t=st=1716474279~exp=1716474879~hmac=83a09171831d4185116cbec1ff61046cb61f78cb627cadeda3a41220e89f9418',
  February: 'https://img.freepik.com/free-vector/branch-with-beautiful-sakura-flowers-falling-petals-realistic-composition-illustration_1284-31302.jpg?w=740&t=st=1716474370~exp=1716474970~hmac=02ebad23bade6be42a045f8f64ae8d018930b88773b1d2e2ab332e6116348369',
  March: 'https://img.freepik.com/free-vector/aesthetic-pastel-pink-background-rainbow-sky-with-glitter-design-vector_53876-156332.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
  April: 'https://img.freepik.com/free-photo/sunset-background-pastel-sky_53876-129041.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
  May: 'https://img.freepik.com/free-vector/cloud-background-vector-cute-desktop-wallpaper_53876-136885.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
  June: 'https://img.freepik.com/free-photo/background-with-flower-hand-shadow_53876-104078.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
  July: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_52683-60691.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
  August: 'https://img.freepik.com/free-photo/spring-floral-border-background-green-with-leaf-watercolor-illustration_53876-126807.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
  September: 'https://img.freepik.com/free-vector/white-daisy-floral-pattern-vector-beige-background_53876-111609.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
  October: 'https://img.freepik.com/free-photo/landscape-background-mountains-with-sunset-illustration_53876-105317.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
  November: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148907305.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
  December: 'https://img.freepik.com/free-photo/shimmering-gold-stars-moon-watercolor-background_53876-103963.jpg?size=626&ext=jpg&ga=GA1.1.1108299806.1689158198&semt=sph',
};


function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();

  monthYearElement.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

  datesElement.innerHTML = '';

  const startDayOfWeek = firstDay.getDay();
  const today = currentDate.getDate();

  // Set the correct image for the current month
  const monthName = getMonthName(currentMonth);
  const imageUrl = monthImages[monthName] || defaultImageUrl;
  const monthImageElement = document.getElementById('month-image');
  monthImageElement.src = imageUrl;
  monthImageElement.style.display = 'block';

  for (let i = 1; i <= lastDay.getDate() + startDayOfWeek; i++) {
    const date = i - startDayOfWeek;
    const cell = createCell(date);
    if (i > startDayOfWeek) {
      if (currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() && date === today) {
        cell.classList.add('current-day');
      }
    } else {
      cell.classList.add('prev');
      cell.textContent = prevLastDay - startDayOfWeek + i;
    }
    datesElement.appendChild(cell);
  }
}


function createCell(date, className = '') {
  const cell = document.createElement('div');
  cell.textContent = date;
  if (className !== '') {
    cell.classList.add(className);
  }
  cell.classList.add('date');
  cell.addEventListener('click', () => alert(`Clicked on ${getMonthName(currentMonth)} ${date}, ${currentYear}`));
  return cell; // Return the cell element
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

function getMonthName(monthIndex) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
}

function createCalendar(year, month) {
  const monthYearElement = document.getElementById('month-year');
  const monthImageElement = document.getElementById('month-image');
  const datesElement = document.querySelector('.dates');

  monthYearElement.textContent = `${getMonthName(month)} ${year}`;

  // Get the image URL for the current month
  const monthName = getMonthName(month);
  const imageUrl = monthImages[monthName];

  if (imageUrl) {
    monthImageElement.src = imageUrl;
    monthImageElement.style.display = 'block';
  } else {
    monthImageElement.style.display = 'none';
  }

}

createCalendar(currentYear, currentMonth);

renderCalendar();

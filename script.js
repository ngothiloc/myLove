function showMessage(message) {
    document.getElementById('messageText').innerText = message;
    document.getElementById('messageBox').style.display = 'block';
}

function closeMessage() {
    document.getElementById('messageBox').style.display = 'none';
}

// Sao băng động
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.2
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.x -= star.speed;
        if (star.x < 0) {
            star.x = canvas.width;
            star.y = Math.random() * canvas.height;
        }
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// Đếm ngày yêu
function countLoveDays() {
    const startDate = new Date("2025-07-23"); // <--- Đổi ngày bắt đầu yêu nhau tại đây
    const now = new Date();
    const diffTime = now - startDate;
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById("loveDays").innerText = `Yêu nhau được ${days} ngày 💕`;
}
countLoveDays();

// Lịch
/* ========== LỊCH NĂM (POPUP) ========== */

/** Ngày quan trọng mặc định trong code
 *  - annual: lặp lại mỗi năm (MM-DD)
 *  - oneTime: chỉ năm cụ thể (YYYY-MM-DD)
 *  Bạn sửa/ghi thêm tuỳ ý.
 */
const IMPORTANT_DATES = {
  annual: {
    "02-01": "Lần đầu gặp Oanh (2025)",
    "02-14": "Valentine",
    "03-08": "Quốc tế Phụ nữ",
    "03-26": "Sinh nhật em Oanh",
    "07-23": "Kỷ niệm bắt đầu yêu em Oanh",
    "08-24": "Ngày Oanh sang Hàn Quốc",
    "09-02": "Quốc khánh Việt Nam",  
    "10-20": "Phụ nữ Việt Nam",
    "10-31": "Sinh nhật bạn Lộc",
    "12-24": "Giáng sinh"
  },
  oneTime: {
    // "2025-09-15": "Kỷ niệm đặc biệt"
  }
};

const VN_MONTHS = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
const VN_WEEK = ["CN","T2","T3","T4","T5","T6","T7"];

const calendarModal = document.getElementById("calendarModal");
const yearGrid = document.getElementById("yearGrid");
const calYearEl = document.getElementById("calYear");
const openCalendarBtn = document.getElementById("openCalendarBtn");
const closeCalendarBtn = document.getElementById("closeCalendar");
const prevYearBtn = document.getElementById("prevYear");
const nextYearBtn = document.getElementById("nextYear");
const todayYearBtn = document.getElementById("todayYear");

let viewYear = new Date().getFullYear();

function pad2(n){ return n.toString().padStart(2,"0"); }
function importantLabelFor(dateObj){
  const y = dateObj.getFullYear();
  const m = pad2(dateObj.getMonth()+1);
  const d = pad2(dateObj.getDate());
  const ymd = `${y}-${m}-${d}`;
  const md = `${m}-${d}`;
  if (IMPORTANT_DATES.oneTime[ymd]) return IMPORTANT_DATES.oneTime[ymd];
  if (IMPORTANT_DATES.annual[md])   return IMPORTANT_DATES.annual[md];
  return null;
}

function buildMonthTable(year, month){
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const startDow = first.getDay(); // CN=0 ... T7=6

  let html = `<div class="month-card">
    <div class="month-name">${VN_MONTHS[month]}</div>
    <table class="month-table">
      <thead><tr>${VN_WEEK.map(w=>`<th>${w}</th>`).join("")}</tr></thead>
      <tbody>`;

  let day = 1;
  for (let row = 0; row < 6; row++){
    html += "<tr>";
    for (let col = 0; col < 7; col++){
      if (row === 0 && col < startDow || day > daysInMonth){
        html += "<td></td>";
      } else {
        const dateObj = new Date(year, month, day);
        const label = importantLabelFor(dateObj);
        const isToday = (()=>{
          const t = new Date();
          return t.getFullYear()===year && t.getMonth()===month && t.getDate()===day;
        })();
        const classes = ["day"];
        if (isToday) classes.push("today");
        if (label)   classes.push("important");

        html += `<td class="${classes.join(" ")}" ${label?`data-label="${label}"`:``}>${day}</td>`;
        day++;
      }
    }
    html += "</tr>";
  }

  html += "</tbody></table></div>";
  return html;
}

function renderYear(y){
  calYearEl.textContent = y;
  let monthsHTML = "";
  for (let m = 0; m < 12; m++){
    monthsHTML += buildMonthTable(y, m);
  }
  yearGrid.innerHTML = monthsHTML;
}

function openCalendar(){
  renderYear(viewYear);
  calendarModal.style.display = "block";
  calendarModal.setAttribute("aria-hidden","false");
}
function closeCalendar(){
  calendarModal.style.display = "none";
  calendarModal.setAttribute("aria-hidden","true");
}

/* Sự kiện */
openCalendarBtn.addEventListener("click", (e)=>{ e.stopPropagation(); openCalendar(); });
closeCalendarBtn.addEventListener("click", (e)=>{ e.stopPropagation(); closeCalendar(); });
prevYearBtn.addEventListener("click", ()=>{ viewYear--; renderYear(viewYear); });
nextYearBtn.addEventListener("click", ()=>{ viewYear++; renderYear(viewYear); });
todayYearBtn.addEventListener("click", ()=>{ viewYear = new Date().getFullYear(); renderYear(viewYear); });

/* Click ra ngoài để đóng */
calendarModal.addEventListener("click", (e)=>{
  if (e.target === calendarModal) closeCalendar();
});
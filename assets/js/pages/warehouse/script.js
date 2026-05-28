window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function switchTab(type, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.menu-grid').forEach(g => g.classList.add('hidden'));
  document.getElementById('menu-' + type).classList.remove('hidden');
}

function openWhatsApp() {
  window.open('https://wa.me/2348069936994?text=Hi%20The%20Warehouse!%20I%20would%20like%20to%20make%20a%20reservation.', '_blank');
}

function handleSubmit() {
  const inputs = document.querySelectorAll('.contact-form input:not([type="date"]):not([type="time"]), .contact-form textarea');
  let filled = true;
  inputs.forEach(i => { if (!i.value.trim()) filled = false; });
  if (!filled) { alert('Please fill in your name and phone number before submitting.'); return; }
  alert('Booking confirmed! The Warehouse team will contact you on WhatsApp shortly.');
}

const responses = {
  'menu & pricing': 'Our menu features Steak Platters, Grilled Chicken, Local Delicacies, Small Chops and much more! We also have Bowling + Meal bundles. Want to make a reservation?',
  'book a lane': 'Great choice! Our bowling lanes are available daily from 12PM. You can book via WhatsApp on 0806 993 6994 or fill out the reservation form. How many people are in your group?',
  'opening hours': 'The Warehouse is open daily from 12:00 PM until late. We host events and DJ nights on weekends!',
  'location': 'We are located at Plot 181 Peter Odili Road, Trans Amadi, Port Harcourt — beside Livichun. Want to make a booking?',
  'private events': 'We love hosting private events! Birthdays, corporate events, anniversaries, tournaments — contact us on WhatsApp at 0806 993 6994.',
  'default': 'Thanks for reaching out! Contact us on WhatsApp at 0806 993 6994 or fill out the reservation form. We reply within minutes!'
};

function toggleChat() {
  const win = document.getElementById('chatWindow');
  const btn = document.getElementById('chatToggle');
  win.classList.toggle('open');
  btn.textContent = win.classList.contains('open') ? '✕' : '💬';
}

function quickReply(text) {
  addMessage(text, 'user');
  document.getElementById('quickReplies').style.display = 'none';
  showTyping();
  setTimeout(() => { removeTyping(); addMessage(responses[text.toLowerCase()] || responses['default'], 'bot'); }, 1200);
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  document.getElementById('quickReplies').style.display = 'none';
  showTyping();
  setTimeout(() => { removeTyping(); addMessage(responses['default'], 'bot'); }, 1200);
}

function handleKey(e) { if (e.key === 'Enter') sendMessage(); }

function addMessage(text, type) {
  const msgs = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'chat-msg ' + type;
  msg.textContent = text;
  msgs.appendChild(msg);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chatMessages');
  const t = document.createElement('div');
  t.className = 'typing'; t.id = 'typing';
  t.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(t);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing');
  if (t) t.remove();
}
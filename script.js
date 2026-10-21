

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// استبدل هذين المتغيرين بـ Token البوت و Chat ID الخاصين بك
const TELEGRAM_BOT_TOKEN = '8492251324:AAHoC2cQRSWo6v4GR-OGS6bQum_1ItUHR9A';
const TELEGRAM_CHAT_ID = '8752484703';

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // نص الرسالة المنظم الذي سيصلك على التليجرام
  const textMessage = `📩 *رسالة جديدة من البورتفوليو:*
👤 *الاسم:* ${name}
📧 *البريد:* ${email}
💬 *الرسالة:*
${message}`;

  submitBtn.disabled = true;
  submitBtn.innerText = 'Sending...';

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: textMessage,
        parse_mode: 'Markdown'
      })
    });

    if (response.ok) {
      formStatus.style.color = '#4ade80'; // أخضر لرسالة النجاح
      formStatus.innerText = '✅ Message sent successfully!';
      contactForm.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    formStatus.style.color = '#f87171'; // أحمر في حالة الخطأ
    formStatus.innerText = '❌ Failed to send message. Please try again.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Send Message';
  }
});

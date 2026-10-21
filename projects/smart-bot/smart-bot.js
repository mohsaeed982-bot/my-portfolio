// 1. بيانات تيليجرام
const TELEGRAM_BOT_TOKEN = "8492251324:AAHoC2cQRSWo6v4GR-OGS6bQum_1ItUHR9A";
const TELEGRAM_CHAT_ID = "8752484703";

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const statusMsg = document.getElementById('statusMessage');
  statusMsg.style.color = '#333';
  statusMsg.innerText = "جاري معالجة الرسالة وإرسالها...";

  // أخذ البيانات المدخلة من النموذج
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // --- تحليل وتصنيف الذكاء الاصطناعي المحلي (سريع وفعال 100%) ---
  let category = "استفسار عام";
  let summary = message.length > 50 ? message.substring(0, 50) + "..." : message;

  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('مشكلة') || lowerMsg.includes('خطأ') || lowerMsg.includes('لا يعمل') || lowerMsg.includes('شكوى')) {
    category = "شكوى / مشكلة عاجلة ⚠️";
  } else if (lowerMsg.includes('سعر') || lowerMsg.includes('تكلفة') || lowerMsg.includes('اشتراك') || lowerMsg.includes('باقات')) {
    category = "استفسار مالي / أسعار 💰";
  } else if (lowerMsg.includes('عمل') || lowerMsg.includes('توظيف') || lowerMsg.includes('تدريب') || lowerMsg.includes('موقع')) {
    category = "طلب عمل / مشروع 🚀";
  }

  // --- صياغة التقرير الذكي لإرساله إلى تيليجرام ---
  const fullText = `🤖 *تقرير رسالة ذكي جديد*:\n\n👤 *الاسم:* ${name}\n📧 *البريد:* ${email}\n\n📝 *الرسالة الأصلية:*\n${message}\n\n💡 *التحليل والتصنيف الذكي:*\n- التصنيف: ${category}\n- التلخيص: ${summary}`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: fullText,
        parse_mode: 'Markdown'
      })
    });

    const telegramData = await telegramResponse.json();

    if (telegramData.ok) {
      statusMsg.style.color = 'green';
      statusMsg.innerText = "تم إرسال التقرير الذكي بنجاح! ✅";
      document.getElementById('contactForm').reset();
    } else {
      throw new Error('فشل إرسال التيليجرام');
    }

  } catch (error) {
    statusMsg.style.color = 'red';
    statusMsg.innerText = "حدث خطأ أثناء الإرسال ❌";
    console.error(error);
  }
});
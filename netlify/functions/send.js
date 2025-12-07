// netlify/functions/send.js
exports.handler = async function (event, context) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const firstName = body.firstName || '';
    const lastName = body.lastName || '';
    const phone = body.phone || '';

    if (!firstName || !lastName || !phone) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'missing_fields' }) };
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || '1931261316';

    if (!token) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'no_token_configured' }) };
    }

    const text = `اطلاعات جدید:\nنام: ${firstName}\nنام خانوادگی: ${lastName}\nشماره: ${phone}`;

    // استفاده از global fetch (در Netlify / Node 18+ موجود است)
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    const result = await res.json();

    if (!result.ok) {
      // بازگرداندن پاسخ تلگرام برای دیباگ (مثلاً chat not found, forbidden, etc)
      return { statusCode: 502, body: JSON.stringify({ ok: false, telegram: result }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, telegram: result }) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: err.message }) };
  }
};

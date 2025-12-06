const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const data = JSON.parse(event.body);
        const { firstName, lastName, phone } = data;

        const token = '8330735969:AAFAG6Gq94M5W4DIY2ZCbEus0i_bUP0H8fM';
        const chat_id = '1931261316'; // آیدی عددی خودت
        const text = `اطلاعات جدید:\nنام: ${firstName}\nنام خانوادگی: ${lastName}\nشماره: ${phone}`;

        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        const res = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id, text })
        });

        const result = await res.json();

        if (!result.ok) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'ارسال به تلگرام موفق نبود' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'ارسال شد' })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'خطای سرور' })
        };
    }
};

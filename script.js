const form = document.getElementById('pianoForm');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!firstName || !lastName || !phone) {
        errorMsg.textContent = 'لطفا تمام فیلدها را پر کنید.';
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, phone })
        });

        if (!response.ok) {
            // نمایش ارور 433
            document.body.innerHTML = `
                <div class="error-page">
                    <h1>433</h1>
                    <p>Check your internet connection</p>
                </div>
            `;
        } else {
            alert('اطلاعات شما با موفقیت ارسال شد!');
            form.reset();
        }
    } catch (err) {
        // نمایش ارور 433
        document.body.innerHTML = `
            <div class="error-page">
                <h1>433</h1>
                <p>Check your internet connection</p>
            </div>
        `;
    }
});


//const BOT_TOKEN = "8330735969:AAFAG6Gq94M5W4DIY2ZCbEus0i_bUP0H8fM";
   // const CHAT_ID = "1931261316"; // آیدی خودت
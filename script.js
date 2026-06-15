const database = {
    xtream: [
        { host: "http://yaspro900.com:80", user: "4c:57:39:2c:2a:2a", pass: "5147258745" },
        { host: "http://hydra.st:80", user: "ammar33", pass: "670990" },
        { host: "http://maveniptv.net:80", user: "nagy4158", pass: "elsafti8596" },
        { host: "http://showplustv.pro:80", user: "ismailaue2307", pass: "30246sm" },
        { host: "http://4kgood.org:8080", user: "4o48up5evz", pass: "r4fiast66u" },
        { host: "http://4kvip.ottc.pro:80", user: "Hassan", pass: "QNICMDZTNB" },
        { host: "http://pl-ott.com:80", user: "2566643396", pass: "8918121989" },
        { host: "http://panel.pro2box.cc:80", user: "456876", pass: "bpMnYZA" }
    ],
    tidal: [
        { email: "automation121@thabma.space", pass: "Oxaam524179#" },
        { email: "automation119@thabma.space", pass: "Oxaam524179#" },
        { email: "automation115@thabma.space", pass: "Oxaam524179#" }
    ],
    crunchy: [
        { email: "tantrum29@gdavo.space", pass: "Oxaam524179#" },
        { email: "tantrum35@gdavo.space", pass: "Oxaam524179#" },
        { email: "karnchieoxaam428@gmail.com", pass: "Oxaam524179#" }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    checkDailyLimits();
});

function revealOneData(appType) {
    const today = new Date().toDateString();
    
    if (localStorage.getItem(`${appType}_claimed_${today}`)) {
        showToast("عذراً! لقد حصلت على حسابك لهذا اليوم بالفعل. عد غداً! 🔒");
        return;
    }

    const dataBox = document.getElementById(`box-${appType}`);
    const sourceList = database[appType];

    if (dataBox && sourceList && sourceList.length > 0) {
        const randomIndex = Math.floor(Math.random() * sourceList.length);
        const selectedItem = sourceList[randomIndex];
        
        let htmlContent = "";

        if (appType === 'xtream') {
            const fullXtreamText = `Host: ${selectedItem.host}\nUser: ${selectedItem.user}\nPass: ${selectedItem.pass}`;
            htmlContent = `
                <div class="account-line" onclick="copyTextToClipboard(\`${fullXtreamText}\`)">
                    <span>Host:</span> ${selectedItem.host}<br>
                    <span>User:</span> ${selectedItem.user}<br>
                    <span>Pass:</span> ${selectedItem.pass}
                </div>
                <p style="font-size:12px; color:#aaa; margin-top:5px;">اضغط على الصندوق لنسخ البيانات كاملة</p>
            `;
        } else {
            const fullAccText = `Email: ${selectedItem.email}\nPass: ${selectedItem.pass}`;
            htmlContent = `
                <div class="account-line" onclick="copyTextToClipboard(\`${fullAccText}\`)">
                    <span>الايميل:</span> ${selectedItem.email}<br>
                    <span>الباسورد:</span> ${selectedItem.pass}
                </div>
                <p style="font-size:12px; color:#aaa; margin-top:5px;">اضغط على الصندوق لنسخ الحساب فوراً</p>
            `;
        }

        dataBox.innerHTML = htmlContent;
        dataBox.style.display = 'block';
        
        localStorage.setItem(`${appType}_claimed_${today}`, "true");
        
        showToast("⚡ تم سحب حسابك اليومي بنجاح! انسخه الآن.");

        setTimeout(() => {
            document.getElementById(`card-${appType}`).classList.add('disabled');
        }, 3000);
    }
}

function checkDailyLimits() {
    const today = new Date().toDateString();
    const apps = ['xtream', 'tidal', 'crunchy'];
    
    apps.forEach(app => {
        if (localStorage.getItem(`${app}_claimed_${today}`)) {
            document.getElementById(`card-${app}`).classList.add('disabled');
        }
    });
}

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("تم نسخ البيانات للحافظة! 📋");
    });
}

function showToast(text) {
    let toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = text;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 2500);
    }
}
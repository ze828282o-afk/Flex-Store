document.addEventListener('DOMContentLoaded', function() {
    // تشغيل فحص الأجهزة المحظورة لهذا اليوم فور فتح الصفحة
    checkDailyLimits();

    // خاصية البحث جوه جدول الـ IPTV
    const iptvSearch = document.getElementById('iptvSearch');
    if (iptvSearch) {
        iptvSearch.addEventListener('keyup', function() {
            let filter = this.value.toLowerCase();
            let rows = document.querySelectorAll('#iptvTable tbody tr');
            rows.forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
            });
        });
    }

    // نسخ الحسابات عند الضغط عليها تلقائياً
    document.querySelectorAll('.account-line').forEach(item => {
        item.addEventListener('click', function() {
            navigator.clipboard.writeText(this.innerText).then(() => {
                showToast("تم نسخ الحساب بنجاح! 📋");
            });
        });
    });
    
    // نسخ بيانات صف الاكستريم عند الضغط عليه
    document.querySelectorAll('#iptvTable tbody tr').forEach(row => {
        row.addEventListener('click', function() {
            let host = this.cells[0].innerText;
            let user = this.cells[1].innerText;
            let pass = this.cells[2].innerText;
            let fullData = `Host: ${host}\nUser: ${user}\nPass: ${pass}`;
            navigator.clipboard.writeText(fullData).then(() => {
                showToast("تم نسخ بيانات الاكستريم! 🌍");
            });
        });
    });
});

// دالة إظهار البيانات عند الضغط على اللوجو مع تفعيل الحظر اليومي للجهاز
function revealData(appType) {
    const today = new Date().toDateString();
    
    // الفحص لو الجهاز أخد التفعيل ده النهاردة بالفعل
    if (localStorage.getItem(`${appType}_claimed_${today}`)) {
        showToast("عذراً! لقد حصلت على تفعيل هذا التطبيق اليوم بالفعل. عد غداً! 🔒");
        return;
    }

    // إظهار صندوق البيانات الخاص بالتطبيق
    const dataBox = document.getElementById(`box-${appType}`);
    if (dataBox) {
        dataBox.style.display = 'block';
        
        // حفظ عملية التفعيل في جهاز المستخدم لتاريخ اليوم
        localStorage.setItem(`${appType}_claimed_${today}`, "true");
        
        showToast("تم فتح التفعيل! اضغط على البيانات لنسخها فوراً ⚡");
        
        // قفل الكارت بعد 3 ثواني عشان ميعرفش يشوفه تاني لو عمل ريفريش
        setTimeout(() => {
            document.getElementById(`card-${appType}`).classList.add('disabled');
        }, 3000);
    }
}

// دالة فحص القيود اليومية وقفل الكروت المستعملة
function checkDailyLimits() {
    const today = new Date().toDateString();
    const apps = ['xtream', 'tidal', 'crunchy'];
    
    apps.forEach(app => {
        if (localStorage.getItem(`${app}_claimed_${today}`)) {
            document.getElementById(`card-${app}`).classList.add('disabled');
        }
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
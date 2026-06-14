document.addEventListener('DOMContentLoaded', function() {
    
    // 1. خاصية البحث السريع والذكي في جدول سيرفرات الـ IPTV
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            let filter = this.value.toLowerCase();
            let rows = document.querySelectorAll('#iptvTable tbody tr');
            
            rows.forEach(row => {
                let text = row.textContent.toLowerCase();
                row.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    }

    // 2. خاصية نسخ بيانات السيرفر كاملة كـ Text عند الضغط على زرار "نسخ"
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            let row = this.parentElement.parentElement;
            let host = row.cells[0].innerText;
            let user = row.cells[1].innerText;
            let pass = row.cells[2].innerText;
            
            // ترتيب النص المنسوخ
            let fullText = `Host: ${host}\nUser: ${user}\nPass: ${pass}`;
            
            navigator.clipboard.writeText(fullText).then(() => {
                showToast();
            });
        });
    });

    // 3. دالة التحكم في إظهار إشعار تم النسخ (Toast Notification)
    function showToast() {
        let toast = document.getElementById('toast');
        if (toast) {
            toast.style.display = 'block';
            setTimeout(() => { 
                toast.style.display = 'none'; 
            }, 2000);
        }
    }
});
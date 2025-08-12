(function() {
    // Đo thời gian tải trang
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log('Page load time (ms):', loadTime);

    // Lấy thông tin mạng nếu trình duyệt hỗ trợ
    if (navigator.connection) {
        console.log('Network info:', {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt
        });
    } else {
        console.log('Network Information API không được hỗ trợ trên trình duyệt này.');
    }
})();
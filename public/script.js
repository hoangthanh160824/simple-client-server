document.addEventListener('DOMContentLoaded', function() {
    const fetchInfoBtn = document.getElementById('fetchInfo');
    const sendMessageBtn = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    const serverDataDiv = document.getElementById('serverData');
    const echoResponseDiv = document.getElementById('echoResponse');

    function makeAjaxRequest(url, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const finalOptions = { ...defaultOptions, ...options };

        return fetch(url, finalOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            });
    }

    function displayData(element, data, isError = false) {
        element.className = `data-display ${isError ? 'error' : 'success'}`;
        element.textContent = JSON.stringify(data, null, 2);
    }

    function setLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            button.textContent = 'Loading...';
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    fetchInfoBtn.addEventListener('click', function() {
        const originalText = this.textContent;
        setLoading(this, true);

        makeAjaxRequest('/api/server-info')
            .then(data => {
                displayData(serverDataDiv, data);
                console.log('Server info received:', data);
            })
            .catch(error => {
                displayData(serverDataDiv, { error: error.message }, true);
                console.error('Error fetching server info:', error);
            })
            .finally(() => {
                setLoading(this, false);
                this.textContent = originalText;
            });
    });


    sendMessageBtn.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (!message) {
            alert('Please enter a message');
            return;
        }

        const originalText = this.textContent;
        setLoading(this, true);

        const payload = {
            message: message,
            timestamp: new Date().toISOString(),
            clientInfo: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform
            }
        };

        makeAjaxRequest('/api/echo', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then(data => {
            displayData(echoResponseDiv, data);
            console.log('Echo response received:', data);
            messageInput.value = '';
        })
        .catch(error => {
            displayData(echoResponseDiv, { error: error.message }, true);
            console.error('Error sending message:', error);
        })
        .finally(() => {
            setLoading(this, false);
            this.textContent = originalText;
        });
    });

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessageBtn.click();
        }
    });

    console.log('Client-side JavaScript loaded successfully');
    console.log('Page loaded at:', new Date().toISOString());
});
const http = require('http');
const https = require('https');
const url = require('url');

class HTTPClient {
    constructor() {
        this.defaultHeaders = {
            'User-Agent': 'Lab01-HTTP-Client/1.0',
            'Accept': 'application/json, text/plain, */*'
        };
    }

    request(requestUrl, options = {}) {
        return new Promise((resolve, reject) => {
            const parsedUrl = url.parse(requestUrl);
            const isHTTPS = parsedUrl.protocol === 'https:';
            const client = isHTTPS ? https : http;
            
            const requestOptions = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (isHTTPS ? 443 : 80),
                path: parsedUrl.path,
                method: options.method || 'GET',
                headers: { ...this.defaultHeaders, ...options.headers }
            };

            if (options.data) {
                const postData = JSON.stringify(options.data);
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.headers['Content-Length'] = Buffer.byteLength(postData);
            }

            console.log(`Making ${requestOptions.method} request to: ${requestUrl}`);
            console.log('Request headers:', requestOptions.headers);

            const req = client.request(requestOptions, (res) => {
                let data = '';

                console.log(`Response status: ${res.statusCode}`);
                console.log('Response headers:', res.headers);

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const result = {
                            statusCode: res.statusCode,
                            headers: res.headers,
                            data: data
                        };

                        if (res.headers['content-type']?.includes('application/json')) {
                            result.json = JSON.parse(data);
                        }

                        resolve(result);
                    } catch (error) {
                        reject(new Error(`Failed to parse response: ${error.message}`));
                    }
                });
            });

            req.on('error', (error) => {
                reject(new Error(`Request failed: ${error.message}`));
            });

            req.on('timeout', () => {
                reject(new Error('Request timeout'));
            });

            req.setTimeout(10000);

            if (options.data) {
                req.write(JSON.stringify(options.data));
            }

            req.end();
        });
    }

    get(url, headers = {}) {
        return this.request(url, { method: 'GET', headers });
    }

    post(url, data, headers = {}) {
        return this.request(url, { method: 'POST', data, headers });
    }
}

async function runTests() {
    const client = new HTTPClient();
    
    console.log('='.repeat(60));
    console.log('HTTP CLIENT TESTS');
    console.log('='.repeat(60));

    const tests = [
        {
            name: 'Test 1: GET request to local server',
            test: async () => {
                const response = await client.get('http://localhost:3000/api/server-info');
                console.log('Server info response:', response.json);
                return response.statusCode === 200;
            }
        },
        {
            name: 'Test 2: GET request to external API (GitHub)',
            test: async () => {
                const response = await client.get('https://api.github.com/users/octocat');
                console.log('GitHub user info:', response.json);
                return response.statusCode === 200;
            }
        },
        {
            name: 'Test 3: POST request to JSONPlaceholder',
            test: async () => {
                const postData = {
                    title: 'Lab 01 Test Post',
                    body: 'This is a test post from HTTP client',
                    userId: 1
                };
                const response = await client.post('https://jsonplaceholder.typicode.com/posts', postData);
                console.log('JSONPlaceholder response:', response.json);
                return response.statusCode === 201;
            }
        },
        {
            name: 'Test 4: POST request to local server echo endpoint',
            test: async () => {
                const postData = {
                    message: 'Hello from HTTP client!',
                    timestamp: new Date().toISOString()
                };
                const response = await client.post('http://localhost:3000/api/echo', postData);
                console.log('Local echo response:', response.json);
                return response.statusCode === 200;
            }
        },
        {
            name: 'Test 5: Error handling - Non-existent server',
            test: async () => {
                try {
                    await client.get('http://localhost:9999/nonexistent');
                    return false;
                } catch (error) {
                    console.log('Expected error caught:', error.message);
                    return true;
                }
            }
        }
    ];

    let passedTests = 0;
    const totalTests = tests.length;

    for (const testCase of tests) {
        console.log(`\n${testCase.name}`);
        console.log('-'.repeat(40));
        
        try {
            const result = await testCase.test();
            if (result) {
                console.log('✅ PASSED');
                passedTests++;
            } else {
                console.log('❌ FAILED');
            }
        } catch (error) {
            console.log('❌ ERROR:', error.message);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`TEST RESULTS: ${passedTests}/${totalTests} tests passed`);
    console.log('='.repeat(60));
}

if (require.main === module) {
    console.log('Starting HTTP Client tests...');
    console.log('Make sure the server is running on http://localhost:3000\n');
    
    runTests().catch(error => {
        console.error('Test execution failed:', error);
        process.exit(1);
    });
}

module.exports = HTTPClient;
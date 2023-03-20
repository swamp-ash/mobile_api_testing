const { test, request, expect } = require('@playwright/test');
require('dotenv').config();


test('get token', async ({ request }) => {
    const { URL, LOGIN, PASSWORD } = process.env;
    const resp = await request.post(`${URL}/token`, {
        data: {
            "login": `${LOGIN}`,
            "password": `${PASSWORD}`
        }
    });
    expect(resp.status()).toBe(200);
    expect(resp.ok()).toBeTruthy();
});

test('refresh token', async ({ request }) => {
    const { URL, LOGIN, PASSWORD } = process.env;
    const resp = await request.post(`${URL}/token`, {
        data: {
            "login": `${LOGIN}`,
            "password": `${PASSWORD}`
        }
    });
    expect(resp.status()).toBe(200);
    expect(resp.ok()).toBeTruthy();

    const json = await resp.json();
    const refreshToken = await json.refreshToken;

    const fresh = await request.post(`${URL}/token/refresh`, {
        data: {
            "refreshToken": `${refreshToken}`
        }
    });
    expect(fresh.status()).toBe(200);
    expect(fresh.ok()).toBeTruthy();
});
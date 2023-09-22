require('dotenv').config();
const axios = require("axios");
const BASE_URL = process.env.BASE_URL || "https://api.planethoster.net";
const API_USER = process.env.API_USER;
const API_KEY = process.env.API_KEY;
const API_SANDBOX = process.env.API_SANDBOX || 0;

module.exports = {
    getWorldAccount: () => axios({
        method:"GET",
        url : BASE_URL + `/world-api/get-accounts/`,
        headers: {
            "X-API-USER": API_USER,
            "X-API-KEY": API_KEY,
            "X-API-SANDBOX": API_SANDBOX
        }
    }),
    createWorldAccount: (domain, country) => axios({
        method:"POST",
        url : BASE_URL + `/world-api/create-account`,
        headers: {
            "Content-Type": "application/json",
            "X-API-USER": API_USER,
            "X-API-KEY": API_KEY,
            "X-API-SANDBOX": API_SANDBOX
        },
        data: JSON.stringify({
            domain: domain,
            country: country
        })
    }),
    modifyWorldAccount: (id, cpu, mem, io) => axios({
        method:"POST",
        url : BASE_URL + `/world-api/modify-resources`,
        headers: {
            "Content-Type": "application/json",
            "X-API-USER": API_USER,
            "X-API-KEY": API_KEY,
            "X-API-SANDBOX": API_SANDBOX
        },
        data: JSON.stringify({
            id: id,
            cpu: cpu,
            mem: mem,
            io: io,
        })
    }),
    getAvailablePhpVersions: (id) => axios({
        method:"GET",
        url : BASE_URL + `/n0c-api/php-version`,
        headers: {
            "Content-Type": "application/json",
            "X-API-USER": API_USER,
            "X-API-KEY": API_KEY,
            "X-API-SANDBOX": API_SANDBOX
        },
        data: JSON.stringify({
            id: id
        })
    }),
    getWordpress: (id) => axios({
        method:"GET",
        url : BASE_URL + `/n0c-api/wordpress`,
        headers: {
            "Content-Type": "application/json",
            "X-API-USER": API_USER,
            "X-API-KEY": API_KEY,
            "X-API-SANDBOX": API_SANDBOX
        },
        data: JSON.stringify({
            id: id
        })
    }),
    createWordpress: (id, adminUser, adminPassword, adminEmail, domain, path, title, locale) => axios({
        method:"POST",
        url : BASE_URL + `/n0c-api/wordpress/add`,
        headers: {
            "Content-Type": "application/json",
            "X-API-USER": API_USER,
            "X-API-KEY": API_KEY,
            "X-API-SANDBOX": API_SANDBOX
        },
        data: JSON.stringify({
            id: id,
            adminUser: adminUser,
            adminPassword: adminPassword,
            adminEmail: adminEmail,
            domain: domain,
            path: path,
            title: title,
            locale: locale,
            
        })
    })
}
const PlanetHosterAPI = require('./planethoster.js');
const crypto = require("crypto");

const DOMAIN = process.env.DOMAIN;


// Getting World Account List
async function getAccounts() {
    const response = await PlanetHosterAPI.getWorldAccount();
    //console.log(response.data.world_accounts);
    return response.data.world_accounts
}

// Creating World Account with domain and country specified
async function createWorld(domain, country) {
    const response = await PlanetHosterAPI.createWorldAccount(domain, country);
    console.log("Creating account...")
    console.log(response.data);
    if (response.data.account_created){
        console.log("Account created with ID: " + response.data.id);
        return response.data.id
    }
}

// Modify World Account ressources
async function modifyWorld(id, cpu, mem, io) {
    const response = await PlanetHosterAPI.modifyWorldAccount(id, cpu, mem, io);
    if (response.data.cpu_updated){
        console.log("CPU Updated");
    } 
    if (response.data.mem_updated) {
        console.log("Memory Updated");
    }
    if (response.data.io_updated) {
        console.log("I/O Updated");
    }
}

// install Wordpress
async function installWP(id, domain) {
    const adminUser = crypto.randomBytes(8).toString("base64").slice(0, 8);
    const adminPassword = crypto.randomBytes(20).toString("base64").slice(0, 20);
    const adminEmail = "wordpress@" + domain
    const path = "/"
    const title = "PlanetHosterAPI is Amazing"
    const locale = "fr_FR"

    console.log("Installing Wordpress...")
    const response = await PlanetHosterAPI.createWordpress(id, adminUser, adminPassword, adminEmail, domain, path, title, locale)
    console.log(response.data)
}

async function main(domain) {
    const accountList = await getAccounts()
    console.log(accountList)
    const account = accountList.find(account => account.domain === domain)
    if (account) {
        console.log("Account " + domain + " exist")

        // This endpoint doesn't exist yet
        // console.log(await PlanetHosterAPI.getAvailablePhpVersions(account.id))

        const wpList = await PlanetHosterAPI.getWordpress(account.id)
        if (wpList.data.data.length > 0){
            console.log("Listing Wordpress Installs")
            console.log(wpList.data)
        } else {
            installWP(account.id, domain)
        }
    } else {
        console.log("Account " + domain + " not found")
        const worldId = await createWorld(domain, 'CA')
        modifyWorld(worldId, 2, 2, 2)
    }
  }

  main(DOMAIN);
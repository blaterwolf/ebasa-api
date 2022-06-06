/**
* ================================================================
* * DATABASE CONFIGURATIONS
* ================================================================
*/

const successMessage = () => { return `
=========================================================================
SUCCESSFULLY CONNECTED TO THE DATABASE!
-------------------------------------------------------------------------
It's in development phase, I'm working on it. (pagod na aq talaga bhie)
=========================================================================
`
}

const failedMessage = (err) => { return `
=========================================================================
FAILED TO CONNECT TO THE DATABASE!
-------------------------------------------------------------------------
${ err }
=========================================================================
Have you already done the following?
- Open XAMPP and start MySQL. Port should be in 3307 (in my case lol)
- Check connectin in Datagrip.
- Have you created the database? You can check it on the XAMPP/Datagrip.
- Mali yung database name sa may ./src/config/config.js?
If you can't solve this, please contact the developer who is probably crying screaming shaking rn.
`
}

const syncSuccessMessage = (PORT, MAIN_API_ROUTE, env_value) => { return `
=========================================================================
Execution is successful!
-------------------------------------------------------------------------
Base URL: http://localhost:${ PORT }${MAIN_API_ROUTE}
${env_value === "false" ? "Please change the value of SEQUELIZE_ALTER_SYNC to true in the ./src/config/config.js file." : "Models have been synced to the database!"}
=========================================================================
`
}

const syncFailedMessage = (err) => { return err
}

module.exports = {
    successMessage,
    failedMessage,
    syncSuccessMessage,
    syncFailedMessage
}
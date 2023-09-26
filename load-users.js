(() => {
    const YAMCS_URL = "http://localhost:8090";
    const USERS_COUNT = process.argv[2] || 40;
    const CREDENTIALS = "user:password";

    addAllUsers(USERS_COUNT);

    async function addAllUsers(count) {
        console.log(`Adding ${USERS_COUNT} users`);
        let randomNumber;
        let user;

        for (let i = 0; i < count; i++) {
            randomNumber = Math.floor(Math.random() * 10000000);
            user = {
                name: `user-${randomNumber}`,
                password: `password`,
                displayName: `User ${randomNumber}`
            };
            await addUser(user);
            await addRoleToUser(user, 'Administrator');
        }
    }
    
    async function addUser(user) {
        const response = await fetch(`${YAMCS_URL}/api/users`, {
            headers: {
                "Authorization": `Basic ${btoa(CREDENTIALS)}`,
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            method: 'POST',
            body: JSON.stringify(user)
        });

       return response.status;
    }

    async function addRoleToUser(user, role) {
        const userWithRole = {
            ...user,
            superuser: false,
            roleAssignment: {
                roles: [role],
            }
        };
        const response = await fetch(`${YAMCS_URL}/api/users/${user.name}`, {
            headers: {
                "Authorization": `Basic ${btoa(CREDENTIALS)}`,
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            method: "PATCH",
            body: JSON.stringify(userWithRole)
        });

        return response.status;
    }
})();
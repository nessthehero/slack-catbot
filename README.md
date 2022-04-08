# Slack Catbot

Run as a node service. For example, using systemctl:

/etc/systemd/system/catbot.service
```
[Unit]
Description=Catbot
After=network.target

[Service]
Environment=NODE_PORT=3001
User=root
Restart=always
RestartSec=1000ms
StandardOutput=/var/log/catbotlog.log
StandardError=/var/log/catboterr.log
ExecStart=/usr/local/bin/node /usr/local/bin/slack-catbot/index.js
RuntimeMaxSec=14400s

[Install]
WantedBy=multi-user.target
```

This will allow him to start on boot.
`systemctl enable catbot.service`

Start or stop
`systemctl start/stop catbot`

Create a bot.json file off the example.

Refer to rooms and people by their IDs, not canonical names. You can find Room IDs by expanding the channel info of a room. The ID is usually at the bottom. A member ID is in a user's profile, under the "More" menu.

Create a slack bot and populate the config with the access token and name of the bot.

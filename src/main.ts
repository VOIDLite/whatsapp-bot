import { Browsers } from '@adiwajshing/baileys';
import Client from './libs/whatsapp.libs';
import MessageHandler from './handlers/message.handler';
import { sessionName } from './settings/settings.json';

const aruga = new Client({
  browser: Browsers.appropriate('Desktop'),
  generateHighQualityLinkPreview: true,
  sessionName,
  syncFullHistory: true,
});

const start = () => {
  const messageHandler = new MessageHandler(aruga);

  aruga.ev.on('messages.upsert', async (m) => {
    await messageHandler.serialize(m.messages[0]);
  });

  aruga.ev.on('call', (c) => console.log(c));
};

aruga
  .startClient()
  .then(() => start())
  .catch(() =>
    aruga.DB.$disconnect()
      .then(() => process.exit(0))
      .catch(() => process.exit(1)),
  );

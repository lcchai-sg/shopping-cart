const mongoose = require('mongoose');
const config = require('../config/config');
const Product = require('../models/product');

mongoose.connect(config.dbconn, { useNewUrlParser: true })
.then(res => console.log('Connected to DB...'))
.catch(err => console.log('DB Connection Error: ', err));

var products = [
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
    title: 'Gothic',
    description: 'Gothic is a single-player action role-playing video game for Microsoft Windows developed by the German company Piranha Bytes.',
    price: 299
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Doom_Cover.jpg/220px-Doom_Cover.jpg',
    title: 'Doom',
    description: 'Doom is a first-person shooter video game developed by id Software and published by Bethesda Softworks. It was released worldwide on Microsoft Windows, PlayStation 4 and Xbox One in May 2016, and is powered by id Tech 6.',
    price: 399
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Command_%26_Conquer_1995_cover.jpg/220px-Command_%26_Conquer_1995_cover.jpg',
    title: 'Command & Conquer',
    description: 'Command & Conquer is a 1995 real-time strategy video game developed by Westwood Studios and published by Virgin Interactive. Set in an alternate history of modern day, the game tells the story of a world war between two globalized factions: the Global Defense Initiative of the United Nations and a cult-like militant organization called the Brotherhood of Nod, led by the mysterious Kane. The groups compete for control of Tiberium, a mysterious substance that slowly spreads across the world.',
    price: 399
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Cncts-win-cover.jpg/220px-Cncts-win-cover.jpg',
    title: 'Command & Conquer: Tiberian Sun',
    description: 'Command & Conquer: Tiberian Sun is a real-time strategy video game developed by Westwood Studios and released in 1999. The main storyline follows the second major war between the Global Defense Initiative (GDI) of the United Nations, and the global terrorist organization known as the Brotherhood of Nod. The story takes place 30 years after the GDI had won the First Tiberium War in Command & Conquer.',
    price: 299
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Cncra2-win-cover.jpg/220px-Cncra2-win-cover.jpg',
    title: 'Command & Conquer: Red Alert 2',
    description: 'Command and Conquer: Red Alert 2 contains two playable factions, the Soviets and the Allies, which both previously appeared in Command & Conquer: Red Alert. The single player campaign is structured in an alternate-ending mode as opposed to a progressive story mode. Like its predecessor, Red Alert 2 features a large amount of full motion video cutscenes between missions and during gameplay, with an ensemble cast including Ray Wise, Udo Kier, Kari Wuhrer, and Barry Corbin.',
    price: 299
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Cncgen-win-cover.jpg/220px-Cncgen-win-cover.jpg',
    title: 'Command & Conquer: Generals',
    description: 'Command & Conquer: Generals is a real-time strategy video game and the seventh installment in the Command & Conquer series.[1] It was released for Microsoft Windows and Mac OS operating systems in 2003 and 2004. While the Windows version of Generals was developed by EA Pacific and published by EA Games, the Mac OS X version was developed and published by Aspyr Media. The Mac OS X version was re-released by Aspyr for the Mac App Store on March 12, 2015. In the game, the player can choose from three different factions: the United States, China and the Global Liberation Army (GLA).',
    price: 399
  })
];

let cnt = 0;
products.forEach(cur => 
  cur.save()
  .then(res => {
    console.log(`Saved: ${res.title}`);
    cnt++;
    if (cnt === products.length) {
      proceedExit();
    }
  })
  .catch(err => console.log(`${cur.title} saved error: `, err)));

function proceedExit() {
  mongoose.disconnect();
}
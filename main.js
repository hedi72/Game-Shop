
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,  // Largeur dynamique
  height: window.innerHeight,  // Hauteur dynamique
  backgroundColor: '#a893a2',
  scene: {
    preload: preload,
    create: create,
    update: update, // Ajouter la fonction update
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centrer le jeu
  },
};

const game = new Phaser.Game(config);

let scrollSpeed = 0; // Vitesse de défilement
let maxScroll = 0; // Limite maximale de défilement
let container; // Conteneur global

function preload() {
  this.load.baseURL = '/';  // Make sure the base URL is correct
    this.load.font('chubby', 'assets/font/chubby-choo-regular.ttf');
  // Charger les assets (remplacez par vos propres chemins)
  this.load.bitmapFont('chubby',  'assets/font/chubby-choo-regular.fnt');
  this.load.image('shopBg', 'assets/images/SHOP_BG_WITHTITLE.png'); // Fond du shop
  this.load.image('item1', 'assets/images/shop-bg.png');    // Image de l'item
  this.load.image('item2', 'assets/images/2.png');    // Image de l'item
  this.load.image('item3', 'assets/images/3.png');    // Image de l'item
  this.load.image('button', 'assets/images/Close.png'); // Bouton
  this.load.image('gas', 'assets/images/GAS_shop.png'); // Image gaz
  this.load.image('box1', 'assets/images/Itemsbox1_shop.png'); // Image gaz
  this.load.image('box2', 'assets/images/Itemsbox2_shop.png'); // Image gaz
  this.load.image('button2', 'assets/images/Buy_Button02.png'); // Image gaz
}

function create() {
  // Fond du shop
  this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'shopBg').setScale(0.5);

  // Conteneur principal
  container = this.add.container(0, 0);

  // Données des items
  const items = [
    { name: 'Level 1', price: 100, image: 'item1', background: 'box1' },
    { name: 'Level 2', price: 250, image: 'item2', background: 'box2' },
    { name: 'Level 3', price: 400, image: 'item3', background: 'box1' },
    { name: 'Level 4', price: 550, image: 'item2', background: 'box2' },
    { name: 'Level 5', price: 700, image: 'item1', background: 'box1' },
    { name: 'Level 6', price: 850, image: 'item3', background: 'box2' },
    { name: 'Level 7', price: 1000, image: 'item2', background: 'box1' },
    { name: 'Level 8', price: 1200, image: 'item1', background: 'box2' },
    { name: 'Level 9', price: 1400, image: 'item3', background: 'box1' },
    { name: 'Level 10', price: 1600, image: 'item2', background: 'box2' },
  ];

  // Position de départ pour les items
  let startY = 300;
  const closeBtn = this.add.image(window.innerWidth / 2 + 150, 150, 'button').setScale(0.5).setInteractive();

  closeBtn.on('pointerover', () => {
    closeBtn.setScale(0.55); // Augmenter la taille
    closeBtn.setTint(0xffff00); // Appliquer une couleur jaune
    this.input.setDefaultCursor('pointer'); // Changer le curseur
  });

  closeBtn.on('pointerout', () => {
    closeBtn.setScale(0.5); // Rétablir la taille d'origine
    closeBtn.clearTint(); // Supprimer la couleur
    this.input.setDefaultCursor('default'); // Rétablir le curseur par défaut
  });
  this.add.image(window.innerWidth / 2 + 0, 220, 'gas').setScale(0.5).setInteractive();

  items.forEach((item, index) => {
    // Créer un groupe pour l'item
    const itemGroup = this.add.container(window.innerWidth / 2, startY + index * 82);

    // Ajouter le fond spécifique de l'item
    const background = this.add.image(0, 0, item.background).setScale(0.5).setInteractive();
    itemGroup.add(background);
    // Gérer le hover sur le fond
    background.on('pointerover', () => {
      background.setScale(0.55); // Augmenter la taille
      background.setTint(0xffff00); // Appliquer une couleur jaune
      this.input.setDefaultCursor('pointer'); // Changer le curseur
    });

    background.on('pointerout', () => {
      background.setScale(0.5); // Rétablir la taille d'origine
      background.clearTint(); // Supprimer la couleur
      this.input.setDefaultCursor('default'); // Rétablir le curseur par défaut
    });
    background.on('pointerdown', () => {
      alert(`Item ${item.name} is purchased!`);
    });

    // Image de l'item
    const itemImage = this.add.image(-90, -16, item.image).setScale(0.5);
    itemGroup.add(itemImage);

    // Texte du nom
    const itemName = this.add.text(-50, -25, item.name, { font: '20px Chubby', fill: '#a893a2' });
    itemGroup.add(itemName);

    // Bouton d'achat
    const buyButton = this.add.image(80, -15, 'button2').setScale(0.5).setInteractive();
    buyButton.on('pointerover', () => {
      buyButton.setScale(0.55); // Augmenter la taille
      buyButton.setTint(0xF0C300); // Appliquer une couleur jaune
      this.input.setDefaultCursor('pointer'); // Changer le curseur
    });

    buyButton.on('pointerout', () => {
      buyButton.setScale(0.5); // Rétablir la taille d'origine
      buyButton.clearTint(); // Supprimer la couleur
      this.input.setDefaultCursor('default'); // Rétablir le curseur par défaut
    });
    buyButton.on('pointerdown', () => {
      alert(`Item ${item.name} is purchased!`);
    });
    itemGroup.add(buyButton);

    const buyButtonText = this.add.text(70, -15, item.price, { font: '14px Arial', fill: '#fff' });
    buyButtonText.setOrigin(0.5, 0.5);
    itemGroup.add(buyButtonText);

    container.add(itemGroup);
  });

  // Définir la zone visible (masque)
  const maskShape = this.add.rectangle(
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerWidth,
    300,
    0x000000,
    0
  );
  const mask = maskShape.createGeometryMask();
  container.setMask(mask);

  // Limite de défilement
  maxScroll = startY + items.length * 40 - 100;

  // Écouteurs pour le défilement
  this.input.on('wheel', (pointer, deltaX, deltaY) => {
    scrollSpeed += deltaY * 0.1;
  });

  this.input.keyboard.on('keydown-UP', () => (scrollSpeed = -5));
  this.input.keyboard.on('keydown-DOWN', () => (scrollSpeed = 5));
  this.input.keyboard.on('keyup-UP', () => (scrollSpeed = 0));
  this.input.keyboard.on('keyup-DOWN', () => (scrollSpeed = 0));
}

function update() {
  // Appliquer la vitesse de défilement
  container.y -= scrollSpeed;

  // Limiter le défilement
  if (container.y > 0) container.y = 0;
  if (container.y < -maxScroll) container.y = -maxScroll;

  // Décélération progressive
  scrollSpeed *= 0.9;
}

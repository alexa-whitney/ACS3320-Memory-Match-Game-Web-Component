class MemoryMatchGame extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._images = [
      'Images/cow.jpg', 'Images/cow.jpg',
      'Images/elephant.jpg', 'Images/elephant.jpg',
      'Images/flamingo.jpg', 'Images/flamingo.jpg',
      'Images/giraffe.jpg', 'Images/giraffe.jpg',
      'Images/iguana.jpg', 'Images/iguana.jpg',
      'Images/panda.jpg', 'Images/panda.jpg',
      'Images/polar-bear.jpg', 'Images/polar-bear.jpg',
      'Images/tiger.jpg', 'Images/tiger.jpg',
      'Images/toucan.jpg', 'Images/toucan.jpg',
      'Images/turtle.jpg', 'Images/turtle.jpg',
    ];
    this._flippedCards = [];
    this._matchedCards = [];
  }

  connectedCallback() { // Called when element is added to the DOM
    this._shadowRoot.innerHTML = `
      <style>
      .game-board {
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* Explicitly setting 5 columns */
        grid-auto-rows: minmax(100px, auto); /* Adjust row height automatically */
        gap: 10px;
        max-width: 600px; 
        margin: auto;
    }

    .card {
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        aspect-ratio: 1 / 1; /* Making cards square, adjust ratio as needed */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card img {
        max-height: 100%; 
        max-width: 100%; 
    }
      </style>
      <div class="game-board">
        ${this._renderCards()}
      </div>
    `;

    this._addCardEventListeners();
  }

  // Render cards
  _renderCards() { 
    this._shuffle(this._images); // Shuffle images
    // Map over images and create card elements
    return this._images.map(image => ` 
      <div class="card" data-image="${image}">
        <img src="${image}" class="card-image" style="visibility: hidden;">
      </div>
    `).join('');
  }

  // Shuffle array in place
  _shuffle(array) { 
    for (let i = array.length - 1; i > 0; i--) { // Fisher-Yates shuffle algorithm
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements array[i] and array[j]
    }
  }

  // Add event listeners to each card
  _addCardEventListeners() {
    this._shadowRoot.querySelectorAll('.card').forEach(card => { // Select all cards
      card.addEventListener('click', (e) => this._flipCard(e.currentTarget)); // Add event listener to each card
    });
  }

  // Flip card
  _flipCard(card) {
    if (this._flippedCards.length < 2 && !card.classList.contains('flipped')) { // Check if card is already flipped
      card.classList.add('flipped'); // Add flipped class
      card.querySelector('.card-image').style.visibility = 'visible'; // Show image

      this._flippedCards.push(card); // Add card to flipped cards array

      if (this._flippedCards.length === 2) { // Check if two cards are flipped
        this._checkForMatch(); // Check if cards match
      }
    }
  }

  // Check if cards match
  _checkForMatch() {
    const [card1, card2] = this._flippedCards; // Destructure flipped cards array

    if (card1.dataset.image === card2.dataset.image) { // Check if images match
      this._matchedCards.push(card1, card2); // Add cards to matched cards array
      this._flippedCards = []; // Reset flipped cards array
      // Check if game is won
      if (this._matchedCards.length === this._images.length) { // Check if all cards are matched
        console.log('Game won!'); // Log game won message
      }
    } else { // If cards don't match
      setTimeout(() => { // Flip cards back after 1 second
        this._flippedCards.forEach(card => { // Loop over flipped cards
          card.classList.remove('flipped'); // Remove flipped class
          card.querySelector('.card-image').style.visibility = 'hidden'; // Hide image
        });
        this._flippedCards = []; // Reset flipped cards array
      }, 1000); // 1 second timeout
    }
  }
}

customElements.define('memory-match-game', MemoryMatchGame);
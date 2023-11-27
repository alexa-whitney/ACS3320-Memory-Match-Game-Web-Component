class MemoryMatchGame extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }
}

customElements.define('memory-match-game', MemoryMatchGame);
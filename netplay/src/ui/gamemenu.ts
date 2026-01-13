import { html, render } from "lit-html";
import { FirebaseMatchmaker, FirebasePeerConnection } from "../matchmaking/firebase-client";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
import strings from "../strings.json";

export class GameMenu {
  root: HTMLDivElement;
  matchmaker: FirebaseMatchmaker;

  // Events
  onClientStart: TypedEvent<FirebasePeerConnection> = new TypedEvent();
  onHostStart: TypedEvent<FirebasePeerConnection> = new TypedEvent();
  onAIStart: TypedEvent<void> = new TypedEvent(); // <--- NEW

  state: {
    view: "home" | "hosting" | "joining" | "matchmaking" | "error";
    roomId?: string;
    errorMsg?: string;
  } = { view: "home" };

  constructor() {
    this.root = document.createElement("div");
    this.root.className = "game-menu-overlay";
    document.body.appendChild(this.root);

    this.matchmaker = new FirebaseMatchmaker();

    this.matchmaker.onMatchFound.on((data) => {
      this.root.style.display = "none";
      if (data.isHost) {
        this.onHostStart.emit(data.connection);
      } else {
        this.onClientStart.emit(data.connection);
      }
    });

    this.render();
  }

  async createPrivate() {
    this.state = { view: "hosting" };
    this.render();
    try {
      const id = await this.matchmaker.createPrivateRoom();
      this.state.roomId = id;
      this.render();
    } catch (e) {
      this.state = { view: "error", errorMsg: strings.menu.err_create_failed };
      this.render();
    }
  }

  async joinPrivate(idInput: string) {
    const id = idInput.trim();
    if (id.length !== 6) {
      this.state = { view: "error", errorMsg: strings.menu.err_invalid_code };
      this.render();
      return;
    }

    this.state = { view: "joining" };
    this.render();
    
    try {
      await this.matchmaker.joinPrivateRoom(id);
    } catch (e: any) {
      console.error(e);
      let greekError = strings.menu.err_connection_failed;
      if (e.message && e.message.includes("Room does not exist")) greekError = strings.menu.err_room_not_found;
      if (e.message && e.message.includes("Room is full")) greekError = strings.menu.err_room_full;
      
      this.state = { view: "error", errorMsg: greekError };
      this.render();
    }
  }

  startPublic() {
    this.state = { view: "matchmaking" };
    this.render();
    this.matchmaker.startPublicMatchmaking();
  }
  
  // Trigger AI start
  startAI() {
      this.root.style.display = "none";
      this.onAIStart.emit();
  }

  reset() {
      this.matchmaker.stopPublicMatchmaking();
      this.state = { view: "home" };
      this.render();
  }

  render() {
    const content = () => {
      switch (this.state.view) {
        case "home":
          return html`
            <div class="menu-card">
              <img src="assets/poliorkia.png" class="menu-logo" alt="Poliorkia" />
              
              <button class="btn btn-primary" @click=${() => this.startPublic()}>
                ${strings.menu.btn_find_match}
              </button>
              
              <!-- AI BUTTON -->
              <button class="btn btn-secondary" style="background-color: #a55eea; --btn-shadow-color: #8854d0; box-shadow: 0 6px 0 var(--btn-shadow-color);" @click=${() => this.startAI()}>
                ${strings.menu.btn_vs_ai}
              </button>
              
              <div class="menu-divider"></div>
              
              <button class="btn btn-ghost" @click=${() => this.createPrivate()}>
                ${strings.menu.btn_create_room}
              </button>
              
              <div class="input-group">
                <input id="roomInput" class="code-input" type="text" maxlength="6" placeholder="${strings.menu.input_placeholder}" />
                <button class="btn btn-secondary btn-inline" @click=${() => {
                    const val = (document.getElementById('roomInput') as HTMLInputElement).value;
                    this.joinPrivate(val);
                }}>${strings.menu.btn_enter}</button>
              </div>
            </div>
          `;

        case "hosting":
          return html`
            <div class="menu-card">
              <h2 class="menu-subtitle">${strings.menu.status_waiting}</h2>
              ${this.state.roomId 
                ? html`<div class="code-display">${this.state.roomId}</div>`
                : html`<div class="spinner"></div><p style="font-weight:bold; color: #aaa;">${strings.menu.status_creating}</p>`
              }
              <p style="color: var(--text-muted); font-size: 0.9em;">${strings.menu.msg_share_code}</p>
              <div class="menu-divider"></div>
              <button class="btn btn-ghost" @click=${() => this.reset()}>${strings.menu.btn_cancel}</button>
            </div>
          `;

        case "matchmaking":
          return html`
            <div class="menu-card">
              <h2 class="menu-subtitle">${strings.menu.status_searching}</h2>
              <div class="spinner"></div> 
              <p style="font-weight:bold; color: var(--secondary-color);">${strings.menu.msg_looking}</p>
              <div class="menu-divider"></div>
              <button class="btn btn-ghost" @click=${() => this.reset()}>${strings.menu.btn_cancel}</button>
            </div>
          `;

        case "joining":
          return html`
            <div class="menu-card">
               <div class="spinner"></div>
               <h2 class="menu-subtitle">${strings.menu.status_connecting}</h2>
            </div>
          `;

        case "error":
          return html`
            <div class="menu-card">
              <h2 style="color: var(--danger-color);">${strings.menu.err_title}</h2>
              <div class="error-msg">${this.state.errorMsg}</div>
              <button class="btn btn-secondary" @click=${() => this.reset()}>${strings.menu.btn_back}</button>
            </div>
          `;
      }
    };

    render(content(), this.root);
  }
}
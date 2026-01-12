import { html, render } from "lit-html";
import { FirebaseMatchmaker, FirebasePeerConnection } from "../matchmaking/firebase-client";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";

export class GameMenu {
  root: HTMLDivElement;
  matchmaker: FirebaseMatchmaker;

  // Events for the GameWrapper to start the game
  onClientStart: TypedEvent<FirebasePeerConnection> = new TypedEvent();
  onHostStart: TypedEvent<FirebasePeerConnection> = new TypedEvent();

  state: {
    view: "home" | "hosting" | "joining" | "matchmaking" | "error";
    roomId?: string;
    errorMsg?: string;
  } = { view: "home" };

  constructor() {
    this.root = document.createElement("div");
    this.setupStyles();
    document.body.appendChild(this.root);

    this.matchmaker = new FirebaseMatchmaker();

    // Listen globally for match success
    this.matchmaker.onMatchFound.on((data) => {
      this.root.style.display = "none"; // Hide menu
      if (data.isHost) {
        this.onHostStart.emit(data.connection);
      } else {
        this.onClientStart.emit(data.connection);
      }
    });

    this.render();
  }

  setupStyles() {
    this.root.style.position = "absolute";
    this.root.style.width = "100%";
    this.root.style.height = "100%";
    this.root.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    this.root.style.zIndex = "100";
    this.root.style.display = "flex";
    this.root.style.justifyContent = "center";
    this.root.style.alignItems = "center";
    this.root.style.fontFamily = "sans-serif";
  }

  async createPrivate() {
    this.state = { view: "hosting" };
    this.render();
    try {
      const id = await this.matchmaker.createPrivateRoom();
      this.state.roomId = id;
      this.render();
    } catch (e) {
      this.state = { view: "error", errorMsg: "Could not create room." };
      this.render();
    }
  }

  async joinPrivate(idInput: string) {
    // Trim whitespace to prevent "213090 " failing the length check
    const id = idInput.trim();
    if (id.length !== 6) {
      this.state = { view: "error", errorMsg: "Code must be exactly 6 digits." };
      this.render();
      return;
    }

    this.state = { view: "joining" };
    this.render();
    
    try {
      await this.matchmaker.joinPrivateRoom(id);
    } catch (e: any) {
      // Show the actual error message from the matchmaker (e.g. "Room not found")
      console.error(e);
      this.state = { view: "error", errorMsg: e.message || "Connection failed." };
      this.render();
    }
  }

  startPublic() {
    this.state = { view: "matchmaking" };
    this.render();
    this.matchmaker.startPublicMatchmaking();
  }

  reset() {
      this.matchmaker.stopPublicMatchmaking();
      this.state = { view: "home" };
      this.render();
  }

  render() {alert(4)
    const content = () => {
      switch (this.state.view) {
        case "home":
          return html`
            <div style="display:flex; flex-direction:column; gap:20px; text-align:center;">
              <h1>Passe Trappe</h1>
              <button @click=${() => this.startPublic()} style="padding:15px; font-size:1.2em; cursor:pointer;">
                Find RPublic Match
              </button>
              <hr style="width:100%"/>
              <button @click=${() => this.createPrivate()} style="padding:10px; font-size:1em; cursor:pointer;">
                Create RPrivate Room
              </button>
              <div style="display:flex; gap:5px;">
                <input id="roomInput" type="text" maxlength="6" placeholder="111111" style="padding:10px; font-size:1em; width:100px; text-align:center; letter-spacing: 2px;">
                <button @click=${() => {
                    const val = (document.getElementById('roomInput') as HTMLInputElement).value;
                    this.joinPrivate(val);
                }} style="padding:10px; cursor:pointer;">Join</button>
              </div>
            </div>
          `;
        case "hosting":
          return html`
            <div style="text-align:center;">
              <h2>Waiting for Player...</h2>
              ${this.state.roomId 
                ? html`<div style="font-size:3em; letter-spacing:5px; font-weight:bold; margin:20px;">${this.state.roomId}</div>`
                : html`<p>Generating Code...</p>`
              }
              <p>Share this code with a friend.</p>
              <button @click=${() => this.reset()}>Cancel</button>
            </div>
          `;
        case "matchmaking":
          return html`
            <div style="text-align:center;">
              <h2>Looking for opponent...</h2>
              <div class="spinner"></div> 
              <p>Please wait...</p>
              <button @click=${() => this.reset()}>Cancel</button>
            </div>
          `;
        case "joining":
          return html`<h2>Connecting to Room...</h2>`;
        case "error":
          return html`
            <div style="text-align:center; color: red;">
              <h2>Error</h2>
              <p>${this.state.errorMsg}</p>
              <button @click=${() => this.reset()}>Back</button>
            </div>
          `;
      }
    };

    render(content(), this.root);
  }
}


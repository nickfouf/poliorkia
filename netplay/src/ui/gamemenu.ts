import { html, render } from "lit-html";
import { FirebaseMatchmaker, FirebasePeerConnection } from "../matchmaking/firebase-client";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
import strings from "../strings.json";
import rawTeamsList from "../../../src/teams.json";
import { PALETTES } from "../../../src/config";
import { GameVisualConfig } from "../../../src/types";

interface Team {
    name: string;
    icon: string | null;
}

export class GameMenu {
  root: HTMLDivElement;
  matchmaker: FirebaseMatchmaker;

  onClientStart: TypedEvent<{ conn: FirebasePeerConnection, opponentName: string, opponentTeamIndex: number, duration: number, visuals: GameVisualConfig }> = new TypedEvent();
  onHostStart: TypedEvent<{ conn: FirebasePeerConnection, opponentName: string, opponentTeamIndex: number, duration: number, visuals: GameVisualConfig }> = new TypedEvent();
  onAIStart: TypedEvent<number> = new TypedEvent(); 

  state: {
    view: "home" | "name-setup" | "team-setup" | "room-setup" | "ai-setup" | "hosting" | "joining" | "matchmaking" | "error";
    roomId?: string;
    errorMsg?: string;
  } = { view: "home" };

  private aiDifficulty: number = 50; 
  public userName: string = "";
  public userTeamIndex: number = -1; 
  private allTeams: Team[] = [];
  
  private privateMatchDuration: number = 45; 
  
  private visualIndices = {
      p1: 0, 
      p2: 1, 
      wood: 0, 
      floor: 0 
  };

  constructor() {
    this.root = document.createElement("div");
    this.root.className = "game-menu-overlay";
    document.body.appendChild(this.root);

    const sortedRawTeams = [...rawTeamsList].sort((a, b) => a.name.localeCompare(b.name));
    this.allTeams = [
        { name: strings.menu.team_none, icon: null },
        ...sortedRawTeams
    ];

    const savedDiff = localStorage.getItem("poliorkia_ai_difficulty");
    if (savedDiff) {
        this.aiDifficulty = parseInt(savedDiff, 10);
        if (this.aiDifficulty < 10) this.aiDifficulty = 10;
        if (this.aiDifficulty > 100) this.aiDifficulty = 100;
    }

    const savedName = localStorage.getItem("poliorkia_username");
    const savedTeamIdx = localStorage.getItem("poliorkia_team_index");
    
    if (savedName) {
        this.userName = savedName;
        if (savedTeamIdx !== null) {
            this.userTeamIndex = parseInt(savedTeamIdx, 10);
            if (this.userTeamIndex < 0 || this.userTeamIndex >= this.allTeams.length) {
                this.userTeamIndex = 0; 
            }
            this.state = { view: "home" };
        } else {
            this.state = { view: "team-setup" };
        }
    } else {
        this.state = { view: "name-setup" };
    }

    const savedDuration = localStorage.getItem("poliorkia_private_duration");
    if (savedDuration) {
        const d = parseInt(savedDuration, 10);
        if (d >= 15 && d <= 180) {
            this.privateMatchDuration = d;
        }
    }

    const savedColors = localStorage.getItem("poliorkia_room_colors");
    if (savedColors) {
        try {
            const parsed = JSON.parse(savedColors);
            this.visualIndices = { ...this.visualIndices, ...parsed };
        } catch(e) { }
    }

    this.matchmaker = new FirebaseMatchmaker();

    this.matchmaker.onMatchFound.on((data) => {
      this.root.style.display = "none";
      
      const visuals = data.visuals || {
          p1Color: PALETTES.DISCS[0].value,
          p2Color: PALETTES.DISCS[1].value,
          woodColor: PALETTES.WOOD[0].value,
          floorColor: PALETTES.FLOOR[0].value
      };

      if (data.isHost) {
        this.onHostStart.emit({ 
            conn: data.connection, 
            opponentName: data.opponentName, 
            opponentTeamIndex: data.opponentTeamIndex,
            duration: data.duration || 45,
            visuals: visuals
        });
      } else {
        this.onClientStart.emit({ 
            conn: data.connection, 
            opponentName: data.opponentName, 
            opponentTeamIndex: data.opponentTeamIndex,
            duration: data.duration || 45,
            visuals: visuals
        });
      }
    });

    this.render();
  }

  saveName(inputVal: string) {
      const name = inputVal.trim();
      if (name.length < 3 || name.length > 16) {
          this.state = { view: "error", errorMsg: strings.menu.err_invalid_name };
          this.render();
          return;
      }
      
      // Check if we are editing an existing name or setting it up for the first time
      const isEditMode = this.userName !== "";

      this.userName = name;
      localStorage.setItem("poliorkia_username", this.userName);

      if (isEditMode) {
          // If editing, go back to home immediately (functionality change)
          this.state = { view: "home" };
      } else {
          // If first time, proceed to team setup (wizard flow)
          this.state = { view: "team-setup" };
      }
      
      this.render();
  }

  changeName() {
      this.state = { view: "name-setup" };
      this.render();
  }

  selectTeam(index: number) {
      this.userTeamIndex = index;
      this.render();
  }

  saveTeam() {
      localStorage.setItem("poliorkia_team_index", this.userTeamIndex.toString());
      this.state = { view: "home" };
      this.render();
  }

  changeTeam() {
      this.state = { view: "team-setup" };
      this.render();
  }
  
  showRoomSetup() {
      this.state = { view: "room-setup" };
      this.render();
  }
  
  changeDuration(step: number) {
      const min = 15;
      const max = 180; 
      let newVal = this.privateMatchDuration + step;
      if (newVal < min) newVal = min;
      if (newVal > max) newVal = max;

      if (newVal !== this.privateMatchDuration) {
          this.privateMatchDuration = newVal;
          localStorage.setItem("poliorkia_private_duration", this.privateMatchDuration.toString());
          this.render();
      }
  }

  cycleColor(type: 'p1'|'p2'|'wood'|'floor', dir: number) {
      let array: any[] = [];
      let currentIdx = 0;

      if (type === 'p1') { array = PALETTES.DISCS; currentIdx = this.visualIndices.p1; }
      else if (type === 'p2') { array = PALETTES.DISCS; currentIdx = this.visualIndices.p2; }
      else if (type === 'wood') { array = PALETTES.WOOD; currentIdx = this.visualIndices.wood; }
      else if (type === 'floor') { array = PALETTES.FLOOR; currentIdx = this.visualIndices.floor; }

      let newIdx = currentIdx + dir;
      if (newIdx < 0) newIdx = array.length - 1;
      if (newIdx >= array.length) newIdx = 0;

      this.visualIndices[type] = newIdx;
      
      localStorage.setItem("poliorkia_room_colors", JSON.stringify(this.visualIndices));
      this.render();
  }

  formatTime(seconds: number): string {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  }

  async createPrivate() {
    this.state = { view: "hosting" };
    this.render();
    try {
      const visuals: GameVisualConfig = {
          p1Color: PALETTES.DISCS[this.visualIndices.p1].value,
          p2Color: PALETTES.DISCS[this.visualIndices.p2].value,
          woodColor: PALETTES.WOOD[this.visualIndices.wood].value,
          floorColor: PALETTES.FLOOR[this.visualIndices.floor].value
      };

      const id = await this.matchmaker.createPrivateRoom(
          this.userName, 
          this.userTeamIndex, 
          this.privateMatchDuration, 
          visuals, 
          false
      );
      this.state.roomId = id;
      this.render();
    } catch (e) {
      this.state = { view: "error", errorMsg: strings.menu.err_create_failed };
      this.render();
    }
  }

  async refreshCode() {
      this.state = { view: "hosting", roomId: undefined }; 
      this.render();
      try {
          const visuals: GameVisualConfig = {
              p1Color: PALETTES.DISCS[this.visualIndices.p1].value,
              p2Color: PALETTES.DISCS[this.visualIndices.p2].value,
              woodColor: PALETTES.WOOD[this.visualIndices.wood].value,
              floorColor: PALETTES.FLOOR[this.visualIndices.floor].value
          };
          const id = await this.matchmaker.createPrivateRoom(
              this.userName, 
              this.userTeamIndex, 
              this.privateMatchDuration, 
              visuals,
              true
          );
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
      await this.matchmaker.joinPrivateRoom(id, this.userName, this.userTeamIndex);
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
    this.matchmaker.startPublicMatchmaking(this.userName, this.userTeamIndex);
  }

  showAISetup() {
      this.state = { view: "ai-setup" };
      this.render();
  }

  startAI() {
      localStorage.setItem("poliorkia_ai_difficulty", this.aiDifficulty.toString());
      this.root.style.display = "none";
      this.onAIStart.emit(this.aiDifficulty);
  }

  reset() {
      this.matchmaker.stopPublicMatchmaking();
      this.matchmaker.cancelPrivateHosting();

      if (this.state.view === "name-setup" && !this.userName) {
          return;
      }
      this.state = { view: "home" };
      this.render();
  }

  updateDifficulty(e: Event) {
      const target = e.target as HTMLInputElement;
      let val = parseInt(target.value, 10);
      if (val < 10) val = 10;
      this.aiDifficulty = val;
      this.render(); 
  }

  renderPicker(label: string, valueDisplay: any, colorPreview: string | null, onPrev: () => void, onNext: () => void) {
      return html`
        <div style="margin-bottom: 10px; width: 100%;">
            <div style="font-size: 0.9rem; font-weight: 800; color: var(--text-muted); margin-bottom: 5px;">${label}</div>
            <div style="display:flex; align-items:center; justify-content:space-between; background:#f1f2f6; border-radius:15px; padding: 5px;">
                <button class="picker-btn" @click=${onPrev} style="background:none; border:none; cursor:pointer; padding:5px 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary-color)"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                </button>
                
                <div style="display:flex; align-items:center; gap: 10px;">
                    ${colorPreview ? html`
                        <div style="width:20px; height:20px; border-radius:50%; background-color: ${colorPreview}; border: 2px solid rgba(0,0,0,0.1);"></div>
                    ` : ''}
                    <span style="font-weight:900; font-size:1.1rem; color:var(--text-main);">${valueDisplay}</span>
                </div>

                <button class="picker-btn" @click=${onNext} style="background:none; border:none; cursor:pointer; padding:5px 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary-color)"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                </button>
            </div>
        </div>
      `;
  }

  render() {
    const content = () => {
      switch (this.state.view) {
        case "name-setup":
            return html`
            <div class="menu-card">
              <h2 class="menu-title" style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 2rem;">${strings.menu.title_name_setup}</h2>
              <input id="nameInput" class="name-input" type="text" maxlength="16" placeholder="${strings.menu.input_name_placeholder}" .value="${this.userName}" />
              <button class="btn btn-primary" @click=${() => {
                  const val = (document.getElementById('nameInput') as HTMLInputElement).value;
                  this.saveName(val);
              }}>${this.userName ? strings.menu.btn_save_name : "ΣΥΝΕΧΕΙΑ"}</button>
              ${this.userName ? html`<button class="btn btn-ghost" @click=${() => this.reset()}>${strings.menu.btn_back}</button>` : ''}
            </div>
            `;

        case "team-setup":
            return html`
            <div class="menu-card" style="max-width: 500px;">
                <h2 class="menu-title" style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 1rem;">${strings.menu.title_team_setup}</h2>
                <div class="team-selection-container">
                    <div class="team-grid">
                        ${this.allTeams.map((team, index) => {
                            const isSelected = this.userTeamIndex === index;
                            const iconUrl = team.icon ? `assets/avatars/${team.icon}` : null;
                            return html`
                                <div class="team-card ${isSelected ? 'selected' : ''}" @click=${() => this.selectTeam(index)}>
                                    ${iconUrl 
                                        ? html`<img src="${iconUrl}" class="team-card-icon" alt="${team.name}" />`
                                        : html`<div class="team-card-icon" style="background:#dfe6e9; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#636e72; font-weight:bold; font-size:1.2rem;">X</div>`
                                    }
                                    <span class="team-card-name">${team.name}</span>
                                </div>
                            `;
                        })}
                    </div>
                </div>
                <button class="btn btn-primary" @click=${() => this.saveTeam()}>${strings.menu.btn_save_name}</button>
            </div>
            `;

        case "home":
          const currentTeam = this.allTeams[this.userTeamIndex] || this.allTeams[0];
          const hasTeam = !!currentTeam.icon;
          return html`
            <div class="menu-card">
              <img src="assets/poliorkia.png" class="menu-logo" alt="Poliorkia" />
              <div class="profile-container">
                  <div class="info-badge">
                      <span>${this.userName}</span>
                      <button class="btn-mini-change" title="${strings.menu.tooltip_change_name}" @click=${() => this.changeName()}>
                        <svg style="width:14px;height:14px;fill:currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                  </div>
                  <div class="info-badge">
                      <div class="team-badge-content">
                        ${hasTeam 
                            ? html`<img src="assets/avatars/${currentTeam.icon}" class="team-badge-icon" />`
                            : html`<div class="team-badge-icon" style="background:#dfe6e9; display:flex; align-items:center; justify-content:center; color:#636e72; font-size:0.8rem; font-weight:bold;">X</div>`
                        }
                        <span class="team-badge-name">${currentTeam.name}</span>
                      </div>
                      <button class="btn-mini-change" title="${strings.menu.tooltip_change_team}" @click=${() => this.changeTeam()}>
                        <svg style="width:14px;height:14px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                      </button>
                  </div>
              </div>
              <button class="btn btn-primary" @click=${() => this.startPublic()}>${strings.menu.btn_find_match}</button>
              <button class="btn btn-secondary" style="background-color: #a55eea; --btn-shadow-color: #8854d0; box-shadow: 0 6px 0 var(--btn-shadow-color);" @click=${() => this.showAISetup()}>${strings.menu.btn_vs_ai}</button>
              <div class="menu-divider"></div>
              <button class="btn btn-ghost" @click=${() => this.showRoomSetup()}>${strings.menu.btn_create_room}</button>
              <div class="input-group">
                <input id="roomInput" class="code-input" type="text" maxlength="6" placeholder="${strings.menu.input_placeholder}" />
                <button class="btn btn-secondary btn-inline" @click=${() => {
                    const val = (document.getElementById('roomInput') as HTMLInputElement).value;
                    this.joinPrivate(val);
                }}>${strings.menu.btn_enter}</button>
              </div>
            </div>
          `;
          
        case "room-setup":
            return html`
            <div class="menu-card" style="padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; max-height: 85vh;">
              <h2 class="menu-title" style="font-size: 1.5rem; color: #0984e3; margin-bottom: 1rem;">ΡΥΘΜΙΣΕΙΣ ΔΩΜΑΤΙΟΥ</h2>
              
              <div style="flex: 1; overflow-y: auto; width: 100%; padding: 5px; box-sizing: border-box; display: flex; flex-direction: column; gap: 15px;">
                  
                   ${this.renderPicker(
                      "ΔΙΑΡΚΕΙΑ", 
                      this.formatTime(this.privateMatchDuration), 
                      null,
                      () => this.changeDuration(-15),
                      () => this.changeDuration(15)
                   )}

                  ${this.renderPicker(
                      "Χρώμα Παίκτη 1 (Host)", 
                      PALETTES.DISCS[this.visualIndices.p1].name, 
                      PALETTES.DISCS[this.visualIndices.p1].value,
                      () => this.cycleColor('p1', -1),
                      () => this.cycleColor('p1', 1)
                   )}

                  ${this.renderPicker(
                      "Χρώμα Παίκτη 2", 
                      PALETTES.DISCS[this.visualIndices.p2].name, 
                      PALETTES.DISCS[this.visualIndices.p2].value,
                      () => this.cycleColor('p2', -1),
                      () => this.cycleColor('p2', 1)
                   )}

                  ${this.renderPicker(
                      "Χρώμα Ξύλου", 
                      PALETTES.WOOD[this.visualIndices.wood].name, 
                      PALETTES.WOOD[this.visualIndices.wood].value,
                      () => this.cycleColor('wood', -1),
                      () => this.cycleColor('wood', 1)
                   )}

                  ${this.renderPicker(
                      "Χρώμα Δαπέδου", 
                      PALETTES.FLOOR[this.visualIndices.floor].name, 
                      PALETTES.FLOOR[this.visualIndices.floor].value,
                      () => this.cycleColor('floor', -1),
                      () => this.cycleColor('floor', 1)
                   )}
              </div>
              
              <div style="margin-top: 15px; width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                  <button class="btn btn-primary" @click=${() => this.createPrivate()}>ΔΗΜΙΟΥΡΓΙΑ</button>
                  <button class="btn btn-ghost" @click=${() => this.reset()}>${strings.menu.btn_back}</button>
              </div>
            </div>
            `;

        case "ai-setup":
            return html`
              <div class="menu-card">
                  <h2 class="menu-subtitle" style="color: #a55eea; margin-bottom: 0.5rem;">${strings.menu.title_ai_setup}</h2>
                  <div style="width: 80%; text-align: left; margin-bottom: 2rem;">
                    <label style="display: block; font-weight: 800; color: var(--text-muted); margin-bottom: 10px;">
                        ${strings.menu.label_smartness}: <span style="color: #a55eea;">${this.aiDifficulty}%</span>
                    </label>
                    <input type="range" min="10" max="100" value="${this.aiDifficulty}" style="width: 100%; cursor: pointer;" @input=${(e) => this.updateDifficulty(e)}>
                  </div>
                  <button class="btn btn-secondary" style="background-color: #a55eea; --btn-shadow-color: #8854d0; box-shadow: 0 6px 0 var(--btn-shadow-color);" @click=${() => this.startAI()}>${strings.menu.btn_start_ai}</button>
                  <button class="btn btn-ghost" @click=${() => this.reset()}>${strings.menu.btn_back}</button>
              </div>
            `;

        case "hosting":
          return html`
            <div class="menu-card">
              <h2 class="menu-subtitle">${strings.menu.status_waiting}</h2>
              ${this.state.roomId 
                ? html`
                    <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin: 1rem 0;">
                        <div class="code-display" style="margin:0;">${this.state.roomId}</div>
                        <button class="btn-mini-change" style="background:#0984e3; width:40px; height:40px; border-radius:12px;" title="Νέος Κωδικός" @click=${() => this.refreshCode()}>
                             <svg style="width:24px;height:24px;fill:white" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                        </button>
                    </div>`
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
              <button class="btn btn-secondary" @click=${() => {
                 if (this.state.errorMsg === strings.menu.err_invalid_name) {
                     this.state = { view: "name-setup" };
                 } else {
                     this.state = { view: "home" };
                 }
                 this.render();
              }}>${strings.menu.btn_back}</button>
            </div>
          `;
      }
    };

    render(content(), this.root);
  }
}
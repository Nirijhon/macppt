// js/app.js - Modular Component Loader & Slide Queue Controller

class SlideCraftApp {
    constructor() {
        this.currentStep = 1;
        this.selectedTemplate = 'Sermon Classic';
        this.slidesQueue = []; // Queue to store all added slides
        this.selectedPreview = -1; // Currently selected slide index for live preview
        this.editingIndex = -1; // Index of slide being edited (content only)

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeEnlargedPreview();
            if (e.key === 'ArrowLeft') this.prevPreview();
            if (e.key === 'ArrowRight') this.nextPreview();
        });
    }

getTheme() {
        const themes = {
            'Sermon Classic': {
                font: 'Inter',
                pptxFont: 'Arial',
                bg: '0B192C', bg2: '050C16', glow: '1E3A8A',
                frame: 'FFD700', accent: 'FFD700', accent2: 'FFF3B0',
                hl: 'FFD700', text: 'FFFFFF', card: '132A4A', onCard: 'E2E8F0',
                badge: 'FFD700', onBadge: '0B192C',
                layout: 'classic',
                shadow: ['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.8)']
            },
            'Elegant Heritage': {
                font: 'Georgia',
                pptxFont: 'Georgia',
                bg: 'F6EFE6', bg2: 'E8D9BF', glow: 'EBD1B7',
                frame: '9B2A2E', accent: '9B2A2E', accent2: 'C05A3B',
                hl: '9B2A2E', text: '2B2118', card: 'FFFFFF', onCard: '4A3A2E',
                badge: '9B2A2E', onBadge: 'FFFFFF',
                layout: 'classic',
                shadow: ['rgba(35,15,10,0.4)', 'rgba(35,15,10,0.35)']
            },
            'Midnight Aurora': {
                font: 'Montserrat',
                pptxFont: 'Arial',
                bg: '0D1117', bg2: '161B22', glow: '164E63',
                frame: '22D3EE', accent: '22D3EE', accent2: 'A78BFA',
                hl: '22D3EE', text: 'FFFFFF', card: '1F2937', onCard: 'E2E8F0',
                badge: '22D3EE', onBadge: '0D1117',
                layout: 'modern',
                shadow: ['rgba(2,6,23,0.75)', 'rgba(2,6,23,0.65)']
            },
            'Forest Chapel': {
                font: 'Cambria',
                pptxFont: 'Cambria',
                bg: '0E2A1E', bg2: '06140E', glow: '1B4D36',
                frame: 'D9B36C', accent: 'D9B36C', accent2: 'F4E4BC',
                hl: 'D9B36C', text: 'F6F1E3', card: '1A3A2A', onCard: 'E9E2CE',
                badge: 'D9B36C', onBadge: '0E2A1E',
                layout: 'chapel',
                shadow: ['rgba(6,20,14,0.9)', 'rgba(6,20,14,0.8)']
            },
            'Lilac Grace': {
                font: 'Palatino',
                pptxFont: 'Palatino Linotype',
                bg: 'F3EEFC', bg2: 'E8DDF9', glow: 'D4C4F7',
                frame: '8B5CF6', accent: '7C3AED', accent2: 'C4B5FD',
                hl: 'C0522E', text: '2E1065', card: 'FFFFFF', onCard: '4C1D95',
                badge: '7C3AED', onBadge: 'FFFFFF',
                layout: 'lilac',
                shadow: ['rgba(109,40,217,0.35)', 'rgba(109,40,217,0.25)']
            },
            'Rose Atelier': {
                font: 'Georgia',
                pptxFont: 'Georgia',
                bg: 'FBF5EF', bg2: 'F2E7DC', glow: 'E9C7C8',
                frame: 'A64A52', accent: 'A64A52', accent2: 'E2A9B0',
                hl: 'A64A52', text: '3A2328', card: 'FFFFFF', onCard: '7A4A52',
                badge: 'A64A52', onBadge: 'FFFFFF',
                layout: 'rose',
                shadow: ['rgba(60,25,35,0.22)', 'rgba(60,25,35,0.16)']
            },
            'Fresh Mint': {
                font: 'Poppins',
                pptxFont: 'Arial',
                bg: 'EAF6F0', bg2: 'D5EEE3', glow: 'A7E0C5',
                frame: '10B981', accent: '10B981', accent2: '6EE7B7',
                hl: '047857', text: '134E4A', card: 'FFFFFF', onCard: '134E4A',
                badge: '10B981', onBadge: 'FFFFFF',
                layout: 'mint',
                shadow: ['rgba(6,78,59,0.3)', 'rgba(6,78,59,0.22)']
            },
                        'Ember & Gold': {
                font: 'Nunito',
                pptxFont: 'Arial',
                bg: '1C120C', bg2: '2A1B12', glow: '9A3412',
                frame: 'F59E0B', accent: 'F59E0B', accent2: 'FB923C',
                hl: 'FBBF24', text: 'FFF7ED', card: '3A291B', onCard: 'E8D4BE',
                badge: 'F59E0B', onBadge: '1C120C',
                layout: 'ember',
                shadow: ['rgba(20,8,2,0.85)', 'rgba(20,8,2,0.75)']
            },
            'Royal Sapphire': {
                // Different DESIGN / COLOR / FONT STYLE / FORMAT: a rich deep-navy
                // regal theme with electric-sapphire accents and clean modern layout,
                // while reusing the identical font-size tier rules as the classic templates.
                font: 'Barlow',
                pptxFont: 'Arial',
                bg: '0B1E3A', bg2: '071226', glow: '4259B0',
                frame: '2563EB', accent: '2563EB', accent2: '3B82F6',
                hl: '3B82F6', text: 'EEF2FF', card: '172554', onCard: 'CBD5E1',
                badge: '2563EB', onBadge: '0B1E3A',
                layout: 'royal',
                shadow: ['rgba(7,30,71,0.8)', 'rgba(7,30,71,0.7)']
            },
            'Pulpit Grid': {
                // Completely different STRUCTURE: editorial bento grid — hard
                // grid zones with hairline seams, a giant point numeral for
                // congregation wayfinding, oversized quote glyph, and ALL text
                // left-aligned (no centered stack, no glow behind text).
                // Font-size tier rules stay identical to every other template.
                font: 'Oswald',
                pptxFont: 'Arial',
                bg: '151515', bg2: '0C0C0C', glow: '3F3F46',
                frame: 'F5F5F4', accent: 'DC2626', accent2: 'F87171',
                hl: 'FBBF24', text: 'FAFAFA', card: '1F1F1F', onCard: 'D4D4D4',
                badge: 'DC2626', onBadge: 'FFFFFF',
                layout: 'bento',
                shadow: ['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.75)']
            },
            'Big Type': {
                // Full-bleed typographic POSTER — a genuinely different
                // STRUCTURE, not a recolor: no glow, no gradient wash, no
                // cards/panels. Paper + ink + one signal-red accent. Every
                // word flush-left; hierarchy by pure size contrast; hairline
                // meta bands and red registration squares are the only
                // ornament. Font-size tier rules stay identical to every
                // other template.
                font: 'Archivo Black',
                pptxFont: 'Arial Black',
                bg: 'F5F2EA', bg2: 'ECE7DC', glow: 'E3DCCB',
                frame: '141414', accent: 'E03A2F', accent2: 'FF6B5B',
                hl: 'E03A2F', text: '141414', card: 'FFFFFF', onCard: '3A352C',
                badge: 'E03A2F', onBadge: 'FFFFFF',
                layout: 'poster',
                shadow: ['rgba(20,20,20,0.22)', 'rgba(20,20,20,0.14)']
            },
            'Glory Light': {
                // Cinematic worship-night SPOTLIGHT — a genuinely different
                // STRUCTURE: pure-black field, a single beam of gold light
                // from the top-center, floating dust motes, thin gold rule,
                // and type glowing inside the beam. No cards, no borders,
                // no side badges. Font-size tier rules stay identical to
                // every other template.
                font: 'Playfair Display',
                pptxFont: 'Georgia',
                bg: '050505', bg2: '0A0A0A', glow: 'D4A82C',
                frame: 'D4AF37', accent: 'E8C86A', accent2: 'FFF3C4',
                hl: 'E8C86A', text: 'FFFFFF', card: '111111', onCard: 'E8E0C8',
                badge: 'E8C86A', onBadge: '050505',
                layout: 'glory',
                shadow: ['rgba(0,0,0,0.95)', 'rgba(0,0,0,0.85)']
            },
            'Celestial Dawn': {
                // GLASSMORPHISM — a genuinely different STRUCTURE: deep
                // indigo aurora field with soft gradient orbs behind a
                // floating frosted-glass panel (translucent white + blur +
                // hairline border) that holds ALL the type. No hard frames,
                // no side badges, no drop shadows behind the text. Font-size
                // tier rules stay identical to every other template.
                font: 'Outfit',
                pptxFont: 'Arial',
                bg: '0F0C29', bg2: '0A0820', glow: '7C3AED',
                frame: 'FFFFFF', accent: 'C084FC', accent2: 'E879F9',
                hl: 'FFD75E', text: 'FFFFFF', card: '1B1740', onCard: 'EDE9FF',
                badge: 'C084FC', onBadge: '0F0C29',
                layout: 'glass',
                shadow: ['rgba(120,80,200,0.45)', 'rgba(120,80,200,0.35)']
            },
            'Split Screen': {
                // A bold vertical DUOTONE — a genuinely different STRUCTURE:
                // burnt-orange rail on the left third, deep espresso field on
                // the right. The rail carries the small-caps meta (floor line
                // bottom, diamond ornament); the point numeral sits big on
                // the rail. Main type sits flush-left on the dark panel.
                // Font-size tier rules stay identical to every other template.
                font: 'Sora',
                pptxFont: 'Arial',
                bg: '1B1310', bg2: '14100C', glow: 'E85D26',
                frame: 'FFF6EC', accent: 'E85D26', accent2: 'FF8A50',
                hl: 'FF8A50', text: 'FFF6EC', card: 'FFF6EC', onCard: '1B1310',
                badge: 'E85D26', onBadge: 'FFF6EC',
                layout: 'split',
                shadow: ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.45)']
            },
            'Arctic Frost': {
                // A genuinely DISTINCT minimal LIGHT theme: icy-white field,
                // glacier-blue hairline frame, frost-crystal diamond ornaments,
                // thin accent bar and airy whitespace. Structure & font-size
                // tier rules stay identical to every other template.
                font: 'Outfit',
                pptxFont: 'Arial',
                bg: 'F2F8FD', bg2: 'DCEBF7', glow: 'A8D4F0',
                frame: '6FB1DC', accent: '2E86C1', accent2: '9DC9E8',
                hl: '1B6CA8', text: '16324A', card: 'FFFFFF', onCard: '3A6485',
                badge: '2E86C1', onBadge: 'FFFFFF',
                layout: 'frost',
                shadow: ['rgba(22,50,74,0.16)', 'rgba(22,50,74,0.10)']
            },
            'Christmas': {
                font: 'Cinzel',
                pptxFont: 'Georgia',
                bg: '0B3D0E', bg2: '052207', glow: '00FF88',
                frame: 'FFD700', accent: 'FFD700', accent2: 'FF8C00',
                hl: 'FFD700', text: 'FFFFFF', card: '0A2E0A', onCard: 'FFFFFF',
                badge: 'FFD700', onBadge: '0B3D0E',
                layout: 'classic',
                shadow: ['rgba(11,61,14,0.85)', 'rgba(11,61,14,0.75)']
            },
            'Easter': {
                font: 'Playfair Display',
                pptxFont: 'Georgia',
                bg: 'F5E6D3', bg2: 'E8D4B5', glow: 'D4A373',
                frame: '8B4513', accent: '8B4513', accent2: 'CD853F',
                hl: '8B4513', text: '4A2C1A', card: 'FFFFFF', onCard: '4A2C1A',
                badge: '8B4513', onBadge: 'F5E6D3',
                layout: 'classic',
                shadow: ['rgba(139,69,19,0.35)', 'rgba(139,69,19,0.25)']
            }
        };
        return themes[this.selectedTemplate] || themes['Sermon Classic'];
    }

    hex(hex) {
        return '#' + hex;
    }

    _hexToRgb(hex) {
        const h = String(hex || '').replace('#', '');
        const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.padEnd(6, '0');
        const n = parseInt(v, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    // Returns the user-set font scale for a slide (1 = 100%), clamped 50%–200%.
    // Slides saved before this feature existed simply default to 100%.
    getFontScale(s) {
        const v = (s && typeof s.fontScale === 'number') ? s.fontScale : 1;
        return Math.min(2, Math.max(0.5, v));
    }

    // Scale every inline cq-unit font-size in a rendered slide's HTML. All nine
    // layouts emit their sizes as inline `style="font-size:Ncqw"`, so this one
    // transform makes the preview, enlarged view, PDF and DOM-measured PPTX all
    // honor the per-slide Font Size control without touching the sizing rules.
    scaleSlideHtml(html, scale) {
        if (!html || scale === 1) return html;
        return html.replace(/(font-size:\s*)(\d+(?:\.\d+)?)(cq[whib])/gi, (m, pre, num, unit) => {
            const v = Math.round(parseFloat(num) * scale * 10) / 10;
            return pre + v + unit;
        });
    }

    // Re-skin every modal's accents — labels, focus rings, secondary buttons,
    // confirm button, top bar and corner glow — to match the selected template.
    applyModalTheme() {
        const theme = this.getTheme();
        const rgb = this._hexToRgb(theme.accent).join(',');
        const accent = '#' + theme.accent;
        const accent2 = '#' + (theme.accent2 || theme.accent);
        const vars = {
            '--accent': accent,
            '--accentSoft': `rgba(${rgb},.14)`,
            '--accentBorder': `rgba(${rgb},.42)`,
            '--accentGlow': `rgba(${rgb},.5)`,
            '--label': accent2,
            '--gradFrom': accent,
            '--gradTo': accent2,
            '--onAccent': '#' + (theme.onBadge || '0B192C')
        };
        document.querySelectorAll('.modal-content').forEach((el) => {
            Object.keys(vars).forEach((k) => el.style.setProperty(k, vars[k]));
        });
    }

    goToStep(step) {
        this.currentStep = step;
        const v1 = document.getElementById('view-step-1');
        const v2 = document.getElementById('view-step-2');
        const v3 = document.getElementById('view-step-3');
        if (v1) v1.classList.toggle('hidden', step !== 1);
        if (v2) v2.classList.toggle('hidden', step !== 2);
        if (v3) v3.classList.toggle('hidden', step !== 3);

        const labels = { 1: 'Dashboard', 2: 'Templates', 3: 'Content Builder' };
        const label = document.getElementById('current-step-label');
        if (label) label.innerText = labels[step] || 'Dashboard';
        this._persist(); // remember the current page so a refresh stays here
    }

    selectTemplate(templateName) {
        this.selectedTemplate = templateName;
        document.getElementById('selected-template-name').innerText = templateName;
        const themeJpgMap = {
            'Elegant Heritage': 'Elegant Heritage.jpg',
            'Ember & Gold': 'Ember & Gold.jpg',
            'Fresh Mint': 'Fresh Mint.jpg',
            'Glory Light': 'Glory light.jpg',
            'Lilac Grace': 'lilac Grace.jpg',
            'Rose Atelier': 'Rose Atelier.jpg',
            'Royal Sapphire': 'Royal sapphire.jpg',
            'Arctic Frost': 'Arctic Frost.jpg',
            'Midnight Aurora': 'Midnight Aurora.jpg',
            'Christmas': 'Christmas.jpg',
            'Easter': 'Easter.jpg'
        };
        const jpg = themeJpgMap[templateName];
        if (jpg) {
            document.body.style.setProperty('--theme-bg', `url('${jpg}')`);
            document.body.classList.add('crisp-bg');   // JPG themes render crisp, no blur
        } else {
            document.body.style.removeProperty('--theme-bg');
            document.body.classList.remove('crisp-bg');
        }
        this._markSelectedTemplate(templateName);
        this.applyModalTheme();
        this.goToStep(3);
        this.renderSlideQueue();
    }

    _applyThemeBg(el) {
        if (!el) return;
        const themeJpgMap = {
            'Elegant Heritage': 'Elegant Heritage.jpg',
            'Ember & Gold': 'Ember & Gold.jpg',
            'Fresh Mint': 'Fresh Mint.jpg',
            'Glory Light': 'Glory light.jpg',
            'Lilac Grace': 'lilac Grace.jpg',
            'Rose Atelier': 'Rose Atelier.jpg',
            'Royal Sapphire': 'Royal sapphire.jpg',
            'Arctic Frost': 'Arctic Frost.jpg',
            'Midnight Aurora': 'Midnight Aurora.jpg',
            'Christmas': 'Christmas.jpg',
            'Easter': 'Easter.jpg'
        };
        const jpg = themeJpgMap[this.selectedTemplate];
        if (jpg) {
            el.style.backgroundImage = `url('${jpg}')`;
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
            el.style.backgroundColor = 'transparent';   // JPG shows through as true slide background
        } else {
            el.style.backgroundImage = 'none';
            el.style.backgroundColor = '';               // restore default for non-JPG themes
        }
    }

    // Highlight the live selection across both template choosers (grid + modal)
    // so the selected template gets a real amber ring + SELECTED badge.
    _markSelectedTemplate(name) {
        document.querySelectorAll('[data-template]').forEach((el) => {
            el.setAttribute('data-selected', el.getAttribute('data-template') === name);
        });
    }

    openModal(modalId) {
        // Close every modal first so only one dialog is ever visible/stacked
        const allModals = ['title-modal', 'point-modal', 'verse-modal', 'message-modal', 'template-modal'];
        allModals.forEach((id) => {
            const m = document.getElementById(id);
            if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
        });
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
        // Opening a modal abandons any pending edit; labels default back to "Add" mode
        this.editingIndex = -1;
        this.resetModalLabelsFor(modalId);
        // Re-skin the modal accents to the currently selected template theme
        this.applyModalTheme();
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
        // Closing a modal cancels any pending edit so the next add really adds
        this.editingIndex = -1;
    }

    resetModalLabelsFor(modalId) {
        const cfg = {
            'title-modal': { h: 'title-modal-heading', b: 'title-modal-submit', ht: 'Add Title Slide', bt: 'Add Title Slide' },
            'point-modal': { h: 'point-modal-heading', b: 'point-modal-submit', ht: 'Add Point Slide', bt: 'Add Point Slide' },
            'verse-modal': { h: 'verse-modal-heading', b: 'verse-modal-submit', ht: 'Add Verse Slide', bt: 'Add Verse Slide' },
            'message-modal': { h: 'message-modal-heading', b: 'message-modal-submit', ht: 'Add Message Slide', bt: 'Add Message Slide' }
        };
        const c = cfg[modalId];
        if (!c) return;
        const hEl = document.getElementById(c.h);
        const bEl = document.getElementById(c.b);
        if (hEl) hEl.innerText = c.ht;
        if (bEl) bEl.innerText = c.bt;
    }

    addTitleSlide() {
        const rawTitle = document.getElementById('input-title').value.trim();
        const verseText = document.getElementById('input-verse').value.trim();
        const footerText = document.getElementById('input-title-footer').value.trim();
        const highlights = this.collectHighlights('title-highlight-fields');
        if (!rawTitle) { this.showToast('Please enter a sermon title.', 'error'); return; }

        if (this.editingIndex >= 0 && this.slidesQueue[this.editingIndex]) {
            const target = this.slidesQueue[this.editingIndex];
            target.title = rawTitle;
            target.verse = verseText;
            target.footer = footerText;
            target.highlights = highlights;
            const editedIdx = this.editingIndex;
            this.editingIndex = -1;
            this.closeModal('title-modal');
            this.clearTitleInputs();
            this.selectedPreview = editedIdx;
            this.showToast(`Title Slide #${editedIdx + 1} updated.`, 'success');
            this.renderSlideQueue();
            return;
        }

        this.slidesQueue.push({
            type: 'title',
            title: rawTitle,
            verse: verseText,
            footer: footerText,
            highlights: highlights,
            fontScale: 1
        });

        this.closeModal('title-modal');
        this.clearTitleInputs();
        this.selectedPreview = this.slidesQueue.length - 1;
        this.showToast(`Title Slide #${this.slidesQueue.length} added to queue.`, 'success');
        this.renderSlideQueue();
    }

    clearTitleInputs() {
        document.getElementById('input-title').value = '';
        this.renderHighlightRows('title-highlight-fields', ['']);
        document.getElementById('input-verse').value = '';
        document.getElementById('input-title-footer').value = '';
    }

    addPointSlide() {
        const badgeText = document.getElementById('input-point-badge').value.trim();
        const rawPointTitle = document.getElementById('input-point-title').value.trim();
        const highlights = this.collectHighlights('highlight-fields');
        const descText = document.getElementById('input-point-desc').value.trim();
        if (!rawPointTitle) { this.showToast('Please enter a point statement.', 'error'); return; }

        if (this.editingIndex >= 0 && this.slidesQueue[this.editingIndex]) {
            const target = this.slidesQueue[this.editingIndex];
            target.badge = badgeText;
            target.title = rawPointTitle;
            target.highlights = highlights;
            target.desc = descText;
            const editedIdx = this.editingIndex;
            this.editingIndex = -1;
            this.closeModal('point-modal');
            this.clearPointInputs();
            this.selectedPreview = editedIdx;
            this.showToast(`Point Slide #${editedIdx + 1} updated.`, 'success');
            this.renderSlideQueue();
            return;
        }

        this.slidesQueue.push({
            type: 'point',
            badge: badgeText,
            title: rawPointTitle,
            highlights: highlights,
            desc: descText,
            fontScale: 1
        });

        this.closeModal('point-modal');
        this.clearPointInputs();
        this.selectedPreview = this.slidesQueue.length - 1;
        this.showToast(`Point Slide #${this.slidesQueue.length} added to queue.`, 'success');
        this.renderSlideQueue();
    }

    init() {
        this.restoreState();
        this.renderHighlightRows('highlight-fields', ['']);
        this.renderHighlightRows('message-highlight-fields', ['']);
        this.renderHighlightRows('title-highlight-fields', ['']);
        this._markSelectedTemplate(this.selectedTemplate);
        this.applyModalTheme();
        // Re-paint the queue/preview so restored slides are visible after a reload
        this.renderSlideQueue();
        // Return to the page the user was on before the refresh (defaults to 1)
        this.goToStep(this.currentStep);
    }

    // ─── Persistence: keep the built deck + template choice across reloads ───
    _storageKey() { return 'slidecraft_state_v1'; }

    _persist() {
        try {
            if (typeof localStorage === 'undefined') return;
            localStorage.setItem(this._storageKey(), JSON.stringify({
                selectedTemplate: this.selectedTemplate,
                slidesQueue: this.slidesQueue,
                selectedPreview: this.selectedPreview,
                currentStep: this.currentStep
            }));
        } catch (e) { /* storage unavailable (private mode / quota) — app still works in-memory */ }
    }

    restoreState() {
        try {
            if (typeof localStorage === 'undefined') return;
            const raw = localStorage.getItem(this._storageKey());
            if (!raw) return;
            const saved = JSON.parse(raw);
            if (saved && typeof saved === 'object') {
                if (typeof saved.selectedTemplate === 'string' && saved.selectedTemplate) {
                    this.selectedTemplate = saved.selectedTemplate;
                }
                if (Array.isArray(saved.slidesQueue)) {
                    this.slidesQueue = saved.slidesQueue.filter((s) => s && typeof s === 'object');
                }
                this.selectedPreview = (typeof saved.selectedPreview === 'number')
                    ? saved.selectedPreview : this.slidesQueue.length - 1;
                if (this.selectedPreview >= this.slidesQueue.length) this.selectedPreview = this.slidesQueue.length - 1;
                // Always open on the "Get Started" page (step 1). Saved slides,
                // template and preview selection are still restored above — only
                // the page position intentionally resets to the welcome screen.
                this.currentStep = 1;
            }
        } catch (e) { /* corrupted state — start fresh */ }
    }

    // Normalize the highlights of a slide into an array of phrases.
    getHighlights(s) {
        if (Array.isArray(s.highlights)) return s.highlights;
        if (s.highlight) return [s.highlight];
        return [];
    }

    highlightRowHtml(containerId, index, value) {
        const v = this.escapeHtml(value || '');
        return `
            <div class="flex gap-2">
                <input class="hl-input flex-1 min-w-0 w-full bg-gray-800/70 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500" type="text" placeholder="e.g. UNSHAKABLE HOPE" value="${v}" />
                <button onclick="app.removeHighlightRow('${containerId}', ${index})" type="button" title="Remove" class="px-3 py-2 rounded-xl border border-red-500/40 text-red-400 font-bold">&times;</button>
            </div>`;
    }

    renderHighlightRows(containerId, phrases) {
        const wrap = document.getElementById(containerId);
        if (!wrap) return;
        const list = phrases && phrases.length ? phrases : [''];
        wrap.innerHTML = list.map((p, i) => this.highlightRowHtml(containerId, i, p)).join('');
    }

    addHighlightRow(containerId) {
        const wrap = document.getElementById(containerId);
        if (!wrap) return;
        const count = wrap.querySelectorAll('.hl-input').length;
        wrap.insertAdjacentHTML('beforeend', this.highlightRowHtml(containerId, count, ''));
    }

    removeHighlightRow(containerId, i) {
        const wrap = document.getElementById(containerId);
        if (!wrap) return;
        const row = wrap.children[i];
        if (row) row.remove();
        if (!wrap.querySelector('.hl-input')) this.renderHighlightRows(containerId, ['']);
    }

    collectHighlights(containerId) {
        const wrap = document.getElementById(containerId);
        if (!wrap) return [];
        return Array.from(wrap.querySelectorAll('.hl-input'))
            .map((el) => el.value.trim())
            .filter(Boolean);
    }

    // Split a body of text into { text, hl } segments, marking the parts that
    // match any highlight phrase (case-insensitive, whole-phrase match). Used
    // to render paragraph-style highlights in message slides.
    splitHighlightSegments(text, highlights) {
        const list = (highlights || []).map((p) => String(p || '').trim().replace(/\s+/g, ' ')).filter(Boolean);
        if (!list.length) return [{ text: String(text || ''), hl: false }];
        const re = new RegExp('(' + list.map((p) => this.escapeRegExp(p)).join('|') + ')', 'gi');
        return String(text || '').split(re).map((part, i) => ({ text: part, hl: i % 2 === 1 }));
    }

    // Escape a body of text and wrap every highlighted phrase in the highlight span.
    highlightPhrasesHtml(text, highlights, hlClass) {
        const hl = hlClass || 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFF3B0] to-[#FFD700]';
        const segments = this.splitHighlightSegments(text, highlights);
        return segments.map((seg) => seg.hl
            ? `<span class="${hl}">${this.escapeHtml(seg.text)}</span>`
            : this.escapeHtml(seg.text)).join('');
    }

    clearPointInputs() {
        document.getElementById('input-point-badge').value = '';
        document.getElementById('input-point-title').value = '';
        this.renderHighlightRows('highlight-fields', ['']);
        document.getElementById('input-point-desc').value = '';
    }

    addVerseSlide() {
        const refText = document.getElementById('input-verse-ref').value.trim();
        const bodyText = document.getElementById('input-verse-body').value.trim();
        const versionText = document.getElementById('input-verse-version').value.trim();
        if (!bodyText) { this.showToast('Please enter the verse text.', 'error'); return; }

        if (this.editingIndex >= 0 && this.slidesQueue[this.editingIndex]) {
            const target = this.slidesQueue[this.editingIndex];
            target.ref = refText;
            target.text = bodyText;
            target.version = versionText;
            const editedIdx = this.editingIndex;
            this.editingIndex = -1;
            this.closeModal('verse-modal');
            this.clearVerseInputs();
            this.selectedPreview = editedIdx;
            this.showToast(`Verse Slide #${editedIdx + 1} updated.`, 'success');
            this.renderSlideQueue();
            return;
        }

        this.slidesQueue.push({
            type: 'verse',
            ref: refText,
            text: bodyText,
            version: versionText,
            fontScale: 1
        });

        this.closeModal('verse-modal');
        this.clearVerseInputs();
        this.selectedPreview = this.slidesQueue.length - 1;
        this.showToast(`Verse Slide #${this.slidesQueue.length} added to queue.`, 'success');
        this.renderSlideQueue();
    }

    clearVerseInputs() {
        document.getElementById('input-verse-ref').value = '';
        document.getElementById('input-verse-body').value = '';
        document.getElementById('input-verse-version').value = '';
    }

    addMessageSlide() {
        const messageText = document.getElementById('input-message-text').value.trim();
        const highlights = this.collectHighlights('message-highlight-fields');
        const refText = document.getElementById('input-message-ref').value.trim();
        const footerText = document.getElementById('input-message-footer').value.trim();
        if (!messageText) { this.showToast('Please enter a message.', 'error'); return; }

        if (this.editingIndex >= 0 && this.slidesQueue[this.editingIndex]) {
            const target = this.slidesQueue[this.editingIndex];
            target.text = messageText;
            target.highlights = highlights;
            target.ref = refText;
            target.footer = footerText;
            const editedIdx = this.editingIndex;
            this.editingIndex = -1;
            this.closeModal('message-modal');
            this.clearMessageInputs();
            this.selectedPreview = editedIdx;
            this.showToast(`Message Slide #${editedIdx + 1} updated.`, 'success');
            this.renderSlideQueue();
            return;
        }

        this.slidesQueue.push({
            type: 'message',
            text: messageText,
            highlights: highlights,
            ref: refText,
            footer: footerText,
            fontScale: 1
        });

        this.closeModal('message-modal');
        this.clearMessageInputs();
        this.selectedPreview = this.slidesQueue.length - 1;
        this.showToast(`Message Slide #${this.slidesQueue.length} added to queue.`, 'success');
        this.renderSlideQueue();
    }

    clearMessageInputs() {
        document.getElementById('input-message-text').value = '';
        this.renderHighlightRows('message-highlight-fields', ['']);
        document.getElementById('input-message-ref').value = '';
        document.getElementById('input-message-footer').value = '';
    }

    async exportToPowerPoint() {
        if (this.slidesQueue.length === 0) {
            this.showToast('Please add at least one slide before exporting.', 'error');
            return;
        }

        // ---- IMAGE-BASED EXPORT (default) ----
        // Each slide's live preview is captured with html2canvas and embedded as
        // a full-bleed picture, so the generated PPTX matches the on-screen
        // preview exactly — gradients, glows, translucency and every theme's
        // design — with no font swapping on any machine. If rendering is
        // unavailable or fails, we fall back to the shape-based builders below.
        if (typeof window.html2canvas !== 'undefined') {
            try {
                await this._exportPowerPointFromImages();
                return;
            } catch (err) {
                console.error('Image-based PPTX export failed; falling back to shape-based export.', err);
                this.showToast('Image export failed — retrying with editable shapes…', 'info');
            }
        }
        await this._exportPowerPointShapes();
    }

    // Editable PPTX export: rebuilds each slide from native PowerPoint shapes
    // and text boxes. Text stays editable in PowerPoint, but CSS gradients,
    // glows and translucency can't be expressed as shapes, so the deck looks
    // flatter than the preview. Exposed as the "PPTX (Editable)" button.
    async exportToPowerPointEditable() {
        if (this.slidesQueue.length === 0) {
            this.showToast('Please add at least one slide before exporting.', 'error');
            return;
        }
        await this._exportPowerPointShapes();
    }

    // Wraps pptx.addSlide() so every text box the fallback (hand-authored)
    // exporters create has its fontSize multiplied by the current slide's
    // fontScale. A no-op at 100%, and the original addText is always forwarded.
    _wrapPptxForFontScale(pptx) {
        if (!pptx || typeof pptx.addSlide !== 'function' || pptx.__scFsc) return;
        pptx.__scFsc = true;
        const self = this;
        const origAddSlide = pptx.addSlide;
        pptx.addSlide = function (...args) {
            const slide = origAddSlide.apply(pptx, args);
            if (slide && typeof slide.addText === 'function' && !slide.__scTxt) {
                slide.__scTxt = true;
                const origAddText = slide.addText;
                slide.addText = function (...a) {
                    const scale = self._activeSlideScale || 1;
                    if (scale !== 1) {
                        if (a[1] && typeof a[1] === 'object') {
                            // Clone opts so the caller's object is never mutated.
                            const opts = Object.assign({}, a[1]);
                            if (typeof opts.fontSize === 'number') opts.fontSize = Math.round(opts.fontSize * scale);
                            if (Array.isArray(opts.runs)) {
                                opts.runs = opts.runs.map((r) => r && r.options && typeof r.options.fontSize === 'number'
                                    ? Object.assign({}, r, { options: Object.assign({}, r.options, { fontSize: Math.round(r.options.fontSize * scale) }) })
                                    : r);
                            }
                            a[1] = opts;
                        }
                        if (Array.isArray(a[0])) {
                            a[0] = a[0].map((r) => r && r.options && typeof r.options.fontSize === 'number'
                                ? Object.assign({}, r, { options: Object.assign({}, r.options, { fontSize: Math.round(r.options.fontSize * scale) }) })
                                : r);
                        }
                    }
                    return origAddText.apply(slide, a);
                };
            }
            return slide;
        };
    }

    async _exportPowerPointShapes() {
        let pptx = new PptxGenJS();
        // All export coordinates are authored for a 13.333" x 7.5" widescreen
        // slide (the PowerPoint default). 'LAYOUT_16x9' is only 10" x 5.625",
        // which made every background/border/text box ~33% too large and
        // overlapping — so define the exact layout the code expects.
        pptx.defineLayout({ name: 'WIDE_1333', width: 13.333, height: 7.5 });
        pptx.layout = 'WIDE_1333';
        const C = this.getTheme();
        // Per-slide Font Size overrides flow into the DOM-measured path above
        // automatically; wrap addText so the hand-authored fallback builders
        // below honor them too.
        this._wrapPptxForFontScale(pptx);
        // Export with a PowerPoint-safe font (Arial / Georgia / Cambria / etc.)
        // instead of the web-only preview font. PptxGenJS cannot embed fonts, so
        // naming e.g. 'Poppins' makes PowerPoint swap it out if that font isn't
        // installed. Using C.pptxFont keeps the generated deck looking identical
        // on every machine. The on-screen PREVIEW still uses the designed font.
        C.font = C.pptxFont || C.font;

        for (const slideData of this.slidesQueue) {
            // Preferred path: rebuild the slide from the MEASURED preview DOM so
            // the exported text positions, sizes and styles match the on-screen
            // preview exactly. Falls back to the hand-authored per-theme blocks
            // below when DOM measurement is unavailable (e.g. unit-test stubs).
            if (await this._exportSlideFromPreview(pptx, slideData, C)) {
                this._activeSlideScale = 1;
                continue;
            }
            // Fallback path: let the addText wrapper apply this slide's font scale.
            this._activeSlideScale = this.getFontScale(slideData);
            // Midnight Aurora renders its own modern slide layout. The font-size
            // min/max rules and the slide-adding rules are identical to the
            // classic templates - only design, colors, font, format & organization differ.
            if (C.layout === 'modern') {
                this.addModernSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'chapel') {
                this.addChapelSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'lilac') {
                this.addLilacSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'rose') {
                this.addRoseSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'mint') {
                this.addMintSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'ember') {
                this.addEmberSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'royal') {
                this.addRoyalSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'bento') {
                this.addBentoSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'poster') {
                this.addPosterSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'glory') {
                this.addGlorySlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'glass') {
                this.addGlassSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'split') {
                this.addSplitSlide(pptx, slideData, C);
                continue;
            } else if (C.layout === 'frost') {
                this.addFrostSlide(pptx, slideData, C);
                continue;
            }
                        if (slideData.type === 'title') {
                let slide = pptx.addSlide();
                slide.background = { color: C.bg };
                // Background glow gradient
                slide.addShape('rect', {
                    x: 0, y: 0, w: '100%', h: '100%',
                    fill: { color: C.bg2, transparency: 55 },
                    line: { type: 'none' }
                });
                // Radial center glow (matches the preview's radial-gradient backdrop)
                slide.addShape('ellipse', {
                    x: 3.5, y: 1.4, w: 6.33, h: 4.6,
                    fill: { color: C.glow, transparency: 65 },
                    line: { type: 'none' }
                });
                // Outer accent border (matches the preview's thick gold frame)
                slide.addShape('rect', {
                    x: 0.05, y: 0.05, w: 13.23, h: 7.4,
                    fill: { type: 'none' },
                    line: { color: C.accent, transparency: 20, width: 3 }
                });
                // Inner double frame
                slide.addShape('rect', {
                    x: 0.2, y: 0.2, w: 12.93, h: 7.1,
                    fill: { type: 'none' },
                    line: { color: C.frame, transparency: 80, width: 1.25 }
                });
                // Split title (auto-balanced two lines); only user-highlighted words are accented
                const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
                const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
                const tN1 = this._line1Count(tWords, tHl.hlIdx);
                const tLine1 = tWords.slice(0, tN1).join(' ');
                const tLine2 = tWords.slice(tN1).join(' ');
                const tRuns = (indices) => indices.map((gi, i) => ({
                    text: (i ? ' ' : '') + tWords[gi],
                    options: tHl.hlIdx.has(gi)
                        ? { fill: { type: 'gradient', color1: C.accent, color2: C.accent2, angle: 0 } }
                        : { color: C.text }
                }));
                // Auto-fit title font so the lines never overlap
                const tChars = Math.max(tLine1.length, tLine2.length, 1);
                const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
                const widthFit = Math.floor(816 / (0.62 * tChars));
                const heightFit = Math.floor(260 / (1.22 * tLines));
                const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
                // Anti-widow arrangement: reflow into lines that FIT the column
                // at the SAME font size (font size is never changed for wrapping).
                const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
                const pitch = titlePt * 1.22 / 72;
                const blockH = tBalanced.length * pitch;
                const titleTop = 0.45 + Math.max(0, (4.6 - blockH) / 2);
                tBalanced.forEach((indices, li) => {
                    slide.addText(tRuns(indices), {
                        x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch,
                        align: 'center', fontFace: C.font, fontSize: titlePt, bold: true,
                        shadow: { type: 'outer', color: '000000', blur: 8, offset: 3, angle: 90, opacity: 0.55 }
                    });
                });
                // Verse (auto-fit so long passages stay clear of the footer).
                // Highlight Word(s) also accent matching phrases in the reference.
                const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
                const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
                const vRuns = vSegs.map((seg) => ({
                    text: seg.text,
                    options: seg.hl
                        ? { fill: { type: 'gradient', color1: C.accent, color2: C.accent2, angle: 0 } }
                        : { color: C.text }
                }));
                slide.addText(vRuns, {
                    x: 1.0, y: 5.55, w: 11.33, h: 0.7,
                    align: 'center', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2,
                    shadow: { type: 'outer', color: '000000', blur: 6, offset: 2, angle: 90, opacity: 0.45 }
                });
                // Footer badge (optional)
                if (slideData.footer) {
                    slide.addShape('roundRect', {
                        x: 4.67, y: 6.35, w: 4.0, h: 0.62, rectRadius: 0.1,
                        fill: { color: C.card, transparency: 10 },
                        line: { color: C.frame, transparency: 50, width: 1 }
                    });
                    slide.addText(slideData.footer, {
                        x: 4.67, y: 6.45, w: 4.0, h: 0.42,
                        align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard
                    });
                }
                        } else if (slideData.type === 'point') {
                let slide = pptx.addSlide();
                slide.background = { color: C.bg };
                // Radial center glow
                slide.addShape('ellipse', {
                    x: 3.5, y: 1.4, w: 6.33, h: 4.6,
                    fill: { color: C.glow, transparency: 65 },
                    line: { type: 'none' }
                });
                // Inner double frame
                slide.addShape('rect', {
                    x: 0.2, y: 0.2, w: 12.93, h: 7.1,
                    fill: { type: 'none' },
                    line: { color: C.frame, transparency: 80, width: 1.25 }
                });
                // Top "POINT" highlight text (no filled banner)
                const badgeText = slideData.badge ? slideData.badge : 'POINT';
                slide.addText(badgeText, {
                    x: 4.67, y: 0.55, w: 4.0, h: 0.4,
                    align: 'center', fontFace: C.font, fontSize: 12, bold: true, color: C.accent, charSpacing: 4
                });
                // Split point title: first words white, last words gold gradient
                const ptWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
                const ptHl = this.computePointHighlight(ptWords, this.getHighlights(slideData));
                const ptLine1 = ptWords.slice(0, ptHl.brIndex + 1);
                const ptLine2 = ptWords.slice(ptHl.brIndex + 1);
                const ptRuns = (indices) => indices.map((gi, i) => ({
                    text: (i ? ' ' : '') + ptWords[gi],
                    options: ptHl.hlIdx.has(gi)
                        ? { color: C.hl }
                        : { color: C.text }
                }));
                // Rules-based sizing: estimate how many lines the point wraps to,
                // then pick the title font size from a tier table. Point text is
                // much bigger than the verse tiers (min & max).
                const ptLines = (ptLine1.length ? 1 : 0) + (ptLine2.length ? 1 : 0);
                const ptCharsPerLine = Math.max(8, Math.floor(816 / (0.62 * 38))); // ~34 chars at mid size
                const ptLongestLine = Math.max(ptLine1.join(' ').length, ptLine2.join(' ').length, 1);
                const ptEstLines = Math.max(ptLines, Math.ceil(ptLongestLine / ptCharsPerLine));
                const titlePt = this.headlinePt(ptEstLines);
                // Anti-widow arrangement: reflow into lines that FIT the column
                // at the SAME font size.
                const ptBalanced = this._balanceHeadline(ptWords, ptHl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
                const pitch = titlePt * 1.22 / 72;
                const blockH = ptBalanced.length * pitch;
                const titleTop = 2.2 + Math.max(0, (2.4 - blockH) / 2);
                ptBalanced.forEach((indices, li) => {
                    slide.addText(ptRuns(indices), {
                        x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch,
                        align: 'center', fontFace: C.font, fontSize: titlePt, bold: true
                    });
                });
                // Bottom sub-point card
                if (slideData.desc) {
                    slide.addShape('roundRect', {
                        x: 3.0, y: 6.05, w: 7.33, h: 0.78, rectRadius: 0.08,
                        fill: { color: C.card, transparency: 10 },
                        line: { color: C.frame, transparency: 50, width: 1 }
                    });
                    slide.addText(slideData.desc, {
                        x: 3.0, y: 6.16, w: 7.33, h: 0.55,
                        align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard
                    });
                }
            } else if (slideData.type === 'verse') {
                let slide = pptx.addSlide();
                slide.background = { color: C.bg };
                // Radial center glow
                slide.addShape('ellipse', {
                    x: 3.5, y: 1.4, w: 6.33, h: 4.6,
                    fill: { color: C.glow, transparency: 65 },
                    line: { type: 'none' }
                });
                // Inner double frame
                slide.addShape('rect', {
                    x: 0.2, y: 0.2, w: 12.93, h: 7.1,
                    fill: { type: 'none' },
                    line: { color: C.frame, transparency: 80, width: 1.25 }
                });
                // Reference card (dark fill + gold left accent bar)
                const refText = slideData.ref || '';
                const refWidth = Math.max(2.0, Math.min(8.0, refText.length * 0.18));
                const refX = (13.33 - refWidth) / 2;
                slide.addShape('rect', { x: refX, y: 2.25, w: refWidth, h: 0.68, fill: { color: C.card }, line: { type: 'none' } });
                slide.addShape('rect', { x: refX, y: 2.25, w: 0.12, h: 0.68, fill: { color: C.accent }, line: { type: 'none' } });
                slide.addText(refText, {
                    x: refX, y: 2.34, w: refWidth, h: 0.5,
                    align: 'center', fontFace: C.font, fontSize: 16, bold: true, color: C.accent, charSpacing: 2
                });
                // Main verse text (unified MIN/MID/MAX headline rule)
                const textLen = Math.max(String(slideData.text || '').length, 1);
                                const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30))); // ~46 chars at current size
                const bodyPt = this._bodyPtFit(textLen, charsPerLine, 2.8, this._themeIsSerif());
                slide.addText(`"${slideData.text}"`, {
                    x: 1.0, y: 3.2, w: 11.33, h: 2.8,
                    align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, color: C.text, breakLine: false
                });
                // Bottom version metadata
                slide.addText(slideData.version, {
                    x: 2.0, y: 6.3, w: 9.33, h: 0.4,
                    align: 'center', fontFace: C.font, fontSize: 12, bold: true, color: C.accent, transparency: 30
                });
            } else if (slideData.type === 'message') {
                let slide = pptx.addSlide();
                slide.background = { color: C.bg };
                // Radial center glow
                slide.addShape('ellipse', {
                    x: 3.5, y: 1.4, w: 6.33, h: 4.6,
                    fill: { color: C.glow, transparency: 65 },
                    line: { type: 'none' }
                });
                // Inner double frame
                slide.addShape('rect', {
                    x: 0.2, y: 0.2, w: 12.93, h: 7.1,
                    fill: { type: 'none' },
                    line: { color: C.frame, transparency: 80, width: 1.25 }
                });
                                // Message body — height-fit to the 3.6" body box so very long
                // messages never overflow the footer (tier is the upper bound;
                // short / mid messages keep their headline font size).
                const mText = slideData.text || '';
                const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40))); // ~35 chars at mid size
                const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.6, this._themeIsSerif());
                // Top reference (optional)
                if (slideData.ref) {
                    slide.addText(slideData.ref, {
                        x: 2.0, y: 0.5, w: 9.33, h: 0.4,
                        align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2
                    });
                }
                // Main message text (highlighted phrases get the gold gradient)
                const msgSegs = this.splitHighlightSegments(slideData.text, this.getHighlights(slideData));
                const msgRuns = msgSegs.map((seg) => ({
                    text: seg.text,
                    options: seg.hl
                        ? { color: C.hl }
                        : { color: C.text }
                }));
                slide.addText(msgRuns, {
                    x: 1.0, y: 2.2, w: 11.33, h: 3.6,
                    align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false
                });
                // Bottom footer (optional)
                if (slideData.footer) {
                    slide.addText(slideData.footer, {
                        x: 2.0, y: 6.3, w: 9.33, h: 0.4,
                        align: 'center', fontFace: C.font, fontSize: 12, bold: true, color: C.accent, transparency: 30
                    });
                }
            }
        }

        this._activeSlideScale = 1; // Font Scale only applies inside the fallback loop.

        try {
            // Use a Blob URL (not a data: URL) — Chrome cancels data: URL
            // downloads on large decks, while Blob downloads always work.
            const blob = await pptx.write({ outputType: 'blob' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'SlideCraft-Presentation-Editable.pptx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 10000);
            this.showToast(`Downloading SlideCraft-Presentation-Editable.pptx (${this.slidesQueue.length} slide${this.slidesQueue.length > 1 ? 's' : ''}).`, 'success');
        } catch (err) {
            console.error(err);
            this.showToast('Export failed: ' + err.message, 'error');
        }
    }

    // Image-based PPTX export: capture each slide's live preview with
    // html2canvas (the same proven technique as the old PDF export) and embed it as a
    // full-bleed picture on a 13.333" x 7.5" slide. Pixel-perfect for every
    // theme — glows, gradients and web fonts render exactly as on screen.
    // Trade-off: slide text is part of the picture (not editable in PowerPoint).

    // html2canvas cannot paint `background-clip: text` gradient highlights —
    // it draws the gradient as a SOLID RECTANGLE with transparent text on top.
    // For EVERY export capture (PPTX image + PDF) made with html2canvas, swap
    // those gradient-clip classes for a solid accent color of the same family.
    // html-to-image (preferred) renders the real DOM instead, so the gradient
    // is preserved there — this substitution only runs as an html2canvas fallback.
    _exportSafeSlideHtml(html) {
        const map = [
            // Sermon Classic gold
            ['text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFF3B0] to-[#FFD700]', 'text-[#FFD700]'],
            // Midnight Aurora cyan/violet
            ['text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#A78BFA]', 'text-[#7DD3FC]'],
            // Forest Chapel brass
            ['text-transparent bg-clip-text bg-gradient-to-r from-[#D9B36C] via-[#F4E4BC] to-[#D9B36C]', 'text-[#F4E4BC]'],
            // Ember & Gold amber
            ['text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#FB923C]', 'text-[#FBBF24]'],
            // Royal Sapphire sapphire
            ['text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#FBBF4F]', 'text-[#3B82F6]']
        ];
        let out = html;
        for (const [from, to] of map) out = out.split(from).join(to);
        // Safety net: if any gradient-clip highlight survived the map, fall back
        // to a plain accent span so it can never capture as a solid rectangle.
        out = out.replace(/text-transparent bg-clip-text bg-gradient-to-r from-\[#[0-9A-Fa-f]{6}\][^"']*/g, 'text-[#FFD700]');
        return out;
    }

    async _exportPowerPointFromImages() {
        const pptx = new PptxGenJS();
        pptx.defineLayout({ name: 'WIDE_1333', width: 13.333, height: 7.5 });
        pptx.layout = 'WIDE_1333';

        const C = this.getTheme();
        const bgFallback = '#' + (C.bg || '0B192C');

        const host = document.createElement('div');
        host.style.position = 'fixed';
        host.style.left = '-9999px';
        host.style.top = '0';
        // Capture at the SAME pixel width the user actually sees. Slide text is
        // sized in cqw (container-relative) while margins/gaps are fixed px, so
        // capturing at a different width than the on-screen preview changes the
        // spacing proportions (e.g. title vs scripture reference drift together).
        if (this.slidesQueue.length > 0 && this.selectedPreview < 0) {
            this.selectedPreview = 0;
            this.renderPreview();
        }
        // Try each visible preview surface in turn; a hidden one (display:none)
        // still matches the selector but measures 0, so require a real width.
        let previewW = 0;
        for (const sel of ['#slide-preview > .relative', '#enlarged-slide > .relative']) {
            const el = document.querySelector(sel);
            if (!el) continue;
            const w = el.getBoundingClientRect().width;
            if (w >= 320 && w <= 1600) { previewW = w; break; }
        }
        // Fall back to the last width measured while a preview was on screen
        // (e.g. exporting from step 1/2 where the builder preview is hidden).
        if (!previewW && this._lastPreviewW >= 320 && this._lastPreviewW <= 1600) {
            previewW = this._lastPreviewW;
        }
        const captureW = previewW ? Math.round(previewW) : 1280;
        host.style.width = captureW + 'px';
        host.style.zIndex = '-1';
        host.style.pointerEvents = 'none';
        document.body.appendChild(host);
        // Keep resolution high regardless of preview width (aim ~1920px capture).
        const imgScale = Math.min(3, Math.max(2, 1920 / captureW));

        try {
            this.showToast(`Building PPTX (${this.slidesQueue.length} slide${this.slidesQueue.length > 1 ? 's' : ''})…`, 'info');
            if (document.fonts && document.fonts.ready) await document.fonts.ready;

            for (const slideData of this.slidesQueue) {
                // html-to-image renders the true preview (gradients + fonts).
                // Only the html2canvas fallback needs the solid-color swap.
                host.innerHTML = this._hasHtmlToImage()
                    ? this.renderSlideVisual(slideData)
                    : this._exportSafeSlideHtml(this.renderSlideVisual(slideData));
                await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
                if (document.fonts && document.fonts.ready) await document.fonts.ready;

                const slideEl = host.firstElementChild;
                if (!slideEl) continue;
                this._applyThemeBg(slideEl);

                const canvas = await this._captureSlideToCanvas(slideEl, imgScale, bgFallback);
                // JPEG @ 92% (same as the PDF export) keeps decks a sane size —
                // PNG made gradient-heavy themes ~3 MB per slide.
                pptx.addSlide().addImage({
                    data: canvas.toDataURL('image/jpeg', 0.92),
                    x: 0, y: 0, w: 13.333, h: 7.5
                });
            }
        } finally {
            document.body.removeChild(host);
        }

        // Use a Blob URL (not a data: URL) — Chrome cancels data: URL
        // downloads on large decks, while Blob downloads always work.
        const blob = await pptx.write({ outputType: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'SlideCraft-Presentation.pptx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        this.showToast(`Downloading SlideCraft-Presentation.pptx (${this.slidesQueue.length} slide${this.slidesQueue.length > 1 ? 's' : ''}).`, 'success');
    }

    // ─── Capture engine ────────────────────────────────────────────────────
    // html-to-image renders the DOM through an SVG <foreignObject>: the browser
    // itself paints the pixels, so gradient-clip highlights, glows and every
    // font look EXACTLY like the live preview. html2canvas re-draws text and
    // cannot paint `background-clip: text`, so it stays only as a fallback.
    _hasHtmlToImage() {
        return typeof window !== 'undefined' &&
            !!window.htmlToImage && typeof window.htmlToImage.toCanvas === 'function';
    }

    // Capture a rendered slide element to a canvas at high resolution.
    async _captureSlideToCanvas(el, scale, backgroundColor) {
        if (this._hasHtmlToImage()) {
            try {
                return await window.htmlToImage.toCanvas(el, {
                    pixelRatio: scale,
                    backgroundColor: backgroundColor || null,
                    cacheBust: true
                });
            } catch (e) {
                try { console.warn('html-to-image capture failed; falling back to html2canvas.', e); } catch (e2) { /* noop */ }
            }
        }
        if (typeof window !== 'undefined' && typeof window.html2canvas === 'function') {
            return window.html2canvas(el, {
                scale: scale || 1,
                useCORS: true,
                backgroundColor: backgroundColor,
                logging: false
            });
        }
        throw new Error('No capture engine available — check your internet connection and refresh.');
    }

    // PDF export: renders each slide through the SAME live-preview capture
    // pipeline as the image-based PPTX (browser screenshot of the rendered
    // slide), so the PDF is pixel-accurate to what the user sees on screen —
    // gradient highlights, glows, web fonts and all.
    async exportPDF() {
        if (this.slidesQueue.length === 0) {
            this.showToast('Please add at least one slide before exporting.', 'error');
            return;
        }
        if (!window.jspdf || !window.jspdf.jsPDF) {
            this.showToast('PDF library failed to load — check your internet connection and refresh.', 'error');
            return;
        }
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'in', format: [13.333, 7.5], compress: true });

        const C = this.getTheme();
        const bgFallback = '#' + (C.bg || '0B192C');

        const host = document.createElement('div');
        host.style.position = 'fixed';
        host.style.left = '-9999px';
        host.style.top = '0';
        // Same capture-width rule as _exportPowerPointFromImages: slide text is
        // sized in cqw (container-relative) while margins/gaps are fixed px, so
        // we capture at the SAME pixel width the user actually sees on screen.
        if (this.slidesQueue.length > 0 && this.selectedPreview < 0) {
            this.selectedPreview = 0;
            this.renderPreview();
        }
        let previewW = 0;
        for (const sel of ['#slide-preview > .relative', '#enlarged-slide > .relative']) {
            const el = document.querySelector(sel);
            if (!el) continue;
            const w = el.getBoundingClientRect().width;
            if (w >= 320 && w <= 1600) { previewW = w; break; }
        }
        if (!previewW && this._lastPreviewW >= 320 && this._lastPreviewW <= 1600) {
            previewW = this._lastPreviewW;
        }
        const captureW = previewW ? Math.round(previewW) : 1280;
        host.style.width = captureW + 'px';
        host.style.zIndex = '-1';
        host.style.pointerEvents = 'none';
        document.body.appendChild(host);
        const imgScale = Math.min(3, Math.max(2, 1920 / captureW));

        try {
            this.showToast(`Building PDF (${this.slidesQueue.length} slide${this.slidesQueue.length > 1 ? 's' : ''})…`, 'info');
            if (document.fonts && document.fonts.ready) await document.fonts.ready;

            let first = true;
            for (const slideData of this.slidesQueue) {
                // html-to-image renders the true preview (gradients + fonts).
                // Only the html2canvas fallback needs the solid-color swap.
                host.innerHTML = this._hasHtmlToImage()
                    ? this.renderSlideVisual(slideData)
                    : this._exportSafeSlideHtml(this.renderSlideVisual(slideData));
                await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
                if (document.fonts && document.fonts.ready) await document.fonts.ready;

                const slideEl = host.firstElementChild;
                if (!slideEl) continue;
                this._applyThemeBg(slideEl);

                const canvas = await this._captureSlideToCanvas(slideEl, imgScale, bgFallback);
                if (!first) pdf.addPage([13.333, 7.5], 'landscape');
                first = false;
                // JPEG @ 92% matches the PPTX image export — good quality, sane size.
                pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, 13.333, 7.5);
            }
        } finally {
            document.body.removeChild(host);
        }

        pdf.save('SlideCraft-Presentation.pdf');
        this.showToast(`Downloading SlideCraft-Presentation.pdf (${this.slidesQueue.length} slide${this.slidesQueue.length > 1 ? 's' : ''}).`, 'success');
    }

    // Convert a computed CSS color (rgb/rgba) into {hex, alpha}
    _parseCssColor(str) {
        if (!str) return null;
        const m = /rgba?\(([^)]+)\)/.exec(str);
        if (!m) return null;
        const parts = m[1].split(',').map((p) => parseFloat(p));
        if (parts.length < 3 || parts.slice(0, 3).some((n) => isNaN(n))) return null;
        const hex = parts.slice(0, 3)
            .map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0'))
            .join('');
        return { hex, alpha: parts.length > 3 ? parts[3] : 1 };
    }

    async _exportSlideFromPreview(pptx, slideData, C) {
        // The preview HTML already carries the per-slide Font Scale, so make the
        // addText wrapper a no-op for the DOM-measured path (no double-scaling).
        this._activeSlideScale = 1;
        // Rebuild the PPTX slide from the MEASURED preview DOM: every text block
        // is placed at its on-screen position, at the on-screen font size/style,
        // so the exported deck matches the preview (and the PDF) 1:1.
        // Returns false when measurement is unavailable (unit-test stubs) so the
        // caller falls back to the hand-authored per-theme export blocks.
        let host = null;
        try {
            if (typeof document === 'undefined' || !document.body || !document.createElement) return false;
            host = document.createElement('div');
            host.style.cssText = 'position:absolute;left:-99999px;top:0;width:1280px;';
            host.innerHTML = this.renderSlideVisual(slideData);
            document.body.appendChild(host);
            const root = host.firstElementChild;
            if (!root || !root.getBoundingClientRect) return false;

            await new Promise((res) => {
                if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => requestAnimationFrame(res));
                else setTimeout(res, 60);
            });
            if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) { /* noop */ } }

            const base = root.getBoundingClientRect();
            if (!base || base.width < 50 || base.height < 50) return false;
            const sx = 13.333 / base.width, sy = 7.5 / base.height;
            const PX2PT = 0.75; // 1280px == 13.333in == 960pt
            const hlColor = C.hl || C.accent;
            const classStr = (el) => (typeof el.className === 'string' ? el.className : (el.className && el.className.baseVal) || '');
            const childEls = (el) => Array.from(el.children || []);
            const isHlEl = (el) => /bg-clip-text/.test(classStr(el));
            const relRect = (el) => {
                const r = el.getBoundingClientRect();
                return { x: (r.left - base.left) * sx, y: (r.top - base.top) * sy, w: r.width * sx, h: r.height * sy, pw: r.width, ph: r.height };
            };

            const rootCs = getComputedStyle(root);

            // ---- pass 1a: collect text blocks (leaf blocks + their inline runs) ----
            const texts = [];
            const claimed = new Set();
            const collectText = (el) => {
                for (const child of childEls(el)) {
                    const cs = getComputedStyle(child);
                    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
                    const hasDirect = Array.from(child.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);
                    if (hasDirect) {
                        const rect = relRect(child);
                        if (rect.pw >= 2 && rect.ph >= 4) {
                            const baseColor = (this._parseCssColor(cs.color) || {}).hex || 'FFFFFF';
                            const runs = [];
                            // Gradient-clipped highlight text (e.g. gold→amber) renders
                            // as a gradient in the preview; in PPTX we approximate it
                            // with the gradient's own leading color so the run matches
                            // what the eye actually sees instead of a generic theme color.
                            const gradColorOf = (el) => {
                                const m = /rgba?\([^)]+\)/.exec(getComputedStyle(el).backgroundImage || '');
                                return m ? ((this._parseCssColor(m[0]) || {}).hex || null) : null;
                            };
                            const pushRuns = (elm, inheritedHl, inheritedColor) => {
                                for (const n of Array.from(elm.childNodes)) {
                                    if (n.nodeType === 3) {
                                        const txt = n.textContent;
                                        if (txt.trim().length) runs.push({ text: txt, color: inheritedColor });
                                    } else if (n.nodeType === 1) {
                                        const nHl = inheritedHl || isHlEl(n);
                                        const ncs = getComputedStyle(n);
                                        let nColor;
                                        if (nHl) {
                                            nColor = (!inheritedHl ? gradColorOf(n) : null) || hlColor;
                                        } else {
                                            // Use the element's own color (chips, footers,
                                            // subtitles often differ from the block color)
                                            nColor = (this._parseCssColor(ncs.color) || {}).hex || inheritedColor;
                                        }
                                        pushRuns(n, nHl, nColor);
                                    }
                                }
                            };
                            pushRuns(child, false, baseColor);
                            if (runs.length) {
                                const tt = cs.textTransform === 'uppercase' ? (s2) => s2.toUpperCase()
                                    : cs.textTransform === 'lowercase' ? (s2) => s2.toLowerCase() : null;
                                const fsPx = parseFloat(cs.fontSize) || 24;
                                const lhPx = cs.lineHeight === 'normal' ? fsPx * 1.2 : (parseFloat(cs.lineHeight) || fsPx * 1.2);
                                const fw = parseInt(cs.fontWeight, 10) || 400;
                                const ta = cs.textAlign;
                                texts.push({
                                    rect,
                                    runs: runs.map((r) => ({ text: tt ? tt(r.text) : r.text, color: r.color })),
                                    fontSize: Math.max(6, Math.round(fsPx * PX2PT * 10) / 10),
                                    lineSpacing: Math.max(6, Math.round(lhPx * PX2PT * 10) / 10),
                                    bold: fw >= 600,
                                    italic: cs.fontStyle === 'italic',
                                    align: ta === 'center' ? 'center' : (ta === 'right' || ta === 'end') ? 'right' : 'left'
                                });
                            }
                        }
                        claimed.add(child);
                        child.querySelectorAll('*').forEach((d) => claimed.add(d));
                    } else {
                        collectText(child);
                    }
                }
            };
            collectText(root);

            // ---- pass 1b: collect decoration shapes (chips, frames, cards) ----
            const shapes = [];
            const walkShapes = (el) => {
                for (const child of childEls(el)) {
                    if (!claimed.has(child)) {
                        const cs = getComputedStyle(child);
                        if (cs.display !== 'none' && cs.visibility !== 'hidden') {
                            const rect = relRect(child);
                            if (rect.pw >= 2 && rect.ph >= 2 && cs.backgroundImage === 'none') {
                                const bg = this._parseCssColor(cs.backgroundColor);
                                const bws = [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].map((v) => parseFloat(v) || 0);
                                const bw = Math.max.apply(null, bws);
                                const bc = this._parseCssColor(cs.borderTopColor);
                                const evenBorder = bws.every((v) => Math.abs(v - bws[0]) < 0.5);
                                const hasBg = !!(bg && bg.alpha > 0.06);
                                const hasLine = !!(evenBorder && bw >= 1 && bc && bc.alpha > 0.05);
                                if (hasBg || hasLine) {
                                    const radius = parseFloat(cs.borderTopLeftRadius) || 0;
                                    const sopts = { x: rect.x, y: rect.y, w: rect.w, h: rect.h };
                                    sopts.fill = hasBg ? { color: bg.hex, transparency: Math.round((1 - bg.alpha) * 100) } : { type: 'none' };
                                    sopts.line = hasLine ? { color: bc.hex, width: Math.max(0.75, bw * PX2PT) } : { type: 'none' };
                                    shapes.push({ type: radius > 2 ? 'roundRect' : 'rect', opts: sopts, radius: radius * sx });
                                }
                            }
                        }
                    }
                    walkShapes(child);
                }
            };
            walkShapes(root);

            // ---- pass 2: emit the slide (only after both passes succeeded) ----
            const slide = pptx.addSlide();
            const rootBg = this._parseCssColor(rootCs.backgroundColor);
            slide.background = { color: (rootBg && rootBg.hex) || C.bg || '0B192C' };
            for (const s of shapes) {
                if (s.type === 'roundRect') s.opts.rectRadius = s.radius;
                slide.addShape(s.type, s.opts);
            }
            // Slide container border (the 6px theme frame on the root element)
            const rbw = parseFloat(rootCs.borderTopWidth) || 0;
            const rbc = this._parseCssColor(rootCs.borderTopColor);
            if (rbw >= 2 && rbc && rbc.alpha > 0.05) {
                slide.addShape('rect', {
                    x: 0.02, y: 0.02, w: 13.293, h: 7.46,
                    fill: { type: 'none' },
                    line: { color: rbc.hex, width: Math.max(0.75, rbw * PX2PT) }
                });
            }
            for (const t of texts) {
                const topts = {
                    x: t.rect.x, y: t.rect.y,
                    w: Math.max(t.rect.w, 0.2), h: Math.max(t.rect.h, 0.2),
                    align: t.align, fontFace: C.font, fontSize: t.fontSize,
                    bold: t.bold, italic: t.italic,
                    lineSpacing: t.lineSpacing, margin: 0, valign: 'top'
                };
                if (t.runs.length === 1) {
                    slide.addText(t.runs[0].text, Object.assign({ color: t.runs[0].color }, topts));
                } else {
                    slide.addText(t.runs.map((r) => ({ text: r.text, options: { color: r.color } })), topts);
                }
            }
            return true;
        } catch (e) {
            try { console.warn('preview-measured export unavailable:', e && e.message); } catch (e2) { /* noop */ }
            return false;
        } finally {
            if (host && host.parentNode) { try { host.parentNode.removeChild(host); } catch (e3) { /* noop */ } }
        }
    }

    // ============================================================
    // Midnight Aurora - modern layout PPTX export
    // Different design / colors / font / format / organization, but
    // the SAME font-size min/max rules (identical pt tier tables) and
    // the same slide content rules as the classic templates.
    // ============================================================
    addModernSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            // Diagonal gradient base
            slide.addShape('rect', {
                x: 0, y: 0, w: '100%', h: '100%',
                fill: { color: C.bg2, transparency: 55 },
                line: { type: 'none' }
            });
            // Top-right geometric accent block
            slide.addShape('roundRect', {
                x: 8.6, y: -1.4, w: 6.6, h: 5.0, rectRadius: 0.4,
                fill: { color: C.accent, transparency: 75 },
                line: { type: 'none' },
                rotate: 12
            });
            // Bottom-left diamond outline
            slide.addShape('rect', {
                x: -0.7, y: 4.4, w: 1.6, h: 1.6,
                fill: { type: 'none' },
                line: { color: C.accent, transparency: 75, width: 1.5 },
                rotate: 45
            });
            // Left vertical accent bar
            slide.addShape('rect', {
                x: 0, y: 0, w: 0.22, h: 7.5,
                fill: { color: C.accent },
                line: { type: 'none' }
            });
        };
        const addFooterStrip = (slide, text) => {
            if (!text) return;
            slide.addShape('rect', {
                x: 0, y: 6.55, w: 13.33, h: 0.95,
                fill: { color: C.card, transparency: 20 },
                line: { color: C.frame, transparency: 60, width: 1 }
            });
            slide.addText(text, {
                x: 1.0, y: 6.72, w: 11.0, h: 0.55,
                align: 'left', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard, charSpacing: 2
            });
        };

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Split title (auto-balanced two lines); only user-highlighted words are accented
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({
                text: (i ? ' ' : '') + tWords[gi],
                options: tHl.hlIdx.has(gi)
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(260 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const titleTop = 1.55 + Math.max(0, (3.2 - blockH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), {
                    x: 1.0, y: titleTop + li * pitch, w: 11.0, h: pitch,
                    align: 'left', fontFace: C.font, fontSize: titlePt, bold: true
                });
            });
            // Verse (same auto-fit rule as classic); highlights apply to the reference too
            const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
            const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
            const vRuns = vSegs.map((seg) => ({
                text: seg.text,
                options: seg.hl
                    ? { color: C.hl }
                    : { color: C.accent }
            }));
            slide.addText(vRuns, {
                x: 1.0, y: 5.2, w: 11.0, h: 0.6,
                align: 'left', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2
            });
            addFooterStrip(slide, slideData.footer);
        } else if (slideData.type === 'point') {

            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Top-left point highlight text (no filled chip)
            const badgeText = slideData.badge ? slideData.badge : 'POINT';
            slide.addText(badgeText, {
                x: 1.0, y: 0.55, w: 3.0, h: 0.4,
                align: 'left', fontFace: C.font, fontSize: 12, bold: true, color: C.accent, charSpacing: 4
            });
            // Split point title + highlight runs (same rules as classic, min 30 / max 48 pt)
            const ptWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const ptHl = this.computePointHighlight(ptWords, this.getHighlights(slideData));
            const ptLine1 = ptWords.slice(0, ptHl.brIndex + 1);
            const ptLine2 = ptWords.slice(ptHl.brIndex + 1);
            const ptRuns = (indices) => indices.map((gi, i) => ({
                text: (i ? ' ' : '') + ptWords[gi],
                options: ptHl.hlIdx.has(gi)
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            const ptLines = (ptLine1.length ? 1 : 0) + (ptLine2.length ? 1 : 0);
            const ptCharsPerLine = Math.max(8, Math.floor(816 / (0.62 * 38)));
            const ptLongestLine = Math.max(ptLine1.join(' ').length, ptLine2.join(' ').length, 1);
            const ptEstLines = Math.max(ptLines, Math.ceil(ptLongestLine / ptCharsPerLine));
            const titlePt = this.headlinePt(ptEstLines);
            const ptBalanced = this._balanceHeadline(ptWords, ptHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = ptBalanced.length * pitch;
            const titleTop = 1.7 + Math.max(0, (2.9 - blockH) / 2);
            ptBalanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), {
                    x: 1.0, y: titleTop + li * pitch, w: 11.0, h: pitch,
                    align: 'left', fontFace: C.font, fontSize: titlePt, bold: true
                });
            });
            // Bottom description strip (full-width, left accent bar)
            if (slideData.desc) {
                slide.addShape('rect', {
                    x: 0, y: 6.55, w: 13.33, h: 0.95,
                    fill: { color: C.card, transparency: 20 },
                    line: { color: C.frame, transparency: 60, width: 1 }
                });
                slide.addShape('rect', {
                    x: 1.0, y: 6.68, w: 0.1, h: 0.7,
                    fill: { color: C.accent },
                    line: { type: 'none' }
                });
                slide.addText(slideData.desc, {
                    x: 1.35, y: 6.72, w: 10.6, h: 0.55,
                    align: 'left', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard
                });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Reference chip (left, square with accent edge)
            if (slideData.ref) {
                const refW = Math.max(2.0, Math.min(6.0, slideData.ref.length * 0.18));
                slide.addShape('rect', {
                    x: 1.0, y: 0.55, w: refW, h: 0.6,
                    fill: { color: C.card },
                    line: { color: C.accent, transparency: 50, width: 1 }
                });
                slide.addShape('rect', {
                    x: 1.0, y: 0.55, w: 0.12, h: 0.6,
                    fill: { color: C.accent },
                    line: { type: 'none' }
                });
                slide.addText(slideData.ref, {
                    x: 1.35, y: 0.62, w: refW - 0.35, h: 0.46,
                    align: 'left', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2
                });
            }
            // Verse body (same tier rules as classic: 2-line 40, 3-line 30, 4-line 26, 5+ line 22)
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            slide.addText(`"${slideData.text}"`, {
                x: 1.0, y: 1.9, w: 11.0, h: 3.6,
                align: 'left', fontFace: C.font, fontSize: bodyPt, bold: true, color: C.text, breakLine: false
            });
            // Version rendered in the footer strip
            addFooterStrip(slide, slideData.version);
        } else if (slideData.type === 'message') {

            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Top reference kicker (left)
            if (slideData.ref) {
                const refW = Math.max(2.0, Math.min(6.0, slideData.ref.length * 0.18));
                slide.addShape('rect', {
                    x: 1.0, y: 0.55, w: refW, h: 0.5,
                    fill: { color: C.card },
                    line: { color: C.accent, transparency: 50, width: 1 }
                });
                slide.addShape('rect', {
                    x: 1.0, y: 0.55, w: 0.12, h: 0.5,
                    fill: { color: C.accent },
                    line: { type: 'none' }
                });
                slide.addText(slideData.ref, {
                    x: 1.35, y: 0.62, w: refW - 0.35, h: 0.38,
                    align: 'left', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2
                });
            }
            // Message body (same tier rules as classic: 2-line 48, 3-line 40, 4-line 36, 5+ line 30)
                        const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(slideData.text || '').length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const msgSegs = this.splitHighlightSegments(slideData.text, this.getHighlights(slideData));
            const msgRuns = msgSegs.map((seg) => ({
                text: seg.text,
                options: seg.hl
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            slide.addText(msgRuns, {
                x: 1.0, y: 1.9, w: 11.0, h: 3.9,
                align: 'left', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false
            });
            addFooterStrip(slide, slideData.footer);
        }
    }


    // ============================================================
    // Forest Chapel - ornate centered layout PPTX export
    // A different DESIGN / COLOR / FONT STYLE / FORMAT / ORGANIZATION
    // (centered "chapel" layout with ornamental gold dividers), but the
    // font-size rules are identical to the classic templates (same pt
    // tier tables / auto-fit bounds, including the +8pt title headline).
    // ============================================================
    addChapelSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            // Diagonal gradient base
            slide.addShape('rect', {
                x: 0, y: 0, w: '100%', h: '100%',
                fill: { color: C.bg2, transparency: 55 },
                line: { type: 'none' }
            });
            // Soft radial center glow
            slide.addShape('ellipse', {
                x: 3.4, y: 1.2, w: 6.5, h: 5.0,
                fill: { color: C.glow, transparency: 68 },
                line: { type: 'none' }
            });
            // Double frame
            slide.addShape('rect', {
                x: 0.2, y: 0.2, w: 12.93, h: 7.1,
                fill: { type: 'none' },
                line: { color: C.frame, transparency: 75, width: 1.25 }
            });
            // Gold corner accents
            const tick = (x, y) => slide.addShape('rect', {
                x: x, y: y, w: 0.65, h: 0.05,
                fill: { color: C.accent }, line: { type: 'none' }
            });
            tick(0.2, 0.2); tick(12.48, 0.2); tick(0.2, 7.25); tick(12.48, 7.25);
        };
        const addDivider = (slide, y) => {
            // Ornamental centered divider: gold rule - diamond - gold rule
            slide.addShape('rect', { x: 5.15, y: y + 0.05, w: 2.6, h: 0.035, fill: { color: C.accent }, line: { type: 'none' } });
            slide.addShape('rect', { x: 6.56, y: y, w: 0.21, h: 0.21, fill: { color: C.accent }, line: { type: 'none' }, rotate: 45 });
            slide.addShape('rect', { x: 7.98, y: y + 0.05, w: 2.6, h: 0.035, fill: { color: C.accent }, line: { type: 'none' } });
        };
        const addCenteredPill = (slide, text, y, h) => {
            const w = Math.max(2.0, Math.min(6.0, String(text || '').length * 0.18));
            slide.addShape('roundRect', {
                x: (13.33 - w) / 2, y: y, w: w, h: h, rectRadius: 0.08,
                fill: { color: C.card, transparency: 15 },
                line: { color: C.accent, transparency: 50, width: 1 }
            });
            return w;
        };

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            addDivider(slide, 0.55);
            // Split title (auto-balanced two lines); only user-highlighted words are accented
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({
                text: (i ? ' ' : '') + tWords[gi],
                options: tHl.hlIdx.has(gi)
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(260 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            // Scripture Reference sits directly beneath the title (like templates 1 & 2)
            const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
            const verseGap = 0.3;
            const verseH = 0.7;
            const groupH = blockH + verseGap + verseH;
            const titleTop = 0.75 + Math.max(0, (4.4 - groupH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), {
                    x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch,
                    align: 'center', fontFace: C.font, fontSize: titlePt, bold: true
                });
            });
            const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
            const vRuns = vSegs.map((seg) => ({
                text: seg.text,
                options: seg.hl
                    ? { color: C.hl }
                    : { color: C.accent }
            }));
            slide.addText(vRuns, {
                x: 1.0, y: titleTop + blockH + verseGap, w: 11.33, h: verseH,
                align: 'center', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2
            });
            // Bottom ornamental divider + ministry name
            if (slideData.footer) {
                addDivider(slide, 6.15);
                slide.addText(slideData.footer, {
                    x: 2.0, y: 6.5, w: 9.33, h: 0.5,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard
                });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Top centered point highlight text (no gold pill)
            const badgeText = slideData.badge ? slideData.badge : 'POINT';
            slide.addText(badgeText, {
                x: 4.67, y: 0.55, w: 4.0, h: 0.4,
                align: 'center', fontFace: C.font, fontSize: 12, bold: true, color: C.accent2, charSpacing: 4
            });
            // Split point title + highlight runs (same rules as classic, min 30 / max 48 pt)
            const ptWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const ptHl = this.computePointHighlight(ptWords, this.getHighlights(slideData));
            const ptLine1 = ptWords.slice(0, ptHl.brIndex + 1);
            const ptLine2 = ptWords.slice(ptHl.brIndex + 1);
            const ptRuns = (indices) => indices.map((gi, i) => ({
                text: (i ? ' ' : '') + ptWords[gi],
                options: ptHl.hlIdx.has(gi)
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            const ptLines = (ptLine1.length ? 1 : 0) + (ptLine2.length ? 1 : 0);
            const ptCharsPerLine = Math.max(8, Math.floor(816 / (0.62 * 38)));
            const ptLongestLine = Math.max(ptLine1.join(' ').length, ptLine2.join(' ').length, 1);
            const ptEstLines = Math.max(ptLines, Math.ceil(ptLongestLine / ptCharsPerLine));
            const titlePt = this.headlinePt(ptEstLines);
            const ptBalanced = this._balanceHeadline(ptWords, ptHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = ptBalanced.length * pitch;
            const titleTop = 1.7 + Math.max(0, (2.9 - blockH) / 2);
            ptBalanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), {
                    x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch,
                    align: 'center', fontFace: C.font, fontSize: titlePt, bold: true
                });
            });
            // Bottom description card (centered)
            if (slideData.desc) {
                slide.addShape('roundRect', {
                    x: 2.6, y: 6.15, w: 8.13, h: 0.62, rectRadius: 0.1,
                    fill: { color: C.card, transparency: 15 },
                    line: { color: C.frame, transparency: 50, width: 1 }
                });
                slide.addText(slideData.desc, {
                    x: 2.6, y: 6.24, w: 8.13, h: 0.44,
                    align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard
                });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Reference pill (centered)
            if (slideData.ref) {
                const refW = addCenteredPill(slide, slideData.ref, 0.55, 0.6);
                slide.addText(slideData.ref, {
                    x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.46,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2
                });
            }
            // Verse body (same tier rules as classic: 2-line 40, 3-line 30, 4-line 26, 5+ line 22)
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            slide.addText(`"${slideData.text}"`, {
                x: 1.0, y: 1.9, w: 11.33, h: 3.6,
                align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, color: C.text, breakLine: false
            });
            // Version metadata (centered bottom)
            if (slideData.version) {
                slide.addText(slideData.version, {
                    x: 2.0, y: 6.3, w: 9.33, h: 0.4,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, transparency: 30, charSpacing: 2
                });
            }
        } else if (slideData.type === 'message') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Top reference kicker (centered pill)
            if (slideData.ref) {
                const refW = addCenteredPill(slide, slideData.ref, 0.55, 0.52);
                slide.addText(slideData.ref, {
                    x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.38,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2
                });
            }
            // Message body (same tier rules as classic: 2-line 48, 3-line 40, 4-line 36, 5+ line 30)
                        const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(slideData.text || '').length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const msgSegs = this.splitHighlightSegments(slideData.text, this.getHighlights(slideData));
            const msgRuns = msgSegs.map((seg) => ({
                text: seg.text,
                options: seg.hl
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            slide.addText(msgRuns, {
                x: 1.0, y: 1.9, w: 11.33, h: 3.9,
                align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false
            });
            // Footer strip (centered)
            if (slideData.footer) {
                slide.addShape('rect', {
                    x: 0, y: 6.55, w: 13.33, h: 0.95,
                    fill: { color: C.card, transparency: 20 },
                    line: { color: C.frame, transparency: 60, width: 1 }
                });
                slide.addText(slideData.footer, {
                    x: 1.0, y: 6.72, w: 11.33, h: 0.55,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard, charSpacing: 2
                });
            }
        }
    }



// ============================================================
    // Lilac Grace - soft light-purple layout PPTX export
    // A different DESIGN / COLOR / FONT STYLE / FORMAT / ORGANIZATION
    // (airy, rounded "cloud" layout on a light lavender palette), but the
    // font-size rules are identical to the classic templates (same pt
    // tier tables / auto-fit bounds, including the +8pt title headline).
    // ============================================================
    addLilacSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            // Soft diagonal gradient base (light lavender)
            slide.addShape('rect', {
                x: 0, y: 0, w: '100%', h: '100%',
                fill: { color: C.bg2, transparency: 55 },
                line: { type: 'none' }
            });
            // Rounded inner "cloud" frame
            slide.addShape('roundRect', {
                x: 0.25, y: 0.25, w: 12.83, h: 7.0, rectRadius: 0.18,
                fill: { type: 'none' },
                line: { color: C.frame, transparency: 50, width: 1.25 }
            });
            // Soft corner dots
            const dot = (x, y) => slide.addShape('ellipse', {
                x: x, y: y, w: 0.18, h: 0.18,
                fill: { color: C.accent, transparency: 35 }, line: { type: 'none' }
            });
            dot(0.28, 0.28); dot(12.87, 0.28); dot(0.28, 7.04); dot(12.87, 7.04);
        };
        const addPill = (slide, text, y, w, h) => {
            slide.addShape('roundRect', {
                x: (13.33 - w) / 2, y: y, w: w, h: h, rectRadius: h / 2,
                fill: { color: C.card, transparency: 15 },
                line: { color: C.accent, transparency: 55, width: 1 }
            });
        };
        const addRefPillW = (text) => Math.max(2.2, Math.min(6.2, String(text || '').length * 0.19));

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Split title (auto-balanced two lines); only user-highlighted words are accented
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({
                text: (i ? ' ' : '') + tWords[gi],
                options: tHl.hlIdx.has(gi)
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(260 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, true));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            // Scripture Reference directly beneath the title
            const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
            const verseGap = 0.3;
            const verseH = 0.7;
            const groupH = blockH + verseGap + verseH;
            const titleTop = 0.85 + Math.max(0, (4.2 - groupH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), {
                    x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch,
                    align: 'center', fontFace: C.font, fontSize: titlePt, bold: true
                });
            });
            const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
            const vRuns = vSegs.map((seg) => ({
                text: seg.text,
                options: seg.hl
                    ? { color: C.hl }
                    : { color: C.accent }
            }));
            slide.addText(vRuns, {
                x: 1.0, y: titleTop + blockH + verseGap, w: 11.33, h: verseH,
                align: 'center', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2
            });
            // Bottom ministry name
            if (slideData.footer) {
                slide.addText(slideData.footer, {
                    x: 2.0, y: 6.55, w: 9.33, h: 0.5,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard
                });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Top centered point highlight text (no soft pill)
            const badgeText = slideData.badge ? slideData.badge : 'POINT';
            slide.addText(badgeText, {
                x: 4.17, y: 0.58, w: 5.0, h: 0.4,
                align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.accent2, charSpacing: 4
            });
            // Split point title + highlight runs (same rules as classic, min 30 / max 48 pt)
            const ptWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const ptHl = this.computePointHighlight(ptWords, this.getHighlights(slideData));
            const ptLine1 = ptWords.slice(0, ptHl.brIndex + 1);
            const ptLine2 = ptWords.slice(ptHl.brIndex + 1);
            const ptRuns = (indices) => indices.map((gi, i) => ({
                text: (i ? ' ' : '') + ptWords[gi],
                options: ptHl.hlIdx.has(gi)
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            const ptLines = (ptLine1.length ? 1 : 0) + (ptLine2.length ? 1 : 0);
            const ptCharsPerLine = Math.max(8, Math.floor(816 / (0.62 * 38)));
            const ptLongestLine = Math.max(ptLine1.join(' ').length, ptLine2.join(' ').length, 1);
            const ptEstLines = Math.max(ptLines, Math.ceil(ptLongestLine / ptCharsPerLine));
            const titlePt = this.headlinePt(ptEstLines);
            const ptBalanced = this._balanceHeadline(ptWords, ptHl.hlIdx, this._exportMaxChars(titlePt, true));
            const pitch = titlePt * 1.22 / 72;
            const blockH = ptBalanced.length * pitch;
            const titleTop = 1.7 + Math.max(0, (2.9 - blockH) / 2);
            ptBalanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), {
                    x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch,
                    align: 'center', fontFace: C.font, fontSize: titlePt, bold: true
                });
            });
            // Bottom description chip (centered)
            if (slideData.desc) {
                slide.addShape('roundRect', {
                    x: 2.6, y: 6.15, w: 8.13, h: 0.6, rectRadius: 0.3,
                    fill: { color: C.card, transparency: 15 },
                    line: { color: C.frame, transparency: 50, width: 1 }
                });
                slide.addText(slideData.desc, {
                    x: 2.6, y: 6.24, w: 8.13, h: 0.44,
                    align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard
                });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Reference pill (centered)
            if (slideData.ref) {
                const refW = addRefPillW(slideData.ref);
                addPill(slide, slideData.ref, 0.55, refW, 0.6);
                slide.addText(slideData.ref, {
                    x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.46,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2
                });
            }
            // Verse body (same tier rules as classic: 2-line 40, 3-line 30, 4-line 26, 5+ line 22)
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            slide.addText(`"${slideData.text}"`, {
                x: 1.0, y: 1.9, w: 11.33, h: 3.6,
                align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, color: C.text, breakLine: false
            });
            // Version metadata (centered bottom)
            if (slideData.version) {
                slide.addText(slideData.version, {
                    x: 2.0, y: 6.3, w: 9.33, h: 0.4,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, transparency: 30, charSpacing: 2
                });
            }
                } else if (slideData.type === 'message') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Top reference kicker (centered pill)
            if (slideData.ref) {
                const refW = addRefPillW(slideData.ref);
                addPill(slide, slideData.ref, 0.55, refW, 0.52);
                slide.addText(slideData.ref, {
                    x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.38,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2
                });
            }
                        // Message body (same tier rules as classic: 2-line 48, 3-line 40, 4-line 36, 5+ line 30)
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({
                text: seg.text,
                options: seg.hl
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            slide.addText(mRuns, {
                x: 1.0, y: 1.9, w: 11.33, h: 3.9,
                align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false
            });
            // Footer strip (centered) — footer text + version on one line
            const footText = (slideData.footer ? slideData.footer : '') +
                (slideData.version ? (slideData.footer ? ' · ' : '') + slideData.version : '');
            if (footText) {
                slide.addShape('roundRect', {
                    x: 0, y: 6.55, w: 13.33, h: 0.85, rectRadius: 0.2,
                    fill: { color: C.card, transparency: 20 },
                    line: { color: C.frame, transparency: 55, width: 1 }
                });
                slide.addText(footText, {
                    x: 1.0, y: 6.7, w: 11.33, h: 0.55,
                    align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard, charSpacing: 2
                });
            }
        }
    }
// ============================================================
    // Rose Atelier - warm ivory & rose editorial layout PPTX export
    // A different DESIGN / COLOR / FONT STYLE / FORMAT / ORGANIZATION
    // (left rose accent bar, hairline frame, squared chips and diamond
    // flourishes on a warm ivory palette), but the font-size rules are
    // identical to the classic templates (same pt tier tables / auto-fit
    // bounds, including the +8pt title headline).
    // ============================================================
    addRoseSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            // Warm ivory diagonal gradient base
            slide.addShape('rect', {
                x: 0, y: 0, w: '100%', h: '100%',
                fill: { color: C.bg2, transparency: 55 },
                line: { type: 'none' }
            });
            // Left vertical rose accent bar
            slide.addShape('rect', {
                x: 0, y: 0, w: 0.14, h: 7.5,
                fill: { color: C.accent },
                line: { type: 'none' }
            });
            // Hairline inner frame
            slide.addShape('rect', {
                x: 0.25, y: 0.25, w: 12.83, h: 7.0,
                fill: { type: 'none' },
                line: { color: C.frame, transparency: 45, width: 1 }
            });
            // Corner diamond ornaments
            const diamond = (x, y) => slide.addShape('rect', {
                x: x, y: y, w: 0.14, h: 0.14, rotate: 45,
                fill: { color: C.accent, transparency: 30 }, line: { type: 'none' }
            });
            diamond(0.3, 0.3); diamond(12.89, 0.3); diamond(0.3, 7.06); diamond(12.89, 7.06);
        };
        const addChip = (slide, text, y, w, h) => {
            slide.addShape('roundRect', {
                x: (13.33 - w) / 2, y: y, w: w, h: h, rectRadius: 0.05,
                fill: { color: C.card, transparency: 15 },
                line: { color: C.accent, transparency: 40, width: 1 }
            });
        };
        const addRefChipW = (text) => Math.max(2.2, Math.min(6.2, String(text || '').length * 0.19));
        const addFootDiamond = (slide, y) => {
            slide.addShape('rect', {
                x: 6.62, y: y, w: 0.09, h: 0.09, rotate: 45,
                fill: { color: C.accent, transparency: 25 }, line: { type: 'none' }
            });
        };

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Split title (auto-balanced two lines); only user-highlighted words are accented
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({
                text: (i ? ' ' : '') + tWords[gi],
                options: tHl.hlIdx.has(gi)
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(260 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, true));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            // Scripture Reference directly beneath the title
            const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
            const verseGap = 0.3;
            const verseH = 0.7;
            const groupH = blockH + verseGap + verseH;
            const titleTop = 0.85 + Math.max(0, (4.2 - groupH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), {
                    x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch,
                    align: 'center', fontFace: C.font, fontSize: titlePt, bold: true
                });
            });
            const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
            const vRuns = vSegs.map((seg) => ({
                text: seg.text,
                options: seg.hl
                    ? { color: C.hl }
                    : { color: C.accent }
            }));
            slide.addText(vRuns, {
                x: 1.0, y: titleTop + blockH + verseGap, w: 11.33, h: verseH,
                align: 'center', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2
            });
            // Bottom ministry name with small diamond flourish
            if (slideData.footer) {
                addFootDiamond(slide, 6.42);
                slide.addText(slideData.footer, {
                    x: 2.0, y: 6.55, w: 9.33, h: 0.5,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard
                });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Top centered point highlight text (no squared chip)
            const badgeText = slideData.badge ? slideData.badge : 'POINT';
            slide.addText(badgeText, {
                x: 4.17, y: 0.58, w: 5.0, h: 0.4,
                align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.accent2, charSpacing: 4
            });
            // Split point title + highlight runs (same rules as classic, min 30 / max 48 pt)
            const ptWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const ptHl = this.computePointHighlight(ptWords, this.getHighlights(slideData));
            const ptLine1 = ptWords.slice(0, ptHl.brIndex + 1);
            const ptLine2 = ptWords.slice(ptHl.brIndex + 1);
            const ptRuns = (indices) => indices.map((gi, i) => ({
                text: (i ? ' ' : '') + ptWords[gi],
                options: ptHl.hlIdx.has(gi)
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            const ptLines = (ptLine1.length ? 1 : 0) + (ptLine2.length ? 1 : 0);
            const ptCharsPerLine = Math.max(8, Math.floor(816 / (0.62 * 38)));
            const ptLongestLine = Math.max(ptLine1.join(' ').length, ptLine2.join(' ').length, 1);
            const ptEstLines = Math.max(ptLines, Math.ceil(ptLongestLine / ptCharsPerLine));
            const titlePt = this.headlinePt(ptEstLines);
            const ptBalanced = this._balanceHeadline(ptWords, ptHl.hlIdx, this._exportMaxChars(titlePt, true));
            const pitch = titlePt * 1.22 / 72;
            const blockH = ptBalanced.length * pitch;
            const titleTop = 1.7 + Math.max(0, (2.9 - blockH) / 2);
            ptBalanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), {
                    x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch,
                    align: 'center', fontFace: C.font, fontSize: titlePt, bold: true
                });
            });
            // Bottom description chip (centered)
            if (slideData.desc) {
                slide.addShape('roundRect', {
                    x: 2.6, y: 6.15, w: 8.13, h: 0.6, rectRadius: 0.06,
                    fill: { color: C.card, transparency: 15 },
                    line: { color: C.frame, transparency: 45, width: 1 }
                });
                slide.addText(slideData.desc, {
                    x: 2.6, y: 6.24, w: 8.13, h: 0.44,
                    align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard
                });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Reference chip (centered)
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.6);
                slide.addText(slideData.ref, {
                    x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.46,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2
                });
            }
            // Verse body (same tier rules as classic: 2-line 40, 3-line 30, 4-line 26, 5+ line 22)
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            slide.addText(`"${slideData.text}"`, {
                x: 1.0, y: 1.9, w: 11.33, h: 3.6,
                align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, color: C.text, breakLine: false
            });
            // Version metadata (centered bottom) with diamond flourish
            if (slideData.version) {
                addFootDiamond(slide, 6.22);
                slide.addText(slideData.version, {
                    x: 2.0, y: 6.32, w: 9.33, h: 0.4,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, transparency: 30, charSpacing: 2
                });
            }
        } else if (slideData.type === 'message') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            // Top reference kicker (centered chip)
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.52);
                slide.addText(slideData.ref, {
                    x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.38,
                    align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2
                });
            }
            // Message body (same tier rules as classic: 2-line 48, 3-line 40, 4-line 36, 5+ line 30)
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({
                text: seg.text,
                options: seg.hl
                    ? { color: C.hl }
                    : { color: C.text }
            }));
            slide.addText(mRuns, {
                x: 1.0, y: 1.9, w: 11.33, h: 3.9,
                align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false
            });
            // Footer strip (centered) — footer text + version on one line
            const footText = (slideData.footer ? slideData.footer : '') +
                (slideData.version ? (slideData.footer ? ' · ' : '') + slideData.version : '');
            if (footText) {
                slide.addShape('roundRect', {
                    x: 0, y: 6.55, w: 13.33, h: 0.85, rectRadius: 0.08,
                    fill: { color: C.card, transparency: 20 },
                    line: { color: C.frame, transparency: 45, width: 1 }
                });
                slide.addText(footText, {
                    x: 1.0, y: 6.7, w: 11.33, h: 0.55,
                    align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard, charSpacing: 2
                });
            }
        }
    }
    // ============================================================
    // Arctic Frost — minimal light PPTX export (fallback builder).
    // Same STRUCTURE as the preview: icy field, thin glacier frame,
    // corner frost-crystal diamonds, hairline left accent bar and
    // pill chips. Font-size tier rules are identical to every other
    // template (same pt tier tables / auto-fit bounds).
    // ============================================================
    addFrostSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            slide.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: C.bg2, transparency: 50 }, line: { type: 'none' } });
            // Thin glacier frame (minimal, hairline)
            slide.addShape('rect', { x: 0.25, y: 0.25, w: 12.83, h: 7.0, fill: { type: 'none' }, line: { color: C.frame, transparency: 45, width: 1 } });
            // Corner frost crystals (small rotated diamonds)
            const c = (x, y) => slide.addShape('rect', { x: x, y: y, w: 0.12, h: 0.12, rotate: 45, fill: { color: C.accent2, transparency: 35 }, line: { type: 'none' } });
            c(0.35, 0.35); c(12.83, 0.35); c(0.35, 7.03); c(12.83, 7.03);
            // Hairline left accent bar
            slide.addShape('rect', { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: C.accent }, line: { type: 'none' } });
        };
        const addChip = (slide, text, y, w, h) => {
            slide.addShape('roundRect', { x: (13.33 - w) / 2, y: y, w: w, h: h, rectRadius: 0.12, fill: { color: C.card, transparency: 12 }, line: { color: C.accent, transparency: 40, width: 1 } });
        };
        const addRefChipW = (text) => Math.max(2.2, Math.min(6.2, String(text || '').length * 0.19));
        const addFootCrystal = (slide, y) => {
            slide.addShape('rect', { x: 6.63, y: y, w: 0.08, h: 0.08, rotate: 45, fill: { color: C.accent, transparency: 20 }, line: { type: 'none' } });
        };

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + tWords[gi], options: tHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(260 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
            const verseGap = 0.3;
            const verseH = 0.7;
            const groupH = blockH + verseGap + verseH;
            const titleTop = 0.85 + Math.max(0, (4.2 - groupH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), { x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
            const vRuns = vSegs.map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.accent } }));
            slide.addText(vRuns, { x: 1.0, y: titleTop + blockH + verseGap, w: 11.33, h: verseH, align: 'center', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2 });
            if (slideData.footer) {
                addFootCrystal(slide, 6.42);
                slide.addText(slideData.footer, { x: 2.0, y: 6.55, w: 9.33, h: 0.5, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            const badgeText = slideData.badge ? slideData.badge : 'POINT';
            slide.addText(badgeText, { x: 4.17, y: 0.58, w: 5.0, h: 0.4, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.accent2, charSpacing: 4 });
            const ptWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const ptHl = this.computePointHighlight(ptWords, this.getHighlights(slideData));
            const ptLine1 = ptWords.slice(0, ptHl.brIndex + 1);
            const ptLine2 = ptWords.slice(ptHl.brIndex + 1);
            const ptRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + ptWords[gi], options: ptHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const ptLines = (ptLine1.length ? 1 : 0) + (ptLine2.length ? 1 : 0);
            const ptCharsPerLine = Math.max(8, Math.floor(816 / (0.62 * 38)));
            const ptLongestLine = Math.max(ptLine1.join(' ').length, ptLine2.join(' ').length, 1);
            const ptEstLines = Math.max(ptLines, Math.ceil(ptLongestLine / ptCharsPerLine));
            const titlePt = this.headlinePt(ptEstLines);
            const ptBalanced = this._balanceHeadline(ptWords, ptHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = ptBalanced.length * pitch;
            const titleTop = 1.7 + Math.max(0, (2.9 - blockH) / 2);
            ptBalanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), { x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            if (slideData.desc) {
                slide.addShape('roundRect', { x: 2.6, y: 6.15, w: 8.13, h: 0.6, rectRadius: 0.3, fill: { color: C.card, transparency: 12 }, line: { color: C.frame, transparency: 40, width: 1 } });
                slide.addText(slideData.desc, { x: 2.6, y: 6.24, w: 8.13, h: 0.44, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.6);
                slide.addText(slideData.ref, { x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.46, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2 });
            }
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            slide.addText(`"${slideData.text}"`, { x: 1.0, y: 1.9, w: 11.33, h: 3.6, align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, color: C.text, breakLine: false });
            if (slideData.version) {
                addFootCrystal(slide, 6.22);
                slide.addText(slideData.version, { x: 2.0, y: 6.32, w: 9.33, h: 0.4, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, transparency: 30, charSpacing: 2 });
            }
        } else if (slideData.type === 'message') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.52);
                slide.addText(slideData.ref, { x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.38, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2 });
            }
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(mRuns, { x: 1.0, y: 1.9, w: 11.33, h: 3.9, align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false });
            const footText = (slideData.footer ? slideData.footer : '') + (slideData.version ? (slideData.footer ? ' · ' : '') + slideData.version : '');
            if (footText) {
                slide.addShape('roundRect', { x: 0, y: 6.55, w: 13.33, h: 0.85, rectRadius: 0.1, fill: { color: C.card, transparency: 15 }, line: { color: C.frame, transparency: 40, width: 1 } });
                slide.addText(footText, { x: 1.0, y: 6.7, w: 11.33, h: 0.55, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard, charSpacing: 2 });
            }
        }
    }
    addMintSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            slide.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: C.bg2, transparency: 50 }, line: { type: 'none' } });
            slide.addShape('rect', { x: 0, y: 0, w: 0.14, h: 7.5, fill: { color: C.accent }, line: { type: 'none' } });
            slide.addShape('rect', { x: 0.25, y: 0.25, w: 12.83, h: 7.0, fill: { type: 'none' }, line: { color: C.frame, transparency: 40, width: 1 } });
            const dot = (x, y) => slide.addShape('ellipse', { x: x, y: y, w: 0.12, h: 0.12, fill: { color: C.accent, transparency: 25 }, line: { type: 'none' } });
            dot(0.28, 0.28); dot(12.93, 0.28); dot(0.28, 7.1); dot(12.93, 7.1);
        };
        const addChip = (slide, text, y, w, h) => {
            slide.addShape('roundRect', { x: (13.33 - w) / 2, y: y, w: w, h: h, rectRadius: 0.12, fill: { color: C.card, transparency: 12 }, line: { color: C.accent, transparency: 40, width: 1 } });
        };
        const addRefChipW = (text) => Math.max(2.2, Math.min(6.2, String(text || '').length * 0.19));
        const addFootDot = (slide, y) => {
            slide.addShape('ellipse', { x: 6.645, y: y, w: 0.08, h: 0.08, fill: { color: C.accent, transparency: 20 }, line: { type: 'none' } });
        };

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + tWords[gi], options: tHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(260 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
            const verseGap = 0.3;
            const verseH = 0.7;
            const groupH = blockH + verseGap + verseH;
            const titleTop = 0.85 + Math.max(0, (4.2 - groupH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), { x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
            const vRuns = vSegs.map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.accent } }));
            slide.addText(vRuns, { x: 1.0, y: titleTop + blockH + verseGap, w: 11.33, h: verseH, align: 'center', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2 });
            if (slideData.footer) {
                addFootDot(slide, 6.42);
                slide.addText(slideData.footer, { x: 2.0, y: 6.55, w: 9.33, h: 0.5, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            const badgeText = slideData.badge ? slideData.badge : 'POINT';
            slide.addText(badgeText, { x: 4.17, y: 0.58, w: 5.0, h: 0.4, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.accent2, charSpacing: 4 });
            const ptWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const ptHl = this.computePointHighlight(ptWords, this.getHighlights(slideData));
            const ptLine1 = ptWords.slice(0, ptHl.brIndex + 1);
            const ptLine2 = ptWords.slice(ptHl.brIndex + 1);
            const ptRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + ptWords[gi], options: ptHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const ptLines = (ptLine1.length ? 1 : 0) + (ptLine2.length ? 1 : 0);
            const ptCharsPerLine = Math.max(8, Math.floor(816 / (0.62 * 38)));
            const ptLongestLine = Math.max(ptLine1.join(' ').length, ptLine2.join(' ').length, 1);
            const ptEstLines = Math.max(ptLines, Math.ceil(ptLongestLine / ptCharsPerLine));
            const titlePt = this.headlinePt(ptEstLines);
            const ptBalanced = this._balanceHeadline(ptWords, ptHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = ptBalanced.length * pitch;
            const titleTop = 1.7 + Math.max(0, (2.9 - blockH) / 2);
            ptBalanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), { x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            if (slideData.desc) {
                slide.addShape('roundRect', { x: 2.6, y: 6.15, w: 8.13, h: 0.6, rectRadius: 0.3, fill: { color: C.card, transparency: 12 }, line: { color: C.frame, transparency: 40, width: 1 } });
                slide.addText(slideData.desc, { x: 2.6, y: 6.24, w: 8.13, h: 0.44, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.6);
                slide.addText(slideData.ref, { x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.46, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2 });
            }
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            slide.addText(`"${slideData.text}"`, { x: 1.0, y: 1.9, w: 11.33, h: 3.6, align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, color: C.text, breakLine: false });
            if (slideData.version) {
                addFootDot(slide, 6.22);
                slide.addText(slideData.version, { x: 2.0, y: 6.32, w: 9.33, h: 0.4, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, transparency: 30, charSpacing: 2 });
            }
        } else if (slideData.type === 'message') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.52);
                slide.addText(slideData.ref, { x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.38, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2 });
            }
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(mRuns, { x: 1.0, y: 1.9, w: 11.33, h: 3.9, align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false });
            const footText = (slideData.footer ? slideData.footer : '') + (slideData.version ? (slideData.footer ? ' · ' : '') + slideData.version : '');
            if (footText) {
                slide.addShape('roundRect', { x: 0, y: 6.55, w: 13.33, h: 0.85, rectRadius: 0.1, fill: { color: C.card, transparency: 15 }, line: { color: C.frame, transparency: 40, width: 1 } });
                slide.addText(footText, { x: 1.0, y: 6.7, w: 11.33, h: 0.55, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard, charSpacing: 2 });
            }
        }
    }
    // ============================================================
    // Pulpit Grid — editorial bento grid PPTX export.
    // A completely different STRUCTURE (hard grid zones, hairline seams,
    // giant point numeral, oversized quote glyph, ALL text left-aligned —
    // no centered stack, no glow behind text), while the font-size rules
    // are identical to the classic templates (same pt tier tables /
    // auto-fit bounds, including the +8pt title headline).
    // ============================================================
    addBentoSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            slide.background = { color: C.bg };
            // Accent registration block (top-left corner of the grid)
            slide.addShape('rect', { x: 0, y: 0, w: 0.5, h: 0.5, fill: { color: C.accent }, line: { type: 'none' } });
        };
        // Hairline grid seams
        const seamH = (slide, y, x, w) => slide.addShape('line', { x: x, y: y, w: w, h: 0, line: { color: C.frame, transparency: 82, width: 0.75 } });
        const seamV = (slide, x, y, h) => slide.addShape('line', { x: x, y: y, w: 0, h: h, line: { color: C.frame, transparency: 82, width: 0.75 } });
        const tag = (slide, text, opts) => slide.addText(String(text || '').toUpperCase(), Object.assign({ fontFace: C.font, bold: true, charSpacing: 3 }, opts));
        const sq = (slide, x, y, s) => slide.addShape('rect', { x: x, y: y, w: s, h: s, fill: { color: C.accent }, line: { type: 'none' } });

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            addBg(slide);
            // Top strip: footer tag left, hairline seam below
            if (slideData.footer) tag(slide, slideData.footer, { x: 0.55, y: 0.22, w: 9.5, h: 0.6, align: 'left', fontSize: 12, color: C.onCard });
            sq(slide, 12.65, 0.28, 0.16);
            seamH(slide, 1.05, 0, 13.333);
            // Headline (auto-balanced lines; only user-highlighted words accented)
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + tWords[gi], options: tHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(260 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const titleTop = 1.35 + Math.max(0, (4.55 - blockH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), { x: 0.75, y: titleTop + li * pitch, w: 11.83, h: pitch, align: 'left', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            // Bottom strip: reference tag right (accent square + small caps)
            seamH(slide, 6.35, 0, 13.333);
            if (slideData.verse) {
                sq(slide, 8.6, 6.72, 0.16);
                const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
                const vRuns = vSegs.map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.accent } }));
                slide.addText(vRuns, { x: 8.95, y: 6.55, w: 3.9, h: 0.55, align: 'right', fontFace: C.font, fontSize: 15, bold: true, charSpacing: 2 });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            addBg(slide);
            // Left numeral column (giant decorative digit for wayfinding) —
            // the side numeral is the ONLY point indicator in this template.
            seamV(slide, 4.13, 0, 7.5);
            const badge = String(slideData.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            if (numMatch) {
                slide.addText(numMatch[0].padStart(2, '0'), { x: 0.2, y: 2.0, w: 3.75, h: 3.4, align: 'center', fontFace: C.font, fontSize: 150, bold: true, color: C.accent, transparency: 70, deco: true });
            }
            const words = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(slideData));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = this._exportMaxChars(44, this._themeIsSerif());
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const titlePt = this.headlinePt(estLines);
            const ptRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + words[gi], options: hl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const balanced = this._balanceHeadline(words, hl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
            const pitch = titlePt * 1.22 / 72;
            const blockH = balanced.length * pitch;
            const titleTop = 1.6 + Math.max(0, (3.6 - blockH) / 2);
            balanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), { x: 4.6, y: titleTop + li * pitch, w: 8.3, h: pitch, align: 'left', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            if (slideData.desc) {
                seamH(slide, 6.3, 4.13, 9.203);
                slide.addText(slideData.desc, { x: 4.6, y: 6.45, w: 8.3, h: 0.6, align: 'left', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            addBg(slide);
            // Oversized decorative quote glyph (top-left)
            slide.addText('\u201C', { x: 0.15, y: 0.0, w: 2.6, h: 2.6, align: 'left', fontFace: C.font, fontSize: 160, bold: true, color: C.glow, deco: true });
            if (slideData.ref) tag(slide, slideData.ref, { x: 7.6, y: 0.55, w: 5.2, h: 0.6, align: 'right', fontSize: 16, color: C.accent, charSpacing: 2 });
            seamH(slide, 1.5, 0, 13.333);
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            const bRuns = this.splitHighlightSegments(slideData.text || '', this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(bRuns, { x: 1.0, y: 2.0, w: 11.33, h: 3.6, align: 'left', fontFace: C.font, fontSize: bodyPt, bold: true, breakLine: false });
            seamH(slide, 6.4, 0, 13.333);
            if (slideData.version) {
                sq(slide, 1.0, 6.72, 0.16);
                tag(slide, slideData.version, { x: 1.35, y: 6.58, w: 9.0, h: 0.5, align: 'left', fontSize: 13, color: C.onCard });
            }
        } else if (slideData.type === 'message') {
            let slide = pptx.addSlide();
            addBg(slide);
            // Fat accent rule on the left edge
            slide.addShape('rect', { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: C.accent }, line: { type: 'none' } });
            if (slideData.ref) tag(slide, slideData.ref, { x: 0.75, y: 0.55, w: 9.0, h: 0.55, align: 'left', fontSize: 14, color: C.accent });
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(mRuns, { x: 0.75, y: 1.9, w: 11.9, h: 3.9, align: 'left', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false });
            if (slideData.footer) {
                seamH(slide, 6.45, 0, 13.333);
                tag(slide, slideData.footer, { x: 0.75, y: 6.62, w: 11.0, h: 0.5, align: 'left', fontSize: 13, color: C.onCard });
                sq(slide, 12.6, 6.75, 0.16);
            }
        }
    }
    addEmberSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            slide.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: C.bg2, transparency: 50 }, line: { type: 'none' } });
            // Warm center ember glow
            slide.addShape('ellipse', { x: 3.5, y: 1.4, w: 6.33, h: 4.6, fill: { color: C.glow, transparency: 60 }, line: { type: 'none' } });
            // Double gold frame
            slide.addShape('rect', { x: 0.05, y: 0.05, w: 13.23, h: 7.4, fill: { type: 'none' }, line: { color: C.frame, transparency: 20, width: 3 } });
            slide.addShape('rect', { x: 0.2, y: 0.2, w: 12.93, h: 7.1, fill: { type: 'none' }, line: { color: C.frame, transparency: 78, width: 1.25 } });
            // Corner diamond ornaments (gold)
            const d = (x, y) => slide.addShape('rect', { x: x, y: y, w: 0.14, h: 0.14, rotate: 45, fill: { color: C.accent, transparency: 25 }, line: { type: 'none' } });
            d(0.3, 0.3); d(12.89, 0.3); d(0.3, 7.06); d(12.89, 7.06);
        };
        const addChip = (slide, text, y, w, h) => {
            slide.addShape('roundRect', { x: (13.33 - w) / 2, y: y, w: w, h: h, rectRadius: 0.05, fill: { color: C.card, transparency: 12 }, line: { color: C.frame, transparency: 35, width: 1 } });
        };
        const addRefChipW = (text) => Math.max(2.2, Math.min(6.2, String(text || '').length * 0.19));
        const addFootDiamond = (slide, y) => {
            slide.addShape('rect', { x: 6.62, y: y, w: 0.09, h: 0.09, rotate: 45, fill: { color: C.accent, transparency: 20 }, line: { type: 'none' } });
        };

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + tWords[gi], options: tHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(260 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
            const verseGap = 0.3;
            const verseH = 0.7;
            const groupH = blockH + verseGap + verseH;
            const titleTop = 0.85 + Math.max(0, (4.2 - groupH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), { x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
            const vRuns = vSegs.map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.accent } }));
            slide.addText(vRuns, { x: 1.0, y: titleTop + blockH + verseGap, w: 11.33, h: verseH, align: 'center', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2 });
            if (slideData.footer) {
                addFootDiamond(slide, 6.42);
                slide.addText(slideData.footer, { x: 2.0, y: 6.55, w: 9.33, h: 0.5, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            const badgeText = slideData.badge ? slideData.badge : 'POINT';
            slide.addText(badgeText, { x: 4.17, y: 0.58, w: 5.0, h: 0.4, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.accent2, charSpacing: 4 });
            const ptWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const ptHl = this.computePointHighlight(ptWords, this.getHighlights(slideData));
            const ptLine1 = ptWords.slice(0, ptHl.brIndex + 1);
            const ptLine2 = ptWords.slice(ptHl.brIndex + 1);
            const ptRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + ptWords[gi], options: ptHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const ptLines = (ptLine1.length ? 1 : 0) + (ptLine2.length ? 1 : 0);
            const ptCharsPerLine = Math.max(8, Math.floor(816 / (0.62 * 38)));
            const ptLongestLine = Math.max(ptLine1.join(' ').length, ptLine2.join(' ').length, 1);
            const ptEstLines = Math.max(ptLines, Math.ceil(ptLongestLine / ptCharsPerLine));
            const titlePt = this.headlinePt(ptEstLines);
            const ptBalanced = this._balanceHeadline(ptWords, ptHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = ptBalanced.length * pitch;
            const titleTop = 1.7 + Math.max(0, (2.9 - blockH) / 2);
            ptBalanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), { x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            if (slideData.desc) {
                slide.addShape('roundRect', { x: 2.6, y: 6.15, w: 8.13, h: 0.6, rectRadius: 0.06, fill: { color: C.card, transparency: 12 }, line: { color: C.frame, transparency: 35, width: 1 } });
                slide.addText(slideData.desc, { x: 2.6, y: 6.24, w: 8.13, h: 0.44, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.6);
                slide.addText(slideData.ref, { x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.46, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2 });
            }
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            slide.addText(`"${slideData.text}"`, { x: 1.0, y: 1.9, w: 11.33, h: 3.6, align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, color: C.text, breakLine: false });
            if (slideData.version) {
                addFootDiamond(slide, 6.22);
                slide.addText(slideData.version, { x: 2.0, y: 6.32, w: 9.33, h: 0.4, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, transparency: 30, charSpacing: 2 });
            }
        } else if (slideData.type === 'message') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.52);
                slide.addText(slideData.ref, { x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.38, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2 });
            }
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(mRuns, { x: 1.0, y: 1.9, w: 11.33, h: 3.9, align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false });
            const footText = (slideData.footer ? slideData.footer : '') + (slideData.version ? (slideData.footer ? ' · ' : '') + slideData.version : '');
            if (footText) {
                slide.addShape('roundRect', { x: 0, y: 6.55, w: 13.33, h: 0.85, rectRadius: 0.06, fill: { color: C.card, transparency: 15 }, line: { color: C.frame, transparency: 35, width: 1 } });
                slide.addText(footText, { x: 1.0, y: 6.7, w: 11.33, h: 0.55, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard, charSpacing: 2 });
            }
        }
    }
    // ============================================================
    // BIG TYPE (poster layout) — native PPTX export. Full-bleed
    // typography on paper: no glow ellipses, no gradient washes, no
    // cards/panels. Ink text flush-left, signal-red accent squares +
    // hairline meta bands, giant top-left point numeral. Font-size
    // tier rules stay identical to every other template.
    // ============================================================
    addPosterSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            slide.background = { color: C.bg };
            // Signal-red registration square (top-left) — the only ornament.
            slide.addShape('rect', { x: 0.55, y: 0.42, w: 0.16, h: 0.16, fill: { color: C.accent }, line: { type: 'none' } });
        };
        const hairline = (slide, y) => slide.addShape('line', { x: 0.55, y: y, w: 12.23, h: 0, line: { color: C.frame, transparency: 30, width: 1 } });
        const tag = (slide, text, opts) => slide.addText(String(text || '').toUpperCase(), Object.assign({ fontFace: C.font, bold: true, charSpacing: 3 }, opts));

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            addBg(slide);
            // Top meta band: footer (or fallback label) small caps + hairline
            tag(slide, slideData.footer || 'Sermon', { x: 0.82, y: 0.24, w: 9.5, h: 0.5, align: 'left', fontSize: 12, color: C.onCard });
            hairline(slide, 0.95);
            // Giant flush-left headline (same title tier + anti-widow rules)
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + tWords[gi], options: tHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(300 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const titleTop = 1.45 + Math.max(0, (4.4 - blockH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), { x: 0.75, y: titleTop + li * pitch, w: 11.83, h: pitch, align: 'left', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            // Bottom meta band: reference flush-left + hairline
            hairline(slide, 6.35);
            if (slideData.verse) {
                slide.addShape('rect', { x: 0.55, y: 6.72, w: 0.16, h: 0.16, fill: { color: C.accent }, line: { type: 'none' } });
                const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
                const vRuns = vSegs.map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.accent } }));
                slide.addText(vRuns, { x: 0.82, y: 6.55, w: 9.0, h: 0.55, align: 'left', fontFace: C.font, fontSize: 15, bold: true, charSpacing: 2 });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            addBg(slide);
            // Giant FILLED numeral top-left (poster wayfinding) + hairline,
            // then the headline fills the rest of the frame flush-left.
            const badge = String(slideData.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            const ruleTop = numMatch ? 2.35 : 1.55;
            if (numMatch) {
                slide.addText(numMatch[0].padStart(2, '0'), { x: 0.62, y: 0.3, w: 4.4, h: 1.9, align: 'left', fontFace: C.font, fontSize: 96, bold: true, color: C.accent, deco: true });
            }
            hairline(slide, ruleTop);
            const words = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(slideData));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = this._exportMaxChars(44, this._themeIsSerif());
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const titlePt = this.headlinePt(estLines);
            const ptRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + words[gi], options: hl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const balanced = this._balanceHeadline(words, hl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
            const pitch = titlePt * 1.22 / 72;
            const blockH = balanced.length * pitch;
            const titleTop = ruleTop + 0.4 + Math.max(0, (3.4 - blockH) / 2);
            balanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), { x: 0.75, y: titleTop + li * pitch, w: 11.83, h: pitch, align: 'left', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            if (slideData.desc) {
                hairline(slide, 6.3);
                slide.addText(slideData.desc, { x: 0.75, y: 6.45, w: 11.83, h: 0.55, align: 'left', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            addBg(slide);
            // Reference small caps top-left + hairline; scripture IS the slide
            if (slideData.ref) tag(slide, slideData.ref, { x: 0.82, y: 0.24, w: 9.5, h: 0.5, align: 'left', fontSize: 16, color: C.accent, charSpacing: 2 });
            hairline(slide, 0.95);
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            const bRuns = this.splitHighlightSegments(slideData.text || '', this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(bRuns, { x: 0.75, y: 1.75, w: 11.83, h: 3.6, align: 'left', fontFace: C.font, fontSize: bodyPt, bold: true, breakLine: false });
            hairline(slide, 6.4);
            if (slideData.version) {
                slide.addText(slideData.version, { x: 0.75, y: 6.55, w: 9.0, h: 0.5, align: 'left', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard, charSpacing: 2, transparency: 20 });
                slide.addShape('rect', { x: 12.62, y: 6.72, w: 0.16, h: 0.16, fill: { color: C.accent }, line: { type: 'none' } });
            }
        } else if (slideData.type === 'message') {
            let slide = pptx.addSlide();
            addBg(slide);
            if (slideData.ref) tag(slide, slideData.ref, { x: 0.82, y: 0.24, w: 9.5, h: 0.45, align: 'left', fontSize: 14, color: C.accent, charSpacing: 2 });
            hairline(slide, 0.95);
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(mRuns, { x: 0.75, y: 1.55, w: 11.83, h: 3.9, align: 'left', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false });
            const footText = (slideData.footer ? slideData.footer : '') + (slideData.version ? (slideData.footer ? ' \u00B7 ' : '') + slideData.version : '');
            if (footText) {
                hairline(slide, 6.4);
                slide.addText(footText, { x: 0.75, y: 6.55, w: 11.83, h: 0.5, align: 'left', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard, charSpacing: 2 });
            }
        }
    }
    addGlorySlide(pptx, slideData, C) {
        const addBg = (slide) => {
            slide.background = { color: C.bg };
            slide.addShape('rect', { x: 4.6, y: -0.4, w: 4.13, h: 7.9, rotate: 12, fill: { color: C.glow, transparency: 94 }, line: { type: 'none' } });
            slide.addShape('rect', { x: 5.35, y: -0.4, w: 2.63, h: 7.9, rotate: 12, fill: { color: C.glow, transparency: 88 }, line: { type: 'none' } });
            slide.addShape('rect', { x: 5.95, y: -0.4, w: 1.43, h: 7.9, rotate: 12, fill: { color: C.accent, transparency: 80 }, line: { type: 'none' } });
            slide.addShape('ellipse', { x: 3.9, y: 2.5, w: 5.53, h: 3.3, fill: { color: C.glow, transparency: 90 }, line: { type: 'none' } });
            const dust = [[2.3, 2.1], [3.4, 4.4], [9.8, 2.4], [10.9, 4.9], [6.5, 5.6], [1.6, 5.2], [11.5, 1.6]];
            dust.forEach(([dx, dy]) => slide.addShape('rect', { x: dx, y: dy, w: 0.05, h: 0.05, fill: { color: C.accent2, transparency: 55 }, line: { type: 'none' } }));
        };
        const tag = (slide, text, opts) => slide.addText(String(text || '').toUpperCase(), Object.assign({ fontFace: C.font, bold: true, charSpacing: 3 }, opts));
        const rule = (slide, y) => {
            slide.addShape('line', { x: 6.42, y: y, w: 0.5, h: 0, line: { color: C.frame, transparency: 15, width: 1.5 } });
            slide.addShape('rect', { x: 6.6, y: y - 0.035, w: 0.13, h: 0.13, rotate: 45, fill: { color: C.accent }, line: { type: 'none' } });
        };
        this._gloryBg = addBg; this._gloryTag = tag; this._gloryRule = rule;

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            addBg(slide);
            tag(slide, slideData.footer || 'Sermon', { x: 2.4, y: 1.0, w: 11.33, h: 0.4, align: 'center', fontSize: 12, color: C.onCard });
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + tWords[gi], options: tHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(300 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const titleTop = 1.75 + Math.max(0, (3.6 - blockH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), { x: 1.2, y: titleTop + li * pitch, w: 10.93, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            rule(slide, Math.min(6.0, titleTop + blockH + 0.3));
            if (slideData.verse) {
                // Auto-fit the verse font by length (same rule every theme uses) so a long
                // reference stays on one line and is never clipped by a fixed-height box.
                const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
                const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
                const vRuns = vSegs.map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.accent } }));
                slide.addText(vRuns, { x: 1.0, y: 6.25, w: 11.33, h: 0.95, align: 'center', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2 });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            addBg(slide);
            const badge = String(slideData.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            if (numMatch) {
                // Giant deco numeral (matches the preview). Box is generous for "01" - "99".
                slide.addText(numMatch[0].padStart(2, '0'), { x: 3.2, y: 0.9, w: 6.93, h: 3.3, align: 'center', fontFace: C.font, fontSize: 150, bold: true, color: C.glow, transparency: 72, deco: true });
            } else if (badge) {
                // Text badge — size the box to the label so longer text is never cut off.
                const badgeW = Math.max(3.4, Math.min(8.6, badge.length * 0.5 + 1.4));
                slide.addText(badge.toUpperCase(), { x: 3.2, y: 0.95, w: badgeW, h: 0.6, align: 'center', fontFace: C.font, fontSize: 16, bold: true, color: C.glow, charSpacing: 3 });
            }
            this._gloryPointBody(pptx, slide, slideData, C, rule);
        } else if (slideData.type === 'verse') {
            this._gloryVerseMsg(pptx, slideData, C, addBg, tag, rule, 'verse');
        } else if (slideData.type === 'message') {
            this._gloryVerseMsg(pptx, slideData, C, addBg, tag, rule, 'message');
        }
    }
    _gloryPointBody(pptx, slide, slideData, C, rule) {
            const words = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(slideData));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = this._exportMaxChars(44, this._themeIsSerif());
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const titlePt = this.headlinePt(estLines);
            const ptRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + words[gi], options: hl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const balanced = this._balanceHeadline(words, hl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
            const pitch = titlePt * 1.22 / 72;
            const blockH = balanced.length * pitch;
            const titleTop = 2.15 + Math.max(0, (3.0 - blockH) / 2);
            balanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), { x: 1.2, y: titleTop + li * pitch, w: 10.93, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            rule(slide, Math.min(6.0, titleTop + blockH + 0.25));
            if (slideData.desc) {
                slide.addText(slideData.desc, { x: 2.2, y: 6.35, w: 8.93, h: 0.55, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard });
            }
    }
    _gloryVerseMsg(pptx, slideData, C, addBg, tag, rule, kind) {
            let slide = pptx.addSlide();
            addBg(slide);
            if (kind === 'verse') {
                if (slideData.ref) tag(slide, slideData.ref, { x: 2.4, y: 0.9, w: 11.33, h: 0.5, align: 'center', fontSize: 16, color: C.accent, charSpacing: 2 });
                const textLen = Math.max(String(slideData.text || '').length, 1);
                const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
                const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
                const bRuns = this.splitHighlightSegments(slideData.text || '', this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
                slide.addText(bRuns, { x: 1.2, y: 1.85, w: 10.93, h: 3.6, align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, italic: true, breakLine: false });
                rule(slide, 5.9);
                if (slideData.version) {
                    slide.addText(slideData.version, { x: 2.4, y: 6.3, w: 11.33, h: 0.5, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard, charSpacing: 2, transparency: 20 });
                }
            } else {
                if (slideData.ref) tag(slide, slideData.ref, { x: 2.4, y: 0.9, w: 11.33, h: 0.45, align: 'center', fontSize: 14, color: C.accent, charSpacing: 2 });
                const mText = slideData.text || '';
                const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
                const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
                const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
                slide.addText(mRuns, { x: 1.2, y: 1.75, w: 10.93, h: 3.9, align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false });
                const footText = (slideData.footer ? slideData.footer : '') + (slideData.version ? (slideData.footer ? ' · ' : '') + slideData.version : '');
                if (footText) {
                    rule(slide, 6.05);
                    slide.addText(footText, { x: 2.4, y: 6.3, w: 11.33, h: 0.5, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard, charSpacing: 2 });
                }
            }
    }
    // ============================================================
    // CELESTIAL DAWN (glass layout) — native PPTX export. Deep indigo
    // aurora field + soft gradient orbs, a translucent frosted-glass
    // rounded panel holding all the type. No side badges, no frames,
    // no drop shadows. Font-size tier rules stay identical to every
    // other template.
    // ============================================================
    addGlassSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            slide.background = { color: C.bg };
            // Aurora orbs (soft glow blobs) — approximated with very
            // transparent ellipses so the glass panel reads as blurring them.
            slide.addShape('ellipse', { x: 0.0, y: 0.15, w: 4.3, h: 4.3, fill: { color: C.glow, transparency: 58 }, line: { type: 'none' } });
            slide.addShape('ellipse', { x: 8.9, y: 4.5, w: 4.7, h: 4.7, fill: { color: C.accent2, transparency: 62 }, line: { type: 'none' } });
            slide.addShape('ellipse', { x: 9.6, y: -0.7, w: 2.1, h: 2.1, fill: { color: C.accent, transparency: 68 }, line: { type: 'none' } });
            slide.addShape('ellipse', { x: 1.1, y: 5.7, w: 2.5, h: 2.5, fill: { color: '22D3EE', transparency: 70 }, line: { type: 'none' } });
        };
        // Frosted-glass panel: translucent white rounded rect over the orbs.
        const addGlass = (slide) => slide.addShape('roundRect', { x: 0.5, y: 0.42, w: 12.33, h: 6.66, rectRadius: 0.16, fill: { color: 'FFFFFF', transparency: 91 }, line: { color: 'FFFFFF', transparency: 55, width: 1.25 } });
        const chip = (slide, text) => {
            const w = Math.max(1.5, Math.min(4.8, String(text || '').length * 0.17 + 0.5));
            slide.addShape('roundRect', { x: (13.33 - w) / 2, y: 0.62, w: w, h: 0.5, rectRadius: 0.1, fill: { color: C.accent, transparency: 72 }, line: { color: C.accent, transparency: 25, width: 0.75 } });
            slide.addText(String(text || '').toUpperCase(), { x: (13.33 - w) / 2, y: 0.62, w: w, h: 0.5, align: 'center', fontFace: C.font, fontSize: 12, bold: true, color: C.onCard, charSpacing: 4 });
        };

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            addBg(slide);
            addGlass(slide);
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + tWords[gi], options: tHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(300 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const titleTop = 1.35 + Math.max(0, (3.4 - blockH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), { x: 1.15, y: titleTop + li * pitch, w: 11.03, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            if (slideData.verse) {
                const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
                const vRuns = vSegs.map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.accent } }));
                slide.addText(vRuns, { x: 1.15, y: 6.4, w: 11.03, h: 0.55, align: 'center', fontFace: C.font, fontSize: 15, bold: true, charSpacing: 2 });
            }
        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            addBg(slide);
            addGlass(slide);
            // Glowing aurora circle holding the numeral (left side).
            const badge = String(slideData.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            if (numMatch) {
                slide.addShape('ellipse', { x: 0.95, y: 1.5, w: 1.8, h: 1.8, fill: { color: C.badge, transparency: 12 }, line: { color: C.accent2, transparency: 18, width: 1 } });
                slide.addText(numMatch[0].padStart(2, '0'), { x: 0.95, y: 1.72, w: 1.8, h: 1.36, align: 'center', fontFace: C.font, fontSize: 42, bold: true, color: 'FFFFFF', deco: true });
            }
            const words = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(slideData));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = this._exportMaxChars(44, this._themeIsSerif());
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const titlePt = this.headlinePt(estLines);
            const ptRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + words[gi], options: hl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const balanced = this._balanceHeadline(words, hl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
            const pitch = titlePt * 1.22 / 72;
            const blockH = balanced.length * pitch;
            const titleTop = 1.5 + Math.max(0, (3.6 - blockH) / 2);
            const hx = numMatch ? 3.35 : 1.15;
            const hw = numMatch ? 8.83 : 11.03;
            balanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), { x: hx, y: titleTop + li * pitch, w: hw, h: pitch, align: 'left', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            if (slideData.desc) {
                slide.addText(slideData.desc, { x: 1.15, y: 6.35, w: 11.03, h: 0.55, align: 'left', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            addBg(slide);
            addGlass(slide);
            if (slideData.ref) chip(slide, slideData.ref);
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            const bRuns = this.splitHighlightSegments(slideData.text || '', this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(bRuns, { x: 1.15, y: 1.9, w: 11.03, h: 3.6, align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, italic: true, breakLine: false });
            if (slideData.version) {
                slide.addText(slideData.version, { x: 2.2, y: 6.4, w: 8.93, h: 0.5, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.onCard, charSpacing: 2, transparency: 20 });
            }
        } else {
            let slide = pptx.addSlide();
            addBg(slide);
            addGlass(slide);
            if (slideData.ref) chip(slide, slideData.ref);
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(mRuns, { x: 1.15, y: 1.8, w: 11.03, h: 3.9, align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false });
            const footText = (slideData.footer ? slideData.footer : '') + (slideData.version ? (slideData.footer ? ' · ' : '') + slideData.version : '');
            if (footText) {
                slide.addText(footText, { x: 1.15, y: 6.35, w: 11.03, h: 0.5, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard, charSpacing: 2 });
            }
        }
    }
    // ============================================================
    // SPLIT SCREEN (split layout) — native PPTX export. A bold
    // vertical duotone: burnt-orange rail on the left third, deep
    // espresso field on the right. The rail carries the small-caps
    // meta (kicker top, floor line bottom, diamond ornament); the
    // point numeral CROSSES the seam between the two panels; main
    // type sits flush-left on the dark panel. Font-size tier rules
    // stay identical to every other template.
    // ============================================================
    addSplitSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            slide.background = { color: C.bg };
            // Burnt-orange rail (left third) + cream seam hairline
            slide.addShape('rect', { x: 0, y: 0, w: 4.0, h: 7.5, fill: { color: C.accent }, line: { type: 'none' } });
            slide.addShape('rect', { x: 3.97, y: 0, w: 0.03, h: 7.5, fill: { color: C.text, transparency: 55 }, line: { type: 'none' } });
        };
        const railTag = (slide, text, y) => {
            const s = String(text || '');
            if (!s) return;
            slide.addText(s.toUpperCase(), { x: 0.55, y: y, w: 3.0, h: 0.6, align: 'left', fontFace: C.font, fontSize: 11, bold: true, color: C.onCard, charSpacing: 3 });
        };
        const railOrnament = (slide) => {
            slide.addShape('rect', { x: 1.72, y: 3.47, w: 0.56, h: 0.56, rotate: 45, fill: { type: 'none' }, line: { color: C.onCard, transparency: 45, width: 1 } });
        };

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            addBg(slide);
            railOrnament(slide);
            if (slideData.verse) railTag(slide, slideData.verse, 6.55);
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + tWords[gi], options: tHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(270 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const titleTop = 1.5 + Math.max(0, (3.6 - blockH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), { x: 4.5, y: titleTop + li * pitch, w: 8.4, h: pitch, align: 'left', fontFace: C.font, fontSize: titlePt, bold: true });
            });
        }
        else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            addBg(slide);
            // Giant numeral rides the orange rail (never overlaps the headline)
            const badge = String(slideData.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            if (numMatch) {
                slide.addText(numMatch[0].padStart(2, '0'), { x: 0.8, y: 2.45, w: 2.4, h: 2.6, align: 'center', fontFace: C.font, fontSize: 88, bold: true, color: C.onCard, deco: true });
            }
            const words = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(slideData));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = this._exportMaxChars(44, this._themeIsSerif());
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const titlePt = this.headlinePt(estLines);
            const ptRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + words[gi], options: hl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const balanced = this._balanceHeadline(words, hl.hlIdx, this._exportMaxChars(titlePt, this._themeIsSerif()));
            const pitch = titlePt * 1.22 / 72;
            const blockH = balanced.length * pitch;
            const titleTop = 1.6 + Math.max(0, (3.4 - blockH) / 2);
            balanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), { x: 4.5, y: titleTop + li * pitch, w: 8.4, h: pitch, align: 'left', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            if (slideData.desc) {
                slide.addText(slideData.desc, { x: 4.5, y: 6.35, w: 8.4, h: 0.55, align: 'left', fontFace: C.font, fontSize: 13, bold: true, color: C.text, transparency: 25 });
            }
        }
        else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            // Full-bleed espresso: no rail, so the scripture gets the whole
            // width and the biggest possible font.
            slide.background = { color: C.bg };
            if (slideData.ref) slide.addText(String(slideData.ref).toUpperCase(), { x: 1.0, y: 0.85, w: 11.33, h: 0.5, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent2, charSpacing: 4 });
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            const bRuns = this.splitHighlightSegments(slideData.text || '', this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(bRuns, { x: 1.0, y: 1.85, w: 11.33, h: 3.6, align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, italic: true, breakLine: false });
            if (slideData.version) slide.addText(String(slideData.version).toUpperCase(), { x: 1.0, y: 6.5, w: 11.33, h: 0.5, align: 'center', fontFace: C.font, fontSize: 12, bold: true, color: C.text, transparency: 25, charSpacing: 3 });
        }
        else {
            let slide = pptx.addSlide();
            // Full-bleed espresso: no rail; IDENTICAL type treatment to the
            // verse slide (same wrap math, same box, italic), so the message
            // body renders at the same size as scripture.
            slide.background = { color: C.bg };
            if (slideData.ref) slide.addText(String(slideData.ref).toUpperCase(), { x: 1.0, y: 0.85, w: 11.33, h: 0.5, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent2, charSpacing: 4 });
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.6, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(mRuns, { x: 1.0, y: 1.85, w: 11.33, h: 3.6, align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, italic: true, breakLine: false });
            const footText = (slideData.footer ? slideData.footer : '') + (slideData.version ? (slideData.footer ? ' · ' : '') + slideData.version : '');
            if (footText) slide.addText(footText.toUpperCase(), { x: 1.0, y: 6.5, w: 11.33, h: 0.5, align: 'center', fontFace: C.font, fontSize: 12, bold: true, color: C.text, transparency: 25, charSpacing: 3 });
        }
    }

    addRoyalSlide(pptx, slideData, C) {
        const addBg = (slide) => {
            slide.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: C.bg2, transparency: 45 }, line: { type: 'none' } });
            // Regal sapphire center glow
            slide.addShape('ellipse', { x: 3.5, y: 1.4, w: 6.33, h: 4.6, fill: { color: C.glow, transparency: 55 }, line: { type: 'none' } });
            // Double sapphire frame
            slide.addShape('rect', { x: 0.05, y: 0.05, w: 13.23, h: 7.4, fill: { type: 'none' }, line: { color: C.frame, transparency: 25, width: 3 } });
            slide.addShape('rect', { x: 0.2, y: 0.2, w: 12.93, h: 7.1, fill: { type: 'none' }, line: { color: C.frame, transparency: 75, width: 1.25 } });
            // Corner diamond ornaments (sapphire)
            const d = (x, y) => slide.addShape('rect', { x: x, y: y, w: 0.14, h: 0.14, rotate: 45, fill: { color: C.accent, transparency: 30 }, line: { type: 'none' } });
            d(0.3, 0.3); d(12.89, 0.3); d(0.3, 7.06); d(12.89, 7.06);
        };
        const addChip = (slide, text, y, w, h) => {
            slide.addShape('roundRect', { x: (13.33 - w) / 2, y: y, w: w, h: h, rectRadius: 0.05, fill: { color: C.card, transparency: 12 }, line: { color: C.frame, transparency: 35, width: 1 } });
        };
        const addRefChipW = (text) => Math.max(2.2, Math.min(6.2, String(text || '').length * 0.19));
        const addBadge = (slide, text) => {
            const w = Math.max(1.6, Math.min(5.0, String(text || '').length * 0.17 + 0.6));
            slide.addShape('roundRect', { x: (13.33 - w) / 2, y: 0.5, w: w, h: 0.42, rectRadius: 0.05, fill: { color: C.card, transparency: 10 }, line: { color: C.frame, transparency: 40, width: 1 } });
            slide.addText(text, { x: (13.33 - w) / 2, y: 0.5, w: w, h: 0.42, align: 'center', fontFace: C.font, fontSize: 12, bold: true, color: C.accent, charSpacing: 4 });
        };
        const addFootDiamond = (slide, y) => {
            slide.addShape('rect', { x: 6.62, y: y, w: 0.09, h: 0.09, rotate: 45, fill: { color: C.accent, transparency: 20 }, line: { type: 'none' } });
        };

        if (slideData.type === 'title') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            const tWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const tHl = this.computePointHighlight(tWords, this.getHighlights(slideData));
            const tN1 = this._line1Count(tWords, tHl.hlIdx);
            const tLine1 = tWords.slice(0, tN1).join(' ');
            const tLine2 = tWords.slice(tN1).join(' ');
            const tRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + tWords[gi], options: tHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            const tChars = Math.max(tLine1.length, tLine2.length, 1);
            const tLines = (tLine1 ? 1 : 0) + (tLine2 ? 1 : 0);
            const widthFit = Math.floor(816 / (0.62 * tChars));
            const heightFit = Math.floor(260 / (1.22 * tLines));
            const titlePt = Math.max(34, Math.min(50, widthFit, heightFit) + 8);
            const tBalanced = this._balanceHeadline(tWords, tHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = tBalanced.length * pitch;
            const versePt = Math.min(22, Math.max(12, Math.floor(816 / (0.5 * Math.max(String(slideData.verse || '').length, 1)))));
            const verseGap = 0.3;
            const verseH = 0.7;
            const groupH = blockH + verseGap + verseH;
            const titleTop = 0.85 + Math.max(0, (4.2 - groupH) / 2);
            tBalanced.forEach((indices, li) => {
                slide.addText(tRuns(indices), { x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            const vSegs = this.splitHighlightSegments(slideData.verse || '', this.getHighlights(slideData));
            const vRuns = vSegs.map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.accent } }));
            slide.addText(vRuns, { x: 1.0, y: titleTop + blockH + verseGap, w: 11.33, h: verseH, align: 'center', fontFace: C.font, fontSize: versePt, bold: true, charSpacing: 2 });
            if (slideData.footer) {
                addFootDiamond(slide, 6.42);
                slide.addText(slideData.footer, { x: 2.0, y: 6.55, w: 9.33, h: 0.4, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, transparency: 30, charSpacing: 2 });
            }

        } else if (slideData.type === 'point') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            addBadge(slide, slideData.badge ? slideData.badge : 'POINT');
            const ptWords = String(slideData.title || '').trim().split(/\s+/).filter(Boolean);
            const ptHl = this.computePointHighlight(ptWords, this.getHighlights(slideData));
            const ptRuns = (indices) => indices.map((gi, i) => ({ text: (i ? ' ' : '') + ptWords[gi], options: ptHl.hlIdx.has(gi) ? { color: C.hl } : { color: C.text } }));
            // Size from the REAL two-line split (same rule as classic/bento): a
            // 2-line statement must use the MID tier (44pt), not the MAX tier.
            const ptLine1 = ptWords.slice(0, ptHl.brIndex + 1);
            const ptLine2 = ptWords.slice(ptHl.brIndex + 1);
            const ptCharsPerLine = this._exportMaxChars(44, this._themeIsSerif());
            const ptLongestLine = Math.max(ptLine1.join(' ').length, ptLine2.join(' ').length, 1);
            const ptEstLines = Math.max((ptLine1.length ? 1 : 0) + (ptLine2.length ? 1 : 0), Math.ceil(ptLongestLine / ptCharsPerLine));
            const titlePt = this.headlinePt(ptEstLines);
            const ptBalanced = this._balanceHeadline(ptWords, ptHl.hlIdx, this._exportMaxChars(titlePt, false));
            const pitch = titlePt * 1.22 / 72;
            const blockH = ptBalanced.length * pitch;
            const titleTop = 1.7 + Math.max(0, (2.9 - blockH) / 2);
            ptBalanced.forEach((indices, li) => {
                slide.addText(ptRuns(indices), { x: 1.0, y: titleTop + li * pitch, w: 11.33, h: pitch, align: 'center', fontFace: C.font, fontSize: titlePt, bold: true });
            });
            if (slideData.desc) {
                slide.addShape('roundRect', { x: 2.6, y: 6.15, w: 8.13, h: 0.6, rectRadius: 0.06, fill: { color: C.card, transparency: 12 }, line: { color: C.frame, transparency: 35, width: 1 } });
                slide.addText(slideData.desc, { x: 2.6, y: 6.24, w: 8.13, h: 0.44, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard });
            }
        } else if (slideData.type === 'verse') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.6);
                slide.addText(slideData.ref, { x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.46, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2 });
            }
            const textLen = Math.max(String(slideData.text || '').length, 1);
            const charsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 30)));
            const bodyPt = this._bodyPtFit(textLen, charsPerLine, 3.6, this._themeIsSerif());
            slide.addText(`"${slideData.text}"`, { x: 1.0, y: 1.9, w: 11.33, h: 3.6, align: 'center', fontFace: C.font, fontSize: bodyPt, bold: true, color: C.text, breakLine: false });
            if (slideData.version) {
                addFootDiamond(slide, 6.22);
                slide.addText(slideData.version, { x: 2.0, y: 6.32, w: 9.33, h: 0.4, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, transparency: 30, charSpacing: 2 });
            }
        } else if (slideData.type === 'message') {
            let slide = pptx.addSlide();
            slide.background = { color: C.bg };
            addBg(slide);
            if (slideData.ref) {
                const refW = addRefChipW(slideData.ref);
                addChip(slide, slideData.ref, 0.55, refW, 0.52);
                slide.addText(slideData.ref, { x: (13.33 - refW) / 2, y: 0.62, w: refW, h: 0.38, align: 'center', fontFace: C.font, fontSize: 14, bold: true, color: C.accent, charSpacing: 2 });
            }
            const mText = slideData.text || '';
            const mCharsPerLine = Math.max(8, Math.floor(815.8 / (0.58 * 40)));
            const mBodyPt = this._bodyPtFit(Math.max(String(mText).length, 1), mCharsPerLine, 3.9, this._themeIsSerif());
            const mRuns = this.splitHighlightSegments(mText, this.getHighlights(slideData)).map((seg) => ({ text: seg.text, options: seg.hl ? { color: C.hl } : { color: C.text } }));
            slide.addText(mRuns, { x: 1.0, y: 1.9, w: 11.33, h: 3.9, align: 'center', fontFace: C.font, fontSize: mBodyPt, bold: true, breakLine: false });
            const footText = (slideData.footer ? slideData.footer : '') + (slideData.version ? (slideData.footer ? ' · ' : '') + slideData.version : '');
            if (footText) {
                slide.addShape('roundRect', { x: 0, y: 6.55, w: 13.33, h: 0.85, rectRadius: 0.06, fill: { color: C.card, transparency: 15 }, line: { color: C.frame, transparency: 35, width: 1 } });
                slide.addText(footText, { x: 1.0, y: 6.7, w: 11.33, h: 0.55, align: 'center', fontFace: C.font, fontSize: 13, bold: true, color: C.onCard, charSpacing: 2 });
            }
        }
    }
    showToast(message, type = 'success') {
        const area = document.getElementById('toast-area');
        if (!area) return;
        const colors = { success: '#22c55e', info: '#38bdf8', error: '#ef4444' };
        const icons = { success: 'fa-circle-check', info: 'fa-circle-info', error: 'fa-circle-xmark' };
        const el = document.createElement('div');
        el.className = 'toast-item flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0B192C] border shadow-2xl text-sm font-semibold';
        el.style.borderColor = colors[type] || colors.info;
        el.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}" style="color:${colors[type] || colors.info}"></i> <span style="color:${colors[type] || colors.info}">${message}</span>`;
        area.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }

    escapeHtml(text) {
        return String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    escapeRegExp(text) {
        return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // ANTI-WIDOW / ANTI-ORPHAN LINE SPLIT RULE.
    // Returns how many words belong on the FIRST line so a headline never ends up
    // with a single stranded word on its own line (the "Through / Prayer" problem).
    //   - 1-3 word titles -> keep all on one line (never strand a lone word).
    //   - 4+ words        -> balanced 2-line split, each line >= 2 words.
    //   - Highlighted words stay grouped on the closing line when that keeps both
    //     lines >= 2 words.
    _line1Count(words, hlIdx) {
        const n = words.length;
        if (n <= 0) return 0;
        if (n <= 3) return n; // short title: single line, no stranded word
        const firstHl = hlIdx && hlIdx.size ? Math.min(...hlIdx) : -1;
        let cut = Math.round(n / 2); // balanced default
        cut = Math.max(2, Math.min(n - 2, cut));
        if (firstHl >= 2 && (n - firstHl) >= 2) cut = firstHl; // keep highlights together on last line
        return Math.max(2, Math.min(n - 2, cut));
    }

    // ================================================================
    // HEADLINE FONT-SIZE RULE  (Title slides & Point statements).
    // A single guided scale keeps every headline readable no matter how
    // long the text is. Three fixed tiers, never allowed to drift smaller:
    //   MAX  = short headline (1 line)
    //   MID  = mid-length headline (2 lines)
    //   MIN  = long headline (3+ lines) — HARD FLOOR, text is never smaller.
    // Paired values: on-screen preview (cqw) and exported deck (pt).
    // ================================================================
            _fontRule() {
        return {
            preview: { max: 10.5, mid: 9.2, min: 7.4 }, // cqw (scaled to match export pt below)
            export:  { max: 48,   mid: 44,  min: 36 }   // pt
        };
    }
    headlineCqw(estLines) {
        const r = this._fontRule().preview;
        if (estLines <= 1) return r.max;
        if (estLines <= 2) return r.mid;
        return r.min;
    }
        headlinePt(estLines) {
        const r = this._fontRule().export;
        if (estLines <= 1) return r.max;
        if (estLines <= 2) return r.mid;
        return r.min;
    }

    // Height-fit body sizing for VERSE / MESSAGE slides.
    //
    // These slide types render body text inside FIXED-HEIGHT boxes. If the
    // body tier (48/44/36 pt) would produce more lines than the box can hold,
    // the text spills into the footer below. This helper computes the largest
    // font size that ACTUALLY fits the available box height, then CAPS the
    // headline tier at that value.
    //
    // Short / medium body text keeps the full headline tier (48/44/36) — so the
    // parity tests (which check "short text => 44 pt message body") still pass —
    // and only genuinely-long body text shrinks (down to a 24 pt floor) so it
    // never overflows its container.
        _bodyPtFit(textLen, charsPerLine, boxInches, serif) {
        // Height-fit: verse/message body text lives in a fixed-height export
        // box. Pick the headline tier from the estimated line count, then — if
        // that tier would produce more lines than the box can hold — step the
        // font DOWN until it fits (floor 24 pt). Short/medium text keeps the
        // full headline tier (so parity checks like "44 pt body" still pass);
        // only genuinely-long text shrinks to avoid overflowing into the footer.
        const tier = this.headlinePt(Math.ceil(Math.max(textLen, 1) / Math.max(charsPerLine, 1)));
        const factor = serif ? 0.66 : 0.62;
        const pitch = tier * 1.22 / 72;              // line height in inches
        const maxLines = Math.max(1, Math.floor(boxInches / pitch));
        let fitPt = tier;
        for (let pt = tier; pt >= 24; pt--) {
            const cpl = Math.max(1, Math.floor(815.8 / (factor * pt)));
            if (Math.ceil(textLen / cpl) <= maxLines) { fitPt = pt; break; }
            fitPt = pt;
        }
        return Math.max(24, Math.min(tier, fitPt));
    }
    // Same concept, expressed in cqw for the LIVE PREVIEW. The slide is an
    // aspect-video box (56.25cqw tall); the body column shares that height
    // with the top reference chip and the bottom version/footer. `availCqw`
    // is the vertical space the body may occupy (verse ≈ 38, message ≈ 34 —
    // the message footer strip is taller). We pick the LARGEST size ≤ the
    // headline tier whose estimated wrapped height (lines × size × 1.625
    // line-height) stays inside that budget, so long text can never overlap
    // the reference above or the version/footer below.
    _bodyCqwFit(textLen, charsPerLine, serif, availCqw) {
        const tier = this.headlineCqw(Math.ceil(Math.max(textLen, 1) / Math.max(charsPerLine, 1)));
        const factor = serif ? 0.58 : 0.53;
        const inner = 88;    // text column width in cqw (slide minus 3cqw side padding)
        const lh = 1.625;    // leading-relaxed line height
        const budget = Math.max(12, availCqw || 38);
        let fit = 2.5;
        for (let c = tier; c >= 2.5; c -= 0.1) {
            fit = c;
            const cpl = Math.max(4, Math.floor(inner / (factor * c)));
            if (Math.ceil(textLen / cpl) * c * lh <= budget) break;
        }
        return Math.max(2.5, Math.min(tier, Math.round(fit * 10) / 10));
    }

        // Compute which words of a point title are highlighted and where the
    // two-line break falls. Only words matching a user-supplied highlight
    // phrase are highlighted (case-insensitive, whole-word match). When no
    // phrase is supplied the point renders plainly (no auto-highlighting);
    // the natural two-line break before the last words is still applied.
    computePointHighlight(words, highlights) {
        const hlIdx = new Set();
        if (!words.length) return { hlIdx, brIndex: -1 };
        const joined = words.join(' ');
        const phrases = (highlights || []).map((p) => String(p || '').trim().replace(/\s+/g, ' ')).filter(Boolean);
        phrases.forEach((phrase) => {
            const re = new RegExp('(^|\\s)(' + this.escapeRegExp(phrase) + ')(?=\\s|$)', 'gi');
            let m;
            while ((m = re.exec(joined))) {
                const before = joined.slice(0, m.index);
                const startIdx = before.trim() ? before.trim().split(/\s+/).length : 0;
                const count = m[2].split(/\s+/).length;
                for (let i = startIdx; i < startIdx + count; i++) hlIdx.add(i);
                if (re.lastIndex === m.index) re.lastIndex++;
            }
        });
        // Anti-widow / anti-orphan rule: pick the two-line break so no line is ever
        // left with a single stranded word (short titles collapse to one line).
        const brIndex = this._line1Count(words, hlIdx) - 1;
        return { hlIdx, brIndex };
    }

    // ================================================================
    // SHARED HEADLINE LINE-BREAK ENGINE (used by EVERY theme).
    //
    // Guarantees, for title AND point headlines, in preview AND export:
    //   1. No single word is ever left alone on a line (when the column can
    //      physically fit two words at the chosen font size).
    //   2. Highlighted phrases stay together on one line whenever possible
    //      (a phrase is only split as a last resort to avoid stranding a
    //      single word).
    //   3. Every line is guaranteed to FIT its column at the current font
    //      size, so the browser never re-wraps a "supposed-to-fit" line and
    //      accidentally strands a word.
    //   4. Font size is NEVER changed by this engine — it only rearranges
    //      the words. Font sizing stays exactly as each theme's rules
    //      dictate (the parity tests enforce this).
    // ================================================================

    // Group contiguous highlighted words into single "phrases" that should
    // travel together. Returns arrays of word indices.
    _highlightPhraseGroups(words, hlIdx) {
        const groups = [];
        let i = 0;
        while (i < words.length) {
            if (hlIdx && hlIdx.has(i)) {
                let j = i;
                while (j < words.length && hlIdx.has(j)) j++;
                const g = [];
                for (let k = i; k < j; k++) g.push(k);
                groups.push(g);
                i = j;
            } else {
                groups.push([i]);
                i++;
            }
        }
        return groups;
    }

    // Reflow headline words into explicit lines that each fit at most
    // `maxCharsPerLine` characters wide. Returns an array of LINES, each an
    // array of word indices (word index in the original `words` array).
    _balanceHeadline(words, hlIdx, maxCharsPerLine) {
        const n = words.length;
        if (n === 0) return [];
        if (n === 1) return [[0]];
        const max = Math.max(5, Math.floor(maxCharsPerLine || 20));
        const units = this._highlightPhraseGroups(words, hlIdx).slice();

        const gLen = (g) => g.reduce((s, idx) => s + (idx ? 1 : 0) + words[idx].length, 0) - (g.length ? 1 : 0);
        const lineWords = (line) => line.reduce((s, g) => s + g.length, 0);

        const lines = [];
        let cur = [];
        const curChars = () => {
            let c = 0;
            for (let i = 0; i < cur.length; i++) {
                c += gLen(cur[i]) + (i ? 1 : 0);
            }
            return c;
        };
        const commit = () => { if (cur.length) { lines.push(cur); cur = []; } };

        let ui = 0;
        while (ui < units.length) {
            if (units[ui] === null) { ui++; continue; }
            const u = units[ui];
            if (cur.length === 0) { cur.push(u); ui++; continue; }
            const addChars = curChars() + 1 + gLen(u);
            if (addChars <= max) { cur.push(u); ui++; continue; }
            // Overflow on this line:
            if (lineWords(cur) >= 2) { commit(); continue; }
            // The current line holds a single word — never strand it alone.
            // Pull the next word onto this line (even across a highlight
            // phrase boundary) whenever the two words fit together.
            if (lineWords(cur) === 1 && cur.length === 1) {
                const firstName = words[u[0]];
                if (curChars() + 1 + firstName.length <= max) {
                    cur.push([u[0]]);
                    if (u.length > 1) units[ui] = u.slice(1); else { units[ui] = null; ui++; }
                    continue;
                }
                commit();
                continue;
            }
            commit();
        }
        commit();

        // Final anti-orphan bump: never let the LAST line hold a single word
        // alone when the previous line can donate a word.
        if (lines.length >= 2) {
            const last = lines[lines.length - 1];
            const prev = lines[lines.length - 2];
            if (lineWords(last) === 1 && lineWords(prev) >= 3) {
                const moved = prev.pop();
                const afterPop = prev.reduce((s, g, i2) => s + gLen(g) + (i2 ? 1 : 0), 0);
                if (afterPop + 1 + gLen(moved) <= max) {
                    last.unshift(moved);
                } else {
                    prev.push(moved);
                }
            }
        }

        return lines.map((ln) => ln.reduce((acc, u) => acc.concat(u), []));
    }

    // Max characters that fit on one headline line in the LIVE PREVIEW for a
    // given font size (`cqw`) and font family (serif fonts are wider).
    _previewMaxChars(cqw, serif) {
        const factor = serif ? 0.58 : 0.53;
        return Math.max(8, Math.floor(92 / (factor * (cqw || 9))));
    }

    // Point slides use a *liberal* per-line capacity so their headline text
    // fills the full slide width instead of breaking into short, narrow rows.
    // The generic `_previewMaxChars` above is TOO conservative (~15-20% below
    // the real capacity the browser measures at the same font size), which is
    // why Point lines used to leave a lot of empty space and strand a word or
    // two per row. This version widens the budget to the real measured fit.
    _previewPointMaxChars(cqw, serif) {
        const factor = serif ? 0.48 : 0.44;
        return Math.max(8, Math.floor(92 / (factor * (cqw || 9))));
    }

    // Max characters that fit on one headline line in the EXPORTED deck for
    // a given point size (`pt`) and font family.
    _exportMaxChars(pt, serif) {
        const factor = serif ? 0.66 : 0.62;
        return Math.max(8, Math.floor(816 / (factor * (pt || 40))));
    }

    // Whether the current theme uses a wider serif font (affects line-fit math).
    _themeIsSerif() {
        const t = this.getTheme ? this.getTheme() : {};
        const f = String((t && t.font) || (t && t.fontFamily) || '');
        return /georgia|palatino|times|roman|book antiqua|serif/i.test(f);
    }

    // Render the title's text as a single flowing run so the browser naturally
    // wraps AND balances the lines across the full slide width via CSS
    // `text-wrap: balance`. Highlighted phrases keep their accent class.
    // The font-size rule (cqw) is NOT changed — only the hard <br /> row
    // splitting (fragmented short rows) is removed.
    renderTitleHighlightHtml(s, hlClass, cqw, serif) {
        const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
        if (!words.length) return '';
        const tHl = this.computePointHighlight(words, this.getHighlights(s));
        return words.map((w, gi) =>
            tHl.hlIdx.has(gi)
                ? `<span class="${hlClass}">${this.escapeHtml(w)}</span>`
                : this.escapeHtml(w)
        ).join(' ');
    }

    // Render a Point slide's title as a single flowing text run (no hard <br>
    // breaks) so the browser can naturally wrap AND balance the lines across
    // the full slide width via CSS `text-wrap: balance`. This is what makes
    // Point text "fill the space" instead of breaking into short, narrow rows.
    // Highlighted words keep their theme class; optional `nonHlClass` colors
    // the non-highlighted words (used by light-background themes).
    _pointFlow(s, hlClass, nonHlClass) {
        const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
        const hl = this.computePointHighlight(words, this.getHighlights(s));
        return words.map((w, gi) => {
            const esc = this.escapeHtml(w);
            if (hl.hlIdx.has(gi)) return `<span class="${hlClass}">${esc}</span>`;
            return nonHlClass ? `<span class="${nonHlClass}">${esc}</span>` : esc;
        }).join(' ');
    }



    deleteSlide(i) {
        if (i < 0 || i >= this.slidesQueue.length) return;
        const removed = this.slidesQueue.splice(i, 1)[0];
        if (this.slidesQueue.length === 0) {
            this.selectedPreview = -1;
        } else if (this.selectedPreview >= this.slidesQueue.length) {
            this.selectedPreview = this.slidesQueue.length - 1;
        }
        const labels = { title: 'Title', point: 'Point', verse: 'Verse', message: 'Message' };
                this.showToast(`${labels[removed.type] || 'Slide'} #${i + 1} deleted from queue.`, 'info');
        this.renderSlideQueue();
    }

    renderSlideQueue() {
        const container = document.getElementById('slide-queue');
        const badge = document.getElementById('slide-count-badge');
        if (!container || !badge) return;
        this._persist(); // save deck state on every queue change (add/edit/delete/reorder/select)
        const n = this.slidesQueue.length;
        badge.innerText = `${n} slide${n === 1 ? '' : 's'}`;
        if (n === 0) {
            container.innerHTML = '<p class="text-xs text-gray-500 italic">No slides added yet. Click a button above to add your first slide.</p>';
            this.selectedPreview = -1;
            this.renderPreview();
            return;
        }
        if (this.selectedPreview < 0 || this.selectedPreview >= n) this.selectedPreview = n - 1;
        const icons = { title: 'fa-heading', point: 'fa-list-ul', verse: 'fa-book-open', message: 'fa-message' };
        const labels = { title: 'Title', point: 'Point', verse: 'Verse', message: 'Message' };
        let html = '';
        this.slidesQueue.forEach((s, i) => {
            const isNew = i === n - 1;
            const isSel = i === this.selectedPreview;
            let cls = isSel ? 'border-2 border-amber-500 bg-amber-500/15 ' : 'border border-white/15 bg-white/5 ';
            if (isNew) cls += 'slide-flash';
            const selEye = isSel ? ' <i class="fa-solid fa-eye text-amber-400"></i>' : '';
            const main = s.title || s.text || s.ref || '(untitled)';
            html += `
                <div
                    class="slide-item flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-[#132A4A]/70 transition ${cls}"
                    data-index="${i}"
                    draggable="true"
                    onclick="app.previewSlide(${i})"
                    ondragstart="app.onDragStart(event, ${i})"
                    ondragover="app.onDragOver(event, ${i})"
                    ondragleave="app.onDragLeave(event)"
                    ondrop="app.onDrop(event, ${i})"
                    ondragend="app.onDragEnd(event, ${i})"
                >
                                        <span class="drag-handle w-5 h-5 shrink-0 flex-none text-gray-500 cursor-grab rounded flex items-center justify-center hover:text-amber-400" draggable="false" onclick="event.stopPropagation()"><i class="fa-solid fa-grip-vertical"></i></span>
                    <span class="w-7 h-7 rounded-full bg-[#132A4A] border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 flex-none">${i + 1}</span>
                    <i class="fa-solid ${icons[s.type] || 'fa-file'} text-amber-400 w-4 shrink-0 flex-none"></i>
                    <div class="min-w-0 flex-1">
                        <p class="text-xs font-bold text-white truncate">${labels[s.type] || s.type}${selEye}</p>
                        <p class="text-[11px] text-gray-300 truncate">${this.escapeHtml(main)}</p>
                    </div>
                    ${isNew ? '<span class="text-[10px] font-bold text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/20 animate-pulse">NEW</span>' : ''}
                    <button onclick="event.stopPropagation(); app.editSlide(${i})" title="Edit slide" class="text-gray-500 hover:text-amber-400 transition shrink-0 flex-none pl-1">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button onclick="event.stopPropagation(); app.deleteSlide(${i})" title="Delete slide" class="text-gray-500 hover:text-red-400 transition shrink-0 flex-none pl-1">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>`;
        });
        container.innerHTML = html;
        this.renderPreview();
    }

    // ─── Drag-and-drop reordering for the slide queue ───
    onDragStart(e, fromIndex) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(fromIndex));
        const item = e.currentTarget;
        item.classList.add('opacity-50');
    }
    onDragOver(e, toIndex) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const container = document.getElementById('slide-queue');
        if (!container) return;
        // Remove existing over-state
        container.querySelectorAll('.slide-item').forEach((el) => el.classList.remove('drag-over-top', 'drag-over-bottom'));
        const item = e.currentTarget;
        // Determine whether we are hovering over the top or bottom half
        const rect = item.getBoundingClientRect();
        const mouseY = e.clientY;
        const midY = rect.top + rect.height / 2;
        this._dropPos = mouseY < midY ? 'top' : 'bottom';
        if (this._dropPos === 'top') {
            item.classList.add('drag-over-top');
        } else {
            item.classList.add('drag-over-bottom');
        }
    }
    onDragLeave(e) {
        e.currentTarget.classList.remove('drag-over-top', 'drag-over-bottom');
    }
    onDrop(e, toIndex) {
        e.preventDefault();
        const item = e.currentTarget;
        item.classList.remove('drag-over-top', 'drag-over-bottom');
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        // Compute the true insert index, honoring the top/bottom half being targeted
        const target = this._dropTargetIndex(isNaN(fromIndex) ? -1 : fromIndex, toIndex, this._dropPos || 'top');
        this._dropPos = '';
        if (target === -1) return;
        this.reorderSlide(fromIndex, target);
    }
    onDragEnd(e, fromIndex) {
        e.currentTarget.classList.remove('opacity-50', 'drag-over-top', 'drag-over-bottom');
        this._dropPos = '';
        // Clear any lingering highlight on other rows (e.g. drop cancelled)
        const container = document.getElementById('slide-queue');
        if (container) container.querySelectorAll('.slide-item').forEach((el) => el.classList.remove('drag-over-top', 'drag-over-bottom'));
    }
    /**
     * Converts a raw drop target + hovered half into the final insert index
     * that reorderSlide() expects (an index into the array AFTER the dragged
     * item has been removed). Returns -1 when the move is a no-op.
     */
    _dropTargetIndex(from, to, pos) {
        if (!Number.isInteger(from) || from < 0 || !Number.isInteger(to) || to < 0) return -1;
        if (from === to) return -1;
        if (pos === 'bottom') {
            return from < to ? to : to + 1;
        }
        // 'top' half: insert before the target item
        return from < to ? to - 1 : to;
    }
    reorderSlide(fromIndex, toIndex) {
        if (fromIndex < 0 || fromIndex >= this.slidesQueue.length || toIndex < 0 || toIndex >= this.slidesQueue.length) return;
        if (fromIndex === toIndex) return; // landed in the same slot — nothing to do
        const [moved] = this.slidesQueue.splice(fromIndex, 1);
        this.slidesQueue.splice(toIndex, 0, moved);
        // Keep the selected preview in sync with the moved item
        if (this.selectedPreview === fromIndex) {
            this.selectedPreview = toIndex;
        } else if (this.selectedPreview > fromIndex && this.selectedPreview <= toIndex) {
            this.selectedPreview--;
        } else if (this.selectedPreview < fromIndex && this.selectedPreview >= toIndex) {
            this.selectedPreview++;
        }
        this.renderSlideQueue();
        this.renderPreview();
        this.showToast(`Slide moved to position ${toIndex + 1}.`, 'info');
    }

    previewSlide(i) {
        if (i < 0 || i >= this.slidesQueue.length) return;
        this.selectedPreview = i;
        this.renderSlideQueue();
    }

    editSlide(i) {
        if (i < 0 || i >= this.slidesQueue.length) return;
        const s = this.slidesQueue[i];
        this.selectedPreview = i;
        const editLabels = {
            title: { m: 'title-modal', h: 'title-modal-heading', b: 'title-modal-submit', ht: 'Edit Title Slide', bt: 'Save Changes' },
            point: { m: 'point-modal', h: 'point-modal-heading', b: 'point-modal-submit', ht: 'Edit Point Slide', bt: 'Save Changes' },
            verse: { m: 'verse-modal', h: 'verse-modal-heading', b: 'verse-modal-submit', ht: 'Edit Verse Slide', bt: 'Save Changes' },
            message: { m: 'message-modal', h: 'message-modal-heading', b: 'message-modal-submit', ht: 'Edit Message Slide', bt: 'Save Changes' }
        };
        const cfg = editLabels[s.type];
        if (!cfg) return;
        if (s.type === 'title') {
            document.getElementById('input-title').value = s.title || '';
            this.renderHighlightRows('title-highlight-fields', this.getHighlights(s));
            document.getElementById('input-verse').value = s.verse || '';
            document.getElementById('input-title-footer').value = s.footer || '';
        } else if (s.type === 'point') {
            document.getElementById('input-point-badge').value = s.badge || '';
            document.getElementById('input-point-title').value = s.title || '';
            this.renderHighlightRows('highlight-fields', this.getHighlights(s));
            document.getElementById('input-point-desc').value = s.desc || '';
        } else if (s.type === 'verse') {
            document.getElementById('input-verse-ref').value = s.ref || '';
            document.getElementById('input-verse-body').value = s.text || '';
            document.getElementById('input-verse-version').value = s.version || '';
        } else if (s.type === 'message') {
            document.getElementById('input-message-text').value = s.text || '';
            this.renderHighlightRows('message-highlight-fields', this.getHighlights(s));
            document.getElementById('input-message-ref').value = s.ref || '';
            document.getElementById('input-message-footer').value = s.footer || '';
        }
        this.openModal(cfg.m);
        // Mark as edit AFTER opening (openModal clears editingIndex)
        this.editingIndex = i;
        const hEl = document.getElementById(cfg.h);
        const bEl = document.getElementById(cfg.b);
        if (hEl) hEl.innerText = cfg.ht;
        if (bEl) bEl.innerText = cfg.bt;
    }

    prevPreview() { this.previewSlide(this.selectedPreview - 1); }
    nextPreview() { this.previewSlide(this.selectedPreview + 1); }

    enlargePreview() {
        if (this.slidesQueue.length === 0 || this.selectedPreview < 0) {
            this.showToast('Add a slide first, then click to enlarge.', 'info');
            return;
        }
        const modal = document.getElementById('preview-modal');
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        this.renderEnlargedPreview();
    }

    closeEnlargedPreview() {
        const modal = document.getElementById('preview-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    renderEnlargedPreview() {
        const modal = document.getElementById('preview-modal');
        const box = document.getElementById('enlarged-slide');
        const label = document.getElementById('enlarged-label');
        if (!modal || !box || !label) return;
        if (modal.classList.contains('hidden')) return;
        if (this.slidesQueue.length === 0 || this.selectedPreview < 0) {
            this.closeEnlargedPreview();
            return;
        }
                label.innerText = `Slide ${this.selectedPreview + 1} of ${this.slidesQueue.length}`;
        box.innerHTML = this.renderSlideVisual(this.slidesQueue[this.selectedPreview]);
        this._applyThemeBg(box.firstElementChild);
        this.renderFontScaleControls();
    }

    // ─── Per-slide Font Size control ──────────────────────────────────────
    // Adjusts the font size of the currently selected slide in the live preview,
    // the enlarged preview and every export (PPTX image + editable + PDF).
    renderFontScaleControls() {
        const has = this.slidesQueue.length > 0 && this.selectedPreview >= 0;
        const s = has ? this.slidesQueue[this.selectedPreview] : null;
        const pct = Math.round(this.getFontScale(s) * 100);
        const labels = { title: 'Title', point: 'Point', verse: 'Verse', message: 'Message' };
        const typeName = s ? (labels[s.type] || 'Slide') : 'Slide';
        const sync = (barId, sliderId, valueId, ctxId) => {
            const bar = document.getElementById(barId);
            if (!bar) return;
            if (!has) {
                bar.classList.add('hidden');
                bar.classList.remove('flex');
                return;
            }
            bar.classList.remove('hidden');
            bar.classList.add('flex');
            const slider = document.getElementById(sliderId);
            if (slider) slider.value = String(pct);
            const val = document.getElementById(valueId);
            if (val) val.innerText = pct + '%';
            const ctx = document.getElementById(ctxId);
            if (ctx) ctx.innerText = `Slide ${this.selectedPreview + 1} of ${this.slidesQueue.length} · ${typeName}`;
        };
        sync('font-scale-bar', 'font-scale-slider', 'font-scale-value', 'font-scale-context');
        sync('enlarged-font-scale-bar', 'enlarged-font-scale-slider', 'enlarged-font-scale-value', 'enlarged-font-scale-context');
    }

    _currentSlide() {
        return (this.selectedPreview >= 0 && this.slidesQueue[this.selectedPreview]) ? this.slidesQueue[this.selectedPreview] : null;
    }

    applyFontScale(pct) {
        if (!this._currentSlide()) { this.renderFontScaleControls(); return; }
        const clamped = Math.min(200, Math.max(50, Math.round(Number(pct) || 100)));
        this._currentSlide().fontScale = clamped / 100;
        this._persist();
        this.renderPreview();            // re-paints the main preview + enlarged view
        this.renderFontScaleControls();
    }

    decrFontScale() { this.applyFontScale(Math.round(this.getFontScale(this._currentSlide()) * 100) - 5); }
    incrFontScale() { this.applyFontScale(Math.round(this.getFontScale(this._currentSlide()) * 100) + 5); }
    setFontScaleFromSlider(v) { this.applyFontScale(Number(v)); }
    resetFontScale() { this.applyFontScale(100); }

    renderPreview() {
        const box = document.getElementById('slide-preview');
        const label = document.getElementById('preview-label');
        if (!box || !label) return;
        if (this.slidesQueue.length === 0 || this.selectedPreview < 0) {
            box.innerHTML = '<div class="aspect-video flex items-center justify-center"><p class="text-xs text-gray-500 italic">Select a slide in the queue to preview it.</p></div>';
            label.innerText = '';
            this.renderEnlargedPreview();
            return;
        }
        label.innerText = `Slide ${this.selectedPreview + 1} of ${this.slidesQueue.length}`;
        box.innerHTML = this.renderSlideVisual(this.slidesQueue[this.selectedPreview]);
        this._applyThemeBg(box.firstElementChild);
        // Remember how wide the preview the user is actually looking at is, so
        // the PPTX image capture can match it even if exported from another step
        // where this preview pane is hidden (fixed-px margins stop scaling).
        const previewRoot = box.firstElementChild;
        if (previewRoot) {
            const w = previewRoot.getBoundingClientRect().width;
            if (w >= 320 && w <= 1600) this._lastPreviewW = Math.round(w);
        }
        this.renderEnlargedPreview();
        this.renderFontScaleControls();
    }

    renderSlideVisualRaw(s) {
        // The Midnight Aurora template uses its own modern layout (design,
        // format & organization differ), while the font-size rules below stay
        // exactly the same (identical cqw tier tables / min-max bounds).
        if (this.getTheme().layout === 'modern') return this.renderSlideVisualModern(s);
        if (this.getTheme().layout === 'chapel') return this.renderSlideVisualChapel(s);
        if (this.getTheme().layout === 'lilac') return this.renderSlideVisualLilac(s);
        if (this.getTheme().layout === 'rose') return this.renderSlideVisualRose(s);
        if (this.getTheme().layout === 'mint') return this.renderSlideVisualMint(s);
        if (this.getTheme().layout === 'ember') return this.renderSlideVisualEmber(s);
        if (this.getTheme().layout === 'royal') return this.renderSlideVisualRoyal(s);
        if (this.getTheme().layout === 'bento') return this.renderSlideVisualBento(s);
        if (this.getTheme().layout === 'poster') return this.renderSlideVisualPoster(s);
        if (this.getTheme().layout === 'glory') return this.renderSlideVisualGlory(s);
        if (this.getTheme().layout === 'glass') return this.renderSlideVisualGlass(s);
        if (this.getTheme().layout === 'split') return this.renderSlideVisualSplit(s);
        if (this.getTheme().layout === 'frost') return this.renderSlideVisualFrost(s);

        const base = 'relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-8 md:p-12 border border-amber-500/50';
                if (s.type === 'title') {
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            // Anti-widow / anti-orphan rule: never strand a single trailing word.
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            // Auto-fit preview text so nothing overlaps at any box size
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8)); // title headline — bigger & bolder
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `
                <div class="relative w-full cq-container aspect-video bg-[#0B192C] border-[6px] border-[#FFD700]/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 text-center">
                    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/50 via-[#0B192C] to-[#050C16]"></div>
                    <div class="absolute inset-4 border border-[#FFD700]/20 rounded-xl"></div>
                    <div class="relative z-10 my-auto w-full min-w-0 px-[2cqw] flex flex-col items-center gap-[1.2cqw]">
                        <h2 class="text-white w-full min-w-0 font-black tracking-tight leading-[1.12] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] break-words [overflow-wrap:anywhere]" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFF3B0] to-[#FFD700]', cqw, this._themeIsSerif())}
                        </h2>
                        <p class="text-white w-full min-w-0 font-bold tracking-widest uppercase break-words [overflow-wrap:anywhere] drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]" style="font-size:${verseCqw}cqw">${s.verse ? this.highlightPhrasesHtml(s.verse, this.getHighlights(s)) : ''}</p>
                    </div>
                    ${s.footer ? `
                    <div class="relative z-10 flex justify-center">
                        <div class="bg-[#132A4A]/90 border-t-2 border-[#FFD700]/50 px-[2.6cqw] py-[0.8cqw] max-w-full rounded-lg shadow-xl text-center">
                            <p class="text-slate-200 max-w-full break-words [overflow-wrap:anywhere] font-semibold tracking-wide" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                        </div>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'point') {
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const hlClass = 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFF3B0] to-[#FFD700]';
            // Rules-based sizing: estimate how many lines the point wraps to,
            // then pick the title font size from a tier table. Point text is
            // much bigger than the verse tiers (min & max).
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5))); // ~20 chars at mid size
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max(lines, Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            // Anti-widow arrangement: reflow the words into lines that FIT the
            // column at this exact font size (highlight phrases stay together).
            const displayLines = this._balanceHeadline(words, hl.hlIdx, this._previewPointMaxChars(cqw, this._themeIsSerif()));
            const renderLine = (indices) => indices.map((gi) =>
                hl.hlIdx.has(gi) ? `<span class="${hlClass}">${this.escapeHtml(words[gi])}</span>` : this.escapeHtml(words[gi])
            ).join(' ');
            const badgeCqw = Math.round(cqw * 0.34 * 10) / 10;
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            return `
                <div class="relative w-full cq-container aspect-video bg-[#0B192C] border-[6px] border-[#FFD700]/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 text-center">
                    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/50 via-[#0B192C] to-[#050C16]"></div>
                    <div class="absolute inset-4 border border-[#FFD700]/20 rounded-xl"></div>
                    <div class="relative z-10 flex justify-center">
                        <span class="text-[#FFD700] inline-block font-black tracking-[0.25em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] break-words" style="font-size:${badgeCqw}cqw">${this.escapeHtml(s.badge || 'POINT')}</span>
                    </div>
                    <div class="relative z-10 my-auto w-full min-w-0 px-[2cqw] flex flex-col items-center gap-[1.2cqw]">
                        <h2 class="text-white w-full min-w-0 font-black tracking-tight leading-[1.12] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] break-words [overflow-wrap:anywhere]" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, hlClass)}
                        </h2>
                    </div>
                    ${s.desc ? `
                    <div class="relative z-10 flex justify-center">
                        <div class="bg-[#132A4A]/90 border-t-2 border-[#FFD700]/50 px-[2.6cqw] py-[0.8cqw] max-w-full rounded-lg shadow-xl text-center">
                            <p class="text-slate-200 max-w-full break-words [overflow-wrap:anywhere] font-semibold tracking-wide" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p>
                        </div>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'verse') {
            // Rules-based sizing: estimate how many lines the verse wraps to,
            // then pick the font size from a tier table so longer verses tier
            // down gently and still fit. (2-line -> big, 3-line -> current size,
            // 4-line -> smaller, 5+ lines -> smallest)
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4))); // ~48 chars at current size
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `
                <div class="relative w-full cq-container aspect-video bg-[#0B192C] border-[6px] border-[#FFD700]/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 text-center">
                    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/50 via-[#0B192C] to-[#050C16]"></div>
                    <div class="absolute inset-4 border border-[#FFD700]/20 rounded-xl"></div>
                    <div class="relative z-10 flex justify-center pt-[2cqw]">
                        <div class="bg-[#132A4A] border-l-4 border-[#FFD700] px-[2.2cqw] py-[0.6cqw] rounded-r-lg shadow-lg max-w-full">
                            <h3 class="text-[#FFD700] w-full min-w-0 font-black tracking-[0.2em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</h3>
                        </div>
                    </div>
                    <div class="relative z-10 my-auto w-full min-w-0 flex-1 px-[2cqw] py-[2cqw] flex flex-col items-center justify-center">
                        <p class="text-white w-full min-w-0 font-bold leading-relaxed drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] break-words [overflow-wrap:anywhere]" style="font-size:${bodyCqw}cqw">&quot;${this.escapeHtml(s.text)}&quot;</p>
                    </div>
                    ${s.version ? `
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <span class="text-[#FFD700]/70 w-full min-w-0 max-w-full font-bold tracking-widest uppercase break-words [overflow-wrap:anywhere]" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Rules-based sizing: estimate how many lines the message wraps to,
            // then tier down gradually. Min = 4.0, Max = 6.6.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5))); // ~30 chars at mid size
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `
                <div class="relative w-full cq-container aspect-video bg-[#0B192C] border-[6px] border-[#FFD700]/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 text-center">
                    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/50 via-[#0B192C] to-[#050C16]"></div>
                    <div class="absolute inset-4 border border-[#FFD700]/20 rounded-xl"></div>
                    ${s.ref ? `
                    <div class="relative z-10 flex justify-center pt-[2cqw]">
                        <span class="text-[#FFD700] w-full min-w-0 max-w-full font-bold tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</span>
                    </div>` : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 flex-1 px-[2cqw] py-[2cqw] flex flex-col items-center justify-center">
                        <p class="text-white w-full min-w-0 font-bold leading-relaxed drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] break-words [overflow-wrap:anywhere]" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s))}</p>
                    </div>
                    ${s.footer ? `
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <span class="text-[#FFD700]/70 w-full min-w-0 max-w-full font-bold tracking-widest uppercase break-words [overflow-wrap:anywhere]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</span>
                    </div>` : ''}
                </div>`;
        }
        return `
            <div class="${base}">
                <span class="text-amber-400 font-bold text-xs md:text-sm mb-4 tracking-wide">${this.escapeHtml(s.ref)}</span>
                <p class="text-white/90 italic text-base md:text-xl max-w-full break-words">“${this.escapeHtml(s.text)}”</p>
                <span class="mt-4 text-amber-400/80 text-[10px] md:text-xs tracking-widest">${this.escapeHtml(s.version)}</span>
            </div>`;
    }

    // ============================================================
    // Midnight Aurora - modern layout preview
    // A different DESIGN / COLOR / FONT STYLE / FORMAT / ORGANIZATION
    // (left-aligned split layout, gradient sweep, square chips and a
    // full-width footer strip) - but the font-size rules are identical
    // to the classic templates: the exact same cqw tier tables below.
    // ============================================================
    renderSlideVisualModern(s) {
        const base = 'relative w-full cq-container aspect-video border-[6px] border-[#22D3EE]/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between font-sans';

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates (min 5.5cqw / max 10.5cqw, headline +8pt).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            // Anti-widow / anti-orphan rule: never strand a single trailing word.
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8)); // title headline — bigger & bolder
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `
                <div class="${base}">
                    <div class="relative z-10 my-auto w-full min-w-0 pl-[6.5cqw] pr-[5cqw] flex flex-col items-start gap-[1.6cqw]">
                        <h1 class="text-white w-full min-w-0 font-black tracking-tight leading-[1.12] drop-shadow-[0_10px_24px_rgba(2,6,23,0.75)] break-words [overflow-wrap:anywhere] text-left" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#A78BFA]', cqw)}
                        </h1>
                        ${s.verse ? `<p class="text-[#A78BFA] w-full min-w-0 font-bold tracking-[0.35em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#A78BFA]')}</p>` : ''}
                    </div>
                    ${s.footer ? `
                    <div class="relative z-10 w-full border-t-2 border-[#22D3EE]/40 bg-[#1F2937]/80 pl-[6.5cqw] pr-[4.5cqw] py-[1.5cqw]">
                        <p class="text-slate-200 w-full min-w-0 font-bold tracking-[0.2em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }

        if (s.type === 'point') {

            // Same highlight split + title tier rules as the classic templates (min 6.5cqw / max 10.5cqw).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const hlClass = 'text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#A78BFA]';
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max(lines, Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const displayLines = this._balanceHeadline(words, hl.hlIdx, this._previewPointMaxChars(cqw, false));
            const renderLine = (indices) => indices.map((gi) =>
                hl.hlIdx.has(gi) ? `<span class="${hlClass}">${this.escapeHtml(words[gi])}</span>` : this.escapeHtml(words[gi])
            ).join(' ');
            const badgeCqw = Math.round(cqw * 0.34 * 10) / 10;
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            return `
                <div class="${base}">
                    <div class="relative z-10 flex items-center justify-between pt-[2.6cqw] pl-[6.5cqw] pr-[4.5cqw]">
                        <span class="inline-flex items-center text-[#22D3EE] font-black tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(2,6,23,0.8)]" style="font-size:${badgeCqw}cqw">${this.escapeHtml(s.badge || 'POINT')}</span>
                        <span class="w-[1.8cqw] h-[1.8cqw] rotate-45 border-2 border-[#22D3EE]/50"></span>
                    </div>
                    <div class="relative z-10 my-auto w-full min-w-0 pl-[6.5cqw] pr-[5cqw]">
                        <h2 class="text-white w-full min-w-0 font-black tracking-tight leading-[1.12] drop-shadow-[0_10px_24px_rgba(2,6,23,0.75)] break-words [overflow-wrap:anywhere] text-left" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, hlClass)}
                        </h2>
                    </div>
                    ${s.desc ? `
                    <div class="relative z-10 w-full border-t-2 border-[#22D3EE]/40 bg-[#1F2937]/80 pl-[6.5cqw] pr-[4.5cqw] py-[1.5cqw]">
                        <div class="flex items-center gap-[2cqw]">
                            <span class="w-[0.5cqw] h-[2.8cqw] bg-gradient-to-b from-[#22D3EE] to-[#A78BFA] rounded-sm"></span>
                            <p class="text-slate-200 w-full min-w-0 font-bold tracking-wide break-words [overflow-wrap:anywhere]" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p>
                        </div>
                    </div>` : ''}
                </div>`;
        }

        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates (min 3.6cqw / max 6.0cqw).
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `
                <div class="${base}">

                    <div class="relative z-10 pt-[2.6cqw] pl-[6.5cqw] pr-[4.5cqw]">
                        ${s.ref ? `
                        <span class="inline-flex items-center gap-[1.2cqw] bg-[#1F2937] border-l-4 border-[#22D3EE] px-[2.2cqw] py-[0.7cqw] rounded-sm shadow-lg text-[#7DD3FC] font-black tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</span>` : ''}
                    </div>
                    <div class="relative z-10 my-auto w-full min-w-0 pl-[6.5cqw] pr-[5cqw]">
                        <p class="text-white w-full min-w-0 font-bold leading-relaxed drop-shadow-[0_10px_24px_rgba(2,6,23,0.75)] break-words [overflow-wrap:anywhere] text-left" style="font-size:${bodyCqw}cqw">&quot;${this.escapeHtml(s.text)}&quot;</p>
                    </div>
                    ${s.version ? `
                    <div class="relative z-10 w-full border-t-2 border-[#22D3EE]/40 bg-[#1F2937]/80 pl-[6.5cqw] pr-[4.5cqw] py-[1.5cqw]">
                        <p class="text-[#7DD3FC] w-full min-w-0 font-bold tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</p>
                    </div>` : ''}
                </div>`;
        }

        if (s.type === 'message') {

            // Same message tier rules as the classic templates (min 4.0cqw / max 6.6cqw).
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `
                <div class="${base}">

                    <div class="relative z-10 pt-[2.6cqw] pl-[6.5cqw] pr-[4.5cqw]">
                        ${s.ref ? `
                        <span class="inline-flex items-center gap-[1.2cqw] bg-[#1F2937] border-l-4 border-[#22D3EE] px-[2.2cqw] py-[0.7cqw] rounded-sm shadow-lg text-[#7DD3FC] font-black tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</span>` : ''}
                    </div>
                    <div class="relative z-10 my-auto w-full min-w-0 pl-[6.5cqw] pr-[5cqw]">
                        <p class="text-white w-full min-w-0 font-bold leading-relaxed drop-shadow-[0_10px_24px_rgba(2,6,23,0.75)] break-words [overflow-wrap:anywhere] text-left" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s))}</p>
                    </div>
                    ${s.footer ? `
                    <div class="relative z-10 w-full border-t-2 border-[#22D3EE]/40 bg-[#1F2937]/80 pl-[6.5cqw] pr-[4.5cqw] py-[1.5cqw]">
                        <p class="text-[#7DD3FC] w-full min-w-0 font-bold tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }

        return `
            <div class="${base}">
                <div class="relative z-10 p-[4cqw] text-left">
                    <p class="text-slate-200 font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p>
                </div>
            </div>`;
    }


    // ============================================================
    // Forest Chapel - ornate centered layout preview
    // A different DESIGN / COLOR / FONT STYLE / FORMAT / ORGANIZATION
    // (centered chapel layout with ornamental gold dividers), but the
    // font-size rules are identical to the classic templates: the exact
    // same cqw tier tables / min-max bounds below.
    // ============================================================
    renderSlideVisualChapel(s) {
        const base = 'relative w-full cq-container aspect-video bg-[#0E2A1E] border-[6px] border-[#D9B36C]/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between font-sans';
        const glow = '<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1B4D36_0%,_transparent_72%)] opacity-70"></div>';
        const frame = '<div class="absolute inset-4 border border-[#D9B36C]/25 rounded-xl pointer-events-none"></div>';
        const corners = '<div class="absolute inset-0 pointer-events-none">' +
            '<span class="absolute left-[1.5cqw] top-[1.5cqw] w-[4.5cqw] h-[0.3cqw] bg-[#D9B36C]"></span>' +
            '<span class="absolute right-[1.5cqw] top-[1.5cqw] w-[4.5cqw] h-[0.3cqw] bg-[#D9B36C]"></span>' +
            '<span class="absolute left-[1.5cqw] bottom-[1.5cqw] w-[4.5cqw] h-[0.3cqw] bg-[#D9B36C]"></span>' +
            '<span class="absolute right-[1.5cqw] bottom-[1.5cqw] w-[4.5cqw] h-[0.3cqw] bg-[#D9B36C]"></span>' +
            '</div>';
        const divider = '<div class="relative z-10 flex items-center justify-center gap-[1.4cqw] pt-[2.6cqw]">' +
            '<span class="w-[14cqw] h-[0.28cqw] bg-[#D9B36C]/60"></span>' +
            '<span class="w-[1.1cqw] h-[1.1cqw] rotate-45 bg-[#D9B36C]"></span>' +
            '<span class="w-[14cqw] h-[0.28cqw] bg-[#D9B36C]/60"></span>' +
            '</div>';

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates (min 5.5cqw / max 10.5cqw, headline +8pt).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            // Anti-widow / anti-orphan rule: never strand a single trailing word.
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8)); // title headline — bigger & bolder
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `
                <div class="${base}">
                    ${glow}
                    ${frame}
                    ${corners}
                    ${divider}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw] flex flex-col items-center gap-[1.4cqw]">
                        <h1 class="text-white w-full min-w-0 font-black tracking-tight leading-[1.12] drop-shadow-[0_10px_20px_rgba(6,20,14,0.8)] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-transparent bg-clip-text bg-gradient-to-r from-[#D9B36C] via-[#F4E4BC] to-[#D9B36C]', cqw)}
                        </h1>
                        ${s.verse ? `<p class="text-[#D9B36C] w-full min-w-0 font-bold text-center tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere] drop-shadow-[0_5px_10px_rgba(6,20,14,0.8)]" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-transparent bg-clip-text bg-gradient-to-r from-[#D9B36C] via-[#F4E4BC] to-[#D9B36C]')}</p>` : ''}
                    </div>
                    ${s.footer ? `
                    <div class="relative z-10 flex flex-col items-center gap-[0.6cqw] pb-[2cqw]">
                        <span class="w-[1.1cqw] h-[1.1cqw] rotate-45 bg-[#D9B36C]"></span>
                        <p class="text-slate-200 w-full min-w-0 font-semibold tracking-wide break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates (min 6.5cqw / max 10.5cqw).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const hlClass = 'text-transparent bg-clip-text bg-gradient-to-r from-[#D9B36C] via-[#F4E4BC] to-[#D9B36C]';
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max(lines, Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const displayLines = this._balanceHeadline(words, hl.hlIdx, this._previewPointMaxChars(cqw, false));
            const renderLine = (indices) => indices.map((gi) =>
                hl.hlIdx.has(gi) ? `<span class="${hlClass}">${this.escapeHtml(words[gi])}</span>` : this.escapeHtml(words[gi])
            ).join(' ');
            const badgeCqw = Math.round(cqw * 0.34 * 10) / 10;
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            return `
                <div class="${base}">
                    ${glow}
                    ${frame}
                    ${corners}
                    <div class="relative z-10 flex justify-center pt-[2.6cqw]">
                        <span class="inline-flex items-center text-[#D9B36C] font-black tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(6,20,14,0.8)]" style="font-size:${badgeCqw}cqw">${this.escapeHtml(s.badge || 'POINT')}</span>
                    </div>
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <h2 class="text-white w-full min-w-0 font-black tracking-tight leading-[1.12] drop-shadow-[0_10px_20px_rgba(6,20,14,0.8)] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, hlClass)}
                        </h2>
                    </div>
                    ${s.desc ? `
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <div class="flex items-center gap-[2cqw] bg-[#1A3A2A]/90 border border-[#D9B36C]/50 px-[2.6cqw] py-[0.9cqw] rounded-lg shadow-xl">
                            <span class="w-[0.5cqw] h-[2.6cqw] bg-gradient-to-b from-[#D9B36C] to-[#F4E4BC] rounded-sm"></span>
                            <p class="text-slate-200 w-full min-w-0 font-bold tracking-wide break-words [overflow-wrap:anywhere]" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p>
                        </div>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates (min 3.6cqw / max 6.0cqw).
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `
                <div class="${base}">
                    ${glow}
                    ${frame}
                    ${corners}
                    <div class="relative z-10 flex justify-center pt-[2.6cqw]">
                        ${s.ref ? `
                        <span class="inline-flex items-center bg-[#1A3A2A] border-l-4 border-[#D9B36C] px-[2.2cqw] py-[0.8cqw] rounded-r-lg shadow-lg text-[#D9B36C] font-black tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</span>` : ''}
                    </div>
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-white w-full min-w-0 font-bold leading-relaxed drop-shadow-[0_10px_20px_rgba(6,20,14,0.8)] break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">&quot;${this.escapeHtml(s.text)}&quot;</p>
                    </div>
                    ${s.version ? `
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <p class="text-[#D9B36C] w-full min-w-0 font-bold tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere] text-center" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</p>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates (min 4.0cqw / max 6.6cqw).
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `
                <div class="${base}">
                    ${glow}
                    ${frame}
                    ${corners}
                    <div class="relative z-10 flex justify-center pt-[2.6cqw]">
                        ${s.ref ? `
                        <span class="inline-flex items-center bg-[#1A3A2A] border-l-4 border-[#D9B36C] px-[2.2cqw] py-[0.7cqw] rounded-r-lg shadow-lg text-[#D9B36C] font-black tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</span>` : ''}
                    </div>
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-white w-full min-w-0 font-bold leading-relaxed drop-shadow-[0_10px_20px_rgba(6,20,14,0.8)] break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s))}</p>
                    </div>
                    ${s.footer ? `
                    <div class="relative z-10 w-full border-t-2 border-[#D9B36C]/40 bg-[#1A3A2A]/80 py-[1.5cqw]">
                        <p class="text-[#D9B36C] w-full min-w-0 font-bold tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }

        return `
            <div class="${base}">
                ${glow}
                ${frame}
                ${corners}
                <div class="relative z-10 p-[4cqw] text-center">
                    <p class="text-slate-200 font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p>
                </div>
            </div>`;
    }
// ============================================================
    // Lilac Grace - soft light-purple layout PREVIEW
    // A different DESIGN / COLOR / FONT STYLE / FORMAT / ORGANIZATION
    // (light lavender "cloud" layout, graceful Palatino serif), but the
    // font-size rules are identical to the classic templates: the exact
    // same cqw tier tables / min-max bounds / +2.0 headline boost below.
    // ============================================================
    renderSlideVisualLilac(s) {
        const base = 'relative w-full cq-container aspect-video border-[6px] border-[#7C3AED]/60 rounded-[1.4cqw] shadow-2xl overflow-hidden flex flex-col justify-between font-[\'Palatino\',\'Georgia\',serif]';
        const glow = ''; // Center glow removed from lilac slides
        const frame = '<div class="absolute inset-4 border border-[#A78BFA]/25 rounded-[1.1cqw] pointer-events-none"></div>';
        const corners = '<div class="absolute inset-0 pointer-events-none">' +
            '<span class="absolute left-[1.5cqw] top-[1.5cqw] w-[0.9cqw] h-[0.9cqw] rounded-full bg-[#C4B5FD]"></span>' +
            '<span class="absolute right-[1.5cqw] top-[1.5cqw] w-[0.9cqw] h-[0.9cqw] rounded-full bg-[#C4B5FD]"></span>' +
            '<span class="absolute left-[1.5cqw] bottom-[1.5cqw] w-[0.9cqw] h-[0.9cqw] rounded-full bg-[#C4B5FD]"></span>' +
            '<span class="absolute right-[1.5cqw] bottom-[1.5cqw] w-[0.9cqw] h-[0.9cqw] rounded-full bg-[#C4B5FD]"></span>' +
            '</div>';
        const seriesChip = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center bg-white/75 border border-[#A78BFA]/40 text-[#7C3AED] font-black tracking-[0.25em] uppercase px-[2.6cqw] py-[0.8cqw] rounded-full shadow-md" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        // Point badge as plain highlighted text (no filled banner) — Lilac Grace
        const seriesChipTop = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center text-[#7C3AED] font-black tracking-[0.35em] uppercase drop-shadow-[0_2px_6px_rgba(76,29,149,0.25)]" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates (min 5.5cqw / max 10.5cqw, headline +8pt).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            // Anti-widow / anti-orphan rule: never strand a single trailing word.
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8)); // title headline — bigger & bolder
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${frame}
                    ${corners}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw] flex flex-col items-center gap-[1.4cqw]">
                        <h1 class="text-[#2E1065] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-[#C0522E]', cqw, true)}
                        </h1>
                        ${s.verse ? `<p class="text-[#7C3AED] w-full min-w-0 font-bold text-center tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-[#C0522E]')}</p>` : ''}
                    </div>
                                        ${s.footer ? `\
                    <div class="relative z-10 flex flex-col items-center gap-[0.6cqw] pb-[2cqw]">
                        <span class="w-[1.1cqw] h-[1.1cqw] rotate-45 bg-[#A78BFA]"></span>
                        <p class="text-[#2E1065] w-full min-w-0 font-semibold tracking-wide break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates (min 6.5cqw / max 10.5cqw).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const hlClass = 'text-[#C0522E]';
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max(lines, Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const displayLines = this._balanceHeadline(words, hl.hlIdx, this._previewPointMaxChars(cqw, true));
            const renderLine = (indices) => indices.map((gi) =>
                hl.hlIdx.has(gi) ? `<span class="${hlClass}">${this.escapeHtml(words[gi])}</span>` : `<span class="text-[#2E1065]">${this.escapeHtml(words[gi])}</span>`
            ).join(' ');
            const badgeCqw = Math.round(cqw * 0.34 * 10) / 10;
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${frame}
                    ${corners}
                    ${seriesChipTop(s.badge || 'POINT')}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <h2 class="text-[#2E1065] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, hlClass, 'text-[#2E1065]')}
                        </h2>
                    </div>
                    ${s.desc ? `\
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <div class="flex items-center gap-[2cqw] bg-white/80 border border-[#A78BFA]/40 px-[2.6cqw] py-[0.9cqw] rounded-[1cqw] shadow-md">
                            <span class="w-[0.6cqw] h-[2.2cqw] bg-[#C0522E] rounded-full"></span>
                            <p class="text-[#2E1065] w-full min-w-0 font-bold tracking-wide break-words [overflow-wrap:anywhere]" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p>
                        </div>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates (min 3.6cqw / max 6.0cqw).
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${frame}
                    ${corners}
                    ${s.ref ? seriesChip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#2E1065] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">&quot;${this.escapeHtml(s.text)}&quot;</p>
                    </div>
                                        ${s.version ? `\
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <p class="text-[#7C3AED] w-full min-w-0 font-bold tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere] text-center" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</p>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates (min 4.0cqw / max 6.6cqw).
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${frame}
                    ${corners}
                    ${s.ref ? seriesChip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#2E1065] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#C0522E]')}</p>
                    </div>
                    ${s.footer ? `\
                    <div class="relative z-10 w-full border-t-2 border-[#A78BFA]/30 bg-white/70 py-[1.5cqw]">
                        <p class="text-[#7C3AED] w-full min-w-0 font-bold tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }

        return `\
            <div class="${base}">
                ${glow}
                ${frame}
                ${corners}
                <div class="relative z-10 p-[4cqw] text-center">
                    <p class="text-[#2E1065] font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p>
                </div>
            </div>`;
    }





// ============================================================
    // Rose Atelier - warm ivory & rose editorial layout PREVIEW
    // A different DESIGN / COLOR / FONT STYLE / FORMAT / ORGANIZATION
    // (left rose accent bar, hairline frame, squared chips and diamond
    // flourishes on a warm ivory palette), but the font-size rules are
    // identical to the classic templates: the exact same cqw tier tables /
    // min-max bounds / +2.0 headline boost below.
    // ============================================================
    renderSlideVisualRose(s) {
        const base = 'relative w-full cq-container aspect-video border-[6px] border-[#A64A52]/60 rounded-[1.4cqw] shadow-2xl overflow-hidden flex flex-col justify-between font-[\'Georgia\',\'Times New Roman\',serif]';
        const glow = ''; // No glow on rose slides
        const leftBar = '<div class="absolute left-0 top-0 bottom-0 w-[1cqw] bg-gradient-to-b from-[#A64A52] to-[#E2A9B0]"></div>';
        const frame = '<div class="absolute inset-4 border border-[#C98D94]/35 rounded-[1.1cqw] pointer-events-none"></div>';
        const corners = '<div class="absolute inset-0 pointer-events-none">' +
            '<span class="absolute left-[1.5cqw] top-[1.5cqw] w-[0.7cqw] h-[0.7cqw] rotate-45 bg-[#A64A52]"></span>' +
            '<span class="absolute right-[1.5cqw] top-[1.5cqw] w-[0.7cqw] h-[0.7cqw] rotate-45 bg-[#A64A52]"></span>' +
            '<span class="absolute left-[1.5cqw] bottom-[1.5cqw] w-[0.7cqw] h-[0.7cqw] rotate-45 bg-[#A64A52]"></span>' +
            '<span class="absolute right-[1.5cqw] bottom-[1.5cqw] w-[0.7cqw] h-[0.7cqw] rotate-45 bg-[#A64A52]"></span>' +
            '</div>';
        const chip = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center bg-white/80 border border-[#A64A52]/45 text-[#A64A52] font-bold tracking-[0.25em] uppercase px-[2.6cqw] py-[0.8cqw] rounded-sm shadow-sm" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        // Point badge as plain highlighted text (no filled banner) — Rose Atelier
        const chipTop = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center text-[#A64A52] font-black tracking-[0.35em] uppercase drop-shadow-[0_2px_6px_rgba(60,25,35,0.2)]" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        const diamond = '<span class="w-[0.8cqw] h-[0.8cqw] rotate-45 bg-[#A64A52]/80"></span>';

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates (min 5.5cqw / max 10.5cqw, headline +8pt).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            // Anti-widow / anti-orphan rule: never strand a single trailing word.
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8)); // title headline — bigger & bolder
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${leftBar}
                    ${frame}
                    ${corners}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw] flex flex-col items-center gap-[1.4cqw]">
                        <h1 class="text-[#3A2328] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-[#A64A52]', cqw, true)}
                        </h1>
                        ${s.verse ? `<p class="text-[#A64A52] w-full min-w-0 font-bold text-center tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-[#3A2328] font-black')}</p>` : ''}
                    </div>
                    ${s.footer ? `\
                    <div class="relative z-10 flex flex-col items-center gap-[0.6cqw] pb-[2cqw]">
                        <p class="text-[#3A2328] w-full min-w-0 font-semibold tracking-wide break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates (min 6.5cqw / max 10.5cqw).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const hlClass = 'text-[#A64A52]';
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max(lines, Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const displayLines = this._balanceHeadline(words, hl.hlIdx, this._previewPointMaxChars(cqw, true));
            const renderLine = (indices) => indices.map((gi) =>
                hl.hlIdx.has(gi) ? `<span class="${hlClass}">${this.escapeHtml(words[gi])}</span>` : `<span class="text-[#3A2328]">${this.escapeHtml(words[gi])}</span>`
            ).join(' ');
            const badgeCqw = Math.round(cqw * 0.34 * 10) / 10;
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${leftBar}
                    ${frame}
                    ${corners}
                    ${chipTop(s.badge || 'POINT')}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <h2 class="text-[#3A2328] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, hlClass, 'text-[#3A2328]')}
                        </h2>
                    </div>
                    ${s.desc ? `\
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <div class="flex items-center gap-[2cqw] bg-white/80 border border-[#C98D94]/40 px-[2.6cqw] py-[0.9cqw] rounded-[0.6cqw] shadow-sm">
                            <span class="w-[0.6cqw] h-[2.2cqw] bg-[#A64A52] rounded-[0.1cqw]"></span>
                            <p class="text-[#3A2328] w-full min-w-0 font-bold tracking-wide break-words [overflow-wrap:anywhere]" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p>
                        </div>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates (min 3.6cqw / max 6.0cqw).
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${leftBar}
                    ${frame}
                    ${corners}
                    ${s.ref ? chip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#3A2328] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">&quot;${this.escapeHtml(s.text)}&quot;</p>
                    </div>
                    ${s.version ? `\
                    <div class="relative z-10 flex flex-col items-center gap-[0.6cqw] pb-[2cqw]">
                        <p class="text-[#A64A52] w-full min-w-0 font-bold tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere] text-center" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</p>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates (min 4.0cqw / max 6.6cqw).
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, this._themeIsSerif(), 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${leftBar}
                    ${frame}
                    ${corners}
                    ${s.ref ? chip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#3A2328] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#A64A52]')}</p>
                    </div>
                    ${s.footer ? `\
                    <div class="relative z-10 w-full border-t-2 border-[#C98D94]/35 bg-white/80 py-[1.5cqw]">
                        <p class="text-[#A64A52] w-full min-w-0 font-bold tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }

        return `\
            <div class="${base}">
                ${leftBar}
                ${frame}
                ${corners}
                <div class="relative z-10 p-[4cqw] text-center">
                    <p class="text-[#3A2328] font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p>
                </div>
            </div>`;
    }
    // ============================================================
    // Arctic Frost — minimal light PREVIEW renderer.
    // A crisp icy-blue & white structure genuinely distinct from the
    // other light themes: hairline glacier frame, frost-crystal
    // diamond ornaments, thin accent bar and airy whitespace — no
    // heavy borders, no leaf blobs, no warm tones. Font-size tier
    // rules stay identical to every other template.
    // ============================================================
    renderSlideVisualFrost(s) {
        const base = "relative w-full cq-container aspect-video border-2 border-[#6FB1DC]/60 rounded-[1.6cqw] shadow-2xl overflow-hidden flex flex-col justify-between font-['Outfit','Segoe_UI',sans-serif]";
        const glow = '';
        const leftBar = '<div class="absolute left-0 top-0 bottom-0 w-[0.4cqw] bg-gradient-to-b from-[#2E86C1] to-[#9DC9E8]"></div>';
        const frame = '<div class="absolute inset-[1.4cqw] border border-[#2E86C1]/25 rounded-[1.2cqw] pointer-events-none"></div>';
        const crystals = '<div class="absolute right-[2.2cqw] top-[1.8cqw] w-[1cqw] h-[1cqw] rotate-45 bg-[#9DC9E8]/60"></div><div class="absolute right-[3.6cqw] top-[3cqw] w-[0.6cqw] h-[0.6cqw] rotate-45 bg-[#2E86C1]/35"></div>';
        const chip = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center bg-white/85 border border-[#2E86C1]/45 text-[#1B6CA8] font-bold tracking-[0.25em] uppercase px-[2.6cqw] py-[0.8cqw] rounded-full shadow-sm" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        const chipTop = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center whitespace-nowrap text-[#2E86C1] font-black tracking-[0.35em] uppercase" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        const dot = '<span class="w-[0.7cqw] h-[0.7cqw] rotate-45 bg-[#2E86C1]/70"></span>';

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates (headline +8pt).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8)); // same title font rule as other themes
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${crystals}
                    ${leftBar}
                    ${frame}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw] flex flex-col items-center gap-[1.4cqw]">
                        <h1 class="text-[#16324A] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-[#1B6CA8]', cqw, false)}
                        </h1>
                        ${s.verse ? `<p class="text-[#3A6485] w-full min-w-0 font-bold text-center tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-[#1B6CA8]')}</p>` : ''}
                    </div>
                    ${s.footer ? `\
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <span class="inline-flex items-center gap-[1cqw] bg-white/80 border border-[#2E86C1]/40 text-[#16324A] font-semibold tracking-wide px-[2.6cqw] py-[0.7cqw] rounded-full" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates.
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const hlClass = 'text-[#1B6CA8]';
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max(lines, Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const badgeCqw = Math.round(cqw * 0.34 * 10) / 10;
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${crystals}
                    ${leftBar}
                    ${frame}
                    ${chipTop(s.badge || 'POINT')}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <h2 class="text-[#16324A] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, hlClass, 'text-[#16324A]')}
                        </h2>
                    </div>
                    ${s.desc ? `\
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <span class="inline-flex items-center bg-white/80 border border-[#2E86C1]/40 text-[#16324A] font-semibold tracking-wide px-[2.6cqw] py-[0.7cqw] rounded-full" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${crystals}
                    ${leftBar}
                    ${frame}
                    ${s.ref ? chip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#16324A] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">&quot;${this.escapeHtml(s.text)}&quot;</p>
                    </div>
                    ${s.version ? `\
                    <div class="relative z-10 flex flex-col items-center gap-[0.6cqw] pb-[2cqw]">
                        ${dot}
                        <p class="text-[#3A6485] w-full min-w-0 font-bold tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere] text-center" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</p>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, false, 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${crystals}
                    ${leftBar}
                    ${frame}
                    ${s.ref ? chip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#16324A] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#1B6CA8]')}</p>
                    </div>
                    ${s.footer ? `\
                    <div class="relative z-10 w-full border-t-2 border-[#2E86C1]/30 bg-white/75 py-[1.5cqw]">
                        <p class="text-[#3A6485] w-full min-w-0 font-bold tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }

        return `\
            <div class="${base}">
                ${glow}
                ${crystals}
                ${leftBar}
                ${frame}
                <div class="relative z-10 p-[4cqw] text-center">
                    <p class="text-[#16324A] font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p>
                </div>
            </div>`;
    }
    renderSlideVisualMint(s) {
        const base = 'relative w-full cq-container aspect-video border-[6px] border-[#10B981]/55 rounded-[1.6cqw] shadow-2xl overflow-hidden flex flex-col justify-between font-[\'Poppins\',\'Segoe UI\',sans-serif]';
        const glow = '';
        const leftBar = '<div class="absolute left-0 top-0 bottom-0 w-[0.9cqw] bg-gradient-to-b from-[#10B981] to-[#6EE7B7]"></div>';
        const frame = '<div class="absolute inset-[1.6cqw] border border-[#10B981]/30 rounded-[1.3cqw] pointer-events-none"></div>';
        const leaf = '<div class="absolute -right-6 -top-8 w-32 h-32 rotate-12 bg-gradient-to-br from-[#6EE7B7]/25 to-[#A7F3D0]/15 rounded-full blur-sm"></div>';
        const chip = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center bg-white/85 border border-[#10B981]/45 text-[#047857] font-bold tracking-[0.25em] uppercase px-[2.6cqw] py-[0.8cqw] rounded-full shadow-sm" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        const chipTop = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center text-[#047857] font-black tracking-[0.35em] uppercase drop-shadow-[0_2px_6px_rgba(6,78,59,0.15)]" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        const dot = '<span class="w-[0.7cqw] h-[0.7cqw] rounded-full bg-[#10B981]/70"></span>';

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates (headline +8pt).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8)); // same title font rule as other themes
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${leaf}
                    ${leftBar}
                    ${frame}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw] flex flex-col items-center gap-[1.4cqw]">
                        <h1 class="text-[#134E4A] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-[#047857]', cqw, false)}
                        </h1>
                        ${s.verse ? `<p class="text-[#0F766E] w-full min-w-0 font-bold text-center tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-[#047857]')}</p>` : ''}
                    </div>
                    ${s.footer ? `
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <span class="inline-flex items-center gap-[1cqw] bg-white/80 border border-[#10B981]/40 text-[#134E4A] font-semibold tracking-wide px-[2.6cqw] py-[0.7cqw] rounded-full" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates.
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const hlClass = 'text-[#047857]';
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max(lines, Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const badgeCqw = Math.round(cqw * 0.34 * 10) / 10;
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${leaf}
                    ${leftBar}
                    ${frame}
                    ${chipTop(s.badge || 'POINT')}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <h2 class="text-[#134E4A] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, hlClass, 'text-[#134E4A]')}
                        </h2>
                    </div>
                    ${s.desc ? `
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <span class="inline-flex items-center bg-white/80 border border-[#10B981]/40 text-[#134E4A] font-semibold tracking-wide px-[2.6cqw] py-[0.7cqw] rounded-full" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${leaf}
                    ${leftBar}
                    ${frame}
                    ${s.ref ? chip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#134E4A] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">&quot;${this.escapeHtml(s.text)}&quot;</p>
                    </div>
                    ${s.version ? `\
                    <div class="relative z-10 flex flex-col items-center gap-[0.6cqw] pb-[2cqw]">
                        ${dot}
                        <p class="text-[#0F766E] w-full min-w-0 font-bold tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere] text-center" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</p>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, false, 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${leaf}
                    ${leftBar}
                    ${frame}
                    ${s.ref ? chip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#134E4A] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#047857]')}</p>
                    </div>
                    ${s.footer ? `\
                    <div class="relative z-10 w-full border-t-2 border-[#10B981]/30 bg-white/75 py-[1.5cqw]">
                        <p class="text-[#0F766E] w-full min-w-0 font-bold tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }

        return `\
            <div class="${base}">
                ${glow}
                ${leaf}
                ${leftBar}
                ${frame}
                <div class="relative z-10 p-[4cqw] text-center">
                    <p class="text-[#134E4A] font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p>
                </div>
            </div>`;
    }
    renderSlideVisualEmber(s) {
        const base = 'relative w-full cq-container aspect-video border-[6px] border-[#F59E0B]/75 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between font-[\'Nunito\',\'Segoe UI\',sans-serif]';
        const glow = '';
        const frame = '<div class="absolute inset-[1.2cqw] border border-[#F59E0B]/25 rounded-[1.2cqw] pointer-events-none"></div>';
        const ember = '<div class="absolute -left-8 -bottom-10 w-36 h-36 rotate-12 bg-gradient-to-br from-[#F59E0B]/25 to-[#FB923C]/15 rounded-full blur-sm"></div>';
        const chip = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center bg-[#3A291B]/90 border border-[#F59E0B]/45 text-[#FBBF24] font-bold tracking-[0.25em] uppercase px-[2.6cqw] py-[0.8cqw] rounded-md shadow-sm" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        const chipTop = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center text-[#F59E0B] font-black tracking-[0.35em] uppercase drop-shadow-[0_2px_6px_rgba(20,8,2,0.8)]" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        const diamond = '<span class="w-[0.8cqw] h-[0.8cqw] rotate-45 bg-[#F59E0B]/70"></span>';

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates (headline +8pt).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8)); // same title font rule as other themes
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${ember}
                    ${frame}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw] flex flex-col items-center gap-[1.4cqw]">
                        <h1 class="text-[#FFF7ED] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center drop-shadow-[0_8px_18px_rgba(20,8,2,0.9)]" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#FB923C]', cqw, false)}
                        </h1>
                        ${s.verse ? `<p class="text-[#FBBF24] w-full min-w-0 font-bold text-center tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#FB923C]')}</p>` : ''}
                    </div>
                    ${s.footer ? `
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <span class="inline-flex items-center gap-[1cqw] bg-[#3A291B]/90 border border-[#F59E0B]/45 text-[#E8D4BE] font-semibold tracking-wide px-[2.6cqw] py-[0.7cqw] rounded-md" style="font-size:${footerCqw}cqw">${diamond}${this.escapeHtml(s.footer)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates.
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const hlClass = 'text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#FB923C]';
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max(lines, Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const badgeCqw = Math.round(cqw * 0.34 * 10) / 10;
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${ember}
                    ${frame}
                    ${chipTop(s.badge || 'POINT')}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <h2 class="text-[#FFF7ED] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center drop-shadow-[0_8px_18px_rgba(20,8,2,0.85)]" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, hlClass)}
                        </h2>
                    </div>
                    ${s.desc ? `
                    <div class="relative z-10 flex justify-center pb-[2cqw]">
                        <span class="inline-flex items-center gap-[1cqw] bg-[#3A291B]/90 border border-[#F59E0B]/45 text-[#E8D4BE] font-semibold tracking-wide px-[2.6cqw] py-[0.7cqw] rounded-md" style="font-size:${descCqw}cqw">${diamond}${this.escapeHtml(s.desc)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${ember}
                    ${frame}
                    ${s.ref ? chip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#FFF7ED] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center drop-shadow-[0_8px_18px_rgba(20,8,2,0.8)]" style="font-size:${bodyCqw}cqw">&quot;${this.escapeHtml(s.text)}&quot;</p>
                    </div>
                    ${s.version ? `\
                    <div class="relative z-10 flex flex-col items-center gap-[0.6cqw] pb-[2cqw]">
                        <p class="text-[#FBBF24] w-full min-w-0 font-bold tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere] text-center" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</p>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || ``).length, 1), charsPerLine, false, 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${glow}
                    ${ember}
                    ${frame}
                    ${s.ref ? chip(s.ref) : ''}
                    <div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]">
                        <p class="text-[#FFF7ED] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center drop-shadow-[0_8px_18px_rgba(20,8,2,0.8)]" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#FB923C]')}</p>
                    </div>
                    ${s.footer ? `\
                    <div class="relative z-10 w-full border-t-2 border-[#F59E0B]/35 bg-[#2A1B12]/80 py-[1.5cqw]">
                        <p class="text-[#FBBF24] w-full min-w-0 font-bold tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p>
                    </div>` : ''}
                </div>`;
        }

        return `\
            <div class="${base}">
                ${glow}
                ${ember}
                ${frame}
                <div class="relative z-10 p-[4cqw] text-center">
                    <p class="text-[#E8D4BE] font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p>
                </div>
                        </div>`;
    }
    renderSlideVisualRoyal(s) {
        const base = "relative w-full cq-container aspect-video border-[6px] border-[#2563EB]/75 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between font-['Barlow','Segoe UI',sans-serif]";
        const glow = "";
        const frame = "<div class=\"absolute inset-[1.2cqw] border border-[#2563EB]/25 rounded-[1.2cqw] pointer-events-none\"></div>";
        const glowBlob = "<div class=\"absolute -right-6 -top-8 w-28 h-28 rotate-12 bg-[#2563EB]/15 rounded-full blur-sm\"></div>";
        const chip = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center bg-[#172554]/90 border border-[#2563EB]/45 text-[#3B82F6] font-bold tracking-[0.25em] uppercase px-[2.6cqw] py-[0.8cqw] rounded-md shadow-sm" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        const chipTop = (label) => `<div class="relative z-10 flex justify-center pt-[2.2cqw]"><span class="inline-flex items-center text-[#2563EB] font-black tracking-[0.35em] uppercase drop-shadow-[0_2px_6px_rgba(7,30,71,0.9)]" style="font-size:${Math.round(label ? 3.2 : 0)}cqw">${this.escapeHtml(label || '')}</span></div>`;
        const diamond = '<span class="w-[0.8cqw] h-[0.8cqw] rotate-45 bg-[#2563EB]/70"></span>';

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates (headline +8pt).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8)); // same title font rule as other themes
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            const hlGrad = 'text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#FBBF4F]';
            const titleInner = this.renderTitleHighlightHtml(s, hlGrad, cqw, false);
            const footerInner = s.footer ? `<div class="relative z-10 flex justify-center pb-[2cqw]"><span class="inline-flex items-center gap-[1cqw] bg-[#172554]/90 border border-[#2563EB]/45 text-[#E8D4BE] font-semibold tracking-wide px-[2.6cqw] py-[0.7cqw] rounded-md" style="font-size:${footerCqw}cqw">${diamond}${this.escapeHtml(s.footer)}</span></div>` : '';
            return `<div class="${base}">${glow}${glowBlob}${frame}<div class="relative z-10 my-auto w-full min-w-0 px-[3cqw] flex flex-col items-center gap-[1.4cqw]"><h1 class="text-[#EEF2FF] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center drop-shadow-[0_8px_18px_rgba(7,30,71,0.9)]" style="font-size:${cqw}cqw;text-wrap:balance;">${titleInner}</h1>${s.verse ? `<p class="text-[#3B82F6] w-full min-w-0 font-bold text-center tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere]" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), hlGrad)}</p>` : ''}</div>${footerInner}</div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates.
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const hlClass = 'text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#FBBF4F]';
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max(lines, Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const badgeCqw = Math.round(cqw * 0.34 * 10) / 10;
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            const pointInner = this._pointFlow(s, hlClass);
            const descInner = s.desc ? `<div class="relative z-10 flex justify-center pb-[2cqw]"><span class="inline-flex items-center gap-[1cqw] bg-[#172554]/90 border border-[#2563EB]/45 text-[#E8D4BE] font-semibold tracking-wide px-[2.6cqw] py-[0.7cqw] rounded-md" style="font-size:${descCqw}cqw">${diamond}${this.escapeHtml(s.desc)}</span></div>` : '';
            return `<div class="${base}">${glow}${glowBlob}${frame}${chipTop(s.badge || 'POINT')}<div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]"><h2 class="text-[#EEF2FF] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center drop-shadow-[0_8px_18px_rgba(7,30,71,0.85)]" style="font-size:${cqw}cqw;text-wrap:balance;">${pointInner}</h2></div>${descInner}</div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            const hlGrad = 'text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#FBBF4F]';
            const versionInner = s.version ? `<div class="relative z-10 flex flex-col items-center gap-[0.6cqw] pb-[2cqw]">${diamond}<p class="text-[#3B82F6] w-full min-w-0 font-bold tracking-[0.3em] uppercase break-words [overflow-wrap:anywhere] text-center" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</p></div>` : '';
            return `<div class="${base}">${glow}${glowBlob}${frame}${s.ref ? chip(s.ref) : ''}<div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]"><p class="text-[#EEF2FF] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center drop-shadow-[0_8px_18px_rgba(7,30,71,0.8)]" style="font-size:${bodyCqw}cqw">&quot;${this.escapeHtml(s.text)}&quot;</p></div>${versionInner}</div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const estLines = Math.ceil(Math.max(String(s.text || '').length, 1) / charsPerLine);
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            const hlGrad = 'text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#FBBF4F]';
            const footerInner = s.footer ? `<div class="relative z-10 w-full border-t-2 border-[#2563EB]/35 bg-[#071226]/80 py-[1.5cqw]"><p class="text-[#3B82F6] w-full min-w-0 font-bold tracking-[0.25em] uppercase break-words [overflow-wrap:anywhere] text-center px-[4cqw]" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</p></div>` : '';
            return `<div class="${base}">${glow}${glowBlob}${frame}${s.ref ? chip(s.ref) : ''}<div class="relative z-10 my-auto w-full min-w-0 px-[3cqw]"><p class="text-[#EEF2FF] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-center drop-shadow-[0_8px_18px_rgba(7,30,71,0.8)]" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), hlGrad)}</p></div>${footerInner}</div>`;
        }

        return `<div class="${base}">${glow}${glowBlob}${frame}<div class="relative z-10 p-[4cqw] text-center"><p class="text-[#E8D4BE] font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p></div></div>`;
    }
    // ============================================================
    // Pulpit Grid — editorial bento grid PREVIEW renderer.
    // Hard grid zones (hairline seams), giant point numerals, an
    // oversized quote glyph, and ALL text LEFT-aligned — a completely
    // different structure from the centered classic layouts, while the
    // cqw font-size tier rules stay identical to every other template.
    // ============================================================
    renderSlideVisualBento(s) {
        const base = "relative w-full cq-container aspect-video bg-[#151515] overflow-hidden shadow-2xl font-['Oswald','Arial Narrow',sans-serif]";
        const reg = '<div class="absolute top-0 left-0 w-[4.5cqw] h-[4.5cqw] bg-[#DC2626]"></div>';
        const seam = '<div class="absolute inset-0 pointer-events-none"><div class="absolute top-0 bottom-0 left-[31%] w-px bg-white/10"></div></div>';

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates (headline +8pt).
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8));
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${reg}
                    <div class="absolute top-0 left-[4.5cqw] right-0 h-[8.5cqw] border-b border-white/10 flex items-center justify-between px-[4cqw] gap-[2cqw]">
                        ${s.footer ? `<span class="text-[#D4D4D4] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</span>
                        <span class="text-[#DC2626] font-bold tracking-[0.35em] uppercase hidden sm:inline" style="font-size:${footerCqw}cqw">Sunday Worship</span>` : `<span class="text-[#DC2626] font-bold tracking-[0.35em] uppercase" style="font-size:${footerCqw}cqw">Sunday Worship</span>`}
                    </div>
                    <div class="absolute top-[8.5cqw] bottom-[11cqw] left-0 right-0 flex flex-col justify-center px-[5cqw]">
                        <h1 class="text-[#FAFAFA] w-full min-w-0 font-black tracking-tight leading-[1.1] break-words [overflow-wrap:anywhere] text-left" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-[#FBBF24]', cqw, false)}
                        </h1>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 h-[11cqw] border-t border-white/10 flex items-center justify-end px-[5cqw] gap-[2cqw]">
                        ${s.verse ? `<span class="w-[1.8cqw] h-[1.8cqw] bg-[#DC2626] shrink-0"></span>
                        <span class="text-[#DC2626] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-[#FBBF24]')}</span>` : ''}
                    </div>
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates.
            const badge = String(s.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            const numeral = numMatch ? numMatch[0].padStart(2, '0') : (badge ? badge.slice(0, 4).toUpperCase() : '\u2014');
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            const numeralCqw = numMatch ? 17 : 8;
            return `\
                <div class="${base}">
                    ${reg}
                    ${seam}
                    <div class="absolute top-0 bottom-0 left-0 w-[31%] flex flex-col items-center justify-center">
                        <span class="text-[#DC2626] font-black leading-none" style="font-size:${numeralCqw}cqw">${this.escapeHtml(numeral)}</span>
                    </div>
                    <div class="absolute top-0 bottom-0 left-[31%] right-0 flex flex-col px-[4cqw] pb-[3cqw]">
                        <h2 class="my-auto text-[#FAFAFA] w-full min-w-0 font-black tracking-tight leading-[1.1] break-words [overflow-wrap:anywhere] text-left" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, 'text-[#FBBF24]', null)}
                        </h2>
                        ${s.desc ? `<div class="border-t border-white/15 pt-[1.5cqw]"><p class="text-[#D4D4D4] font-semibold tracking-wide" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p></div>` : ''}
                    </div>
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${reg}
                    <div class="absolute top-[1.5cqw] left-[2cqw] text-[#DC2626] font-black leading-none opacity-30" style="font-size:13cqw">&ldquo;</div>
                    ${s.ref ? `<div class="absolute top-0 right-0 h-[9cqw] px-[4cqw] flex items-center border-b border-l border-white/10">
                        <span class="text-[#DC2626] font-bold tracking-[0.25em] uppercase truncate" style="font-size:${refCqw}cqw">${this.highlightPhrasesHtml(s.ref, this.getHighlights(s), 'text-[#FBBF24]')}</span>
                    </div>` : ''}
                    <div class="absolute top-[13cqw] bottom-[10cqw] left-[3cqw] right-[3cqw] flex items-center">
                        <p class="text-[#FAFAFA] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-left" style="font-size:${bodyCqw}cqw">&ldquo;${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#FBBF24]')}&rdquo;</p>
                    </div>
                    ${s.version ? `<div class="absolute bottom-0 left-0 right-0 h-[8cqw] border-t border-white/10 flex items-center px-[4cqw] gap-[1.5cqw]">
                        <span class="w-[1.6cqw] h-[1.6cqw] bg-[#DC2626] shrink-0"></span>
                        <span class="text-[#D4D4D4] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    <div class="absolute left-0 top-0 bottom-0 w-[1.4cqw] bg-[#DC2626]"></div>
                    ${s.ref ? `<div class="absolute top-[3cqw] left-[5cqw]"><span class="text-[#DC2626] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</span></div>` : ''}
                    <div class="absolute top-[11cqw] bottom-[12cqw] left-[5cqw] right-[3cqw] flex items-center">
                        <p class="text-[#FAFAFA] w-full min-w-0 font-bold leading-relaxed break-words [overflow-wrap:anywhere] text-left" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#FBBF24]')}</p>
                    </div>
                    ${s.footer ? `<div class="absolute bottom-0 left-0 right-0 h-[10cqw] border-t border-white/10 flex items-center justify-between px-[4cqw]">
                        <span class="text-[#D4D4D4] font-bold tracking-[0.25em] uppercase truncate" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</span>
                        <span class="w-[1.8cqw] h-[1.8cqw] bg-[#DC2626] shrink-0"></span>
                    </div>` : ''}
                </div>`;
        }

        return `<div class="${base}">${reg}<div class="absolute inset-0 flex items-center px-[5cqw]"><p class="text-[#FAFAFA] font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p></div></div>`;
    }
    // ============================================================
    // BIG TYPE — HTML preview (poster layout). Full-bleed typography:
    // paper + ink + signal red, everything flush-left. No glow, no
    // panels, no drop shadows. cqw font-size tier rules stay
    // identical to every other template.
    // ============================================================
    renderSlideVisualPoster(s) {
        const base = "relative w-full cq-container aspect-video bg-[#F5F2EA] overflow-hidden shadow-2xl font-['Archivo_Black','Arial_Black','Impact',sans-serif]";
        const reg = '<div class="absolute top-[2.6cqw] left-[3.2cqw] w-[1.8cqw] h-[1.8cqw] bg-[#E03A2F]"></div>';
        const hlUnderline = 'color:#141414;text-decoration:underline;text-decoration-color:#E03A2F;text-decoration-thickness:0.09em;text-underline-offset:0.16em';
        const underlined = (text, highlights) => this.splitHighlightSegments(text, highlights).map((seg) => seg.hl
            ? `<span style="${hlUnderline}">${this.escapeHtml(seg.text)}</span>`
            : this.escapeHtml(seg.text)).join('');

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates.
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8));
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    ${reg}
                    <div class="absolute top-[1.4cqw] left-[6.4cqw] right-[3.2cqw] flex items-center">
                        <span class="text-[#3A352C] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer || 'Sermon')}</span>
                    </div>
                    <div class="absolute top-[6.4cqw] left-[3.2cqw] right-[3.2cqw] border-t border-[#141414]/25"></div>
                    <div class="absolute top-[9.5cqw] bottom-[13cqw] left-[3.2cqw] right-[3.2cqw] flex flex-col justify-center">
                        <h1 class="text-[#141414] w-full min-w-0 font-black tracking-tight leading-[1.05] break-words [overflow-wrap:anywhere] text-left" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-[#E03A2F]', cqw, false)}
                        </h1>
                    </div>
                    <div class="absolute bottom-[6.4cqw] left-[3.2cqw] right-[3.2cqw] border-t border-[#141414]/25"></div>
                    <div class="absolute bottom-0 left-[6.4cqw] right-[3.2cqw] h-[6.4cqw] flex items-center">
                        ${s.verse ? `<span class="text-[#E03A2F] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-[#E03A2F]')}</span>` : `<span class="text-[#3A352C] font-bold tracking-[0.3em] uppercase" style="font-size:${footerCqw}cqw">Big Type</span>`}
                    </div>
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates.
            // Giant FILLED red numeral top-left, headline fills the rest flush-left.
            const badge = String(s.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            const numeral = numMatch ? numMatch[0].padStart(2, '0') : (badge ? badge.slice(0, 4).toUpperCase() : '\u2014');
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            const numeralCqw = numMatch ? 15 : 8;
            const ruleTop = numMatch ? 19.5 : 12.5;
            return `\
                <div class="${base}">
                    ${reg}
                    <div class="absolute top-[0.8cqw] left-[6.4cqw] right-[3.2cqw] flex items-center">
                        <span class="text-[#E03A2F] font-black leading-none" style="font-size:${numeralCqw}cqw">${this.escapeHtml(numeral)}</span>
                    </div>
                    <div class="absolute top-[${ruleTop}cqw] left-[3.2cqw] right-[3.2cqw] border-t border-[#141414]/25"></div>
                    <div class="absolute top-[${ruleTop + 1.6}cqw] bottom-[9cqw] left-[3.2cqw] right-[3.2cqw] flex flex-col justify-center">
                        <h2 class="text-[#141414] w-full min-w-0 font-black tracking-tight leading-[1.1] break-words [overflow-wrap:anywhere] text-left" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, 'text-[#E03A2F]', null)}
                        </h2>
                        ${s.desc ? `<div class="border-t border-[#141414]/25 mt-[2.2cqw] pt-[1.5cqw]"><p class="text-[#3A352C] font-semibold tracking-wide" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p></div>` : ''}
                    </div>
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates. The scripture
            // itself is the hero: full-bleed, flush-left, no quote glyph.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${reg}
                    ${s.ref ? `<div class="absolute top-[1.4cqw] left-[6.4cqw] right-[3.2cqw] flex items-center">
                        <span class="text-[#E03A2F] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${refCqw}cqw">${this.highlightPhrasesHtml(s.ref, this.getHighlights(s), 'text-[#E03A2F]')}</span>
                    </div>` : ''}
                    <div class="absolute top-[6.4cqw] left-[3.2cqw] right-[3.2cqw] border-t border-[#141414]/25"></div>
                    <div class="absolute top-[9cqw] bottom-[9cqw] left-[3.2cqw] right-[3.2cqw] flex items-center">
                        <p class="text-[#141414] w-full min-w-0 font-black leading-[1.18] break-words [overflow-wrap:anywhere] text-left" style="font-size:${bodyCqw}cqw">&ldquo;${underlined(s.text, this.getHighlights(s))}&rdquo;</p>
                    </div>
                    ${s.version ? `<div class="absolute bottom-0 left-0 right-0 h-[7cqw] border-t border-[#141414]/25">
                        <span class="absolute left-[6.4cqw] top-0 bottom-0 flex items-center text-[#3A352C] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</span>
                        <span class="absolute right-[3.2cqw] top-0 bottom-0 flex items-center"><span class="w-[1.6cqw] h-[1.6cqw] bg-[#E03A2F]"></span></span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates. Highlights are
            // signal-red UNDERLINE strokes instead of colored/gradient words.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${reg}
                    ${s.ref ? `<div class="absolute top-[1.4cqw] left-[6.4cqw] right-[3.2cqw] flex items-center">
                        <span class="text-[#E03A2F] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</span>
                    </div>` : ''}
                    <div class="absolute top-[6.4cqw] left-[3.2cqw] right-[3.2cqw] border-t border-[#141414]/25"></div>
                    <div class="absolute top-[9.5cqw] bottom-[9.5cqw] left-[3.2cqw] right-[3.2cqw] flex items-center">
                        <p class="text-[#141414] w-full min-w-0 font-bold leading-[1.3] break-words [overflow-wrap:anywhere] text-left" style="font-size:${bodyCqw}cqw">${underlined(s.text, this.getHighlights(s))}</p>
                    </div>
                    ${s.footer ? `<div class="absolute bottom-0 left-0 right-0 h-[7cqw] border-t border-[#141414]/25">
                        <span class="absolute left-[6.4cqw] top-0 bottom-0 flex items-center text-[#3A352C] font-bold tracking-[0.25em] uppercase truncate" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer)}</span>
                        <span class="absolute right-[3.2cqw] top-0 bottom-0 flex items-center"><span class="w-[1.6cqw] h-[1.6cqw] bg-[#E03A2F]"></span></span>
                    </div>` : ''}
                </div>`;
        }
        return `<div class="${base}">${reg}<div class="absolute top-[9.5cqw] bottom-[9.5cqw] left-[3.2cqw] right-[3.2cqw] flex items-center"><p class="text-[#141414] font-bold text-left" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p></div></div>`;
    }
    // ============================================================
    // GLORY LIGHT — HTML preview (glory layout). Cinematic worship-
    // night SPOTLIGHT: pure-black field, one beam of gold light from
    // the top-center, drifting dust motes, and type glowing inside
    // the beam. No cards, no borders, no side badges; text centered
    // under a short gold rule + diamond. cqw font-size tier rules
    // stay identical to every other template.
    // ============================================================
    renderSlideVisualGlory(s) {
        const base = "relative w-full cq-container aspect-video overflow-hidden shadow-2xl bg-[#0B192C] font-['Playfair_Display','Georgia',serif]";


        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates.
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8));
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            const footerCqw = Math.round(baseCqw * 0.26 * 10) / 10;
            return `\
                <div class="${base}">
                    <div class="absolute top-[2.2cqw] left-0 right-0 flex justify-center">
                        <span class="text-[#E8C86A] font-bold tracking-[0.35em] uppercase whitespace-nowrap" style="font-size:${footerCqw}cqw">${this.escapeHtml(s.footer || 'Sermon')}</span>
                    </div>
                    <div class="absolute top-[12cqw] bottom-[11cqw] left-0 right-0 flex flex-col items-center justify-center gap-[2.4cqw]">
                        <h1 class="text-white w-full min-w-0 font-black tracking-tight leading-[1.15] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;text-shadow:0 0 14px rgba(232,200,106,0.28);">
                            ${this.renderTitleHighlightHtml(s, 'text-[#E8C86A]', cqw, false)}
                        </h1>
                    </div>
                    ${s.verse ? `<div class="absolute bottom-[3cqw] left-0 right-0 flex justify-center">
                        <span class="text-[#E8C86A] font-bold tracking-[0.25em] uppercase whitespace-nowrap" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-[#FFF3C4]')}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates.
            // Giant deco numeral glows at the top of the beam; the headline
            // fills the center under a short gold rule.
            const badge = String(s.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            const numeral = numMatch ? numMatch[0].padStart(2, '0') : (badge ? badge.slice(0, 4).toUpperCase() : '\u2014');
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            const numeralCqw = numMatch ? 15 : 8;
            return `\
                <div class="${base}">
                    <div class="absolute top-[0.8cqw] left-0 right-0 flex justify-center">
                        <span class="text-[#D4A82C] font-black leading-none opacity-30" style="font-size:${numeralCqw}cqw">${this.escapeHtml(numeral)}</span>
                    </div>
                    <div class="absolute top-[13cqw] bottom-[9.5cqw] left-0 right-0 flex flex-col items-center justify-center gap-[2.2cqw]">
                        <h2 class="text-white w-full min-w-0 font-black tracking-tight leading-[1.15] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, 'text-[#E8C86A]', null)}
                        </h2>
                        ${s.desc ? `<p class="text-[#E8E0C8] w-full min-w-0 font-semibold tracking-wide text-center mt-[0.6cqw]" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p>` : ''}
                    </div>
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates. The scripture
            // itself is the hero: centered in the beam, italic serif under
            // a short gold rule, version small caps at the bottom.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${s.ref ? `<div class="absolute top-[2.2cqw] left-0 right-0 flex justify-center">
                        <span class="text-[#E8C86A] font-bold tracking-[0.35em] uppercase whitespace-nowrap" style="font-size:${refCqw}cqw">${this.highlightPhrasesHtml(s.ref, this.getHighlights(s), 'text-[#FFF3C4]')}</span>
                    </div>` : ''}
                    <div class="absolute top-[10cqw] bottom-[11.5cqw] left-0 right-0 flex flex-col items-center justify-center gap-[2.2cqw]">
                        <p class="text-white w-full min-w-0 italic font-medium leading-[1.45] break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#E8C86A]')}</p>
                    </div>
                    ${s.version ? `<div class="absolute bottom-[3cqw] left-0 right-0 flex justify-center">
                        <span class="text-[#E8E0C8] font-bold tracking-[0.3em] uppercase whitespace-nowrap" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates. Highlights
            // are gold; the footer strip sits under the centered body.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            const footText = (s.footer ? s.footer : '') + (s.version ? (s.footer ? ' · ' : '') + s.version : '');
            return `\
                <div class="${base}">
                    ${s.ref ? `<div class="absolute top-[2.2cqw] left-0 right-0 flex justify-center">
                        <span class="text-[#E8C86A] font-bold tracking-[0.35em] uppercase whitespace-nowrap" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</span>
                    </div>` : ''}
                    <div class="absolute top-[10cqw] bottom-[11.5cqw] left-0 right-0 flex flex-col items-center justify-center gap-[2.2cqw]">
                        <p class="text-white w-full min-w-0 font-semibold leading-[1.5] break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#E8C86A]')}</p>
                    </div>
                    ${footText ? `<div class="absolute bottom-[3cqw] left-0 right-0 flex justify-center">
                        <span class="text-[#E8E0C8] font-bold tracking-[0.3em] uppercase whitespace-nowrap" style="font-size:${footerCqw}cqw">${this.escapeHtml(footText)}</span>
                    </div>` : ''}
                </div>`;
        }
        return `<div class="${base}"><div class="absolute inset-0 flex items-center justify-center"><p class="text-white text-center font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p></div></div>`;
    }
    // ============================================================
    // CELESTIAL DAWN — HTML preview (glass layout). Deep indigo aurora
    // field with soft gradient orbs behind a floating frosted-glass
    // panel; ALL type sits on the glass (translucent white + blur +
    // hairline border). No side badges, no frames, no text drop
    // shadows. cqw font-size tier rules stay identical to every
    // other template.
    // ============================================================
    renderSlideVisualGlass(s) {
        const base = "relative w-full cq-container aspect-video bg-[#0F0C29] overflow-hidden shadow-2xl font-['Outfit','Arial',sans-serif]";
        const orbs =
            '<div class="absolute" style="left:-5cqw;top:-7cqw;width:32cqw;height:32cqw;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.55) 0%,rgba(124,58,237,0) 70%)"></div>' +
            '<div class="absolute" style="left:66cqw;top:36cqw;width:36cqw;height:36cqw;border-radius:50%;background:radial-gradient(circle,rgba(232,121,249,0.42) 0%,rgba(232,121,249,0) 70%)"></div>' +
            '<div class="absolute" style="left:70cqw;top:-5cqw;width:15cqw;height:15cqw;border-radius:50%;background:radial-gradient(circle,rgba(192,132,252,0.5) 0%,rgba(192,132,252,0) 70%)"></div>' +
            '<div class="absolute" style="left:6cqw;top:40cqw;width:19cqw;height:19cqw;border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,0.45) 0%,rgba(34,211,238,0) 70%)"></div>';
        const glassPanel = 'absolute left-[3cqw] right-[3cqw] top-[3cqw] bottom-[3cqw] rounded-[3cqw] bg-gradient-to-b from-white/12 via-white/6 to-white/3 border border-white/25 backdrop-blur-md';
        const pill = (text, fs, highlight) => `<span class="px-[2.6cqw] py-[0.5cqw] rounded-full border border-[#C084FC]/60 bg-white/10 text-[#C084FC] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${fs}cqw">${highlight ? this.highlightPhrasesHtml(text, this.getHighlights(s), 'text-[#FFD75E]') : this.escapeHtml(text)}</span>`;

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates.
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8));
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            return `\
                <div class="${base}">
                    ${orbs}
                    <div class="${glassPanel}">
                        <div class="absolute top-[9cqw] bottom-[9cqw] left-0 right-0 flex items-center justify-center">
                            <h1 class="text-white w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-center" style="font-size:${cqw}cqw;text-wrap:balance;">
                                ${this.renderTitleHighlightHtml(s, 'text-[#FFD75E]', cqw, false)}
                            </h1>
                        </div>
                        ${s.verse ? `<div class="absolute bottom-[2cqw] left-0 right-0 flex justify-center">
                            <span class="text-white/85 font-semibold tracking-[0.2em] uppercase truncate" style="font-size:${verseCqw}cqw">${this.highlightPhrasesHtml(s.verse, this.getHighlights(s), 'text-[#FFD75E]')}</span>
                        </div>` : ''}
                    </div>
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates.
            // A glowing aurora circle holds the numeral at the left edge of the
            // glass; the headline flows beside it.
            const badge = String(s.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            const numeral = numMatch ? numMatch[0].padStart(2, '0') : (badge ? badge.slice(0, 4).toUpperCase() : '\u2014');
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            const numeralCqw = Math.round(cqw * 0.6 * 10) / 10;
            const circle = numMatch
                ? '<div class="shrink-0 w-[10cqw] h-[10cqw] rounded-full bg-gradient-to-br from-[#7C3AED] to-[#E879F9] flex items-center justify-center">' +
                  `<span class="text-white font-black leading-none" style="font-size:${numeralCqw}cqw">${this.escapeHtml(numeral)}</span></div>`
                : '';
            return `\
                <div class="${base}">
                    ${orbs}
                    <div class="${glassPanel} flex flex-col items-center justify-center gap-[2.2cqw] px-[2.5cqw]">
                        <div class="flex items-center gap-[2.2cqw] w-full min-w-0">
                            ${circle}
                            <h2 class="text-white flex-1 min-w-0 font-black tracking-tight leading-[1.15] break-words [overflow-wrap:anywhere] text-left" style="font-size:${cqw}cqw;text-wrap:balance;">
                                ${this._pointFlow(s, 'text-[#FFD75E]', null)}
                            </h2>
                        </div>
                        ${s.desc ? `<p class="text-[#EDE9FF] w-full min-w-0 font-medium tracking-wide text-left" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p>` : ''}
                    </div>
                </div>`;
        }
        if (s.type === 'verse') {
            // Same verse tier rules as the classic templates. The scripture
            // is the hero: italic on the glass between the ref pill above and
            // the version line below.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 3.4)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${orbs}
                    <div class="${glassPanel}">
                        ${s.ref ? `<div class="absolute top-[1.8cqw] left-0 right-0 flex justify-center">
                            ${pill(s.ref, refCqw, true)}
                        </div>` : ''}
                        <div class="absolute top-[9cqw] bottom-[10cqw] left-0 right-0 flex items-center justify-center">
                            <p class="text-white w-full min-w-0 italic font-medium leading-[1.45] break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#FFD75E]')}</p>
                        </div>
                        ${s.version ? `<div class="absolute bottom-[2cqw] left-0 right-0 flex justify-center">
                            <span class="text-[#EDE9FF] font-semibold tracking-[0.25em] uppercase truncate" style="font-size:${versionCqw}cqw">${this.escapeHtml(s.version)}</span>
                        </div>` : ''}
                    </div>
                </div>`;
        }
        if (s.type === 'message') {
            // Same message tier rules as the classic templates. Highlights
            // are gold; the footer strip sits at the bottom of the glass.
            const charsPerLine = Math.max(8, Math.floor(96 / (0.58 * 5.5)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 34);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.5) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            const footText = (s.footer ? s.footer : '') + (s.version ? (s.footer ? ' · ' : '') + s.version : '');
            return `\
                <div class="${base}">
                    ${orbs}
                    <div class="${glassPanel}">
                        ${s.ref ? `<div class="absolute top-[1.8cqw] left-0 right-0 flex justify-center">
                            ${pill(s.ref, refCqw, false)}
                        </div>` : ''}
                        <div class="absolute top-[9cqw] bottom-[9.5cqw] left-0 right-0 flex items-center justify-center">
                            <p class="text-white w-full min-w-0 font-semibold leading-[1.5] break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#FFD75E]')}</p>
                        </div>
                        ${footText ? `<div class="absolute bottom-[2cqw] left-0 right-0 flex justify-center">
                            <span class="text-[#EDE9FF] font-semibold tracking-[0.25em] uppercase truncate" style="font-size:${footerCqw}cqw">${this.escapeHtml(footText)}</span>
                        </div>` : ''}
                    </div>
                </div>`;
        }
        return `<div class="${base}">${orbs}<div class="absolute left-[3cqw] right-[3cqw] top-[3cqw] bottom-[3cqw] rounded-[3cqw] bg-gradient-to-b from-white/12 via-white/6 to-white/3 border border-white/25 flex items-center justify-center"><p class="text-white text-center font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p></div></div>`;
    }
    // ============================================================
    // SPLIT SCREEN — HTML preview (split layout). A bold vertical
    // duotone: burnt-orange rail on the left third (carrying the
    // small-caps meta: kicker top, floor line bottom, diamond
    // ornament) and a deep espresso field on the right with flush-left
    // type. The point numeral CROSSES the seam. cqw font-size tier
    // rules stay identical to every other template.
    // ============================================================
    renderSlideVisualSplit(s) {
        const base = "relative w-full cq-container aspect-video bg-[#1B1310] overflow-hidden shadow-2xl font-['Sora','Arial',sans-serif]";
        const rail = '<div class="absolute" style="left:0;top:0;width:30cqw;height:56.25cqw;background:#E85D26"></div>';
        const seam = '<div class="absolute" style="left:29.85cqw;top:0;width:0.3cqw;height:56.25cqw;background:rgba(255,246,236,0.55)"></div>';
        const ornament = '<div class="absolute" style="left:13.2cqw;top:26.3cqw;width:3.6cqw;height:3.6cqw;transform:rotate(45deg);border:0.35cqw solid rgba(27,19,16,0.45)"></div>';
        const railBottom = (text, fs, highlight) => `<div style="position:absolute;left:3cqw;bottom:3cqw;width:24cqw;"><span class="text-[#1B1310] font-bold tracking-[0.2em] uppercase truncate" style="font-size:${fs}cqw">${highlight ? this.highlightPhrasesHtml(text, this.getHighlights(s), 'text-[#1B1310]') : this.escapeHtml(text)}</span></div>`;

        if (s.type === 'title') {
            // Same title split + auto-fit rules as the classic templates.
            // Kicker + verse ride the orange rail; headline is flush-left
            // on the espresso panel.
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const titleCut = this._line1Count(words, new Set());
            const line1 = words.slice(0, titleCut);
            const line2 = words.slice(titleCut);
            const chars = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const lines = (line1.length ? 1 : 0) + (line2.length ? 1 : 0);
            const heightCap = (0.6 * 56.25) / (lines * 1.15 + 1.1);
            const widthCap = 132 / chars;
            const baseCqw = Math.min(8.5, Math.max(3.5, Math.min(heightCap, widthCap)));
            const cqw = Math.min(12.0, Math.max(7.8, baseCqw + 2.8));
            const verseCqw = Math.round(baseCqw * 0.42 * 10) / 10;
            return `\
                <div class="${base}">
                    ${rail}
                    ${seam}
                    ${ornament}
                    ${s.verse ? railBottom(s.verse, verseCqw, true) : ''}
                    <div style="position:absolute;left:34cqw;right:4cqw;top:0;bottom:0;display:flex;align-items:center;">
                        <h1 class="text-[#FFF6EC] w-full min-w-0 font-black tracking-tight leading-[1.12] break-words [overflow-wrap:anywhere] text-left" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this.renderTitleHighlightHtml(s, 'text-[#FF8A50]', cqw, false)}
                        </h1>
                    </div>
                </div>`;
        }
        if (s.type === 'point') {
            // Same highlight split + title tier rules as the classic templates.
            // A giant dark numeral rides the orange rail; the headline is
            // flush-left on the dark panel with clear separation.
            const badge = String(s.badge || '').trim();
            const numMatch = badge.match(/\d+/);
            const numeral = numMatch ? numMatch[0].padStart(2, '0') : (badge ? badge.slice(0, 4).toUpperCase() : '\u2014');
            const words = String(s.title || '').trim().split(/\s+/).filter(Boolean);
            const hl = this.computePointHighlight(words, this.getHighlights(s));
            const line1 = words.slice(0, hl.brIndex + 1);
            const line2 = words.slice(hl.brIndex + 1);
            const charsPerLine = Math.max(8, Math.floor(96 / (0.62 * 7.5)));
            const longestLine = Math.max(line1.join(' ').length, line2.join(' ').length, 1);
            const estLines = Math.max((line1.length ? 1 : 0) + (line2.length ? 1 : 0), Math.ceil(longestLine / charsPerLine));
            const cqw = this.headlineCqw(estLines);
            const descCqw = Math.round(cqw * 0.26 * 10) / 10;
            const crossing = numMatch
                ? '<div style="position:absolute;left:15cqw;top:50%;transform:translate(-50%,-50%);">' +
                  `<span class="text-[#1B1310] font-black leading-none" style="font-size:13cqw">${this.escapeHtml(numeral)}</span></div>`
                : '';
            return `\
                <div class="${base}">
                    ${rail}
                    ${seam}
                    ${crossing}
                    <div style="position:absolute;left:34cqw;right:4cqw;top:0;bottom:0;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:1.8cqw;">
                        <h2 class="text-[#FFF6EC] w-full min-w-0 font-black tracking-tight leading-[1.14] break-words [overflow-wrap:anywhere] text-left" style="font-size:${cqw}cqw;text-wrap:balance;">
                            ${this._pointFlow(s, 'text-[#FF8A50]', null)}
                        </h2>
                        ${s.desc ? `<p class="text-[#FFF6EC] w-full min-w-0 font-medium opacity-70 text-left" style="font-size:${descCqw}cqw">${this.escapeHtml(s.desc)}</p>` : ''}
                    </div>
                </div>`;
        }
        if (s.type === 'verse') {
            // Full-bleed espresso: no rail, so the scripture gets the whole
            // width and the biggest possible font. Ref tops the slide,
            // version sits at the bottom center.
            const charsPerLine = Math.max(8, Math.floor(92 / (0.58 * 3.4)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const versionCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            return `\
                <div class="${base}">
                    ${s.ref ? `<div class="absolute" style="left:0;right:0;top:5cqw;display:flex;justify-content:center;">
                        <span class="text-[#FF8A50] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${refCqw}cqw">${this.highlightPhrasesHtml(s.ref, this.getHighlights(s), 'text-[#FF8A50]')}</span>
                    </div>` : ''}
                    <div class="absolute" style="left:4cqw;right:4cqw;top:9.5cqw;bottom:9.5cqw;display:flex;align-items:center;justify-content:center;">
                        <p class="text-[#FFF6EC] w-full min-w-0 italic font-medium leading-[1.45] break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#FF8A50]')}</p>
                    </div>
                    ${s.version ? `<div class="absolute" style="left:0;right:0;bottom:3cqw;display:flex;justify-content:center;">
                        <span class="text-[#FFF6EC] font-bold tracking-[0.25em] uppercase truncate" style="font-size:${versionCqw}cqw;opacity:0.65">${this.escapeHtml(s.version)}</span>
                    </div>` : ''}
                </div>`;
        }
        if (s.type === 'message') {
            // Full-bleed espresso: no rail; IDENTICAL type treatment to the
            // verse slide (same wrap math, same budget, italic medium), so the
            // message body renders at the same size as scripture.
            const charsPerLine = Math.max(8, Math.floor(92 / (0.58 * 3.4)));
            const bodyCqw = this._bodyCqwFit(Math.max(String(s.text || '').length, 1), charsPerLine, false, 38);
            const refCqw = Math.round(Math.min(3.0, bodyCqw * 0.62) * 10) / 10;
            const footerCqw = Math.round(bodyCqw * 0.3 * 10) / 10;
            const footText = (s.footer ? s.footer : '') + (s.version ? (s.footer ? ' · ' : '') + s.version : '');
            return `\
                <div class="${base}">
                    ${s.ref ? `<div class="absolute" style="left:0;right:0;top:5cqw;display:flex;justify-content:center;">
                        <span class="text-[#FF8A50] font-bold tracking-[0.3em] uppercase truncate" style="font-size:${refCqw}cqw">${this.escapeHtml(s.ref)}</span>
                    </div>` : ''}
                    <div class="absolute" style="left:4cqw;right:4cqw;top:9.5cqw;bottom:9.5cqw;display:flex;align-items:center;justify-content:center;">
                        <p class="text-[#FFF6EC] w-full min-w-0 italic font-medium leading-[1.45] break-words [overflow-wrap:anywhere] text-center" style="font-size:${bodyCqw}cqw">${this.highlightPhrasesHtml(s.text, this.getHighlights(s), 'text-[#FF8A50]')}</p>
                    </div>
                    ${footText ? `<div class="absolute" style="left:0;right:0;bottom:3cqw;display:flex;justify-content:center;">
                        <span class="text-[#FFF6EC] font-bold tracking-[0.25em] uppercase truncate" style="font-size:${footerCqw}cqw;opacity:0.65">${this.escapeHtml(footText)}</span>
                    </div>` : ''}
                </div>`;
        }
        return `<div class="${base}">${rail}${seam}<div style="position:absolute;left:34cqw;right:4cqw;top:0;bottom:0;display:flex;align-items:center;"><p class="text-[#FFF6EC] text-left font-semibold" style="font-size:4cqw">${this.escapeHtml(s.text || s.ref || s.title || '')}</p></div></div>`;
    }

    renderSlideVisual(s) {
        // Apply the slide's Font Size override: every font-size the layouts emit
        // is inline `font-size:Ncqw`, so one transform re-scales the preview,
        // enlarged view, PDF capture and the DOM-measured PPTX export together.
        const scale = this.getFontScale(s);
        return this.scaleSlideHtml(this.applySlideTheme(this.renderSlideVisualRaw(s)), scale);
    }

    // Swaps the baked-in "Sermon Classic" palette/fonts for the currently
    // selected template. The two classic templates share one layout while
    // Midnight Aurora provides its own modern layout; in every case the
    // font-size bounds and slide rules stay exactly the same - only design,
    // colors, font style, format and organization change.
    applySlideTheme(html) {
        const t = this.getTheme();
        const shadow = t.shadow || ['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.8)'];
        const isJpgTheme = this.selectedTemplate === 'Christmas' || this.selectedTemplate === 'Easter';
        // For JPG themes, make root bg transparent and remove inner gradient overlay (same as Royal Sapphire approach)
        if (isJpgTheme) {
            html = html.replace(/bg-\[#0B192C\]/g, 'bg-transparent');
            html = html.replace(
                /<div class="absolute inset-0\s+bg-\[radial-gradient\(ellipse_at_center,_var\(--tw-gradient-stops\)\)\]\s+from-blue-900\/50 via-\[#0B192C\] to-\[#050C16\]"><\/div>/g,
                '<div class="absolute inset-0"></div>'
            );
        }
        const map = [
            ['blue-900/50', `[${this.hex(t.glow)}]/50`],
            ['#0B192C', this.hex(t.bg)],
            ['#050C16', this.hex(t.bg2)],
            ['#FFD700', this.hex(t.accent)],
            ['#FFF3B0', this.hex(t.accent2)],
            ['#132A4A', this.hex(t.card)],
            ['text-white', `text-[${this.hex(t.text)}]`],
            ['text-slate-200', `text-[${this.hex(t.onCard)}]`],
            ['rgba(0,0,0,0.9)', shadow[0]],
            ['rgba(0,0,0,0.8)', shadow[1]]
        ];
        let out = html;
        for (const [from, to] of map) out = out.split(from).join(to);
        return out.replace('class="relative w-full cq-container', `class="relative w-full cq-container [font-family:${t.font}]`);
    }
}

// Instantiate global app runner
const app = new SlideCraftApp();



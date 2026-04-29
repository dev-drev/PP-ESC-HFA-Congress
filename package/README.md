# Kongress App

Eine Next.js-Anwendung für Präsentationssynchronisation mit Supabase Realtime.

## Features

- **Sender/Empfänger-Modus**: Wählen Sie zwischen Controller (Sender) und Display (Empfänger)
- **Echtzeit-Synchronisation**: Änderungen werden sofort über Supabase Realtime übertragen
- **Session-basiert**: Verbindung über 6-stellige Session-Codes
- **Responsive Design**: Optimiert für verschiedene Bildschirmgrößen
- **Framer Motion**: Flüssige Animationen und Übergänge

## Setup

### 1. Projekt klonen und Dependencies installieren

```bash
cd kongress-app
yarn install
```

### 2. Supabase Setup

1. Erstellen Sie ein neues Supabase-Projekt auf [supabase.com](https://supabase.com)
2. Führen Sie das SQL-Schema aus `supabase_schema.sql` in Ihrer Supabase-Datenbank aus
3. Aktivieren Sie Realtime für die `screen_states` Tabelle

### 3. Umgebungsvariablen

Erstellen Sie eine `.env.local` Datei mit Ihren Supabase-Credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Anwendung starten

```bash
yarn dev
```

Die Anwendung läuft auf `http://localhost:3000`

## Verwendung

### Setup-Screen
- Wählen Sie "Sender" um eine neue Session zu starten
- Wählen Sie "Empfänger" und geben Sie einen Session-Code ein

### Controller (Sender)
- Navigieren Sie durch Slides mit den Pfeiltasten oder der Sidebar
- Der Session-Code wird oben angezeigt
- Alle Änderungen werden sofort an verbundene Displays übertragen

### Display (Empfänger)
- Zeigt die aktuelle Slide in Vollbildansicht an
- Updates erfolgen automatisch in Echtzeit
- Drücken Sie F11 für echten Vollbildmodus

## Technologien

- **Next.js 15.3.5** - React Framework
- **Supabase** - Database & Realtime
- **Tailwind CSS 4.1** - Styling
- **Framer Motion** - Animationen
- **TypeScript** - Type Safety

## Entwicklung

```bash
# Development Server starten
yarn dev

# Build für Production
yarn build

# Production Server starten
yarn start

# Linting
yarn lint
```

## Deployment

Die Anwendung kann auf Vercel, Netlify oder anderen Next.js-kompatiblen Plattformen deployed werden.

Vergessen Sie nicht, die Umgebungsvariablen in Ihrer Deployment-Umgebung zu setzen.
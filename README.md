# 🌍 Sito Educativo Ciclo del Carbonio

Un sito web educativo interattivo in italiano sul ciclo del carbonio, con sistema di quiz collaborativo in tempo reale per l'uso in classe.

## ✨ Caratteristiche Principali

- **🎓 Contenuto Educativo**: Spiegazioni approfondite del ciclo del carbonio
- **📱 Design Responsive**: Ottimizzato per desktop, tablet e smartphone  
- **🧩 Quiz Collaborativo**: Sistema in tempo reale per sessioni di classe
- **📊 Dashboard Insegnante**: Monitoraggio risposte studenti in tempo reale
- **☁️ Backend Airtable**: Sincronizzazione affidabile tra dispositivi
- **🔄 Fallback Offline**: Funziona anche senza connessione internet

## 🚀 Demo Live

Visita il sito: **[https://jackpot-05.github.io/ciclo-del-carbonio/](https://jackpot-05.github.io/ciclo-del-carbonio/)**

## 🎯 Come Usare il Quiz in Classe

### Per l'Insegnante:
1. Vai su **Quiz Admin** 
2. Clicca "Genera Nuova Sessione"
3. Condividi il **codice a 6 cifre** con gli studenti
4. Monitora le risposte in tempo reale

### Per gli Studenti:
1. Vai su **Quiz Collaborativo**
2. Inserisci il **codice sessione** fornito dall'insegnante
3. Inserisci il tuo **nome**
4. Rispondi alle domande del quiz

## ⚙️ Configurazione Backend (Opzionale)

Il sito funziona out-of-the-box con localStorage, ma per la sincronizzazione in tempo reale puoi configurare Airtable:

### 1. Crea Account Airtable
- Vai su [airtable.com](https://airtable.com)
- Crea un account gratuito

### 2. Crea Base Airtable
- Crea una nuova Base chiamata "QuizSessions"
- Crea una tabella con questi campi:
  - `SessionCode` (Single line text) - PRIMARY
  - `CreatedAt` (Date and time)
  - `QuizData` (Long text)
  - `LastUpdated` (Date and time)

### 3. Ottieni Credenziali API
- Vai su [airtable.com/api](https://airtable.com/api)
- Copia il **Base ID** (inizia con `app...`)
- Vai su [airtable.com/create/tokens](https://airtable.com/create/tokens)
- Crea un **Personal Access Token** con permessi di lettura/scrittura

### 4. Configura Environment Variables
```bash
# Nel tuo fork del progetto, configura questi secrets di GitHub:
VITE_AIRTABLE_API_KEY=pat_xxxxxxxxxx
VITE_AIRTABLE_BASE_ID=app_xxxxxxxxxx

# Preferibile: 3 tabelle separate
VITE_AIRTABLE_SESSIONS_TABLE=Sessions
VITE_AIRTABLE_STUDENTS_TABLE=Students
VITE_AIRTABLE_ANSWERS_TABLE=Answers

# Retrocompat (opzionale): se usi una singola tabella o stai migrando,
# puoi impostare anche VITE_AIRTABLE_TABLE_NAME, che verrà usata come alias
# per la tabella Sessions se le variabili sopra non sono presenti.
# VITE_AIRTABLE_TABLE_NAME=Sessions
```

## 🛠️ Sviluppo Locale

```bash
# Clona il repository
git clone https://github.com/Jackpot-05/ciclo-del-carbonio.git
cd ciclo-del-carbonio

# Installa le dipendenze
npm install

# Crea file .env con le tue credenziali Airtable (opzionale)
cp .env.example .env
# Modifica .env con i tuoi valori

# Avvia il server di sviluppo
npm run dev
```

## 📁 Struttura del Progetto

```
📦 ciclo-del-carbonio/
├── 📄 index.html                 # Landing page con fallback
├── 📂 client/src/
│   ├── 📂 pages/
│   │   ├── 🏠 Home.tsx           # Homepage del sito
│   │   ├── 🔬 CicloCarbonio.tsx  # Spiegazione scientifica
│   │   ├── 🧪 ElementoChimico.tsx # Proprietà del carbonio
│   │   ├── 🏛️ EducazioneCivica.tsx # Aspetti ambientali
│   │   ├── 📚 LettereScienza.tsx  # Primo Levi e letteratura
│   │   ├── 👥 CittadinoConsapevole.tsx # Sostenibilità
│   │   ├── 📊 Infografiche.tsx    # Grafici e dati
│   │   ├── 📚 Bibliografia.tsx    # Fonti e riferimenti
│   │   ├── 🎯 Quiz.tsx           # Quiz individuale
│   │   ├── 👥 QuizCollaborativo.tsx # Quiz per studenti
│   │   └── 👨‍🏫 QuizAdmin.tsx      # Dashboard insegnante
│   ├── 📂 lib/
│   │   ├── 🗄️ airtableStorage.ts  # Backend Airtable
│   │   └── 💾 realTimeStorage.ts  # Fallback localStorage
│   └── 📂 components/             # Componenti UI riutilizzabili
├── 📂 assets/                     # Immagini e risorse
└── 📄 package.json               # Dipendenze e scripts
```

## 🎨 Tecnologie Utilizzate

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Routing**: Wouter (lightweight router)
- **Backend**: Airtable API + localStorage fallback
- **Deployment**: GitHub Pages

## 📝 Licenza

MIT License - Vedi [LICENSE](LICENSE) per i dettagli.

## 🤝 Contribuire

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📞 Supporto

Per domande o supporto, apri una [Issue](https://github.com/Jackpot-05/ciclo-del-carbonio/issues) su GitHub.

---

**Creato con ❤️ per l'educazione ambientale**
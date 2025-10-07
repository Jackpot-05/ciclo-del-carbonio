# Quiz Collaborativo - Deploy Instructions

## 🚀 Opzioni per Condividere il Quiz:

### 1. GitHub Pages (in corso)
- URL: https://jackpot-05.github.io/ciclo-del-carbonio/
- Stato: Caricamento in corso (aspetta 2-3 minuti)

### 2. Server Locale Condivisibile (Pronto ora!)
```bash
# Nel terminale, esegui:
cd "/Users/tancredirusso/Downloads/ciclo del carbonio"
./start-quiz-server.sh
```
- Gli studenti potranno accedere dal tuo IP locale
- Funziona su WiFi della scuola

### 3. Netlify Drop (Veloce)
1. Vai su: https://app.netlify.com/drop
2. Trascina la cartella `dist/` 
3. Ottieni URL istantaneo

### 4. Firebase Hosting (Alternativa)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📱 Come Usare il Quiz:

**Dashboard Professore**: `/quiz-admin`
- Genera codice sessione
- Monitora studenti in tempo reale

**Quiz Studenti**: `/quiz-collaborativo`  
- Inserisci nome + codice sessione
- Completa il quiz

## 🔧 Sistema Tecnico:
- ✅ Firebase realtime per sync cross-device
- ✅ Fallback localStorage se offline
- ✅ Codici sessione a 6 cifre
- ✅ Mobile responsive
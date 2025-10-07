# 🔧 Configurazione Airtable per Quiz Collaborativo

Questa guida ti aiuterà a configurare Airtable come backend per il sistema di quiz collaborativo.

## 🎯 Perché Airtable?

- ✅ **Sincronizzazione in tempo reale** tra dispositivi
- ✅ **Affidabilità** per sessioni di classe con molti studenti
- ✅ **Persistenza dati** - le sessioni non si perdono
- ✅ **Visualizzazione dati** - puoi vedere le risposte in formato tabella
- ✅ **Piano gratuito** - sufficiente per uso scolastico

## 📋 Prerequisiti

- Account Airtable gratuito
- Repository GitHub (per configurare le environment variables)

## 🚀 Configurazione Step-by-Step

### Passo 1: Crea Account Airtable

1. Vai su [airtable.com](https://airtable.com)
2. Clicca "Sign up for free"
3. Crea il tuo account con email/password

### Passo 2: Crea la Base Dati

1. Una volta loggato, clicca "Create a base"
2. Scegli "Start from scratch"
3. Rinomina la base in **"QuizEducativo"** o simile

### Passo 3: Crea le Tabelle (3 tabelle)

Il codice usa 3 tabelle: `Sessions`, `Students`, `Answers`. Puoi cambiare i nomi con le variabili VITE indicate sotto.

1) Tabella: **Sessions** (o come preferisci)

| Campo | Tipo | Note |
|------|------|------|
| Session Code | Single line text | PRIMARY KEY (prima colonna) |
| Professor Name | Single line text | opzionale |
| Created At | Date and time | |
| Active | Checkbox | default: true |
| Student Count | Number | opzionale |

2) Tabella: **Students**

| Campo | Tipo | Note |
|------|------|------|
| Student ID | Single line text | univoco per studente (prima colonna consigliata) |
| Session Code | Single line text | codice della sessione |
| Name | Single line text | |
| Surname | Single line text | opzionale |
| Joined At | Date and time | |
| Score | Number | |
| Completed | Checkbox | |
| Last Active | Date and time | |

3) Tabella: **Answers**

| Campo | Tipo | Note |
|------|------|------|
| Student ID | Single line text | |
| Session Code | Single line text | |
| Question Index | Number | 0-based |
| Answer | Number | indice della risposta selezionata |
| Is Correct | Checkbox | |
| Timestamp | Date and time | |

### Passo 4: Ottieni le Credenziali API

#### Base ID:
1. Vai su [airtable.com/api](https://airtable.com/api)
2. Clicca sulla tua base "QuizEducativo"
3. Nell'URL della pagina troverai qualcosa come: `https://airtable.com/appXXXXXXXXXXXXXX/api/docs`
4. Copia il codice che inizia con `app` - questo è il tuo **Base ID**

#### Personal Access Token:
1. Vai su [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Clicca "Create new token"
3. Dai un nome al token (es. "Quiz Carbonio")
4. Nelle **Scopes**, seleziona:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
5. Nelle **Access**, seleziona la tua base "QuizEducativo"
6. Clicca "Create token"
7. **COPIA SUBITO IL TOKEN** - non potrai più vederlo!

### Passo 5: Configura GitHub Secrets

1. Vai al tuo repository GitHub
2. Clicca su "Settings" (tab in alto)
3. Nel menu a sinistra, clicca "Secrets and variables" → "Actions"
4. Clicca "New repository secret" per ognuno di questi:

| Nome Secret | Valore | Esempio |
|-------------|--------|---------|
| `VITE_AIRTABLE_API_KEY` | Il token che hai copiato | `patxxxxxxxxxxxxxx` |
| `VITE_AIRTABLE_BASE_ID` | Il Base ID della tua base | `appxxxxxxxxxxxxxx` |
| `VITE_AIRTABLE_SESSIONS_TABLE` | Nome tabella Sessions | `Sessions` |
| `VITE_AIRTABLE_STUDENTS_TABLE` | Nome tabella Students | `Students` |
| `VITE_AIRTABLE_ANSWERS_TABLE` | Nome tabella Answers | `Answers` |

> Nota: per retrocompatibilità è supportata anche `VITE_AIRTABLE_TABLE_NAME` come alias per il nome della tabella "Sessions". Se presente, verrà usata solo quando `VITE_AIRTABLE_SESSIONS_TABLE` non è impostata.

> Dove trovarlo: vai su [airtable.com/api](https://airtable.com/api), seleziona la tua base "QuizEducativo" e copia il codice che inizia con `app` dall'URL (es: `https://airtable.com/appXXXXXXXXXXXXXX/api/docs`).

### Passo 6: Redeploy del Sito

1. Vai alla tab "Actions" del tuo repository
2. Clicca su "Deploy static content to Pages"
3. Clicca "Run workflow" → "Run workflow"
4. Aspetta che il deployment finisca (circa 1-2 minuti)

## ✅ Verifica Configurazione

1. Vai al tuo sito GitHub Pages
2. Naviga su "Quiz Admin"
3. Clicca "Genera Nuova Sessione"
4. Se vedi un codice a 6 cifre e nessun errore nella console → **Configurazione riuscita!**
5. Controlla la tua base Airtable - dovresti vedere una nuova riga con il codice sessione

## 🔍 Risoluzione Problemi

### Errore CORS
```
Access to fetch at 'https://api.airtable.com' blocked by CORS policy
```
**Soluzione**: Le environment variables non sono configurate correttamente. Verifica i GitHub Secrets.

### Errore 401 Unauthorized
```
{"error":{"type":"UNAUTHORIZED","message":"Unauthorized"}}
```
**Soluzione**: Il Personal Access Token non è valido o non ha i permessi giusti.

### Errore 404 Not Found
```
{"error":{"type":"TABLE_NOT_FOUND"}}
```
**Soluzione**: Il Base ID o il nome di una delle 3 tabelle è sbagliato. Controlla che le variabili `VITE_AIRTABLE_SESSIONS_TABLE`, `VITE_AIRTABLE_STUDENTS_TABLE`, `VITE_AIRTABLE_ANSWERS_TABLE` corrispondano ai nomi reali delle tabelle nella tua base.

### Fallback a localStorage
```
🔄 Fallback: usando localStorage invece di Airtable
```
**Soluzione**: Configurazione Airtable non presente - il sito funziona comunque ma senza sincronizzazione.

## 🎓 Come Usare una Volta Configurato

### Per l'Insegnante:
1. Apri "Quiz Admin"
2. Clicca "Genera Nuova Sessione"
3. Condividi il codice con gli studenti
4. Monitora le risposte in tempo reale

### Per gli Studenti:
1. Aprono "Quiz Collaborativo"
2. Inseriscono il codice ricevuto
3. Scrivono il loro nome
4. Rispondono alle domande

### Visualizzazione Dati:
- Nella tua base Airtable puoi vedere tutti i dati
- Ogni sessione è una riga con tutti i dati JSON
- Puoi esportare i dati in Excel/CSV per analisi

## 🔐 Sicurezza

- ✅ I token sono memorizzati come GitHub Secrets
- ✅ Le API calls sono autenticate
- ✅ Nessun dato sensibile nel codice sorgente
- ✅ Fallback a localStorage se Airtable non disponibile

## 📊 Limitazioni Piano Gratuito Airtable

- **1,200 record al mese** (più che sufficienti per una classe)
- **2GB di attachment** (non usati in questo progetto)
- **API calls illimitate** ✅

Per un uso scolastico normale, il piano gratuito è più che sufficiente!

---

🎉 **Congratulazioni!** Il tuo sistema di quiz collaborativo è ora completamente configurato e funzionante!
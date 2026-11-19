# Intent & Slot — Multilingual NLP Studio

A Clean Editorial web interface for a university Capstone NLP project. It shows how a system understands a sentence in **English**, **Bengali (বাংলা)** and **Banglish** by finding the **intent** (what the user wants) and the **slots** (the important details).

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and lucide-react.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production check: `npm run build && npm start`.

## Pages

| Route | What it is |
| --- | --- |
| `/` | **Demo**: example sentences, input box, analysis report |
| `/how-it-works` | **How It Works**: intent, slots, the six-stage pipeline, why multilingual NLP is hard |

## Demo mode and the real model

The analysis comes from `lib/mock-nlp.ts`. It is a **demonstration only**: it knows the six sample sentences and says "not recognized" for anything else. It is not a machine-learning model, and the interface says so on every result. The mock never invents a confidence score.

To connect the real model, set this in `.env.local`:

```bash
NEXT_PUBLIC_NLP_API_URL=https://your-nlp-api.example.com
```

The sentence is then sent to `POST {url}/analyze` with `{ "text": "..." }`, and the API must return JSON in this shape (see `types/nlp.ts`). No component has to change.

```json
{
  "originalText": "Book a flight to Dhaka for tomorrow.",
  "detectedLanguage": "en",
  "intent": { "name": "FLIGHT_BOOKING", "description": "…", "confidence": 0.93, "icon": "plane" },
  "slots": [
    { "value": "Dhaka", "type": "DESTINATION", "color": "emerald", "start": 17, "end": 22 }
  ]
}
```

`detectedLanguage` is `en`, `bn` or `bl`. `confidence`, `start` and `end` are optional.

## Where things are

```
app/            routes, layout, global styles and design tokens (globals.css)
components/
  layout/       Navbar, Logo, ThemeToggle, Footer
  demo/         everything on the Demo page
  about/        sections of the How It Works page
  shared/       SectionHeading, EmptyState, LoadingState, IntentIcon, MotionProvider
lib/            examples, mock-nlp, nlp-service, slots, intents, language, utils
types/nlp.ts    the data shapes
```

To rename the project, edit `lib/site.ts`. To add an example sentence, add it to `lib/examples.ts`.

## Design notes

- Light theme first, full dark theme. The choice is saved in `localStorage`; with no saved choice the system setting is used. A small script in `app/layout.tsx` applies it before the first paint, so there is no flash.
- Colors are tokens in `app/globals.css`. Slot colors live in `lib/slots.ts`. Slots always show an icon and a text label, never color alone.
- Animations respect the "reduce motion" system setting.

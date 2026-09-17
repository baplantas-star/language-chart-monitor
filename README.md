# Expressive Language Chart Monitor

An interactive Grades 6–8 expressive-language reference chart with a local, teacher-facing progress-monitoring workspace.

Teachers can explore chart descriptors and examples, capture feature-level observations, attach evidence when available, choose a next instructional focus, save dated snapshots, compare samples, and print a record.

## Privacy

This is a fully static browser app. It has no server, account system, analytics, student-data API calls, or environment variables. Drafts and saved snapshots are stored only in the browser on the device being used. Use a student code rather than a full name, and print or export records when a separate copy is needed.

The optional speaking-sample workflow accepts a file chosen by the teacher; it does not connect to Canvas. The browser decodes the selected audio and runs Whisper transcription locally in a worker. On first use, the browser downloads and caches speech-model files, but the student audio and resulting transcript are not uploaded. A local, transparent text-pattern check can flag possible language evidence. Teachers must review both the transcript and each suggestion; only accepted evidence is used for the suggested reference range.

## Run locally

Open `index.html` in a modern browser, or serve this folder with any static web server.

## Deploy on Vercel

Import `baplantas-star/language-chart-monitor` in Vercel. Leave the framework preset as **Other**, the root directory as the repository root, and the build/output settings blank. No environment variables are required. Each push to `main` will deploy the static site.

## Attribution

Chart descriptors are adapted from WIDA's *WIDA Language Charts: Tying WIDA ACCESS Scores to Classroom Assessment* (2025). The interactive explanations and classroom examples are original instructional additions; they are not scoring criteria.

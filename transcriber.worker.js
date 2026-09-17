// This worker receives decoded audio only. It never posts the audio to a service.
// The model files are fetched once by the browser and then cached by the browser.
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2';

env.allowLocalModels = false;

let transcriber;

async function getTranscriber() {
  if (transcriber) return transcriber;
  postMessage({ type: 'status', message: 'Preparing the local speech model. The first use can take a few minutes while the model downloads to this browser…' });
  transcriber = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-tiny.en', {
    dtype: 'q8',
    device: 'wasm',
    progress_callback: progress => {
      if (progress?.status === 'progress' && progress?.file) {
        const percent = Number.isFinite(progress.progress) ? ` ${Math.round(progress.progress)}%` : '';
        postMessage({ type: 'status', message: `Preparing local speech model:${percent}` });
      }
    }
  });
  return transcriber;
}

self.addEventListener('message', async event => {
  if (event.data?.type !== 'transcribe') return;
  try {
    const asr = await getTranscriber();
    postMessage({ type: 'status', message: 'Transcribing on this device…' });
    const result = await asr(new Float32Array(event.data.audio), {
      chunk_length_s: 30,
      stride_length_s: 5,
      return_timestamps: false
    });
    postMessage({ type: 'complete', text: result?.text?.trim() || '' });
  } catch (error) {
    postMessage({ type: 'error', text: error?.message || String(error) });
  }
});

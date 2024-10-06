'use client'

import { useEffect, useState } from "react";
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

type Phrase = {
  id: number;
  jp_text: string;
  cn_text: string;
  pinyin: string;
  created_at: string;
  updated_at: string;
}

const PhraseIndex = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [cnText, setCnText] = useState<string>('');
  const [jpText, setJpText] = useState<string>('');

  useEffect(() => {
    getPhrases().then(phrases => setPhrases(phrases));
  }, []);

  const getPhrases = async () => {
    const res = await fetch('http://localhost:3000/phrases');
    return await res.json();
  }

  const say = (text: string) => {
    const uttr = new SpeechSynthesisUtterance(text)
    uttr.lang = "zh-CN"
    speechSynthesis.speak(uttr)
  }

  const createPhrase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      phrase: {
        cn_text: cnText,
        jp_text: jpText,
      }
    }
    await fetch('http://localhost:3000/phrases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    await getPhrases().then(phrases => setPhrases(phrases));
    setCnText('');
    setJpText('');
  }

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <form onSubmit={createPhrase} className="flex justify-between gap-4 items-center mb-10">
          <input
            type="text"
            placeholder="日文"
            value={jpText}
            onChange={(e) => setJpText(e.target.value)}
            required
            className="flex-1 border-solid border-2 border-zinc-100 rounded p-2"
          />
          <input
            type="text"
            placeholder="中文"
            value={cnText}
            onChange={(e) => setCnText(e.target.value)}
            required
            className="flex-1 border-solid border-2 border-zinc-100 rounded p-2"
          />
          <button type="submit" className="w-20 h-10 rounded bg-violet-200">保存</button>
        </form>
        {phrases.map((phrase) => {
          return (
            <div key={phrase.id} className="flex justify-between items-center border-solid border-2 rounded border-zinc-100 py-2 px-4 mb-2">
              <div className="flex-1">{phrase.jp_text}</div>
              <span className="w-0.5 h-10 mr-4 bg-zinc-100"></span>
              <div className="flex-1 flex flex-col gap-1">
                <span>{phrase.cn_text}</span>
                <span className="text-zinc-400 text-xs">{phrase.pinyin}</span>
              </div>
              <button onClick={() => say(phrase.cn_text)} className="w-10 h-10 border-solid border-2 border-violet-300 rounded-full">
                <VolumeUpRoundedIcon className="text-violet-300"/>
              </button>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default PhraseIndex;

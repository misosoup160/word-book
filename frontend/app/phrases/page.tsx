'use client'

import { useEffect, useState } from "react";
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

type Phrase = {
  id: number;
  jp_text: string;
  cn_text: string;
  created_at: string;
  updated_at: string;
}

const PhraseIndex = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [cnText, setCnText] = useState<string>('');
  const [jpText, setJpText] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000/phrases')
      .then((res) => res.json())
      .then((phrases) => setPhrases(phrases));
  }, []);

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
    const response = await fetch('http://localhost:3000/phrases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const savedPhrase = await response.json();
    setPhrases([...phrases, savedPhrase]);
    setCnText('');
    setJpText('');
  }

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <form onSubmit={createPhrase} className="flex justify-between gap-4 items-center">
          <input
            type="text"
            placeholder="中文"
            value={cnText}
            onChange={(e) => setCnText(e.target.value)}
            required
            className="flex-1 border-solid border-2 border-zinc-100 rounded p-2"
          />
          <input
            type="text"
            placeholder="日文"
            value={jpText}
            onChange={(e) => setJpText(e.target.value)}
            required
            className="flex-1 border-solid border-2 border-zinc-100 rounded p-2"
          />
          <button type="submit" className="w-20 h-10 rounded bg-violet-200">保存</button>
        </form>
        {phrases.map((phrase) => {
          return (
            <div key={phrase.id} className="flex justify-between">
              <div className="flex-1">{phrase.cn_text}</div>
              <div className="flex-1">{phrase.jp_text}</div>
              <button onClick={() => say(phrase.cn_text)}>
                <VolumeUpRoundedIcon />
              </button>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default PhraseIndex;

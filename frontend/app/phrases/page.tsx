'use client'

import { useEffect, useState } from "react";

type Phrase = {
  id: number;
  jp_text: string;
  cn_text: string;
  created_at: string;
  updated_at: string;
}

const PhraseIndex = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);

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

  return (
    <>
      <div className="max-w-sm mx-auto px-6 py-12">
        {phrases.map((phrase) => {
          return (
            <div key={phrase.id} className="flex justify-between">
              <div className="flex-1">{phrase.cn_text}</div>
              <div className="flex-1">{phrase.jp_text}</div>
              <button onClick={() => say(phrase.cn_text)}>読み上げ</button>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default PhraseIndex;

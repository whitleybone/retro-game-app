import React, { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio] = useState(
    new Audio(
      "https://vgmsite.com/soundtracks/super-mario-bros/jlgsgtpeof/01%20Running%20About.mp3"
    )
  );
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  });

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  });

  return [playing, toggle];
};

const PlaySound = ({ url }) => {
  const [playing, toggle] = useAudio(
    "https://www.vgmsite.com/soundtracks/super-mario-bros/jlgsgtpeof/01%20Running%20About.mp3"
  );

  return (
    <div>
      <button className="sound-btn" onClick={toggle}>
        {playing ? "⏸" : "▶️"}
      </button>
    </div>
  );
};

export default PlaySound;

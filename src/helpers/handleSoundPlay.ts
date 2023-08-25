import sound from '../assets/sounds.mp3'

const handleSoundPlay = () => {
    const audio = new Audio(sound);
    if(audio) audio?.play();
};

export default handleSoundPlay;
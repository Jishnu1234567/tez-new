import { about } from '../data/content.js';
import PinnedHero from './PinnedHero.jsx';

// Home hero: the pinned frame with the looping video.
export default function About() {
  return <PinnedHero light video={about.video} videoMobile={about.videoMobile} poster={about.poster} title={about.title} text={about.text} book={about.book} />;
}

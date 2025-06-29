import { useEffect } from 'react';
import RENDERER from '../utils/renderer';
import './FlyingFish.css';

export default function FlyingFish() {
  useEffect(() => {
    RENDERER.init();
  }, []);

  return <div id="flying-fish-container" className="flying-fish-bg" />;
}

import { createPortal } from 'react-dom';
import './index.css';
import Space from './Space';
import { useStore } from './store';
import Double from './Double';
function App() {
  const count = useStore((state) => state.count)
  const increment = useStore((state) => state.increment)
  console.log(count)
  return (
    <>
      <div id="app" style={{ width: '100%', height: '100%' }}>
      </div>
    </>
  )
}

export default App;

import './index.css';
import Calendar from './calendar';
import { useEffect, useRef } from 'react';
import { Dayjs } from 'dayjs';
import ReactPlayground from './Reactpalyground';
interface CalendarRef {
  setDate: (date: Dayjs) => void
  getDate: () => Dayjs
}
function App() {

  const calendarRef = useRef<CalendarRef>(null)
  useEffect(() => {
    console.log(calendarRef.current?.getDate().format());
  }, []);
  return <div>
    <div style={{ width: '100%', height: '100%' }}>
      <ReactPlayground></ReactPlayground>
    </div>
  </div>
}

export default App;

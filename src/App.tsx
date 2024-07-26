import './index.css';
import Calendar from './calendar';
import { useEffect, useRef } from 'react';
import { Dayjs } from 'dayjs';
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
    <Calendar ref={calendarRef} ></Calendar>
  </div>
}

export default App;

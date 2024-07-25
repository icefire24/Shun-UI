import './index.css';
import Calendar from './calendar';
import { useEffect, useRef } from 'react';
interface CalendarRef {
  setDate: (date: Date) => void
  getDate: () => Date
}
function App() {

  const calendarRef = useRef<CalendarRef>(null)
  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());
    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2024, 3, 1));
    }, 3000);
  }, []);
  return <div>
    <Calendar ref={calendarRef} defaultValue={new Date()}></Calendar>
  </div>
}

export default App;

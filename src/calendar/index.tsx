import React, { useImperativeHandle, useState } from 'react';
import './index.css'
import { useControllableValue } from 'ahooks';
interface CalendarProps {
    value?: Date,
    defaultValue?: Date,
    onChange?: (date: Date) => void
}
interface CalendarRef {
    setDate: (date: Date) => void
    getDate: () => Date
}
const InternalCalendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props: CalendarProps, ref) => {
    const {
        value,
        defaultValue,
        onChange,
    } = props;

    const [date, setDate] = useControllableValue(props, {
        defaultValue: new Date()
    });
    useImperativeHandle(ref, () => ({
        setDate: (date: Date) => {
            setDate(date)
        },
        getDate: () => {
            return date
        }
    }))
    const monthNames = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
    ]
    const handlePreMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    }
    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    }
    //当前月天数
    const daysOfMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate()
    }
    const firstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }
    const renderDates = () => {
        const days = [];

        const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
        const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>);
        }

        for (let i = 1; i <= daysCount; i++) {
            const clickHandle = () => {
                const curDate = new Date(date.getFullYear(), date.getMonth(), i)
                setDate(curDate)
                onChange?.(curDate)
            }
            if (i === date.getDate()) {
                days.push(<div key={i} className="day selected" onClick={() => {
                    clickHandle()
                }}>{i}</div>);
            } else {
                days.push(<div key={i} className="day" onClick={() => {
                    clickHandle()
                }}>{i}</div>);
            }
        }

        return days;
    };
    return (
        <div className="calendar">
            <div className="header">
                <button onClick={handlePreMonth}>&lt;</button>
                <div>{date.getFullYear()} 年 {monthNames[date.getMonth()]} </div>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days">
                <div className="day">日</div>
                <div className="day">一</div>
                <div className="day">二</div>
                <div className="day">三</div>
                <div className="day">四</div>
                <div className="day">五</div>
                <div className="day">六</div>
                {renderDates()}
            </div>
        </div>
    );
}
const Calendar = React.forwardRef(InternalCalendar)
export default Calendar;
import React, { CSSProperties, ReactNode, useImperativeHandle, useState } from 'react';
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import { useControllableValue } from 'ahooks';
import './index.css'
export interface CalendarProps {
    value: Dayjs;
    style?: CSSProperties;
    className?: string | string[];
    // 定制日期显示，会完全覆盖日期单元格
    dateRender?: (currentDate: Dayjs) => ReactNode;
    // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
    dateInnerContent?: (currentDate: Dayjs) => ReactNode;
    // 国际化相关
    locale?: string;
    onChange?: (date: Dayjs) => void;
}

interface CalendarRef {
    setDate: (date: Dayjs) => void
    getDate: () => Dayjs
}
const InternalCalendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props: CalendarProps, ref) => {
    console.log(dayjs);

    const {
        value,
        defaultValue,
        onChange,
    } = props;

    const [date, setDate] = useControllableValue(props, {
        defaultValue: dayjs()
    });
    useImperativeHandle(ref, () => ({
        setDate: (date: Dayjs) => {
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
        setDate(date.subtract(1, 'month').startOf('month'))
    }
    const handleNextMonth = () => {
        setDate(date.add(1, 'month').startOf('month'))
    }

    //第一天星期几
    const firstDayOfMonth = () => {
        return date.startOf('month').day()
    }
    const renderDates = () => {
        const days = [];

        const daysCount = date.daysInMonth();
        const firstDay = firstDayOfMonth();
        const lastDay = date.endOf('month').day();
        const startDay = date.startOf('month')
        const endDay = date.endOf('month')
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty">{startDay.subtract(firstDay - i, 'day').date()}</div>);
        }

        for (let i = 1; i <= daysCount; i++) {
            const clickHandle = () => {
                const curDate = dayjs(
                    new Date(date.year(), date.month(), i)
                )
                setDate(curDate)
                onChange?.(curDate)
            }
            if (i === date.date()) {
                days.push(<div key={i} className="day selected" onClick={() => {
                    clickHandle()
                }}>{i}</div>);
            } else {
                days.push(<div key={i} className="day" onClick={() => {
                    clickHandle()
                }}>{i}</div>);
            }
        }
        for (let i = lastDay+1; i < 7; i++) {
            days.push(<div key={`empty-${i}`} className="empty">{endDay.add(i - lastDay, 'day').date()}</div>);
        }

        return days;
    };
    return (
        <div className="calendar">
            <div className="header">
                <button onClick={handlePreMonth}>&lt;</button>
                <div>{date.year()} 年 {monthNames[date.month()]} </div>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days" >
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
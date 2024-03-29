import { parseISO, format } from 'date-fns'
import { Event } from '../types/event'
import DateFormatter from './date-formatter'

type EventProps = {
  event: Event
}

type CalendarProps = {
  events: Event[]
}

const EventBox = ({ event }: EventProps) => {
  return (
    <div className="inline-block p-4 border rounded border-current">
      <div>{event.name}</div>
      <div>
        {format(parseISO(event.start), 'HH:mm')} - {format(parseISO(event.end), 'HH:mm')}
      </div>
    </div>
  )
}

const Calendar = ({ events }: CalendarProps) => {
  events.sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime())
  const map = new Map()
  events.forEach((event) => {
    const key = format(parseISO(event.start), 'LLLL d');
    const collection = map.get(key);
    if (!collection) {
        map.set(key, [event]);
    } else {
        collection.push(event);
    }
  })
  return (
    <div id="calendar">
    {Array.from(map).map(([date, events]) => (
      <div key={date}>
        <h2>{date}</h2>
        {events.map((event: Event) => (
          <EventBox key={event.id} event={event} />
        ))}
      </div>
    ))}
    </div>
  )
}

export default Calendar

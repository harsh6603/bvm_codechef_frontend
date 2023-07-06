import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import NoteContext from '../context/NoteContext'
import "../css/Solutions.css"

export default function Solutions() {

    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const modify = (d) => {
        let result = new Date(d);
        return result.getDate() + " " + Months[result.getMonth()] + " " + result.getFullYear();
    }

    const context = useContext(NoteContext);

    useEffect(() => {
        context.getEvents();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container mt-5 solutionMargin'>
            {/* events details */}
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>DATE</th>
                        <th>START TIME</th>
                        <th>DURATION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        context.events.map((event) => {
                            return <tr key={event._id}>
                                <td><Link className='link' to={`./${event._id}`}>{event.name}</Link></td>
                                <td>{modify(event.date)}</td>
                                <td>{event.startingTime}</td>
                                <td>{event.duration}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

import {useState} from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangePeaker = () => {
    const e=new Date();
    const s=new Date();
    s.setDate(e.getDate()-6)

    const [state, setState] = useState([
        {
            startDate: s,
            endDate: e,
            key: 'selection'
        }
    ]);

    return (<DateRange
        maxDate={e}
        shrink={true}
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
    />)
}
// showDateDisplay	bool	true
// showMonthAndYearPickers	bool	true
// showMonthArrow	bool	true
// showPreview	bool	true
// shownDate	object
// startDatePlaceholder	string	Early
// updateRange	func
// weekStartsOn	number
// weekdayDisplayFormat	string	E
export default DateRangePeaker;
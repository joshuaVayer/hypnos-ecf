import i18next from "i18next";
import React from "react";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  monthName,
  generateCalendar,
  isAfter,
  isBefore,
  areSameDay
} from "@Utils/dates";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PickerDate = ({ selectedDate, handleSelect, isWindow, timeWindow }) => {
  const [baseDate, setBaseDate] = React.useState(new Date());
  const [days, setDays] = React.useState(generateCalendar(baseDate));

  const handlePrevious = () => {
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setBaseDate(newDate);
    setDays(generateCalendar(newDate));
  };

  const handleNext = () => {
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setBaseDate(newDate);
    setDays(generateCalendar(newDate));
  };

  const shouldHighlight = day => {
    if (isWindow) {
      if (areSameDay(day, timeWindow[0])) return true;
      if (areSameDay(day, timeWindow[1])) return true;
      if (isAfter(day, timeWindow[0]) && isBefore(day, timeWindow[1]))
        return true;
      return false;
    }
    return day === selectedDate;
  };

  return (
    <div className="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
      <div className="flex items-center text-gray-900">
        <button
          onClick={handlePrevious}
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto font-semibold">
          {monthName(baseDate, i18next)}
        </div>
        <button
          onClick={handleNext}
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        {[0, 1, 2, 3, 4, 5, 6].map(day => (
          <div key={day}>{i18next.t(`date.days.short.${day}`)}</div>
        ))}
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => (
          <button
            onClick={() => handleSelect(day.day)}
            key={day.date}
            type="button"
            className={classNames(
              "py-1.5 hover:bg-gray-100 focus:z-10",
              day.isCurrentMonth ? "bg-white" : "bg-gray-50",
              (shouldHighlight(day.day) || day.isToday) && "font-semibold",
              !shouldHighlight(day.day) &&
                day.isCurrentMonth &&
                !day.isToday &&
                "text-gray-900",
              !shouldHighlight(day.day) &&
                !day.isCurrentMonth &&
                !day.isToday &&
                "text-gray-400",
              day.isToday && "text-primary-400",
              dayIdx === 0 && "rounded-tl-lg",
              dayIdx === 6 && "rounded-tr-lg",
              dayIdx === days.length - 7 && "rounded-bl-lg",
              dayIdx === days.length - 1 && "rounded-br-lg"
            )}
          >
            <time
              dateTime={day.date}
              className={classNames(
                "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                shouldHighlight(day.day) &&
                  day.isToday &&
                  "bg-primary-500 bg-opacity-30 text-primary-700",
                shouldHighlight(day.day) &&
                  !day.isToday &&
                  "bg-primary-500 bg-opacity-30"
              )}
            >
              {day.date.split("-").pop().replace(/^0/, "")}
            </time>
          </button>
        ))}
      </div>
    </div>
  );
};

PickerDate.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object),
  timeWindow: PropTypes.arrayOf(PropTypes.any),
  selectedDate: PropTypes.object,
  handleSelect: PropTypes.func,
  isWindow: PropTypes.bool
};

PickerDate.defaultProps = {
  days: [],
  selectedDate: new Date(),
  timeWindow: [new Date(), new Date()],
  handleSelect: () => {},
  isWindow: false
};

export default PickerDate;

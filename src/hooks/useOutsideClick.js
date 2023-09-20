import { useEffect, useRef } from 'react';

// This code doesn't work with MUI select elements. Left for the reference

// Workaround to let MUI calendars work inside a modal
function isMuiCalendar(target) {
  return (
    target.closest('.MuiDateCalendar-root') ||
    target.closest('.MuiDialog-container')
  );
}

export default function useOutsideClick(
  handler,
  listenCapturing = true
) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (
          ref.current &&
          !ref.current.contains(e.target) &&
          !isMuiCalendar(e.target)
        )
          handler();
      }
      // Passing listenCapturing='true' to attach event to capturing phase of event pagination, not to the bubbling phase. Otherwise modal will be opened and immediately closed, as the button 'open' is outside the modal
      document.addEventListener(
        'click',
        handleClick,
        listenCapturing
      );
      return () =>
        document.removeEventListener(
          'click',
          handleClick,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );

  return ref;
}

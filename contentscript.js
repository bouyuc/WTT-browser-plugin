const documentBodyMutationObserver = new MutationObserver(function (mutations) {
  const eventLocation = document.getElementsByClassName("eventlist-label");
  const eventLocationText = eventLocation[0]?.outerText?.split("\n")[1];
  const timeZoneId = getTimeZoneId(locationTimezoneList, eventLocationText); // locationTimezoneList is imported in manifest.json

  mutations.forEach(function (mutation) {
    if (!mutation.addedNodes || !timeZoneId) {
      return;
    }
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      if (
        mutation.target.className.includes("date_time_section") &&
        !mutation.target.modifiedByBCPlugin &&
        mutation.target.textContent !== "-"
      ) {
        const originalTimeWithTz = moment.tz(
          mutation.target.textContent,
          "ddd[,] DD MMM YYY [-] hh:mm",
          timeZoneId
        );
        const userTime = originalTimeWithTz.local();
        mutation.target.textContent = userTime.format(
          "ddd[,] DD MMM YYYY [-] hh:mm a"
        );
        mutation.target.modifiedByBCPlugin = true;
      }
    }
  });
});

documentBodyMutationObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

function getTimeZoneId(locationTimezoneList, eventLocationText) {
  const timeZoneIdArr = locationTimezoneList.filter(
    (locationTimezoneInfo) => locationTimezoneInfo.location == eventLocationText
  );
  const firstTimezoneInArr = timeZoneIdArr.shift();
  return firstTimezoneInArr ? firstTimezoneInArr.timeZoneId : undefined;
}

const headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.5",
    "Content-Type": "application/json;charset=utf-8",
    "X-KBCF": "kbcf",
    "X-Language": "en",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin"
};

async function checkAvailability(dates: string[], city: string, guests: number) {
    const referrer = `https://kirbycafe-reserve.com/guest/${city.toLowerCase()}/reserve/`;


    const shopId = city === 'tokyo' ? 1 : 2;

    let months = [];
    for (let date of dates) {
        const [year, month, day] = date.split('-');
        if (!months.includes(`${year}-${month}`)) {
            months.push(`${year}-${month}`);
        }

    }

    let availableSlots = [];

    for (let month of months) {
        const url = `https://kirbycafe-reserve.com/api/guest/reserve/calendar?shop_id=${shopId}&month=${month}&quantity=${guests}`;
        const calendarRes = await fetch(url, {
            "credentials": "include",
            "headers": headers,
            "referrer": referrer,
            "method": "GET",
            "mode": "cors"
        });

        const calendarData = await calendarRes.json();


        for (let dateKey in calendarData.calendar) {
            if (dates.includes(dateKey)) {
                const timeSlot = calendarData.calendar[dateKey];
                for (const time in timeSlot) {
                    if (Object.prototype.hasOwnProperty.call(timeSlot, time)) {
                        const slotQuantity = timeSlot[time];
                        if (slotQuantity > 0) {
                            availableSlots.push({
                                date: dateKey,
                                time: time,
                                quantity: slotQuantity
                            });
                        }
                    }
                }
            }
        }


    }

    return availableSlots;
}


export { checkAvailability };

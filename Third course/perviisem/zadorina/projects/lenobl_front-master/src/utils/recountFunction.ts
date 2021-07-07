const recountFunction = (value: number) => {
    let hour = 0;
    let min = 0;
    let day = 0;
    let week = 0;
    let mounth = 0;

    hour = value / 60;
    hour = Math.floor(hour);
    min = value % 60;
    if (hour <= 8) {
        if (hour <= 0) {
            return `${min} мин`;
        } else {
            return `${hour} ч ${min} мин `;
        }
    } else {
        day = hour / 8;
        day = Math.floor(day);
        hour = hour % 8;
        if (day <= 5) {
            if (day <= 0) {
                return `${hour} ч ${min} мин `;
            } else {
                return `${day} дн ${hour} ч ${min} мин `;
            }
        } else {
            week = day / 5;
            week = Math.floor(week);
            day = day % 5;
            if (week <= 4) {
                if (week <= 0) {
                    return `${day} дн ${hour} ч ${min} мин `;
                } else {
                    return `${week} нед ${day} дн ${hour} ч ${min} мин `;
                }
            } else {
                mounth = week / 4;
                mounth = Math.floor(mounth);
                week = week % 4;
                if (mounth <= 0) {
                    return `${week} нед ${day} дн ${hour} ч ${min} мин `;
                } else {
                    return `${mounth} мес ${week} нед ${day} дн ${hour} ч ${min} мин `;
                }
            }
        }
    }
};

export default recountFunction;

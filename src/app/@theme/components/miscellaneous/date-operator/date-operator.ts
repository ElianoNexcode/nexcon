import { Injectable } from '@angular/core';

export interface DateFormated {
    dateFormated?: string
    timeFormated?: string
    dateUTC?: number
    dateLocale?: string
    dateValided?: boolean
}

@Injectable({
    providedIn: "root"
})
export class DateOperator {

    formatDate(dateString: string, dateTime: boolean = false, maxLength: number = 10): DateFormated {
        const dateReturn: DateFormated = {dateFormated: null,
                                          timeFormated: null,
                                          dateUTC: 0,
                                          dateLocale: null,
                                          dateValided: false};

        if(dateString != null && dateString != "") {

            const dateFormated: DateFormated = this.dateFormated(dateString, dateTime);
            
            if(dateString.length >= 10) {
                const dateCheck: any = new Date(dateReturn.dateFormated);
    
                dateReturn.dateUTC = dateFormated.dateUTC;
                dateReturn.dateLocale = (new Date(dateReturn.dateUTC)).toLocaleDateString("pt-br");
                if(dateCheck != "Invalid Date") {
                    dateReturn.dateValided  = (dateFormated.dateLocale == dateReturn.dateLocale);
                    dateReturn.dateFormated = (dateReturn.dateValided == true)? dateFormated.dateFormated.substr(0, maxLength): null;
                    dateReturn.timeFormated = dateFormated.timeFormated;
                } else {
                    dateReturn.dateValided = false;
                };    
            } else {
                dateReturn.dateFormated = null;
                dateReturn.dateValided = false;
            }

    
        } else {
            dateReturn.dateValided = true;
        }

        return dateReturn;

    }

    formatTime(timeString: string, seconds: boolean = false): DateFormated {
        const timeReturn: DateFormated = {timeFormated: null,
                                          dateValided: false};

        if(timeString != null && timeString != "") {

            if(timeString.length == 5 || timeString.length == 8) {
                const hourTime: number = parseInt(timeString.substr(0,2));
                const minuteTime: number = parseInt(timeString.substr(3,2));
                const secondTime: number = (seconds && timeString.length == 8)? parseInt(timeString.substr(6,2)): 0;

                if((hourTime >= 0 && hourTime <= 23) && (minuteTime >= 0 && minuteTime <= 59) &&
                   (secondTime >= 0 && secondTime <= 59)) {
                    timeReturn.dateValided = true;
                    timeReturn.timeFormated = '1970-01-01T' + timeString;
                } else {
                    timeReturn.dateValided = false;
                }
            }
        } else {
            timeReturn.dateValided = true;
        }

        return timeReturn;
    }

    compareDateGT(dateInit: string, dateFin: string): boolean {
        if(dateInit?.length >= 10 && dateFin?.length >= 10) {
            const dateUTCInit: number = this.dateFormated(dateInit, (dateInit.length > 10)).dateUTC;
            const dateUTCFin: number = this.dateFormated(dateFin, (dateFin.length > 10)).dateUTC;
            return (dateUTCFin >= dateUTCInit);    
        } else {
            return true;
        }
    }

    compareTimeGT(TimeInit: string, TimeFin: string): boolean {
        if(TimeInit?.length >= 5 && TimeFin?.length >= 5) {
            const dateUTCInit: number = this.dateFormated("1970-01-01 " + TimeInit, true).dateUTC;
            const dateUTCFin: number = this.dateFormated("1970-01-01 " + TimeFin, true).dateUTC;
            return (dateUTCFin >= dateUTCInit);    
        } else {
            return true;
        }
    }

    dateFormated(dateString: string, dateTime: boolean = false): DateFormated {
        let yearDate: number;
        let monthDate: number;
        let dayDate: number;

        if(dateString.indexOf("-") > 0) {
            yearDate = parseInt(dateString.substr(0, 4));
            monthDate = parseInt(dateString.substr(5, 2));
            dayDate = parseInt(dateString.substr(8, 2));
        } else {
            yearDate = parseInt(dateString.substr(6, 4));
            monthDate = parseInt(dateString.substr(3, 2));
            dayDate = parseInt(dateString.substr(0, 2));
        }

        const time = dateTime? dateString.substr(11, 5): "23:59";
        const dateFormated: string = ("0000" + yearDate.toString()).slice(-4) + "-" +
                                     ("00" + monthDate.toString()).slice(-2) + "-" +
                                     ("00" + dayDate.toString()).slice(-2) + " " + 
                                     (time);
        return { dateFormated: dateFormated,
                      dateUTC: Date.parse(dateFormated),
                   dateLocale: ("00" + dayDate.toString()).slice(-2) + "/" + 
                               ("00" + monthDate.toString()).slice(-2) + "/" +
                               ("0000" + yearDate.toString()).slice(-4),
                 timeFormated: time }

    }

}
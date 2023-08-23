export class DateUtils{
    
    static daysFrom2Day = (days:number) =>{
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    static daysBeforeToday = (days:number) =>{
        const newDate = new Date();
        newDate.setDate(newDate.getDate() - days);
        return newDate;
    }
}


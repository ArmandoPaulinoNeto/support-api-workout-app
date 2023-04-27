export class CostumDate{
    convertToDate(date: String){
        const [day, month, year] = date.split("/");
        return new Date(+year, +month -1, +day);
    }

    convertToString(date: Date){
        return date.toLocaleDateString();
    }
}
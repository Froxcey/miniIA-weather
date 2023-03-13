export default class FroxDate extends Date {
  constructor(value: string | number | Date) {
    super(value);
  }
  public addDays(days: number) {
    var dat = new FroxDate(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  }
  public to(to: FroxDate) {
    let dateArray: Array<FroxDate> = [];
    let currentDate = this as FroxDate;
    while (currentDate <= to) {
      dateArray.push(currentDate);
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }
}

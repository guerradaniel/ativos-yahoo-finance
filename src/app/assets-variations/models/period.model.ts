export interface Period {
    symbol?: string;
    periodStart: Date;
    periodEnd: Date;
    interval?: string;
}

export interface PeriodDate {
    start: Date;
    end: Date;
}
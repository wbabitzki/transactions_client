export interface StoredFile {
    errors: string[],
    name: string,
    countRecords: number,
    dateFrom: Date,
    dateTo: Date,
    lastModified: Date,
    versions: number
}
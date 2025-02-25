/**
 *  Full text search algorithm
 *  ----
 *  By [@pacifiquem](https://github.com/pacifiquem) and [@regisrex](https://github.com/regisrex)
*/

import { ParsedJSON } from "../interfaces/json.interface";
import parser from "./parser";

export default function search(query: string, jsonArray: any[]) : unknown[] {
    const fined = query.toLocaleLowerCase();
    const parsedData = parser(jsonArray);
    const results = recursiveSearch(fined, parsedData);
    const result = results.map((result) =>  JSON.parse(jsonArray[result.index]));
    return result;
}


const recursiveSearch = (query: string, args: ParsedJSON[]): ParsedJSON[] => {
    if (args.length == 0) return args;
    if (query.length == 0) return args;
    const results = args.filter((arg) => arg.value.includes(query[0]));
    const newQuery = query.slice(1);
    return recursiveSearch(newQuery, results);
}
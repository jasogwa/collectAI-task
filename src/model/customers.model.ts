export const csvToJson = (csv:any) => {
    let lines = csv.split("\n");
    
    let result = [];
    let headers = lines[0].split(",");
    for ( let i = 1; i < lines.length; i++ ) {
        let obj:any = {};
        let currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        for ( let j = 0; j < headers.length; j++ ) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);  
    }

    let result_ = clean(result);

    let rs = JSON.parse(JSON.stringify(result_, (k,v) => v ?? ''));

    return rs.splice(0,rs.length-1)
}

const clean = (object: any) => {
    Object
        .entries(object)
        .forEach(([k, v]) => {
            if (v && typeof v === 'object' && !Object.keys(v).length 
                || v === null || v == undefined || v === '') {
                    delete object[k];
            }
        });
    return object;
}

export const getSchedule = (res:any) => {
    let result: any[] = [];
    let output: any[] = [];

    for( let i = 0; i < res.length; i++ ) {
        let x = res[i].schedule.split("-");
        for(let i in x) {
            result.push(x[i]);
        }
    }
    
    let result_1 = result.filter(x => x);

    for( let j = 0; j < result_1.length; j++ ) {
        let y = result_1[j].replace("s","");
        output.push(parseInt(y));
    }

    //sort array from smallest to highest
    let output_1 = output.sort((a, b) => a - b);

    //remove duplicates
    let final_output = [...new Set(output_1)]

    return final_output;
}
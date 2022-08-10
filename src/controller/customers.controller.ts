import { Request, Response } from "express";
import fs from "fs/promises";
import fetch from 'node-fetch';
import { csvToJson,getSchedule } from "../model/customers.model";
 
export const readCustomersData = async (req: Request, res: Response) => {
    try {
        const data = await fs.readFile("./src/data/customers.csv", { encoding: 'utf8' });
        const csvjson = csvToJson(data);
        const schedule: Array<number>[] = getSchedule(csvjson);
        let url = 'http://localhost:9090/messages';
        let time:any = [];
        
        for(let i = 0; i < schedule.length; i++) {
            for(let j = 0; j < csvjson.length; j++) {

                let json_schedule = csvjson[j].schedule.split('-');

                if(json_schedule.includes(schedule[i]+"s")) {
                    let data = {
                        "email": csvjson[j].email,
                        "text": csvjson[j].text
                    };

                    let response = callService(data,url);
                    response.then(
                        (resp) => {
                            if(resp.paid !== true) {
                                let current = parseInt(schedule[i]+"");
                                time.push(current);
                                
                                let next_ = time.reduce((a:any, b:any) => a + b, 0)
                                let next_time = parseInt(next_+"000");
                                
                                setTimeout(() => {
                                    //call Email sending function here ....
                                    let send = sendEmail();
                                    console.log(send + "\n", resp)
                                    
                                }, next_time)
                            }
                        }
                    )
                }
            }
        }
        res.json({message:'Email sent to customers with unsettled invoices'});
    } catch (error) {
        console.log(error)
    }
}

const callService = async (data:any,url:string) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        const result = (await response.json());

        return result;

    } catch (error) {
        console.log('Error: ', error);
    }
}

const sendEmail = () => {
    return "Email sent to ... : ";
}
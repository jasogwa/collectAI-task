import { csvToJson,getSchedule } from "../../src/model/customers.model";

describe('getSchedule', () => {
    it('should return array of integer values', () => {
        var intArray = [0,  2,  3,  6,  7, 8, 11, 14, 18, 19, 20]
        var json = [
            {
              email: 'vdaybell0@seattletimes.com',
              text: '"Hi Vincenty, your invoice about $1.99 is due."',
              schedule: '8s-14s-20s'
            },
            {
              email: 'esealove2@go.com',
              text: '"Hola Elspeth, aun tienes un pago de $4.55 pendiente."',
              schedule: '0s-18s'
            },
            {
              email: 'bskentelberyl@mozilla.org',
              text: '"Dear Mr. Skentelbery, you still have an outstanding amount of $152.87 for your loan."',
              schedule: '3s-7s-18s'
            },
            {
              email: 'charrimanr@ucla.edu',
              text: '"Hello Charin, we want to remind you, that your payment of $12.09 is still outstanding"',
              schedule: '6s'
            },
            {
              email: 'rforrester11@indiegogo.com',
              text: '"Hallo Ricki, für deine Bestellung über 72.56€ konnten wir leider noch keine Zahlung feststellen."',
              schedule: '2s-11s-19s'
            }
        ]
        expect(getSchedule(json)).toEqual(intArray);
    })
})
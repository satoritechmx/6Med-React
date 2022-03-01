import ApiModel from "../models/ApiModel";
import { faker } from '@faker-js/faker';

class Api {
    data:Array<ApiModel> = [];

    getData() {
        for (let i = 0; i < 10; i++) {
            let obj:ApiModel = {
                id: faker.datatype.uuid().toString(),
                name: faker.name.firstName(),
                amount: faker.datatype.float(),
                stage: faker.datatype.number({
                    'min': 1,
                    'max': 3
                }),
                created_at: faker.date.future().toDateString()
            }
            this.data.push(obj);
        }
    }
}

export default Api;
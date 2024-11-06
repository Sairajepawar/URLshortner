import {Client,Pool} from "pg";


const config = {
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.CA,
    },
    max: 10
}

const client = new Pool(config);

function generateCodes():string{
    const t:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code:string = "";
    const size:number = t.length;
    for (let i = 0; i < 10; i++) {
        let index:number = Math.floor(Math.random()*size);
        code += t[index];
    }
    return code;
}

async function createCodes():Promise<string>{
    let code:string;
    let flag:boolean = true;
    do{
        code = generateCodes();
        const result = await client.query(`select COUNT(*) as count from master_table where code=$1`,[code]);
        if(result.rows[0].count==0){
            flag = false;
        }
    }while(flag)
    return code;
}

async function createRoute(link: string): Promise<string>{
    let code:string;
    try {
        await client.connect();
        // check if code for an url exist or not
        const result = await client.query(`select code from master_table where url=$1`,[link]);
        if(result.rowCount==1){
            return result.rows[0].code;
        }
        code = await createCodes();
        await client.query(`insert into master_table(url,code) values ($1,$2)`,[link,code]);
        return code;
    }
    catch (err: any) {
        console.error(err)
        return  "failed";
    }

}

async function getLink(code:string): Promise<string> {
    try{
        await client.connect();
        const result = await client.query(`select url from master_table where code=$1`,[code]);
        let link:string = result.rows[0].url;
        return link;
    }
    catch (err: any) {
        console.error(err);
        return "failed";
    }
}

export {
    createRoute,
    getLink
}
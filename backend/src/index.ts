import express,{Request,Response} from "express";
import {createRoute,getLink} from "./db"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/link", async (req: Request, res: Response) => {
    const code:string = req.body.code;
    try
    {
        const link: string = await getLink(code);
        if(link=="failed"){
            throw new Error("Code not present in Database/ Expired");
        }
        res.json({
            link: link
        })
    }
    catch(err:any){
        res.status(500).json({
            message: err.message,
        })
    }
})

app.post("/create", async (req: Request, res: Response) => {
    const link:string = req.body.link;
    try{
        let code:string = await createRoute(link);
        if(code==undefined){
            throw new Error("Code generation failed");
        }
        res.json({
            code: code,
            message: "Successfully Done"
        })
    }
    catch(err:any){
        res.status(500).json({
            message: err.message,
        })
    }
})

// for check whether backend is accessible or not
app.get("/hello", (req:Request, res:Response):void => {
    res.send("Hello World!");
});


app.listen(3000,():void=>{
    console.log("Server started");
});
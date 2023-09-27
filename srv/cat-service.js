//imports
const cds = require('@sap/cds');

class CatalogService extends cds.ApplicationService{
    async init(){

        const{training} = this.entities ;

        this.before("READ","training",(req)=>{
        console.log(req.query);
        });
        this.before("CREATE","training",(req)=>{
            if( req.data.duration > 2 )
            {
            req.reject(400,"Duration should not exceed 2 hours")
            }
        } );

        this.after("READ","training",(res)=>{
            for(let i = 0 ; i < res.length ; i++){
                res[i].trainee = "dummy";
            }
        });

        await super.init();
    }
}

module.exports = CatalogService;
export class ErrorHandler extends Error {
    constructor(err){
        super();

        if(err.response){
            this.status = err.response.status;
            this.devMessage = err.response.data;
            this.userMessage = (err.response.data && err.response.data.userMessage) ||'';
        }
    }
}
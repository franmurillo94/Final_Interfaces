class Timer{
    constructor(){
        this.interval = null;
        this.remainingSeconds;
    }
   
    updateInterfaceTime(){
        let textContent = this.remainingSeconds.toString();
        if(this.remainingSeconds<6){ 
            document.getElementById("timer").style.color = "red";
        }
        else { 
            document.getElementById("timer").style.color = "green";
        }
        document.getElementById("timer").innerHTML = textContent;
    }
    start(seg, callback){
        this.remainingSeconds = seg;

        this.interval = setInterval(()=> {

            this.remainingSeconds--;
            this.updateInterfaceTime();
            if(this.remainingSeconds<1){
                this.stop();
                return callback();
            }
        },1000);
    }
    stop(){
        clearInterval(this.interval);

        this.interval = null;
    }
}
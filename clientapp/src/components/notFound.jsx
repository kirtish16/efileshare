import React from "react";
import voidImg from "../assets/void.svg";

class NotFound extends React.Component{
    render(){

        return(
        <section>
            <section className="container">
                
                <div className="content">
                    <h3>Share your files easily !</h3>
                    
                    <img src={voidImg} alt="Transfer Files" />
                    
                    <h2>File not found</h2>
                    <p> The file is no longer available. </p>
            
            </div>
            
            </section>
        </section>
            );
    }

}

export default NotFound; 

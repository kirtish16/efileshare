import React from "react";
import transferImg from "../assets/transfer_files.svg";
import axios from "axios";

import { BASE_URL } from "../constants";

class Home extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state={
        fileLink:'',
        showLink:false
    }

    handleSubmit(event) {
        // Prevent default behavior
        event.preventDefault();
    
        const data = new FormData(event.target);
    
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        
        let url = BASE_URL + "/upload" ; 

        axios.post(url,data,config)
            .then(response => {

                this.setState({showLink:true})
                this.setState({fileLink:response.data.fileLink})

            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){

        return(
            <section>
                <section className="container">
                    
                    <div className="content">
                        <h3>Share your files easily !</h3>
                        
                        <img src={transferImg} alt="Transfer Files" /> 
                        
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            
                            <label htmlFor="file">File:</label>
                            <input type="file" name="file" id="file" required />
                            
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" />
                            <button className="submit">Share</button>
                        </form>
            {
                        this.state.showLink !== false && 
                            <div className="created-link">
                                Here is your file share link : &nbsp;<a href={this.state.fileLink} > Link </a>
                            </div>
                        }
                    </div>  
                </section>
            
            </section>
            );
    }

}

export default Home; 
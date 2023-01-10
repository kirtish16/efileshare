import React from "react";
import downloadFiles from "../assets/download_files.svg";
import axios from "axios";

import { BASE_URL } from "../constants";


class Password extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // Prevent default behavior
        event.preventDefault();
    
        const data = new FormData(event.target);
            
        // Config 
       const config = {     
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
    
        // Config 
    const downloadConfig = {     
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType:'blob' 
    }

        let fileId = this.props.fileId ;  
        let url = BASE_URL + "/file/" + fileId ; 

        let passwordValue = data.get("password");

        axios.post(url,{"password":passwordValue},config)
            .then(response => {
                
                if(response.data.notFound != null){
                    window.location = '/not_found'
                }else if(response.data.password == false){
                    alert("Make sure the password is correct!")
                }else {

                    let downloadUrl = "http://localhost:8000/downloadfile/" + fileId ; 

                    let fileName = response.data.name ; 
                    axios.get(downloadUrl,downloadConfig).then(response => {

                        const href = URL.createObjectURL(response.data);
                        
                        // create "a" HTML element with href to file & click
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', fileName); 
                        document.body.appendChild(link);
                        link.click();
                        
                        // clean up "a" element & remove ObjectURL
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                    
                    }).catch(error => {
                        console.log(error);
                    }) ; 

                }
                
            })
            .catch(error => {
                console.log(error);
            });
    }



    render(){

        return(
            <section className="container">
        
            <div className="content">
                <h3>Share your files easily !</h3>
                
                <img src={downloadFiles} alt="Transfer Files" />

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                    <button>Download</button>
                </form>
    
    </div>  
    </section>
    
            );
    }

}

export default Password; 
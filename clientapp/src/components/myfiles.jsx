import React from "react";
import { useParams } from "react-router-dom";
import Password from "./password";

function MyFiles(){
    const {id} = useParams() ; 
    return (
        <div>
          <Password fileId={id} ></Password>
        </div>
      );
     
}

export default MyFiles; 
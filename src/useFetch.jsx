//import React from "react";
import { useState } from "react";
import { useEffect } from "react";
export const API_URL=`https://www.omdbapi.com/?apikey=7d168320=titanic`;
//console.log(API_URL)
const useFetch=(apiParam)=>
{
    const[isLoading,setIsLoading]=useState(true);
    const[isError,setIsError]=useState({show:"false",msg:" "})
    const[movie,setMovie]=useState(null)

    const getMovie=async(url)=>
    {
        try{
          const res=await fetch(url);
          const data=await res.json();
           console.log(data);
           if(data.Response==="True")
           {
              setIsLoading(false);
              setMovie(data.Search || data);
              setIsError({show:"true",msg:" "})
           }
           else{
            setIsError({
                show:"true",msg:data.Error
            })
           }
        }catch(error)
        {
          console.log(error)
        }
    }
    useEffect(()=>
    {
    let timeOut=setTimeout(()=>
        {
            getMovie(`${API_URL}&s=${apiParam}`);
        },1000)
        return ()=>clearTimeout(timeOut);
    },[apiParam]);

        return(
            {isError, isLoading, movie}
            );
};
export default useFetch
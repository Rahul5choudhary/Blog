
import { useEffect,useState} from 'react';
const useFetch =(url) =>
{
    const [data, setData] = useState(null);
    const [isPending,setIsPending]=useState(true);
    const[error,setError]=useState(null);
   
   
    useEffect(()=>{
        const abortCont =new AbortController();
       
        setTimeout(() => { fetch(url,{signal:abortCont.signal})
          .then(response =>{
              
              if(!response.ok)
              {
 throw Error('could not fetch the data for that resource')
              }
             return response.json();
          })
         .then(data =>{
         
            setData(data);
            setIsPending(false);
         })
         .catch(err=>{
            
             if(err.name ==='AbortError')
             {
                 console.log('fetch aborted');
             }
             else
             {setError(err.message);
             setIsPending(false);
             }
         })
         
 
            
        }, 500); 
 return() => abortCont.abort();
         // console.log('use effect ran');
         
     },[url]);
 return {data,isPending,error}
}
export default useFetch;

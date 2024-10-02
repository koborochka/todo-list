
export default function Button({ children, ... props}: any){

    return(
        <button 
            className= {''}
            {... props}>
                {children}
        </button>
    )
}
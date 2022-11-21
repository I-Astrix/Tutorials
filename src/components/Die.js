export default function Die(props){
    return (
        <div className={`die ${props.isHeld ? 'die-held' : ''}`} onClick={()=>{props.toggleHeld(props.id)}}>
            <p>{props.value}</p>
        </div>
    )    
}
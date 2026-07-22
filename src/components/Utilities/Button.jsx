const Button = ({children, disabled=false, classes, clickFunction, type="", stopPropagation=false}) => {
    const handleClick = (e) => {
        if (stopPropagation ) {
            e.stopPropagation();
        }
        clickFunction?.(event)
    }
    return ( 
        <button
        type={type}
        className={classes}
        onClick={handleClick}>
            {children}
        </button>
     );
}
 
export default Button;
const Button = ({children, disabled=false, classes, clickFunction}) => {
    return ( 
        <button
        className={classes}
        onClick={clickFunction}>
            {children}
        </button>
     );
}
 
export default Button;
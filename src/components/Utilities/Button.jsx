const Button = ({children, disabled=false, classes, clickFunction, type=""}) => {
    return ( 
        <button
        type={type}
        className={classes}
        onClick={clickFunction}>
            {children}
        </button>
     );
}
 
export default Button;
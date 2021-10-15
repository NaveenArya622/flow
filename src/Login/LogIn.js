import React, {useEffect,useState} from "react";
import Icons from "../FormIcon/Icons";
import './Style.scss';
import {IconButton, InputAdornment} from "@mui/material";
import {Link} from "react-router-dom";
import InputField from "../FormIcon/InputField";
import Action from "../FormIcon/Action";
import {login} from "../Data/serverData";
const errorReset = {
    isErrorId: false,
    idErrorText: "",
    isErrorPassword: false,
    passwordErrorText: ""
}
const initial = {
    id: '',
    password: '',
    showPassword: false,
};
const LogIn = ({history}) => {
    const [values, setValues] = useState(initial);
    const [isError, setIsError] = useState(errorReset);
    const [token,setToken] = useState({error:false,Authorization:""});
    useEffect(()=>{
        localStorage.setItem("Token",JSON.stringify(token));
    },[token])

    const onChangeHandler = (e) => {
        const name = e.target.name;
        setValues({...values, [name]: e.target.value});
        if (name === 'id') {
            setIsError({
                ...isError,
                isErrorId: false,
                idErrorText: ""
            })
        }
        if (name === 'password') {
            setIsError({
                ...isError,
                isErrorPassword: false,
                passwordErrorText: ""
            })
        }
    }
    useEffect(() => {
    }, [isError])

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onsubmitHandler = (e) => {
        e.preventDefault();
        if (values.id === "" && values.password === "") {
            setIsError({
                isErrorId: true,
                idErrorText: "Id can not be empty.",
                isErrorPassword: true,
                passwordErrorText: "Password can not be empty."
            })
            return;
        }
        if (values.id === "") {
            setIsError({
                ...isError,
                isErrorId: true,
                idErrorText: "Id can not be empty."
            })
            return;
        }
        if (values.password === "") {
            setIsError({
                ...isError,
                isErrorPassword: true,
                passwordErrorText: "Password can not be empty."
            })
            return;
        }
        login(values).then((data)=>{
            if(data.error){
                setIsError(data);
            }
            else{
                setToken(data);
            }
        });
            setTimeout(()=>{history.push("/dashboard/home")},1000);
    }

    return (<main className={"login"}>
        <div className={"logo-container"}>
            <img className={"logo"} src={"./ProjectImage/Logo.svg"} alt={"logo"}/>
        </div>
        <img className={"home"} src={"./ProjectImage/Illustrator 1.png"} alt={"view"}/>
        <form className={"login-form"} onSubmit={onsubmitHandler}>
            <h3>LOGIN</h3>
            <div className={"hint"}>
                <span>Please login to your account</span>
            </div>
            <div className={"input"}>
                <InputField
                    label="User Id"
                    name={"id"}
                    error={isError.isErrorId}
                    helperText={isError.isErrorId ? isError.idErrorText : null}
                    value={values.id}
                    onChange={onChangeHandler}
                    InputProps={{
                        endAdornment: (
                            <Icons type={"USR"}/>
                        ),
                    }}
                />
            </div>
            <div className={"input"}>
                <InputField
                    label="Password"
                    name={"password"}
                    value={values.password}
                    type={values.showPassword ? 'text' : 'password'}
                    error={isError.isErrorPassword}
                    helperText={isError.isErrorPassword ? isError.passwordErrorText : null}
                    onChange={onChangeHandler}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Icons type={"PV"}/> : <Icons type={"PNV"}/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <Action styles={{textTransform: "upper-case",borderRadius: 3, margin: "0.8rem 0"}}
                type="submit">
                Login</Action>
            <Link to={"/"}>forgot Password?</Link>
        </form>

    </main>);
}
export default LogIn;
import React,{ useState } from "react";

function useHandleChange(initialValue) {
    const [value, setValue] = useState(initialValue);

    const reset = () => {
        setValue(initialValue);

    }

    const bind = {
        value: value,
        onChange: (event) => {
            let name = event.target.name
            console.log(`The name is ${name} and the value is ${event.target.value}`)
            setValue({ ...value, [name]: event.target.value })
        },
        variant: 'outlined',
    }

    return [value, bind, reset]
}



const useTFprops = (name,style) => {
    const bind = { label: name, name: name.toLowerCase(), variant: "outlined",style:{width:'90%',margin:'10px auto'} }
    if(typeof(style)=== "object" && style !== null)
    {
        bind.style = {...style}
    }
    return bind
}



const useBtnProps =
{
    color: "secondary",
    variant: 'contained',
    style:{margin:'10px'}


}


const useBtnPropsPrimary = {
    color: "primary",
    variant: 'contained',
    style:{margin:'10px'}




}

const ButtonDivRight = props => <div style={{ textAlign: 'right', width: '100%', padding: '10px' }}>
    {props.children}

</div>



export { useHandleChange, useTFprops, useBtnProps, useBtnPropsPrimary, ButtonDivRight };
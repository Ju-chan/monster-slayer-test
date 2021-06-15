import React, {useContext, useRef, useEffect} from 'react';
import ContactContext from "../../context/contact/contactContext"

function ContactFilter() {
    const contactContext = useContext(ContactContext);
    const text = useRef("");

     const {filterContacts, clearFilter, filtered} = contactContext;

    // If filtered part of the state is null, the value should be empty
    useEffect(()=> {
        if(filtered === null){   
            text.current.value = "";
        }
    })

    const onChange = (e)=> {
            // Actual value of the input
        if(text.current.value !== "") {
            contactContext.filterContacts(e.target.value)
        } else {
            contactContext.clearFilter();
        }

    } 
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange}/>
            
        </form>
    )
}

export default ContactFilter

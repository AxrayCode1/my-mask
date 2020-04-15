import React from 'react';
import classes from './Masks.css';
import Mask from './Mask/Mask';

const masks = (props) => {
    let masksElement = null;
    console.log(props);
    masksElement = props.data.map(element => {        
        const name = element['properties']['name'];
        const address = element['properties']['address'];
        const phone = element['properties']['phone'];
        const adultCount = element['properties']['mask_adult'];
        const childCount = element['properties']['mask_child'];
        const note = element['properties']['note'];
        return (
            <Mask 
                address={address} 
                phone={phone}
                title={name} 
                adult={adultCount} 
                child={childCount}
                note={note}             
            />
        )        
    });
    console.log('masks',masksElement);
    return (
        <div>            
            <section className={classes.Masks}>
                {masksElement}
                {/* <Mask title='test'/> */}
            </section>            
        </div>
    )    
}

export default masks;
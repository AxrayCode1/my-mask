import React from 'react';
import classes from './Masks.css';
import Mask from './Mask/Mask';

const masks = (props) => {
    let masksElement = null;
    // console.log(props);
    masksElement = props.data.map(element => {        
        const info = {
            name: element['properties']['name'],
            address: element['properties']['address'],
            phone: element['properties']['phone'],
            adultCount: element['properties']['mask_adult'],
            childCount: element['properties']['mask_child'],
            note: element['properties']['note'],
            updated: element['properties']['updated']
        }        
        return (
            <Mask 
                info={info}
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
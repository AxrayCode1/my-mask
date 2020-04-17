import React from 'react';
import classes from './Masks.css';
import Mask from './Mask/Mask';

const masks = (props) => {
    let masksElement = null;
    // console.log(props);
    masksElement = props.data.map(element => {        
        // if()        
        let checkField = [];
        const fields = ['name','address','phone','mask_adult','mask_child','note','updated'];
        fields.forEach(el => {
            checkField[el] = true;
        })
        let info = {            
            latitude: element['geometry']['coordinates'][1],
            longitude: element['geometry']['coordinates'][0]
        }            
        for(let key in element['properties']){
            if(checkField[key]){
                info[key] = element['prperties'][key];
            }
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
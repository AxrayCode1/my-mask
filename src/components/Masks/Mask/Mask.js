import React from 'react';

import classes from './Mask.css';

const mask = (props) => (
        <article className={classes.Mask}>
            <h1>{props.title}</h1>
            <div>
                <p><strong>住址：</strong>{props.address}</p>
                <p><strong>電話：</strong>{props.phone}</p>
                <p><strong>大人數量：</strong>{props.adult}</p>
                <p><strong>小孩數量：</strong>{props.child}</p>
                <p><strong>備註：</strong>{props.note}</p>
            </div>
        </article>
    )

export default mask;
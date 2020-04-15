import React from 'react';

import classes from './Mask.css';

const mask = (props) => (
        <article className={classes.Mask}>
            <h1>{props.info.name}</h1>
            <div>
                <p><strong>住址：</strong>{props.info.address}</p>
                <p><strong>電話：</strong>{props.info.phone}</p>
                <p><strong>大人數量：</strong>{props.info.adultCount}</p>
                <p><strong>小孩數量：</strong>{props.info.childCount}</p>
                <p><strong>備註：</strong>{props.info.note}</p>
                <p><strong>更新時間：</strong>{props.info.updated}</p>
                <p><a href={`https://www.google.com/maps/search/?api=1&query=${props.info.latitude},${props.info.longitude}`}>位置</a></p>
            </div>
        </article>
    )

export default mask;
import React from 'react';
import { LikeFalseIcon, LikeTrueIcon, RemoveIcon } from '../AppIcons';

interface IIcons {
    [K: string]: JSX.Element
}

const icons:IIcons = {
    likeFalse: <LikeFalseIcon />,
    likeTrue: <LikeTrueIcon />,
    remove: <RemoveIcon />
}

interface IIconProps {
    name: keyof typeof icons
    width?: number
    height?: number
}

export function Icon({name, width=15, height=15}: IIconProps) {
    return (
        <span style={{width:width, height:height}}>
            {icons[name]}
        </span>
    )
}
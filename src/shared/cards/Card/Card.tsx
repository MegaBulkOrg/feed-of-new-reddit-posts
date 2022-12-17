import React, { useEffect, useState } from 'react';
import { Icon } from '../../icons/Icon';
import styles from './card.css';

enum EIcon {
  likeFalse = 'likeFalse',
  likeTrue = 'likeTrue',
  remove = 'remove'
}

export interface ICardProps {
  id: string
  title: string
  url: string
  liked: boolean
  remove: (id: string) => void
  addToFavorites: (id: string, like: boolean) => void
}

export function Card({title, url, id, remove, addToFavorites}: ICardProps) {  
  const [like, setLike] = useState(false)  
  const liked = () => like ? setLike(false) : setLike(true)
  useEffect(() => {addToFavorites(id, like)}, [like])

  return (
    <div className='card'>           
      <div className={styles.cardImgContainer}>
        {/* 
          к сожалению использовать метод endsWith с регулярными выражениями нельзя - возникнет TypeError
          https://basicweb.ru/javascript/js_string_endswith.php
        */}
        {url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg') || url.endsWith('.gif')
          ?  <img className={`${styles.cardImg} card-img-top`} src={url} alt={title} />
          :  <img className={`${styles.cardImg} card-img-top`} src='https://images.squarespace-cdn.com/content/v1/58a1e3b91b10e3f74fb8f8b3/1531464370041-8KCQHOQ7NELBDNL9LP1C/DH+no+Photos+Logo+Red.png?format=2500w' alt={title} />
        }
      </div>
      <div className={`${styles.cardBody} card-body d-flex flex-column justify-content-between`}>
        <h5 className='card-title'>
          {title.length === 0 && 'Пост без названия'}
          {title.length <= 40 ? title : title.substring(0, 40)+' ...'}
        </h5>
        <div className='d-flex justify-content-lg-evenly'>
          <button className='btn btn-link' onClick={() => liked()}>
            {like ? <Icon name={EIcon.likeTrue} /> : <Icon name={EIcon.likeFalse} />}
          </button>
          <button className='btn btn-link' onClick={() => remove(id)}>
            <Icon name={EIcon.remove} />
          </button>
        </div>
      </div>
    </div> 
  );
}
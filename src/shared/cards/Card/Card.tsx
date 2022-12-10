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
    <div className={styles.card}>
        <div className={styles.cardImgContainer}>
          {url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg') || url.endsWith('.gif')
            ?  <img src={url} />
            :  <img src='https://images.squarespace-cdn.com/content/v1/58a1e3b91b10e3f74fb8f8b3/1531464370041-8KCQHOQ7NELBDNL9LP1C/DH+no+Photos+Logo+Red.png?format=2500w' />
          }
        </div>
        <div className={styles.cardContentContainer}>
          <h1 className={styles.cardTitle}>
            {title.length <= 40 ? title : title.substring(0, 40)+' ...'}
          </h1>
          <div className={styles.cardBtns}>
            <button onClick={() => liked()}>
              {like ? <Icon name={EIcon.likeTrue} /> : <Icon name={EIcon.likeFalse} />}
            </button>
            <button onClick={() => remove(id)}>
              <Icon name={EIcon.remove} />
            </button>
          </div>
        </div>
    </div>
  );
}
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataDeleteItem, dataLikeItem, dataRequestAsync } from '../../../store/data';
import { RootState } from '../../../store/store';
import { GenericElements } from '../../GenericElements';
import { Card, ICardProps } from '../Card/Card';
import styles from './cardslist.css';

export function CardsList() {  
  const token = useSelector<RootState, string>((state) => state.token)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    if (token && token !== 'undefined') dispatch(dataRequestAsync())
  }, [token])
  
  const postsList = useSelector<RootState, ICardProps[]>((state) => state.items.data)
  const loading = useSelector<RootState, boolean>((state) => state.items.loading)
  const error = useSelector<RootState, string>((state) => state.items.error)
  const mode = useSelector<RootState, string>((state) => state.mode)

  const cardRemove = (id:string) => {
    dispatch(dataDeleteItem(id))
  }

  const addToFavorites = (id:string, like:boolean) => {
    dispatch(dataLikeItem(id, like))
  }

  // новый объект, который возвращает метод map, необходимо оборачивыать в круглые скобки,
  // потому что без круглых это тело функции, а не возвращаемый результат
  const listToShow = postsList.map(post => ({...post, remove: cardRemove, addToFavorites: addToFavorites}))
  const likedListToShow = listToShow.filter((item) => item.liked === true)

  return (
    <section className='cards-list'>
      <div className='cards-list-container row pb-5 g-5'>   
          {token && loading && 
            <p className='text-center'>Загрузка...</p>
          }
          {error !== '' && 
            <p className='text-center'>Произошла ошибка: {error}. Перезагрузите приложение и снова авторизуйтесь.</p>
          }
          {token && !loading && error === '' && postsList.length === 0 && 
            <p className='text-center'>Карточек нет. Перезагрузите приложение и снова авторизуйтесь.</p>
          }
          {mode === 'favorites' && likedListToShow.length === 0 && postsList.length !== 0 &&
            <p className='text-center'>Раздел "Избранное" пуст.</p>
          }
          {!loading && postsList.length !== 0 && 
            <div className={styles.items}>
                {/* несмотря на то, что тут нет прямого указания на то, чтобы делать повторный рендер списка при удалении карточки, все равно, как только изменится state у Redux, запустится повторный рендер списка */}
                {
                  mode === 'favorites' 
                    ? <GenericElements<ICardProps> list={likedListToShow} Template={Card}/>
                    : <GenericElements<ICardProps> list={listToShow} Template={Card}/>
                }     
            </div>
          }
      </div>
    </section>
  );
}
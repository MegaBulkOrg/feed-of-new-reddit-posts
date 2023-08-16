import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { dataDeleteItem, dataLikeItem, dataRequestAsync } from '../../../store/data';
import { RootState } from '../../../store/store';
import { GenericElements } from '../../GenericElements';
import { Card, ICardProps } from '../Card/Card';
import styles from "./cardslist.css";

export function CardsList() {  
  const dispatch = useDispatch<any>()  
  const postsList = useSelector<RootState, ICardProps[]>((state) => state.items.data)
  const loading = useSelector<RootState, boolean>((state) => state.items.loading)
  const error = useSelector<RootState, string>((state) => state.items.error)
  const cardRemove = (id:string) => {dispatch(dataDeleteItem(id))}
  const addToFavorites = (id:string, like:boolean) => {dispatch(dataLikeItem(id, like))}
  // новый объект, который возвращает метод map, необходимо оборачивыать в круглые скобки
  // потому что без круглых это тело функции а не возвращаемый результат
  const listToShow = postsList.map(post => ({...post, remove: cardRemove, addToFavorites: addToFavorites}))
  const likedListToShow = listToShow.filter((item) => item.liked === true)
  const location = useLocation()
  // диспачить нужно только 1 раз а не то будет много редиректов (в консоли браузера об этом будет куча ошибок)
  useEffect(() => {dispatch(dataRequestAsync())},[])
  const navigation = useNavigate()
  // перенаправление на "страницу" авторизации помещено в этом компоненте потому что useNavigate может быть использован только внутри компонента Route
  // а в useEffect он помещен поскольку может быть вызван только в useEffect  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || token === '' || token === 'undefined') navigation('/sign-in');
  }, []);

  return (
    <section className='cards-list'>
      <div className='cards-list-container row pb-5 g-5'>        
        {loading && 
          <h3 className='text-center'>Загрузка...</h3>
        }
        {error !== '' && 
          <h4 className='text-center'>Произошла ошибка: {error}. Перезагрузите приложение и снова авторизуйтесь.</h4>
        }
        {!loading && error === '' && postsList.length === 0 && 
          <h4 className='text-center'>Карточек нет. Перезагрузите приложение и снова авторизуйтесь.</h4>
        }
        {/* 
          использовать тут Route не совсем правильно поскольку React Router будет считать эти роуты вложенными и для его они будут выглядеть как localhost:3000/posts/posts
        */}
        {location.pathname === '/favorites' && likedListToShow.length === 0 && postsList.length !== 0 &&
          <h4 className='text-center'>Раздел "Избранное" пуст</h4>
        }
        {!loading && postsList.length !== 0 && 
          <div className={styles.items}>
            {/* несмотря на то, что тут нет прямого указания на то, чтобы делать повторный рендер списка при удалении карточки, все равно, как только изменится state у Redux, запустится повторный рендер списка */}
            {
              location.pathname === '/favorites'
                ? <GenericElements<ICardProps> list={likedListToShow} Template={Card}/>
                : <GenericElements<ICardProps> list={listToShow} Template={Card}/>
            }               
          </div>
        }
      </div>
    </section>
  );
}
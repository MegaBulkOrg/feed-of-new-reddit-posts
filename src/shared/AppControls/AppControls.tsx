import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';

const SITE = process.env.SITE === 'undefined' || process.env.SITE === undefined ? 'localhost' : process.env.SITE
const PORT = process.env.PORT === 'undefined' || process.env.PORT === undefined ? 3000 : process.env.PORT

export function AppControls() {
    const loading = useSelector<RootState, boolean>((state) => state.items.loading)
    const error = useSelector<RootState, string>((state) => state.items.error)
        
    return (
        <section className='app-controls'>
            <div className='app-controls-container row p-5 text-center'>                   
                <div className='col'>
                    <Routes>   
                        <Route path="/sign-in" element={
                            <>
                                <h1>Чтобы увидеть карточки, авторизуйтесь</h1> 
                                <a className='btn btn-lg btn-outline-info'
                                    href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=http://${SITE}:${PORT}/auth&duration=permanent&scope=read identity submit`}>
                                    Авторизация
                                </a>
                            </>
                        } />
                        <Route path="/posts" element={                       
                            !loading && error === '' && 
                            <Link to='/favorites' className='btn btn-lg btn-outline-info'>Показать Избранное</Link>  
                        } />
                        <Route path="/favorites" element={                       
                            !loading && error === '' && 
                            <Link to='/posts' className='btn btn-lg btn-outline-info'>Снять фильтр</Link>  
                        } />
                        <Route path="*" element={ 
                            <>                      
                                <h1><strong>Ошибка 404</strong></h1>
                                <h2>Страницы, которую Вы ищите, не существует :(</h2>
                            </>
                        } />
                    </Routes>
                </div>
            </div>
        </section>
  );
}